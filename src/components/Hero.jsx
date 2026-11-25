import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  BookOpen,
  FileCheck2,
  Brain,
  ShieldCheck,
  FlaskConical,
  TrendingUp
} from 'lucide-react';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-[#8B5CF6]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="z-10 text-center max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30 mb-8"
        >
          <Sparkles size={16} className="text-[#8B5CF6]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            Platformă R&amp;D AI pentru Examenul Național de Bacalaureat • Republica Moldova (ANCE 100p)
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          Evaluare Semantică &amp; Pregătire de Nota 10 cu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C4B5FD] to-[#8B5CF6]">
            Bac.ai v2
          </span>
        </h1>

        <p className="text-xs sm:text-sm uppercase tracking-widest text-[#A78BFA] font-bold mb-4">
          Proiect de Cercetare &amp; Inginerie AI (MoldSEF &amp; Infomatrix) • Autor: Ana Mitrofan
        </p>

        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          Sistem hibrid de procesare a limbajului natural (<strong>Vectori Semantici 64-dim + Subword 3-Gram + TF-IDF + Filtru Sintactic Anti-Halucinație CTTR</strong>) aliniat la baremul oficial ANCE pentru <strong>Limba și literatura română</strong> și <strong>Istoria românilor și universală</strong>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('sample-tests')}
            className="px-7 py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-2xl font-bold text-base shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <FileCheck2 size={20} />
            <span>Simulare BAC &amp; Comparație 3 Algoritmi</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('about')}
            className="px-7 py-4 bg-[#161622] hover:bg-[#1F1F30] text-white border border-[#8B5CF6]/40 rounded-2xl font-bold text-base transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <FlaskConical size={20} className="text-[#A78BFA]" />
            <span>Validare în Clasă (N=30) &amp; Benchmark (N=120)</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo('economics')}
            className="px-6 py-4 bg-[#131C18] hover:bg-[#182620] text-emerald-300 border border-emerald-500/30 rounded-2xl font-bold text-base transition-all flex items-center gap-2 cursor-pointer"
          >
            <TrendingUp size={20} className="text-emerald-400" />
            <span>Impact Economic (ROI 98.1%)</span>
          </motion.button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-5 rounded-2xl bg-[#13131C]/90 border border-[#262638] backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] flex items-center justify-center mb-3">
              <Brain size={18} />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">MAE 7.03% în Clasă (N=30) &amp; r = 0.936</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Validat pe N=30 lucrări reale ale elevilor (evaluate orb de 2 profesori, MAE 1.50p) și N=120 teste de stres (-72.7% eroare MAE) în 5.75 ms.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#13131C]/90 border border-[#262638] backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] flex items-center justify-center mb-3">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Structura Oficială ANCE RM (100p)</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              20 de module complete, RAG vectorial cu citarea surselor, verificarea regulii eliminatorii Art. 59 (Subiectul III) și persistență SQLite.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#13131C]/90 border border-[#262638] backdrop-blur-md">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
              <TrendingUp size={18} />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Economie de 17.650 MDL / Elev / An</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Reduce costul pregătirii de la 18.000 MDL (935 EUR/an meditații private) la sub 350 MDL/an și economisește 86.4% din timpul de corectare al profesorilor.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-12 animate-bounce cursor-pointer text-gray-500 hover:text-white transition-colors"
        onClick={() => scrollTo('dashboard')}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
