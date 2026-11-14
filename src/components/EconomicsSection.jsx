import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calculator,
  Coins,
  Clock,
  CheckCircle2,
  Building2,
  Users,
  Sparkles
} from 'lucide-react';

const EUR_RATE_MDL = 19.25; // Official reference exchange rate MDL / EUR

const EconomicsSection = () => {
  const [studentCount, setStudentCount] = useState(30); // Default: 1 classroom (30 students)
  const [tutoringRateMdl, setTutoringRateMdl] = useState(250); // Avg MDL per 90-min session in Moldova
  const [subjectsCount, setSubjectsCount] = useState(2); // Romanian + History
  const [weeksPerYear, setWeeksPerYear] = useState(36); // 9-month academic year

  const metrics = useMemo(() => {
    const sessionsPerStudentYear = subjectsCount * weeksPerYear;
    const tutoringCostPerStudentMdl = sessionsPerStudentYear * tutoringRateMdl;
    const tutoringCostPerStudentEur = Math.round(tutoringCostPerStudentMdl / EUR_RATE_MDL);

    // Bac.ai local CPU inference = 0 MDL API cost; amortized school/cloud hosting = 350 MDL (~18 EUR) / student / year
    const bacAiCostPerStudentMdl = 350;
    const bacAiCostPerStudentEur = Math.round(bacAiCostPerStudentMdl / EUR_RATE_MDL);

    const netSavingsPerStudentMdl = Math.max(0, tutoringCostPerStudentMdl - bacAiCostPerStudentMdl);
    const netSavingsPerStudentEur = Math.round(netSavingsPerStudentMdl / EUR_RATE_MDL);
    const savingsPct = Number(
      ((netSavingsPerStudentMdl / Math.max(1, tutoringCostPerStudentMdl)) * 100).toFixed(1)
    );

    const totalTutoringMdl = tutoringCostPerStudentMdl * studentCount;
    const totalBacAiMdl = bacAiCostPerStudentMdl * studentCount;
    const totalSavingsMdl = netSavingsPerStudentMdl * studentCount;
    const totalSavingsEur = Math.round(totalSavingsMdl / EUR_RATE_MDL);

    // Teacher grading time savings: 4 full simulations/year * 2 subjects = 8 full 100p papers per student
    // Manual grading: 22 min/paper vs Bac.ai: 0.006s AI + 3 min teacher human-in-the-loop review = 19 min saved/paper
    const papersPerYear = studentCount * subjectsCount * 4;
    const manualHours = Math.round((papersPerYear * 22) / 60);
    const aiAssistedHours = Math.round((papersPerYear * 3) / 60);
    const savedTeacherHours = Math.max(0, manualHours - aiAssistedHours);

    return {
      sessionsPerStudentYear,
      tutoringCostPerStudentMdl,
      tutoringCostPerStudentEur,
      bacAiCostPerStudentMdl,
      bacAiCostPerStudentEur,
      netSavingsPerStudentMdl,
      netSavingsPerStudentEur,
      savingsPct,
      totalTutoringMdl,
      totalBacAiMdl,
      totalSavingsMdl,
      totalSavingsEur,
      papersPerYear,
      manualHours,
      aiAssistedHours,
      savedTeacherHours
    };
  }, [studentCount, tutoringRateMdl, subjectsCount, weeksPerYear]);

  return (
    <section id="economics" className="py-24 px-6 md:px-12 bg-[#0B0B10] border-t border-[#1C1C2A]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <TrendingUp size={15} />
              <span>Pilonul 1 MoldSEF (30 Puncte) • Analiză Economică &amp; ROI în Republica Moldova</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Impact Economic &amp; Calculator ROI (MDL / EUR)
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl">
              Model financiar comparativ între costul meditațiilor private pentru Bacalaureat în Republica Moldova și rularea locală <strong>Bac.ai v2</strong> (cost API <strong>0 MDL</strong> prin inferență vectorială pe CPU).
            </p>
          </div>

          {/* Quick Scale Presets */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: '1 Elev', count: 1 },
              { label: 'Clasă (30 Elevi)', count: 30 },
              { label: 'Liceu (150 Elevi)', count: 150 },
              { label: 'Național RM (10.000 Elevi)', count: 10000 }
            ].map((preset) => (
              <button
                key={preset.count}
                onClick={() => setStudentCount(preset.count)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  studentCount === preset.count
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/15'
                    : 'bg-[#14141F] border-[#28283A] text-gray-400 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-[#13131E] border border-[#26263A]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
              <Coins size={20} />
            </div>
            <span className="text-xs text-gray-400 block">Cost Meditații Private / Elev / An</span>
            <div className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {metrics.tutoringCostPerStudentMdl.toLocaleString('ro-MD')} MDL
            </div>
            <span className="text-xs text-amber-300 font-medium">
              ≈ {metrics.tutoringCostPerStudentEur.toLocaleString('ro-MD')} EUR ({metrics.sessionsPerStudentYear} ședințe/an)
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#13131E] border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.1)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs text-gray-400 block">Economie Netă / Elev / An ({metrics.savingsPct}%)</span>
            <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">
              +{metrics.netSavingsPerStudentMdl.toLocaleString('ro-MD')} MDL
            </div>
            <span className="text-xs text-emerald-300 font-medium">
              ≈ +{metrics.netSavingsPerStudentEur.toLocaleString('ro-MD')} EUR economisiți per familie
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#13131E] border border-[#8B5CF6]/40">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 text-[#C4B5FD] flex items-center justify-center mb-3">
              <Users size={20} />
            </div>
            <span className="text-xs text-gray-400 block">
              Economie Totală ({studentCount.toLocaleString('ro-MD')} {studentCount === 1 ? 'Elev' : 'Elevi'})
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-[#C4B5FD] mt-1">
              {metrics.totalSavingsMdl.toLocaleString('ro-MD')} MDL
            </div>
            <span className="text-xs text-gray-300 font-medium">
              ≈ {metrics.totalSavingsEur.toLocaleString('ro-MD')} EUR / an școlar
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#13131E] border border-[#26263A]">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <span className="text-xs text-gray-400 block">Timp Profesori Economisit (86.4%)</span>
            <div className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {metrics.savedTeacherHours.toLocaleString('ro-MD')} ore
            </div>
            <span className="text-xs text-blue-300 font-medium">
              pe {metrics.papersPerYear.toLocaleString('ro-MD')} teste de 100p (22 min → 3 min/test)
            </span>
          </div>
        </div>

        {/* Interactive Calculator & Comparative Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 cols: Interactive Parameter Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-[#14141F] border border-[#28283E] space-y-6"
          >
            <div className="flex items-center gap-2.5">
              <Calculator size={20} className="text-[#8B5CF6]" />
              <h3 className="text-xl font-bold text-white">
                Parametri Piață Educațională (R. Moldova)
              </h3>
            </div>

            <div className="space-y-5 text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-300 font-semibold">Număr de elevi beneficiari:</span>
                  <span className="font-mono font-bold text-[#C4B5FD]">
                    {studentCount.toLocaleString('ro-MD')} elevi
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={Math.min(500, studentCount)}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full accent-[#8B5CF6] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-300 font-semibold">Cost mediu 1 ședință meditații (MDL):</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {tutoringRateMdl} MDL (≈ {(tutoringRateMdl / EUR_RATE_MDL).toFixed(1)} EUR)
                  </span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={400}
                  step={10}
                  value={tutoringRateMdl}
                  onChange={(e) => setTutoringRateMdl(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-300 font-semibold">Săptămâni de pregătire / an școlar:</span>
                  <span className="font-mono font-bold text-white">{weeksPerYear} săptămâni</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={40}
                  step={2}
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(Number(e.target.value))}
                  className="w-full accent-[#8B5CF6] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-300 font-semibold">Discipline BAC pregătite simultan:</span>
                  <span className="font-mono font-bold text-white">
                    {subjectsCount} ({subjectsCount === 2 ? 'Română + Istorie' : '1 disciplină'})
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2].map((n) => (
                    <button
                      key={n}
                      onClick={() => setSubjectsCount(n)}
                      className={`flex-1 py-2 rounded-xl font-bold border cursor-pointer ${
                        subjectsCount === n
                          ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                          : 'bg-[#0E0E16] text-gray-400 border-[#26263A]'
                      }`}
                    >
                      {n === 1 ? '1 Disciplină' : '2 Discipline (Română + Istorie)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0D14] border border-[#232336] text-xs text-gray-300 space-y-1.5">
              <div className="font-bold text-emerald-400">Formula de Calcul Economic (ROI):</div>
              <p className="font-mono text-[11px] text-gray-400">
                Economie = N_elevi × [(N_disc × Săpt × Tarif_MDL) - Cost_BacAI]
              </p>
              <p>
                În Republica Moldova, costul anual al meditațiilor la 2 discipline (<strong>18.000 MDL ≈ 935 EUR</strong>) depășește un salariu mediu net lunar pe economie, creând o barieră majoră de echitate între mediul urban și rural.
              </p>
            </div>
          </motion.div>

          {/* Right 7 cols: Head-to-Head Financial & Operational Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-[#14141F] border border-[#28283E] space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Analiză Comparativă Cost-Beneficiu
                </span>
                <h3 className="text-xl font-bold text-white">
                  Alternative Comerciale vs. Arhitectura Locală Bac.ai v2
                </h3>
              </div>
              <Building2 size={22} className="text-emerald-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2A2A3E] text-gray-400">
                    <th className="py-3 pr-3">Indicator Economic / Operațional</th>
                    <th className="py-3 px-3 text-amber-300">Meditații Private (RM)</th>
                    <th className="py-3 px-3 text-blue-300">SaaS Cloud LLM (API)</th>
                    <th className="py-3 pl-3 text-emerald-400">Bac.ai v2 (Local Hibrid)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222234] text-gray-200">
                  <tr>
                    <td className="py-3 pr-3 font-semibold">Cost Anual / Elev (MDL &amp; EUR)</td>
                    <td className="py-3 px-3 font-mono text-amber-300">
                      {metrics.tutoringCostPerStudentMdl.toLocaleString('ro-MD')} MDL ({metrics.tutoringCostPerStudentEur} €)
                    </td>
                    <td className="py-3 px-3 font-mono text-blue-300">
                      ~3.850 MDL (~200 €/an)
                    </td>
                    <td className="py-3 pl-3 font-mono font-bold text-emerald-400">
                      0 – 350 MDL (0 – 18 €/an)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold">Cost Marginal per Evaluare Eseu</td>
                    <td className="py-3 px-3">250 MDL / ședință</td>
                    <td className="py-3 px-3">~0.40 – 1.20 MDL / apel API</td>
                    <td className="py-3 pl-3 font-bold text-emerald-400">0.00 MDL (CPU Local)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold">Timp de Feedback pe Test (100p)</td>
                    <td className="py-3 px-3">3 – 7 zile (până la ședință)</td>
                    <td className="py-3 px-3">4 – 12 secunde (rețea)</td>
                    <td className="py-3 pl-3 font-bold text-emerald-400">6.18 ms (în timp real)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold">Aliniere la Baremul Oficial ANCE RM</td>
                    <td className="py-3 px-3">Variabilă (dependentă de tutore)</td>
                    <td className="py-3 px-3">Scăzută (halucinații / fără Art. 59)</td>
                    <td className="py-3 pl-3 font-bold text-emerald-400">100% (Criterii + Art. 59)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-semibold">Confidențialitate Date Elevi (GDPR)</td>
                    <td className="py-3 px-3">Locală</td>
                    <td className="py-3 px-3">Date trimise în cloud extern</td>
                    <td className="py-3 pl-3 font-bold text-emerald-400">100% Anonimizat Local</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0E0E16] border border-[#252538] flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-gray-300 leading-relaxed">
                  <strong className="text-white block mb-0.5">Impact Social în Liceele Rurale:</strong>
                  Democratizează accesul la pregătire de Nota 10 pentru elevii din raioanele Republicii Moldova care nu își permit 18.000 MDL/an pentru meditații.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0E0E16] border border-[#252538] flex items-start gap-3">
                <Sparkles size={18} className="text-[#8B5CF6] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-300 leading-relaxed">
                  <strong className="text-white block mb-0.5">Scalabilitate Fără Costuri GPU:</strong>
                  Funcționează direct pe calculatoarele existente în laboratoarele de informatică din licee (Node.js + SQLite), fără abonamente cloud.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EconomicsSection;
