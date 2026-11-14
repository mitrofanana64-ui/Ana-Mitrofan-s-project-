import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_MATERIALS } from './src/data/materialsData.js';
import { SAMPLE_BAC_TESTS, getMoldovaGrade } from './src/data/sampleTestsData.js';
import {
  answerWithSemanticRag,
  evaluateAllAlgorithms
} from './src/ai/nlpEngine.js';
import { runEmpiricalBenchmark } from './src/ai/benchmarkRunner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const dbPath = path.join(__dirname, 'database.sqlite');
const benchmarkJsonPath = path.join(__dirname, 'src', 'data', 'benchmarkResults.json');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to persistent SQLite database (database.sqlite).');

  db.serialize(() => {
    // 1. Persistent Study Materials Table (NO DROP TABLE on restart!)
    db.run(
      `CREATE TABLE IF NOT EXISTS materials (
        id INTEGER PRIMARY KEY,
        subject TEXT,
        title TEXT,
        category TEXT,
        author TEXT,
        description TEXT,
        type TEXT,
        readTime TEXT,
        content TEXT
      )`,
      (tableErr) => {
        if (tableErr) {
          console.error('Error creating materials table:', tableErr);
          return;
        }
        const stmt = db.prepare(
          'INSERT OR REPLACE INTO materials (id, subject, title, category, author, description, type, readTime, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        INITIAL_MATERIALS.forEach((item) => {
          stmt.run([
            item.id,
            item.subject,
            item.title,
            item.category,
            item.author || '',
            item.description,
            item.type,
            item.readTime || '10 min',
            item.content
          ]);
        });
        stmt.finalize();
        console.log(`Verified ${INITIAL_MATERIALS.length} Bac curriculum modules in SQLite.`);
      }
    );

    // 2. Persistent Student BAC Exam Attempts Table (Anonymized for Responsible AI / GDPR)
    db.run(
      `CREATE TABLE IF NOT EXISTS test_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        student_alias TEXT NOT NULL,
        test_id TEXT NOT NULL,
        test_title TEXT NOT NULL,
        subject TEXT NOT NULL,
        total_score_c INTEGER NOT NULL,
        total_score_a INTEGER NOT NULL,
        total_score_b INTEGER NOT NULL,
        grade INTEGER NOT NULL,
        grade_label TEXT NOT NULL,
        mean_cosine REAL NOT NULL,
        mean_coherence REAL NOT NULL,
        duration_seconds INTEGER DEFAULT 0,
        items_json TEXT
      )`,
      (errAttempts) => {
        if (errAttempts) {
          console.error('Error creating test_attempts table:', errAttempts);
          return;
        }
        // Seed initial anonymized attempts only if table is empty
        db.get('SELECT COUNT(*) as cnt FROM test_attempts', [], (cntErr, row) => {
          if (!cntErr && row && row.cnt === 0) {
            const seedAttempts = [
              {
                created_at: '2026-11-10T14:22:10.000Z',
                student_alias: 'Elev #RM-104 (Profil Umanist, Chișinău)',
                test_id: 'ro-bac-1',
                test_title: 'Simulare BAC Limba și Literatura Română – Grigore Vieru & Condiția Intelectualului',
                subject: 'Romanian',
                total_score_c: 94,
                total_score_a: 89,
                total_score_b: 96,
                grade: 10,
                grade_label: 'Excelent (Nota 10)',
                mean_cosine: 0.91,
                mean_coherence: 0.93,
                duration_seconds: 4120
              },
              {
                created_at: '2026-11-12T16:05:44.000Z',
                student_alias: 'Elev #RM-219 (Profil Real, Bălți)',
                test_id: 'hi-bac-1',
                test_title: 'Simulare BAC Istoria Românilor și Universală – Unirea din 1918 & Regimul Comunist în RSSM',
                subject: 'History',
                total_score_c: 83,
                total_score_a: 78,
                total_score_b: 88,
                grade: 9,
                grade_label: 'Foarte Bine (Nota 9)',
                mean_cosine: 0.82,
                mean_coherence: 0.88,
                duration_seconds: 3890
              },
              {
                created_at: '2026-11-13T18:40:12.000Z',
                student_alias: 'Test Adversarial Jury Demo (Keyword Stuffing)',
                test_id: 'ro-bac-2',
                test_title: 'Simulare BAC Limba și Literatura Română – Ion Druță („Povara bunătății noastre”)',
                subject: 'Romanian',
                total_score_c: 6,
                total_score_a: 91,
                total_score_b: 88,
                grade: 4,
                grade_label: 'Sub pragul de promovare (< 25p)',
                mean_cosine: 0.68,
                mean_coherence: 0.14,
                duration_seconds: 95
              }
            ];
            const stmt = db.prepare(
              `INSERT INTO test_attempts
              (created_at, student_alias, test_id, test_title, subject, total_score_c, total_score_a, total_score_b, grade, grade_label, mean_cosine, mean_coherence, duration_seconds, items_json)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            );
            seedAttempts.forEach((a) => {
              stmt.run([
                a.created_at,
                a.student_alias,
                a.test_id,
                a.test_title,
                a.subject,
                a.total_score_c,
                a.total_score_a,
                a.total_score_b,
                a.grade,
                a.grade_label,
                a.mean_cosine,
                a.mean_coherence,
                a.duration_seconds,
                '[]'
              ]);
            });
            stmt.finalize();
          }
        });
      }
    );

    // 3. Persistent Empirical Benchmark Runs Table
    db.run(
      `CREATE TABLE IF NOT EXISTS benchmark_runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        n_trials INTEGER NOT NULL,
        mae_a REAL NOT NULL,
        mae_b REAL NOT NULL,
        mae_c REAL NOT NULL,
        pearson_r_a REAL NOT NULL,
        pearson_r_b REAL NOT NULL,
        pearson_r_c REAL NOT NULL,
        adv_fp_a REAL NOT NULL,
        adv_fp_c REAL NOT NULL,
        mean_latency_ms REAL NOT NULL
      )`
    );

    // 4. Persistent R&D Feedback & Pilot School Registration Table
    db.run(
      `CREATE TABLE IF NOT EXISTS feedback_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT DEFAULT 'Elev / Profesor',
        school TEXT DEFAULT '',
        message TEXT NOT NULL
      )`
    );
  });
});

// ---------------------------------------------------------------------------
// API ENDPOINTS
// ---------------------------------------------------------------------------

// 1. Get all 20 study materials
app.get('/api/materials', (req, res) => {
  db.all('SELECT * FROM materials ORDER BY id ASC', [], (err, rows) => {
    if (err || !rows || rows.length === 0) {
      return res.json(INITIAL_MATERIALS);
    }
    const enriched = rows.map((row) => {
      const extra = INITIAL_MATERIALS.find((m) => m.id === row.id);
      return extra ? { ...extra, ...row } : row;
    });
    res.json(enriched);
  });
});

// 2. Semantic Vector RAG AI Tutor (Replaces hardcoded if/else!)
app.post('/api/ai-tutor', (req, res) => {
  const { question = '', materialId } = req.body || {};
  const result = answerWithSemanticRag(question, materialId);
  res.json(result);
});

// 3. Live 3-Algorithm ANCE Evaluator Endpoint
app.post('/api/evaluate', (req, res) => {
  const { testId, itemId, answerText = '' } = req.body || {};
  const test = SAMPLE_BAC_TESTS.find((t) => t.id === testId) || SAMPLE_BAC_TESTS[0];
  const item = (test.items || []).find((i) => i.id === itemId) || test.items[0];
  const evaluation = evaluateAllAlgorithms(item, answerText);
  res.json(evaluation);
});

// 4. Get & Save Persistent Student BAC Exam Attempts in SQLite
app.get('/api/attempts', (req, res) => {
  db.all('SELECT * FROM test_attempts ORDER BY id DESC LIMIT 25', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

app.post('/api/attempts', (req, res) => {
  const {
    studentAlias = 'Elev Anonimizat (R. Moldova)',
    testId = 'ro-bac-1',
    testTitle = 'Simulare BAC ANCE',
    subject = 'Romanian',
    totalScoreC = 0,
    totalScoreA = 0,
    totalScoreB = 0,
    meanCosine = 0,
    meanCoherence = 0,
    durationSeconds = 0,
    itemsSummary = []
  } = req.body || {};

  const gradeInfo = getMoldovaGrade(totalScoreC);
  const createdAt = new Date().toISOString();

  db.run(
    `INSERT INTO test_attempts
      (created_at, student_alias, test_id, test_title, subject, total_score_c, total_score_a, total_score_b, grade, grade_label, mean_cosine, mean_coherence, duration_seconds, items_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      createdAt,
      studentAlias,
      testId,
      testTitle,
      subject,
      Math.round(totalScoreC),
      Math.round(totalScoreA),
      Math.round(totalScoreB),
      gradeInfo.grade,
      gradeInfo.label,
      Number(meanCosine.toFixed(2)),
      Number(meanCoherence.toFixed(2)),
      Math.round(durationSeconds),
      JSON.stringify(itemsSummary)
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        success: true,
        id: this.lastID,
        created_at: createdAt,
        grade: gradeInfo.grade,
        grade_label: gradeInfo.label
      });
    }
  );
});

// 5. Get & Run N = 120 Empirical Benchmark
app.get('/api/benchmarks', (req, res) => {
  try {
    if (fs.existsSync(benchmarkJsonPath)) {
      const data = JSON.parse(fs.readFileSync(benchmarkJsonPath, 'utf-8'));
      return res.json(data);
    }
    const fresh = runEmpiricalBenchmark();
    return res.json(fresh);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/benchmarks/run', (req, res) => {
  try {
    const fresh = runEmpiricalBenchmark();
    fs.writeFileSync(benchmarkJsonPath, JSON.stringify(fresh, null, 2), 'utf-8');
    db.run(
      `INSERT INTO benchmark_runs (created_at, n_trials, mae_a, mae_b, mae_c, pearson_r_a, pearson_r_b, pearson_r_c, adv_fp_a, adv_fp_c, mean_latency_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fresh.generatedAt,
        fresh.nTrials,
        fresh.algorithms.algA.maePct,
        fresh.algorithms.algB.maePct,
        fresh.algorithms.algC.maePct,
        fresh.algorithms.algA.pearsonR,
        fresh.algorithms.algB.pearsonR,
        fresh.algorithms.algC.pearsonR,
        fresh.algorithms.algA.adversarialFalsePositiveRatePct,
        fresh.algorithms.algC.adversarialFalsePositiveRatePct,
        fresh.algorithms.algC.meanLatencyMs
      ]
    );
    res.json(fresh);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 6. R&D Feedback & Pilot Registration Portal
app.get('/api/feedback', (req, res) => {
  db.all('SELECT * FROM feedback_messages ORDER BY id DESC LIMIT 15', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/feedback', (req, res) => {
  const { name = '', email = '', role = 'Elev / Profesor', school = '', message = '' } = req.body || {};
  if (!name.trim() || !message.trim()) {
    return res.status(400).json({ error: 'Numele și mesajul sunt obligatorii.' });
  }
  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO feedback_messages (created_at, name, email, role, school, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [createdAt, name.trim(), email.trim(), role.trim(), school.trim(), message.trim()],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID, created_at: createdAt });
    }
  );
});

// Serve static production frontend from dist/
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Listen on BOTH 5173 (Main Web App) and 3001 (API port)
const PORTS = [5173, 3001];
PORTS.forEach((port) => {
  const srv = app.listen(port, '0.0.0.0', () => {
    console.log(`Bac.ai v2 R&D server running at http://localhost:${port}`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already active.`);
    } else {
      console.error(`Server error on port ${port}:`, err);
    }
  });
});
