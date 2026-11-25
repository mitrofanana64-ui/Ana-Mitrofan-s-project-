import React from 'react';
import {
  Sparkles,
  BookOpen,
  FileCheck2,
  FlaskConical,
  TrendingUp,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0D0D11]/85 border-b border-[#1E1E2C]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Bac<span className="text-[#8B5CF6]">.ai</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30">
                v2.0 R&amp;D • ANCE 100p
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">
              NLP Semantic, Benchmark N=120 &amp; Simulare BAC R. Moldova
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <button
            onClick={() => scrollTo('dashboard')}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen size={15} className="text-[#8B5CF6]" />
            <span>Bibliotecă &amp; RAG</span>
          </button>

          <button
            onClick={() => scrollTo('sample-tests')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck2 size={15} className="text-[#A78BFA]" />
            <span>Simulare BAC (3 Algoritmi)</span>
          </button>

          <button
            onClick={() => scrollTo('about')}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FlaskConical size={15} className="text-[#8B5CF6]" />
            <span>Cercetare &amp; Validare (N=150)</span>
          </button>

          <button
            onClick={() => scrollTo('economics')}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <TrendingUp size={15} className="text-emerald-400" />
            <span>Impact Economic (ROI)</span>
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Mail size={15} className="text-[#8B5CF6]" />
            <span>Pilotare &amp; Docs</span>
          </button>
        </nav>

        {/* Action Button */}
        <button
          onClick={() => scrollTo('sample-tests')}
          className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#8B5CF6]/25 transition-all cursor-pointer"
        >
          Testează AI Live →
        </button>
      </div>
    </header>
  );
};

export default Navbar;
