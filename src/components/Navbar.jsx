import React from 'react';
import { Sparkles, BookOpen, FileCheck2, Award, Mail } from 'lucide-react';

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
                R. Moldova • ANCE 100p
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Limba Română & Istoria Românilor și Universală
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollTo('dashboard')}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen size={16} className="text-[#8B5CF6]" />
            <span>Bibliotecă & Lecții</span>
          </button>

          <button
            onClick={() => scrollTo('sample-tests')}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileCheck2 size={16} className="text-[#A78BFA]" />
            <span>Teste BAC & Corector AI Live</span>
          </button>

          <button
            onClick={() => scrollTo('about')}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Award size={16} className="text-[#8B5CF6]" />
            <span>Parcurs</span>
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-[#191926] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Mail size={16} className="text-[#8B5CF6]" />
            <span>Contact</span>
          </button>
        </nav>

        {/* Action Button */}
        <button
          onClick={() => scrollTo('sample-tests')}
          className="px-4 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#8B5CF6]/25 transition-all cursor-pointer"
        >
          Simulare BAC 100p →
        </button>
      </div>
    </header>
  );
};

export default Navbar;
