import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronRight
} from 'lucide-react';
import { SAMPLE_BAC_TESTS, MOLDOVA_GRADE_SCALE, getMoldovaGrade } from '../data/sampleTestsData';

// Real-Time ANCE Rubric Evaluator
const evaluateAnswerRealTime = (item, rawText) => {
  const text = (rawText || '').trim();
  if (!text) {
    return {
      score: 0,
      maxPoints: item.maxPoints,
      wordCount: 0,
      matchedKeywords: [],
      missingKeywords: item.keywords || [],
      hasStructure: false,
      feedback: 'Începe să scrii răspunsul în caseta de mai jos. AI-ul îți va calcula punctajul și feedback-ul în timp real conform baremului ANCE Republica Moldova!',
      status: 'empty',
      criteriaStatus: (item.rubricCriteria || []).map((c) => ({ text: c, met: false }))
    };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = text.toLowerCase();

  // Check keywords
  const matchedKeywords = (item.keywords || []).filter((kw) =>
    lower.includes(kw.toLowerCase())
  );
  const missingKeywords = (item.keywords || []).filter(
    (kw) => !lower.includes(kw.toLowerCase())
  );

  // Check structure / connectors
  const connectors = [
    'în primul rând',
    'in primul rand',
    'în al doilea rând',
    'in al doilea rand',
    'în concluzie',
    'in concluzie',
    'pe de o parte',
    'pe de altă parte',
    'consider că',
    'consider ca',
    'sursa a',
    'sursa b',
    'stimate',
    'cu deosebit respect',
    'cu profund respect'
  ];
  const matchedConnectors = connectors.filter((c) => lower.includes(c));
  const hasParagraphs = text.split('\n').filter((l) => l.trim().length > 0).length >= 2;
  const hasStructure = matchedConnectors.length >= 1 || hasParagraphs;

  // Calculate score components
  const lengthRatio = Math.min(1, wordCount / Math.max(15, item.minWords || 30));
  const keywordRatio =
    item.keywords && item.keywords.length > 0
      ? Math.min(1, matchedKeywords.length / Math.max(2, Math.ceil(item.keywords.length * 0.55)))
      : 0.8;
  const structureBonus = hasStructure ? 1 : 0.65;

  const rawRatio = lengthRatio * 0.45 + keywordRatio * 0.4 + structureBonus * 0.15;
  const score = Math.min(item.maxPoints, Math.max(1, Math.round(item.maxPoints * rawRatio)));

  // Evaluate individual rubric criteria
  const criteriaStatus = (item.rubricCriteria || []).map((crit, idx) => {
    if (idx === 0) return { text: crit, met: wordCount >= Math.round((item.minWords || 30) * 0.4) && matchedKeywords.length >= 1 };
    if (idx === 1) return { text: crit, met: matchedKeywords.length >= 2 && wordCount >= Math.round((item.minWords || 30) * 0.7) };
    return { text: crit, met: hasStructure && wordCount >= (item.minWords || 30) };
  });

  // Check ANCE Moldova Subiectul III signature rule if applicable
  let signatureWarning = null;
  if (item.id.includes('-s3') && item.section.includes('Text funcțional')) {
    const usesRequiredName =
      lower.includes('munteanu') || lower.includes('răileanu') || lower.includes('raileanu');
    if (wordCount > 25 && !usesRequiredName) {
      signatureWarning =
        'ATENȚIE Barem ANCE Moldova: Nu uita să semnezi textul funcțional EXCLUSIV cu numele indicat în condiție (ex. Alexei/Alexandra Munteanu sau Cezar/Cezara Răileanu), pentru a evita anularea lucrării pentru semn distinctiv!';
    }
  }

  // Generate dynamic real-time AI feedback
  let feedback = '';
  if (score >= item.maxPoints * 0.9) {
    feedback = `Excelent (${score}/${item.maxPoints}p)! Răspunsul tău respectă rigorile baremului ANCE Republica Moldova, integrează conceptele-cheie și are o structură coerentă.`;
  } else if (score >= item.maxPoints * 0.6) {
    feedback = `Răspuns bun (${score}/${item.maxPoints}p)! Pentru punctaj maxim, dezvoltă ideile până la cel puțin ${item.minWords} cuvinte și integrează termeni precum: ${missingKeywords.slice(0, 3).join(', ')}.`;
  } else {
    feedback = `În curs de redactare (${score}/${item.maxPoints}p). Mai adaugă aproximativ ${Math.max(0, (item.minWords || 30) - wordCount)} cuvinte, folosește conectori de argumentare și valorifică reperele: ${missingKeywords.slice(0, 4).join(', ')}.`;
  }

  return {
    score,
    maxPoints: item.maxPoints,
    wordCount,
    matchedKeywords,
    missingKeywords,
    hasStructure,
    signatureWarning,
    feedback,
    status: score >= item.maxPoints * 0.85 ? 'excellent' : score >= item.maxPoints * 0.5 ? 'good' : 'developing',
    criteriaStatus
  };
};

const SampleTests = () => {
  const [selectedSubject, setSelectedSubject] = useState('Romanian');
  const [activeTestId, setActiveTestId] = useState('ro-bac-1');
  const [answers, setAnswers] = useState({});
  const [showModelFor, setShowModelFor] = useState({});
  const [showScaleModal, setShowScaleModal] = useState(false);

  // 180-minute (10800 seconds) official ANCE BAC countdown timer
  const [secondsLeft, setSecondsLeft] = useState(180 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

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

  // Real-time evaluation for all items in the active test
  const evaluations = useMemo(() => {
    if (!activeTest) return {};
    const result = {};
    activeTest.items.forEach((item) => {
      result[item.id] = evaluateAnswerRealTime(item, answers[item.id] || '');
    });
    return result;
  }, [activeTest, answers]);

  const totalScore = useMemo(() => {
    return Object.values(evaluations).reduce((sum, ev) => sum + (ev.score || 0), 0);
  }, [evaluations]);

  const gradeInfo = useMemo(() => getMoldovaGrade(totalScore), [totalScore]);

  const fillAllWithModelAnswers = () => {
    if (!activeTest) return;
    const next = { ...answers };
    activeTest.items.forEach((item) => {
      next[item.id] = item.modelAnswer;
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

  return (
    <section id="sample-tests" className="py-24 px-6 md:px-12 bg-[#0A0A0F] border-t border-[#1C1C28]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={15} />
              <span>Model Oficial ANCE • Republica Moldova (100 Puncte)</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Simulare Teste BAC & Corector AI în Timp Real
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              Rezolvă teste complete după structura oficială din Republica Moldova (Subiectul I, II și III). Pe măsură ce scrii, AI-ul îți verifică instantaneu răspunsul după baremul ANCE și îți calculează nota de la 1 la 10!
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
              <span>Schema de Notare ANCE (100p → Nota 10)</span>
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

                {/* Quick Test Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-[#242436]">
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#8B5CF6]" />
                    Scrie răspunsul la fiecare item sau testează corectorul cu un model complet de nota 10:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fillAllWithModelAnswers}
                      className="px-3.5 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6] text-[#C4B5FD] hover:text-white border border-[#8B5CF6]/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Wand2 size={14} />
                      <span>Completează tot testul cu Model de Nota 10</span>
                    </button>
                    <button
                      onClick={clearCurrentTestAnswers}
                      className="px-3 py-2 rounded-xl bg-[#1D1D2B] hover:bg-[#28283C] text-gray-300 text-xs font-medium transition-colors cursor-pointer"
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
                    className="p-6 md:p-7 rounded-3xl bg-[#13131D] border border-[#29293D] hover:border-[#8B5CF6]/50 transition-all space-y-5"
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

                      {/* Real-time item score pill */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                            ev.score >= item.maxPoints * 0.85
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                              : ev.score > 0
                              ? 'bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#C4B5FD]'
                              : 'bg-[#1D1D2B] border-[#2E2E42] text-gray-400'
                          }`}
                        >
                          Punctaj AI Live: {ev.score} / {item.maxPoints} puncte
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
                        placeholder={`Scrie rezolvarea ta pentru ${item.number} aici... (AI-ul analizează în timp real cuvintele-cheie, structura și baremul ANCE)`}
                        className="w-full bg-[#0C0C12] border border-[#2D2D42] focus:border-[#8B5CF6] rounded-2xl p-4 text-white placeholder-gray-500 text-sm md:text-base leading-relaxed focus:outline-none transition-colors resize-y"
                      />

                      {/* Live Word Count & Quick Fill Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span>
                            Cuvinte scrise:{' '}
                            <strong
                              className={
                                ev.wordCount >= item.minWords ? 'text-emerald-400' : 'text-amber-400'
                              }
                            >
                              {ev.wordCount}
                            </strong>{' '}
                            / recomandat min. {item.minWords} cuvinte
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, [item.id]: item.modelAnswer }))
                            }
                            className="text-[#A78BFA] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Wand2 size={13} />
                            <span>Inserează Răspunsul Model</span>
                          </button>
                          <span>•</span>
                          <button
                            onClick={() =>
                              setShowModelFor((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                            }
                            className="text-gray-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>{isShowingModel ? 'Ascunde Barem & Model' : 'Vezi Barem & Model'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Real-Time AI Feedback Panel for this Item */}
                    <div className="p-4 rounded-2xl bg-[#0E0E16] border border-[#252538] space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Brain size={18} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                        <div className="text-xs md:text-sm text-gray-200 leading-relaxed">
                          <strong className="text-[#C4B5FD]">Feedback AI în timp real: </strong>
                          {ev.feedback}
                        </div>
                      </div>

                      {ev.signatureWarning && (
                        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs flex items-start gap-2">
                          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                          <span>{ev.signatureWarning}</span>
                        </div>
                      )}

                      {/* Keywords Detection Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-gray-400 mr-1">Repere & Concepte detectate:</span>
                        {ev.matchedKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium"
                          >
                            ✓ {kw}
                          </span>
                        ))}
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
                                Barem Oficial de Corectare ANCE ({item.maxPoints} puncte):
                              </h5>
                              <ul className="space-y-1.5">
                                {ev.criteriaStatus.map((c, i) => (
                                  <li
                                    key={i}
                                    className="text-xs flex items-start gap-2 text-gray-200"
                                  >
                                    <CheckCircle2
                                      size={14}
                                      className={
                                        c.met ? 'text-emerald-400 shrink-0 mt-0.5' : 'text-gray-500 shrink-0 mt-0.5'
                                      }
                                    />
                                    <span>{c.text}</span>
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

            {/* RIGHT COLUMN (4 cols): Sticky Real-Time ANCE Scoreboard & Rubric Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="p-6 md:p-7 rounded-3xl bg-[#14141F] border border-[#2D2D44] shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#252538] pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] block">
                      Borderou Live ANCE
                    </span>
                    <h3 className="text-xl font-bold text-white">Evaluare în Timp Real</h3>
                  </div>
                  <div className={`px-3.5 py-1.5 rounded-xl font-extrabold text-lg ${gradeInfo.bg} ${gradeInfo.color}`}>
                    Nota {gradeInfo.grade}
                  </div>
                </div>

                {/* Big Score Circle / Meter */}
                <div className="p-5 rounded-2xl bg-[#0D0D14] border border-[#232334] text-center">
                  <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Punctaj Total Acumulat
                  </div>
                  <div className="text-5xl font-extrabold text-white my-2">
                    {totalScore} <span className="text-2xl text-gray-500 font-normal">/ 100p</span>
                  </div>
                  <div className={`text-sm font-bold ${gradeInfo.color}`}>{gradeInfo.label}</div>

                  {/* Progress bar */}
                  <div className="w-full h-3 bg-[#1B1B28] rounded-full overflow-hidden mt-4">
                    <motion.div
                      animate={{ width: `${totalScore}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Item Breakdown */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Detaliere pe Subiecte și Itemi:
                  </div>
                  {activeTest.items.map((item) => {
                    const ev = evaluations[item.id];
                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-[#191926] border border-[#26263A] flex items-center justify-between text-xs"
                      >
                        <div className="pr-2">
                          <div className="font-bold text-white">{item.number}</div>
                          <div className="text-gray-400 truncate max-w-[180px]">
                            {item.criteriaStatus ? '' : ''}
                            {ev.wordCount} cuvinte • {ev.matchedKeywords.length} concepte
                          </div>
                        </div>
                        <span
                          className={`font-bold px-2.5 py-1 rounded-lg ${
                            ev.score >= item.maxPoints * 0.85
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : ev.score > 0
                              ? 'bg-[#8B5CF6]/20 text-[#C4B5FD]'
                              : 'bg-[#232334] text-gray-400'
                          }`}
                        >
                          {ev.score} / {item.maxPoints}p
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Live Rubric Checklist */}
                <div className="p-4 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/25 space-y-2">
                  <div className="text-xs font-bold text-[#C4B5FD] flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>Sfaturi ANCE Republica Moldova:</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    • Pentru <strong>Nota 10</strong> ai nevoie de <strong>90–100 puncte</strong>.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    • La <strong>Subiectul III (Română)</strong> folosește exclusiv numele fictiv dat în condiția testului (orice alt nume se consideră semn distinctiv!).
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    • La <strong>Istorie</strong>, coroborează întotdeauna informațiile din Sursele A, B, C cu faptele istorice învățate la clasă.
                  </p>
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
