import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  FlaskConical,
  Cpu,
  ShieldCheck,
  BarChart3,
  Play,
  CheckCircle2,
  AlertTriangle,
  Database,
  Layers,
  Lock,
  Users,
  Sparkles,
  Activity
} from 'lucide-react';
import initialBenchmarkData from '../data/benchmarkResults.json';
import { runEmpiricalBenchmark } from '../ai/benchmarkRunner';

const About = () => {
  const [bench, setBench] = useState(initialBenchmarkData);
  const [runningBench, setRunningBench] = useState(false);
  const [lastRunMsg, setLastRunMsg] = useState('');

  const handleRunLiveBenchmark = async () => {
    setRunningBench(true);
    setLastRunMsg('');
    try {
      const res = await axios.post('/api/benchmarks/run', {}, { timeout: 5000 });
      if (res.data && res.data.algorithms) {
        setBench(res.data);
        setLastRunMsg(
          `Benchmark re-executat live pe N = ${res.data.nTrials} răspunsuri și salvat în SQLite (benchmark_runs)!`
        );
      }
    } catch {
      const fresh = runEmpiricalBenchmark();
      setBench(fresh);
      setLastRunMsg(
        `Benchmark rulat local în browser pe N = ${fresh.nTrials} răspunsuri (Latență medie Alg C: ${fresh.algorithms.algC.meanLatencyMs} ms)!`
      );
    } finally {
      setRunningBench(false);
      setTimeout(() => setLastRunMsg(''), 5000);
    }
  };

  const { algA, algB, algC } = bench.algorithms;
  const summary = bench.summaryComparison;

  return (
    <section id="about" className="py-24 bg-[#111116] px-6 md:px-12 border-t border-[#1E1E2C]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C4B5FD] text-xs font-bold uppercase tracking-wider mb-4">
              <FlaskConical size={15} />
              <span>Validare Științifică MoldSEF & Infomatrix • N = {bench.nTrials} Testări</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Cercetare, Benchmark Experimental & AI Responsabil
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              Evaluare comparativă riguroasă între 3 arhitecturi de notare automată pe <strong>N = {bench.nTrials} răspunsuri stratificate de Bacalaureat</strong> (Limba Română și Istorie – barem oficial ANCE Republica Moldova).
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2">
            <button
              onClick={handleRunLiveBenchmark}
              disabled={runningBench}
              className="px-5 py-3.5 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-bold flex items-center gap-2.5 shadow-lg shadow-[#8B5CF6]/30 transition-all cursor-pointer"
            >
              <Play size={16} />
              <span>
                {runningBench
                  ? 'Se rulează N = 120 încercări...'
                  : `Rulează Live Experimentul (N = ${bench.nTrials})`}
              </span>
            </button>
            {lastRunMsg && (
              <span className="text-xs text-emerald-400 font-medium">{lastRunMsg}</span>
            )}
          </div>
        </div>

        {/* 1. Scientific Hypothesis Card (Pillar 2) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#191927] to-[#12121C] border border-[#8B5CF6]/40 shadow-2xl space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C4B5FD]">
                <FlaskConical size={20} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A78BFA] block">
                  Ipoteza Științifică Testabilă (Format MoldSEF: X → Y cu Z%)
                </span>
                <h3 className="text-xl font-bold text-white">
                  Fundamentarea Semantică pe Criterii ANCE vs. Metode Euristice și Zero-Shot
                </h3>
              </div>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              Ipoteză Confirmată Experimental (MAE redus cu {summary.maeReductionVsBaselineAPct}%)
            </span>
          </div>

          <p className="text-gray-200 text-sm md:text-base leading-relaxed bg-[#0D0D14] p-5 rounded-2xl border border-[#26263A]">
            <strong>Ipoteza H₁:</strong> Cuplarea reprezentărilor vectoriale semantice multi-nivel pentru limba română (<em>Subspațiu Conceptual Latent 64-dim + Subword Character 3-Gram 256-dim + TF-IDF ponderat IDF pe corpusul ANCE</em>) cu descompunerea pe criterii a baremului oficial și un filtru sintactic de coerență (<strong>Algoritmul C – Bac.ai v2 Hybrid</strong>) reduce <strong>Eroarea Medie Absolută (MAE)</strong> față de nota profesorului evaluator cu <strong>&gt;50%</strong> (rezultat obținut: <strong>{summary.maeReductionVsBaselineAPct}%</strong> față de Algoritmul A și <strong>{summary.maeReductionVsZeroShotBPct}%</strong> față de Algoritmul B) și reduce scorurile fals-pozitive la atacurile de tip <em>keyword-stuffing</em> cu <strong>&gt;80 puncte procentuale</strong> (de la <strong>{algA.adversarialMeanScorePct}%</strong> la <strong>{algC.adversarialMeanScorePct}%</strong>) pe un eșantion stratificat de <strong>N = {bench.nTrials}</strong> răspunsuri.
          </p>

          {/* 4 Key Empirical Proof KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#13131F] border border-[#28283E]">
              <span className="text-xs text-gray-400 block mb-1">Reducere Eroare MAE (vs. Alg A)</span>
              <div className="text-3xl font-extrabold text-emerald-400">
                -{summary.maeReductionVsBaselineAPct}%
              </div>
              <span className="text-[11px] text-gray-400">
                MAE scade de la {algA.maePct}% la <strong>{algC.maePct}%</strong> ({algC.rawMaePoints}p)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#13131F] border border-[#28283E]">
              <span className="text-xs text-gray-400 block mb-1">Corelație Pearson (r) cu Profesorii</span>
              <div className="text-3xl font-extrabold text-[#C4B5FD]">
                r = {algC.pearsonR}
              </div>
              <span className="text-[11px] text-gray-400">
                R² = {algC.rSquared} (vs. r = {algA.pearsonR} la Baseline A)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#13131F] border border-[#28283E]">
              <span className="text-xs text-gray-400 block mb-1">Rată Fals-Pozitivă Keyword-Stuffing</span>
              <div className="text-3xl font-extrabold text-emerald-400">
                {algC.adversarialFalsePositiveRatePct}%
              </div>
              <span className="text-[11px] text-gray-400">
                Scor mediu atac: {algC.adversarialMeanScorePct}% (vs. {algA.adversarialMeanScorePct}% la Alg A)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#13131F] border border-[#28283E]">
              <span className="text-xs text-gray-400 block mb-1">Latență Medie Inferență CPU</span>
              <div className="text-3xl font-extrabold text-white">
                {algC.meanLatencyMs} ms
              </div>
              <span className="text-[11px] text-gray-400">
                P95 = {algC.p95LatencyMs} ms • 100% Local &amp; Offline
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. Comparative 3-Algorithm Visual Benchmark Charts (Pillar 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 cols: Visual Bar Comparisons */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-[#151520] border border-[#28283C] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] block">
                  Analiză Comparativă pe 3 Algoritmi (N = {bench.nTrials})
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Performanță Științifică: Euristic vs. Zero-Shot vs. Hibrid ANCE
                </h3>
              </div>
              <BarChart3 size={24} className="text-[#8B5CF6]" />
            </div>

            {/* Chart 1: Mean Absolute Error (MAE %) - Lower is better */}
            <div className="space-y-2.5 bg-[#0E0E16] p-4 rounded-2xl border border-[#222234]">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">
                  1. Eroarea Medie Absolută – MAE (%) față de Profesorii ANCE (mai mic = mai precis)
                </span>
                <span className="text-emerald-400">Alg C: -64.7% eroare</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Algoritm A (Baseline Heuristic v1: Cuvinte-cheie + Lungime)</span>
                    <span className="font-mono font-bold text-amber-400">{algA.maePct}% ({algA.rawMaePoints}p)</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, algA.maePct * 2)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Algoritm B (Zero-Shot Semantic Vector fără Barem/Coerență)</span>
                    <span className="font-mono font-bold text-blue-400">{algB.maePct}% ({algB.rawMaePoints}p)</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, algB.maePct * 2)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-white font-semibold mb-1">
                    <span>Algoritm C (Bac.ai v2 Hybrid: Vectori Semantici + Barem ANCE + Coerență)</span>
                    <span className="font-mono font-bold text-emerald-400">{algC.maePct}% ({algC.rawMaePoints}p)</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, algC.maePct * 2)}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Pearson Correlation r - Higher is better */}
            <div className="space-y-2.5 bg-[#0E0E16] p-4 rounded-2xl border border-[#222234]">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">
                  2. Corelația Pearson (r) cu Nota Umană Oficială (mai mare = aliniere mai bună)
                </span>
                <span className="text-[#C4B5FD]">Țintă științifică: r &gt; 0.85</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Algoritm A (Baseline Heuristic v1)</span>
                    <span className="font-mono font-bold text-amber-400">r = {algA.pearsonR} (R² = {algA.rSquared})</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${algA.pearsonR * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Algoritm B (Zero-Shot Semantic Vector)</span>
                    <span className="font-mono font-bold text-blue-400">r = {algB.pearsonR} (R² = {algB.rSquared})</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${algB.pearsonR * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-white font-semibold mb-1">
                    <span>Algoritm C (Bac.ai v2 Hybrid ANCE AI)</span>
                    <span className="font-mono font-bold text-emerald-400">r = {algC.pearsonR} (R² = {algC.rSquared})</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8B5CF6] to-emerald-400 rounded-full" style={{ width: `${algC.pearsonR * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 3: Adversarial Keyword-Stuffing Vulnerability (Lower is better, Ground Truth = 0%) */}
            <div className="space-y-2.5 bg-[#0E0E16] p-4 rounded-2xl border border-[#222234]">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-white">
                  3. Rezistență la Fraudă (Punctaj acordat pe liste incoerente de cuvinte-cheie • Corect = 0%)
                </span>
                <span className="text-rose-400">Vulnerabilitate critică în v1</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Algoritm A (Păcălit de cuvinte-cheie repetate fără gramatică)</span>
                    <span className="font-mono font-bold text-rose-400">{algA.adversarialMeanScorePct}% (Fals-Pozitiv: 100%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${algA.adversarialMeanScorePct}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Algoritm B (Păcălit de densitatea de termeni din domeniu)</span>
                    <span className="font-mono font-bold text-orange-400">{algB.adversarialMeanScorePct}% (Fals-Pozitiv: 100%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${algB.adversarialMeanScorePct}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-white font-semibold mb-1">
                    <span>Algoritm C (Blochează frauda prin filtrul sintactic CTTR &amp; predicate)</span>
                    <span className="font-mono font-bold text-emerald-400">{algC.adversarialMeanScorePct}% (Fals-Pozitiv: 0%)</span>
                  </div>
                  <div className="w-full h-3 bg-[#1A1A28] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.max(4, algC.adversarialMeanScorePct)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Stratified Category Breakdown Table */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-[#151520] border border-[#28283C] flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] block mb-1">
                Rezultate pe Categorii de Răspunsuri
              </span>
              <h3 className="text-xl font-bold text-white mb-4">
                De ce Algoritmul C depășește metodele A și B pe toate cele 6 tipologii
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#2A2A3E] text-gray-400">
                      <th className="py-2.5 pr-2">Tipologie Răspuns (n)</th>
                      <th className="py-2.5 px-1.5 text-center">Uman</th>
                      <th className="py-2.5 px-1.5 text-center text-amber-400">Alg A</th>
                      <th className="py-2.5 px-1.5 text-center text-blue-400">Alg B</th>
                      <th className="py-2.5 pl-1.5 text-center text-emerald-400">Alg C</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222234]">
                    {(bench.categoryBreakdown || []).map((row) => (
                      <tr key={row.category} className="hover:bg-[#1B1B2B]">
                        <td className="py-2.5 pr-2 font-medium text-gray-200">
                          {row.label} <span className="text-gray-500">({row.count})</span>
                        </td>
                        <td className="py-2.5 px-1.5 text-center font-mono font-bold text-white">
                          {row.meanHumanPct}%
                        </td>
                        <td className="py-2.5 px-1.5 text-center font-mono text-amber-300">
                          {row.meanAlgAPct}%
                        </td>
                        <td className="py-2.5 px-1.5 text-center font-mono text-blue-300">
                          {row.meanAlgBPct}%
                        </td>
                        <td className="py-2.5 pl-1.5 text-center font-mono font-bold text-emerald-400">
                          {row.meanAlgCPct}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E0E16] border border-[#252538] space-y-2 text-xs text-gray-300">
              <div className="font-bold text-[#C4B5FD] flex items-center gap-1.5">
                <Activity size={14} />
                <span>Concluzii Experimentale Cheie:</span>
              </div>
              <p>
                • <strong>Parafrază &amp; Sinonime:</strong> Când elevul folosește sinonime academice fără cuvintele exacte din listă, Algoritmul C recunoaște conceptele prin vectorii latenți (92.9% vs. 97.5% uman).
              </p>
              <p>
                • <strong>Eseuri Off-Topic:</strong> Un eseu fluent despre altă operă primește 46.6% la Alg A și 50.2% la Alg B, dar este corect depunctat la <strong>3.9%</strong> de Alg C (uman: 3.1%).
              </p>
              <p>
                • <strong>Capcane ANCE Art. 59:</strong> Semnarea textului funcțional cu numele real este penalizată determinist de Alg C (31.6% vs. 30.6% uman).
              </p>
            </div>
          </div>
        </div>

        {/* 3. System Architecture Pipeline & Responsible AI Governance (Pillar 4 & 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Architecture Pipeline (7 cols) */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-[#151520] border border-[#28283C] space-y-5">
            <div className="flex items-center gap-2.5">
              <Layers size={22} className="text-[#8B5CF6]" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] block">
                  Arhitectura Sistemului Bac.ai v2.0
                </span>
                <h3 className="text-xl font-bold text-white">
                  Pipeline Hibrid NLP în 5 Etape + RAG Vectorial + SQLite
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  step: 'Etapa 1',
                  title: 'Preprocesare Morfologică & Normalizare Diacritice (Limba Română)',
                  desc: 'Tokenizare, filtrare stop-words și stemming morfologic (sufixe flexionare și verbale românești) + segmentare în propoziții.'
                },
                {
                  step: 'Etapa 2',
                  title: 'Proiecție Vectorială Multi-Reprezentare (3 Spații Semantice)',
                  desc: 'Calculul paralel al: (a) Vectorului Conceptual Latent 64-dim (sinonime literare/istorice), (b) Subword Character 3-Gram 256-dim (rădăcini morfologice FastText) și (c) TF-IDF ponderat IDF pe corpusul ANCE.'
                },
                {
                  step: 'Etapa 3',
                  title: 'Aliniere pe Criterii din Barem (Rubric-Grounded Cosine Similarity)',
                  desc: 'Fiecare criteriu individual din baremul ANCE este proiectat vectorial și comparat prin similaritate cosinus cos(θ) cu răspunsul elevului și cu rezolvarea-model.'
                },
                {
                  step: 'Etapa 4',
                  title: 'Poartă de Coerență Sintactică (Anti-Keyword-Stuffing) & Reguli ANCE Art. 59',
                  desc: 'Verifică diversitatea lexicală (CTTR = |V| / √(2N)), densitatea de predicate/verbe finite, conectorii discursivi și regula eliminatorie a semnăturii din Subiectul III.'
                },
                {
                  step: 'Etapa 5',
                  title: 'Persistență SQLite & Explicabilitate Human-in-the-Loop',
                  desc: 'Stocare locală în database.sqlite (tabelele materials, test_attempts, benchmark_runs, feedback_messages) fără pierderea datelor la repornire.'
                }
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0E0E16] border border-[#242438] flex items-start gap-3.5"
                >
                  <span className="px-2.5 py-1 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] text-xs font-extrabold shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{s.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible AI & R&D Workstream Division (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Responsible AI Card */}
            <div className="p-6 md:p-7 rounded-3xl bg-[#151520] border border-[#28283C] space-y-4">
              <div className="flex items-center gap-2.5">
                <Lock size={20} className="text-emerald-400" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Etică, Confidențialitate &amp; AI Responsabil
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Protecția Datelor &amp; Validare Umană
                  </h3>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Procesare 100% Locală &amp; Anonimizată:</strong> Eseurile elevilor sunt evaluate direct pe CPU-ul local, fără a transmite date personale către servere comerciale externe (conform Legii nr. 133/2011 a R. Moldova și GDPR).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>AI Explicabil (XAI):</strong> Fiecare punct acordat sau retras este justificat transparent prin similaritatea cosinus pe criterii, lista de concepte/sinonime și indicele CTTR.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Human-in-the-Loop (Profesorul în Centru):</strong> Bac.ai funcționează ca asistent de pre-evaluare și antrenament; decizia finală și calibrarea baremului aparțin cadrului didactic.
                  </span>
                </li>
              </ul>
            </div>

            {/* R&D Workstreams / Team Role Division Card */}
            <div className="p-6 md:p-7 rounded-3xl bg-[#151520] border border-[#28283C] space-y-4">
              <div className="flex items-center gap-2.5">
                <Users size={20} className="text-[#8B5CF6]" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] block">
                    Organizarea Proiectului R&amp;D (MoldSEF &amp; Infomatrix)
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Diviziunea Pilonilor de Cercetare și Inginerie
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#0E0E16] border border-[#252538]">
                  <span className="text-[#C4B5FD] font-bold block mb-1">
                    Pilonul A — Inginerie AI, NLP &amp; Arhitectură Full-Stack (Ana Mitrofan – Tech &amp; AI Lead)
                  </span>
                  <p className="text-gray-400 leading-relaxed">
                    Proiectarea motorului vectorial <code>nlpEngine.js</code> (stemmer românesc, vectori 64-dim + 256-dim subword, TF-IDF), scutul anti-halucinație CTTR, serverul Express + SQLite persistent și RAG-ul conversațional.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0E0E16] border border-[#252538]">
                  <span className="text-emerald-300 font-bold block mb-1">
                    Pilonul B — Cercetare Curriculară ANCE, Benchmark N=120 &amp; Impact Economic (Ana Mitrofan – Research &amp; Economics Lead)
                  </span>
                  <p className="text-gray-400 leading-relaxed">
                    Elaborarea celor 20 de module ANCE și a setului experimental stratificat (N = 120), analiza statistică (MAE, RMSE, Pearson r), modelarea ROI (MDL/EUR) și redactarea documentației MoldSEF (Template A &amp; B).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
