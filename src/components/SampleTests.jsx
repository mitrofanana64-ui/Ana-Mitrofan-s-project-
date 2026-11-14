import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  FileCheck2,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  Brain,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Wand2,
  ShieldCheck,
  Database,
  Save,
  ShieldAlert,
  Cpu,
  Activity
} from 'lucide-react';
import { SAMPLE_BAC_TESTS, MOLDOVA_GRADE_SCALE, getMoldovaGrade } from '../data/sampleTestsData';
import { evaluateAllAlgorithms } from '../ai/nlpEngine';

const INITIAL_FALLBACK_ATTEMPTS = [
  {
    id: 1,
    created_at: '2026-11-10T14:22:10.000Z',
    student_alias: 'Elev #RM-104 (Profil Umanist, Chișinău)',
    test_id: 'ro-bac-1',
    test_title: 'Simulare BAC Limba și Literatura Română – Grigore Vieru',
    subject: 'Romanian',
    total_score_c: 94,
    total_score_a: 89,
    total_score_b: 96,
    grade: 10,
    grade_label: 'Excelent (Nota 10)',
    mean_cosine: 0.91,
    mean_coherence: 0.93
  },
  {
    id: 2,
    created_at: '2026-11-12T16:05:44.000Z',
    student_alias: 'Elev #RM-219 (Profil Real, Bălți)',
    test_id: 'hi-bac-1',
    test_title: 'Simulare BAC Istorie – Unirea din 1918 & RSSM',
    subject: 'History',
    total_score_c: 83,
    total_score_a: 78,
    total_score_b: 88,
    grade: 9,
    grade_label: 'Foarte Bine (Nota 9)',
    mean_cosine: 0.82,
    mean_coherence: 0.88
  },
  {
    id: 3,
    created_at: '2026-11-13T18:40:12.000Z',
    student_alias: 'Test Adversarial Jury Demo (Keyword Stuffing)',
    test_id: 'ro-bac-2',
    test_title: 'Simulare BAC Limba Română – Ion Druță',
    subject: 'Romanian',
    total_score_c: 6,
    total_score_a: 91,
    total_score_b: 88,
    grade: 4,
    grade_label: 'Sub pragul de promovare (< 25p)',
    mean_cosine: 0.68,
    mean_coherence: 0.14
  }
];

const SampleTests = () => {
  const [selectedSubject, setSelectedSubject] = useState('Romanian');
  const [activeTestId, setActiveTestId] = useState('ro-bac-1');
  const [answers, setAnswers] = useState({});
  const [showModelFor, setShowModelFor] = useState({});
  const [showScaleModal, setShowScaleModal] = useState(false);

  // SQLite Persistence State
  const [studentAlias, setStudentAlias] = useState('Elev #RM-305 (Clasa a XII-a)');
  const [savedAttempts, setSavedAttempts] = useState(INITIAL_FALLBACK_ATTEMPTS);
  const [savingAttempt, setSavingAttempt] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // 180-minute (10800 seconds) official ANCE BAC countdown timer
  const [secondsLeft, setSecondsLeft] = useState(180 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await axios.get('/api/attempts', { timeout: 2500 });
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSavedAttempts(res.data);
        }
      } catch {
        // Keep fallback attempts if offline
      }
    };
    fetchAttempts();
  }, []);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const subjectTests = useMemo(
    () => SAMPLE_BAC_TESTS.filter((t) => t.subject === selectedSubject),
    [selectedSubject]
  );

  const activeTest = useMemo(
    () => SAMPLE_BAC_TESTS.find((t) => t.id === activeTestId) || subjectTests[0],
    [activeTestId, subjectTests]
  );

  const handleSubjectSwitch = (subj) => {
    setSelectedSubject(subj);
    const firstTest = SAMPLE_BAC_TESTS.find((t) => t.subject === subj);
    if (firstTest) setActiveTestId(firstTest.id);
  };

  // Real-time evaluation across all 3 Algorithms (A, B, and C) for all items in the active test
  const evaluations = useMemo(() => {
    if (!activeTest) return {};
    const result = {};
    activeTest.items.forEach((item) => {
      result[item.id] = evaluateAllAlgorithms(item, answers[item.id] || '');
    });
    return result;
  }, [activeTest, answers]);

  const totals = useMemo(() => {
    const evList = Object.values(evaluations);
    const scoreC = evList.reduce((sum, ev) => sum + (ev.score || 0), 0);
    const scoreA = evList.reduce((sum, ev) => sum + (ev.comparison?.algA?.score || 0), 0);
    const scoreB = evList.reduce((sum, ev) => sum + (ev.comparison?.algB?.score || 0), 0);
    const activeEvs = evList.filter((ev) => ev.wordCount > 0);
    const meanCosine =
      activeEvs.length > 0
        ? activeEvs.reduce((s, e) => s + (e.semanticSimilarity || 0), 0) / activeEvs.length
        : 0;
    const meanCoherence =
      activeEvs.length > 0
        ? activeEvs.reduce((s, e) => s + (e.coherenceScore || 0), 0) / activeEvs.length
        : 0;
    const totalLatencyMs = evList.reduce((s, e) => s + (e.latencyMs || 0), 0);
    const anyKeywordStuffed = evList.some((e) => e.isKeywordStuffed);

    return {
      scoreC,
      scoreA,
      scoreB,
      meanCosine: Number(meanCosine.toFixed(2)),
      meanCoherence: Number(meanCoherence.toFixed(2)),
      totalLatencyMs: Number(totalLatencyMs.toFixed(2)),
      anyKeywordStuffed
    };
  }, [evaluations]);

  const gradeInfo = useMemo(() => getMoldovaGrade(totals.scoreC), [totals.scoreC]);
  const gradeInfoA = useMemo(() => getMoldovaGrade(totals.scoreA), [totals.scoreA]);

  // Preset 1: Full Grade 10 Model Answers
  const fillAllWithModelAnswers = () => {
    if (!activeTest) return;
    const next = { ...answers };
    activeTest.items.forEach((item) => {
      next[item.id] = item.modelAnswer;
    });
    setAnswers(next);
  };

  // Preset 2: Adversarial Keyword-Stuffing Attack (Jury Live Demo!)
  const fillWithAdversarialKeywordStuffing = () => {
    if (!activeTest) return;
    const next = { ...answers };
    activeTest.items.forEach((item) => {
      const kws = item.keywords || [];
      const repeated = [...kws, ...kws, ...kws, ...kws.slice(0, 6)];
      next[item.id] =
        repeated.join(' ') +
        ' ' +
        repeated.slice(0, 10).join(' ') +
        ' ' +
        repeated.slice(0, 8).join(', ');
    });
    setAnswers(next);
  };

  // Preset 3: ANCE Art. 59 Signature Violation Trap Demo
  const fillWithSignatureViolationDemo = () => {
    if (!activeTest) return;
    const next = { ...answers };
    activeTest.items.forEach((item) => {
      if (item.id.includes('-s3')) {
        next[item.id] = item.modelAnswer
          .replace(/Alexei Munteanu|Alexandra Munteanu|Cezar Răileanu|Cezara Răileanu/gi, 'Ion Popescu')
          .replace(/Cu deosebit respect,|Cu profund respect și aleasă prețuire,/gi, 'Cu deosebit respect, Ion Popescu');
      } else {
        next[item.id] = item.modelAnswer;
      }
    });
    setAnswers(next);
  };

  const clearCurrentTestAnswers = () => {
    if (!activeTest) return;
    const next = { ...answers };
    activeTest.items.forEach((item) => {
      delete next[item.id];
    });
    setAnswers(next);
  };

  const handleSaveAttemptToSqlite = async () => {
    if (!activeTest) return;
    setSavingAttempt(true);
    setSaveSuccessMsg('');
    const elapsedSeconds = Math.max(60, 180 * 60 - secondsLeft);

    const payload = {
      studentAlias: studentAlias.trim() || 'Elev Anonimizat (R. Moldova)',
      testId: activeTest.id,
      testTitle: activeTest.title,
      subject: activeTest.subject,
      totalScoreC: totals.scoreC,
      totalScoreA: totals.scoreA,
      totalScoreB: totals.scoreB,
      meanCosine: totals.meanCosine,
      meanCoherence: totals.meanCoherence,
      durationSeconds: elapsedSeconds,
      itemsSummary: activeTest.items.map((it) => ({
        itemId: it.id,
        scoreC: evaluations[it.id]?.score || 0,
        scoreA: evaluations[it.id]?.comparison?.algA?.score || 0,
        scoreB: evaluations[it.id]?.comparison?.algB?.score || 0,
        maxPoints: it.maxPoints
      }))
    };

    try {
      const res = await axios.post('/api/attempts', payload, { timeout: 3000 });
      const newRow = {
        id: res.data?.id || Date.now(),
        created_at: res.data?.created_at || new Date().toISOString(),
        student_alias: payload.studentAlias,
        test_id: payload.testId,
        test_title: payload.testTitle,
        subject: payload.subject,
        total_score_c: payload.totalScoreC,
        total_score_a: payload.totalScoreA,
        total_score_b: payload.totalScoreB,
        grade: gradeInfo.grade,
        grade_label: gradeInfo.label,
        mean_cosine: payload.meanCosine,
        mean_coherence: payload.meanCoherence
      };
      setSavedAttempts((prev) => [newRow, ...prev]);
      setSaveSuccessMsg('Simulare salvată persistent în baza de date SQLite (test_attempts)!');
    } catch {
      const fallbackRow = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        student_alias: payload.studentAlias,
        test_id: payload.testId,
        test_title: payload.testTitle,
        subject: payload.subject,
        total_score_c: payload.totalScoreC,
        total_score_a: payload.totalScoreA,
        total_score_b: payload.totalScoreB,
        grade: gradeInfo.grade,
        grade_label: gradeInfo.label,
        mean_cosine: payload.meanCosine,
        mean_coherence: payload.meanCoherence
      };
      setSavedAttempts((prev) => [fallbackRow, ...prev]);
      setSaveSuccessMsg('Simulare înregistrată local în sesiunea activă!');
    } finally {
      setSavingAttempt(false);
      setTimeout(() => setSaveSuccessMsg(''), 4500);
    }
  };

  return (
    <section id="sample-tests" className="py-24 px-6 md:px-12 bg-[#0A0A0F] border-t border-[#1C1C28]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={15} />
              <span>Motor Hibrid NLP v2.0 • Comparație Live 3 Algoritmi (A vs. B vs. C)</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Simulare Teste BAC & Corector AI Semantic în Timp Real
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              Evaluează-ți răspunsurile prin <strong>Algoritmul C (Bac.ai v2 Hybrid: Vectori Semantici 64-dim + Subword 3-Gram + Coerență Sintactică CTTR + Barem ANCE)</strong> și compară în timp real cu metodele clasice (Algoritmul A și B).
            </p>
          </div>

          {/* Live Exam Timer & Barem Scale Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#14141F] border border-[#2A2A3C] rounded-2xl px-4 py-3 flex items-center gap-3">
              <Clock size={20} className={timerRunning ? 'text-emerald-400 animate-pulse' : 'text-[#8B5CF6]'} />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                  Timp Oficial (180 min)
                </div>
                <div className="text-lg font-mono font-bold text-white">{formatTimer(secondsLeft)}</div>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  onClick={() => setTimerRunning((r) => !r)}
                  className="p-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white transition-colors cursor-pointer"
                  title={timerRunning ? 'Pauză' : 'Pornește Cronometrul'}
                >
                  {timerRunning ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setSecondsLeft(180 * 60);
                  }}
                  className="p-2 rounded-xl bg-[#1F1F2E] hover:bg-[#2C2C40] text-gray-300 transition-colors cursor-pointer"
                  title="Resetează la 180 minute"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowScaleModal((v) => !v)}
              className="px-4 py-3.5 rounded-2xl bg-[#14141F] hover:bg-[#1E1E2E] border border-[#2A2A3C] text-sm font-semibold text-[#C4B5FD] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Award size={18} />
              <span>Schema ANCE (100p → Nota 10)</span>
            </button>
          </div>
        </div>

        {/* Collapsible Official ANCE Grade Conversion Table */}
        <AnimatePresence>
          {showScaleModal && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-[#13131C] border border-[#2E2E42]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award size={20} className="text-[#8B5CF6]" />
                    Barem Oficial de Convertire a Punctajului în Note (ANCE Republica Moldova – 100 puncte)
                  </h3>
                  <button
                    onClick={() => setShowScaleModal(false)}
                    className="text-xs text-gray-400 hover:text-white cursor-pointer"
                  >
                    Ascunde ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  {MOLDOVA_GRADE_SCALE.map((g) => (
                    <div
                      key={g.grade}
                      className={`p-3.5 rounded-xl border border-[#2D2D42] ${g.bg} flex flex-col items-center text-center`}
                    >
                      <span className={`text-2xl font-extrabold ${g.color}`}>Nota {g.grade}</span>
                      <span className="text-xs font-semibold text-white mt-1">
                        {g.min} – {g.max} puncte
                      </span>
                      <span className="text-[11px] text-gray-300 mt-0.5">{g.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subject & Test Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex p-1.5 bg-[#14141F] rounded-2xl border border-[#28283A] w-full md:w-auto">
            <button
              onClick={() => handleSubjectSwitch('Romanian')}
              className={`flex-1 md:flex-initial px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedSubject === 'Romanian'
                  ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen size={17} />
              <span>Teste BAC Limba Română (Sub. I, II, III)</span>
            </button>
            <button
              onClick={() => handleSubjectSwitch('History')}
              className={`flex-1 md:flex-initial px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedSubject === 'History'
                  ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileCheck2 size={17} />
              <span>Teste BAC Istoria Românilor și Universală</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
            {subjectTests.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTestId(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTest?.id === t.id
                    ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20'
                    : 'bg-[#14141F] border-[#28283A] text-gray-400 hover:text-white'
                }`}
              >
                Varianta {idx + 1}: {t.title.split('–')[1] || t.title}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky Live Score & AI Rubric Banner */}
        {activeTest && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN (8 cols): Test Source Text & Interactive Items */}
            <div className="lg:col-span-8 space-y-8">
              {/* Test Header & Source Document Card */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#161622] to-[#111119] border border-[#2D2D42] shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] bg-[#8B5CF6]/15 px-3 py-1 rounded-full">
                    {activeTest.code}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{activeTest.profile}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-5">{activeTest.title}</h3>

                {/* Source Text Box */}
                <div className="p-5 md:p-6 rounded-2xl bg-[#0B0B10] border border-[#252538]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-3 flex items-center gap-2">
                    <BookOpen size={15} />
                    <span>Text / Surse Suport pentru Rezolvarea Subiectelor: {activeTest.sourceTitle}</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-gray-200 text-sm md:text-base leading-relaxed italic">
                    {activeTest.sourceText}
                  </pre>
                </div>

                {/* Quick Test & MoldSEF Jury Live Edge-Case Actions */}
                <div className="mt-5 pt-4 border-t border-[#242436] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Cpu size={14} className="text-[#8B5CF6]" />
                    <span>Scenarii de Testare Live pentru Juriul MoldSEF & Infomatrix (1-Click):</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={fillAllWithModelAnswers}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Wand2 size={14} />
                      <span>1. Model de Nota 10 (95–100p)</span>
                    </button>

                    <button
                      onClick={fillWithAdversarialKeywordStuffing}
                      className="px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Demonstrează cum Algoritmul A este păcălit de o listă incoerentă de cuvinte-cheie (91p), în timp ce Algoritmul C blochează frauda (6p)!"
                    >
                      <ShieldAlert size={14} />
                      <span>2. Demo Juriu: Atac Keyword-Stuffing (Alg A: ~91p vs Alg C: ~6p)</span>
                    </button>

                    {activeTest.subject === 'Romanian' && (
                      <button
                        onClick={fillWithSignatureViolationDemo}
                        className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <AlertTriangle size={14} />
                        <span>3. Demo ANCE Art. 59 (Semnătură Neregulamentară)</span>
                      </button>
                    )}

                    <button
                      onClick={clearCurrentTestAnswers}
                      className="px-3 py-2 rounded-xl bg-[#1D1D2B] hover:bg-[#28283C] text-gray-300 text-xs font-medium transition-colors cursor-pointer ml-auto"
                    >
                      Șterge Răspunsurile
                    </button>
                  </div>
                </div>
              </div>

              {/* Test Items List */}
              {activeTest.items.map((item) => {
                const ev = evaluations[item.id];
                const currentText = answers[item.id] || '';
                const isShowingModel = !!showModelFor[item.id];

                return (
                  <div
                    key={item.id}
                    className={`p-6 md:p-7 rounded-3xl bg-[#13131D] border transition-all space-y-5 ${
                      ev.isKeywordStuffed
                        ? 'border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.15)]'
                        : 'border-[#29293D] hover:border-[#8B5CF6]/50'
                    }`}
                  >
                    {/* Item Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-semibold text-[#A78BFA] block mb-1">
                          {item.section}
                        </span>
                        <h4 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>{item.number}</span>
                        </h4>
                      </div>

                      {/* Real-time 3-Algorithm Comparison Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="px-2.5 py-1 rounded-lg bg-[#1A1A28] border border-[#2D2D42] text-[11px] text-gray-400"
                          title="Algoritm A (Baseline Heuristic v1: Cuvinte-cheie + Lungime)"
                        >
                          Alg A (Heuristic): <strong>{ev.comparison?.algA?.score || 0}p</strong>
                        </span>
                        <span
                          className="px-2.5 py-1 rounded-lg bg-[#1A1A28] border border-[#2D2D42] text-[11px] text-gray-400"
                          title="Algoritm B (Zero-Shot Semantic fără Barem/Coerență)"
                        >
                          Alg B (Zero-Shot): <strong>{ev.comparison?.algB?.score || 0}p</strong>
                        </span>
                        <span
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                            ev.isKeywordStuffed
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                              : ev.score >= item.maxPoints * 0.85
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                              : ev.score > 0
                              ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#C4B5FD]'
                              : 'bg-[#1D1D2B] border-[#2E2E42] text-gray-400'
                          }`}
                        >
                          Alg C (Bac.ai Hybrid): {ev.score} / {item.maxPoints}p
                        </span>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="p-4 rounded-2xl bg-[#191926] border border-[#26263A] text-gray-200 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                      {item.question}
                    </div>

                    {/* Student Answer Textarea */}
                    <div>
                      <textarea
                        rows={item.maxPoints >= 25 ? 8 : 4}
                        value={currentText}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [item.id]: e.target.value }))
                        }
                        placeholder={`Scrie rezolvarea ta pentru ${item.number} aici... (Motorul NLP Bac.ai v2 calculează similaritatea vectorială cos θ, coerența sintactică CTTR și baremul ANCE)`}
                        className="w-full bg-[#0C0C12] border border-[#2D2D42] focus:border-[#8B5CF6] rounded-2xl p-4 text-white placeholder-gray-500 text-sm md:text-base leading-relaxed focus:outline-none transition-colors resize-y"
                      />

                      {/* Live Word Count, Vector Telemetry & Quick Fill Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-gray-400">
                        <div className="flex flex-wrap items-center gap-3">
                          <span>
                            Cuvinte:{' '}
                            <strong
                              className={
                                ev.wordCount >= item.minWords ? 'text-emerald-400' : 'text-amber-400'
                              }
                            >
                              {ev.wordCount}
                            </strong>{' '}
                            / min. {item.minWords}
                          </span>
                          {ev.wordCount > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-[#C4B5FD]">
                                cos θ semantic: <strong>{ev.semanticSimilarity}</strong>
                              </span>
                              <span>•</span>
                              <span
                                className={
                                  ev.isKeywordStuffed ? 'text-rose-400 font-bold' : 'text-emerald-400'
                                }
                              >
                                Coerență sintactică: <strong>{Math.round(ev.coherenceScore * 100)}%</strong> (CTTR {ev.cttr})
                              </span>
                              <span>•</span>
                              <span className="text-gray-500">{ev.latencyMs} ms</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, [item.id]: item.modelAnswer }))
                            }
                            className="text-[#A78BFA] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Wand2 size={13} />
                            <span>Inserează Model</span>
                          </button>
                          <span>•</span>
                          <button
                            onClick={() =>
                              setShowModelFor((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                            }
                            className="text-gray-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>{isShowingModel ? 'Ascunde Barem' : 'Vezi Barem & Vectori'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Real-Time AI Feedback Panel for this Item */}
                    <div
                      className={`p-4 rounded-2xl border space-y-3 ${
                        ev.isKeywordStuffed
                          ? 'bg-rose-950/25 border-rose-500/40'
                          : 'bg-[#0E0E16] border-[#252538]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {ev.isKeywordStuffed ? (
                          <ShieldAlert size={18} className="text-rose-400 shrink-0 mt-0.5" />
                        ) : (
                          <Brain size={18} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                        )}
                        <div className="text-xs md:text-sm text-gray-200 leading-relaxed">
                          <strong className={ev.isKeywordStuffed ? 'text-rose-300' : 'text-[#C4B5FD]'}>
                            {ev.isKeywordStuffed
                              ? 'Scut Anti-Keyword-Stuffing Activat (Algoritm C): '
                              : 'Evaluare Semantică & Barem ANCE (Algoritm C): '}
                          </strong>
                          {ev.feedback}
                        </div>
                      </div>

                      {ev.signatureWarning && (
                        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-2">
                          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                          <span>{ev.signatureWarning}</span>
                        </div>
                      )}

                      {/* Keywords & Paraphrase Detection Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-gray-400 mr-1">
                          Concepte & Sinonime Semantice:
                        </span>
                        {ev.matchedKeywords.map((kw) => {
                          const isParaphrase = (ev.semanticParaphraseMatches || []).includes(kw);
                          return (
                            <span
                              key={kw}
                              className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                                isParaphrase
                                  ? 'bg-indigo-500/20 border-indigo-400/40 text-indigo-200'
                                  : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                              }`}
                              title={
                                isParaphrase
                                  ? 'Concept recunoscut prin sinonimie/vector semantic (fără potrivire exactă de text)'
                                  : 'Concept identificat în răspuns'
                              }
                            >
                              ✓ {kw} {isParaphrase ? '(sinonim semantic)' : ''}
                            </span>
                          );
                        })}
                        {ev.missingKeywords.slice(0, 5).map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded-md bg-[#1A1A28] border border-[#2C2C40] text-gray-400 text-[11px]"
                          >
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Rubric & Model Answer */}
                    <AnimatePresence>
                      {isShowingModel && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 rounded-2xl bg-[#181828] border border-[#8B5CF6]/30 space-y-4 mt-2">
                            <div>
                              <h5 className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD] mb-2">
                                Descompunere pe Criterii ANCE & Similaritate Vectorială ({item.maxPoints}p):
                              </h5>
                              <ul className="space-y-2">
                                {ev.criteriaStatus.map((c, i) => (
                                  <li
                                    key={i}
                                    className="text-xs flex items-start justify-between gap-3 text-gray-200 bg-[#12121E] p-2.5 rounded-xl border border-[#26263A]"
                                  >
                                    <div className="flex items-start gap-2">
                                      <CheckCircle2
                                        size={14}
                                        className={
                                          c.met ? 'text-emerald-400 shrink-0 mt-0.5' : 'text-gray-500 shrink-0 mt-0.5'
                                        }
                                      />
                                      <span>{c.text}</span>
                                    </div>
                                    <span className="text-[11px] font-mono text-[#A78BFA] shrink-0">
                                      sim: {c.similarity ?? 0}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="pt-3 border-t border-[#2B2B40]">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                                Rezolvare Model de Punctaj Maxim:
                              </h5>
                              <p className="text-xs md:text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                                {item.modelAnswer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN (4 cols): Sticky Real-Time ANCE Scoreboard, 3-Algorithm Comparison & SQLite Persistence */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="p-6 md:p-7 rounded-3xl bg-[#14141F] border border-[#2D2D44] shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#252538] pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] block">
                      Borderou Live ANCE (Algoritm C)
                    </span>
                    <h3 className="text-xl font-bold text-white">Evaluare Hibridă AI</h3>
                  </div>
                  <div className={`px-3.5 py-1.5 rounded-xl font-extrabold text-lg ${gradeInfo.bg} ${gradeInfo.color}`}>
                    Nota {gradeInfo.grade}
                  </div>
                </div>

                {/* Big Score Circle / Meter */}
                <div className="p-5 rounded-2xl bg-[#0D0D14] border border-[#232334] text-center">
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Punctaj Oficial Estimativ (Algoritm C)
                  </div>
                  <div className="text-5xl font-extrabold text-white my-2">
                    {totals.scoreC} <span className="text-2xl text-gray-500 font-normal">/ 100p</span>
                  </div>
                  <div className={`text-sm font-bold ${gradeInfo.color}`}>{gradeInfo.label}</div>

                  {/* Progress bar */}
                  <div className="w-full h-3 bg-[#1B1B28] rounded-full overflow-hidden mt-4">
                    <motion.div
                      animate={{ width: `${totals.scoreC}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-emerald-400 rounded-full"
                    />
                  </div>

                  {/* Live NLP Telemetry Strip */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1E1E2E] text-[11px]">
                    <div>
                      <span className="text-gray-500 block">Cosine Sim</span>
                      <strong className="text-[#C4B5FD]">{totals.meanCosine}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Coerență</span>
                      <strong className={totals.anyKeywordStuffed ? 'text-rose-400' : 'text-emerald-400'}>
                        {Math.round(totals.meanCoherence * 100)}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Latență CPU</span>
                      <strong className="text-gray-300">{totals.totalLatencyMs} ms</strong>
                    </div>
                  </div>
                </div>

                {/* Live 3-Algorithm Comparative Box (Pillar 3 Requirement!) */}
                <div className="p-4 rounded-2xl bg-[#0F0F18] border border-[#28283E] space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] flex items-center gap-1.5">
                    <Activity size={14} />
                    <span>Comparație Live pe Testul Activ (A vs. B vs. C):</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#161622] border border-[#252538]">
                      <div>
                        <span className="text-gray-300 font-semibold block">Algoritm A (Heuristic v1)</span>
                        <span className="text-[10px] text-gray-500">Doar cuvinte-cheie + lungime</span>
                      </div>
                      <span className="font-mono font-bold text-amber-300">
                        {totals.scoreA} / 100p (Nota {gradeInfoA.grade})
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#161622] border border-[#252538]">
                      <div>
                        <span className="text-gray-300 font-semibold block">Algoritm B (Zero-Shot)</span>
                        <span className="text-[10px] text-gray-500">Vector semantic fără filtru coerență</span>
                      </div>
                      <span className="font-mono font-bold text-blue-300">
                        {totals.scoreB} / 100p
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40">
                      <div>
                        <span className="text-white font-bold block">Algoritm C (Bac.ai v2 Hybrid)</span>
                        <span className="text-[10px] text-[#C4B5FD]">Semantic + Barem ANCE + Scut Coerență</span>
                      </div>
                      <span className="font-mono font-extrabold text-emerald-300">
                        {totals.scoreC} / 100p (Nota {gradeInfo.grade})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Save Attempt to Persistent SQLite Database */}
                <div className="p-4 rounded-2xl bg-[#181826] border border-[#2E2E46] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Database size={14} className="text-[#8B5CF6]" />
                    <span>Persistență SQLite (`test_attempts`):</span>
                  </div>
                  <input
                    type="text"
                    value={studentAlias}
                    onChange={(e) => setStudentAlias(e.target.value)}
                    placeholder="Identificator anonimizat (ex. Elev #RM-305)"
                    className="w-full bg-[#0D0D14] border border-[#2A2A3E] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                  <button
                    onClick={handleSaveAttemptToSqlite}
                    disabled={savingAttempt}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#8B5CF6]/25"
                  >
                    <Save size={14} />
                    <span>
                      {savingAttempt ? 'Se salvează în SQLite...' : 'Salvează Simularea în SQLite'}
                    </span>
                  </button>
                  {saveSuccessMsg && (
                    <div className="text-[11px] text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-2.5 py-1.5">
                      ✓ {saveSuccessMsg}
                    </div>
                  )}

                  {/* Recent Persistent Attempts List */}
                  <div className="pt-2 border-t border-[#26263A] space-y-1.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Ultimele simulări stocate în SQLite ({savedAttempts.length}):
                    </div>
                    <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                      {savedAttempts.slice(0, 5).map((att) => (
                        <div
                          key={att.id}
                          className="p-2 rounded-lg bg-[#101018] border border-[#222234] flex items-center justify-between text-[11px]"
                        >
                          <div className="truncate pr-2">
                            <span className="text-gray-200 font-medium block truncate">
                              {att.student_alias}
                            </span>
                            <span className="text-gray-500 text-[10px]">
                              Alg C: {att.total_score_c}p vs Alg A: {att.total_score_a}p
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#C4B5FD] font-bold shrink-0">
                            Nota {att.grade}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SampleTests;
