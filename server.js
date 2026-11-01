import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_MATERIALS } from './src/data/materialsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    db.serialize(() => {
      db.run(`DROP TABLE IF EXISTS materials`);
      db.run(
        `CREATE TABLE materials (
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
        (err) => {
          if (err) {
            console.error(err);
            return;
          }

          const stmt = db.prepare(
            'INSERT INTO materials (id, subject, title, category, author, description, type, readTime, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
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
          console.log(`Seeded ${INITIAL_MATERIALS.length} complete Bac materials into SQLite database.`);
        }
      );
    });
  }
});

// API endpoint: Get all study materials
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

// API endpoint: AI Tutor responses
app.post('/api/ai-tutor', (req, res) => {
  const { question = '', materialId } = req.body || {};
  const material =
    INITIAL_MATERIALS.find((m) => m.id === Number(materialId)) || INITIAL_MATERIALS[0];
  const q = question.toLowerCase();

  let answer = '';
  if (q.includes('plan') || q.includes('structur') || q.includes('scurt')) {
    answer =
      `Iată **planul recapitulativ pentru Bac** la **„${material.title}”**:\n\n` +
      (material.keyPoints || []).map((pt, i) => `${i + 1}. **${pt}**`).join('\n') +
      `\n\n**Sfat pentru barem:** Asigură-te că integrezi cel puțin două secvențe comentate și două elemente de structură și compoziție!`;
  } else if (q.includes('subiect') || q.includes('cerin') || q.includes('test')) {
    answer =
      `**Subiectul al III-lea – Antrenament Bac.ai:**\n\n` +
      `> *Redactează un eseu de minimum 400 de cuvinte în care să prezinți ${material.title}.*\n\n` +
      `Folosește reperele din tab-ul **Material de Studiu** pentru a atinge toate cele 30 de puncte!`;
  } else {
    answer =
      `Pentru **„${material.title}”** (${material.category}):\n\n` +
      `• **Sinteză:** ${material.description}\n` +
      (material.keyPoints || []).map((pt) => `• ${pt}`).join('\n');
  }

  res.json({ answer });
});

// Serve static production frontend from dist/
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Listen on BOTH 5173 (Main Web App) and 3001 (API port) so it always works
const PORTS = [5173, 3001];
PORTS.forEach((port) => {
  const srv = app.listen(port, '0.0.0.0', () => {
    console.log(`Bac.ai server running at http://localhost:${port}`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already active.`);
    } else {
      console.error(`Server error on port ${port}:`, err);
    }
  });
});
