import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  GraduationCap,
  Clock,
  X,
  CheckCircle2,
  Sparkles,
  Brain,
  FileText,
  Copy,
  Check,
  Award,
  Send,
  RotateCcw,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { INITIAL_MATERIALS } from '../data/materialsData';

const formatMarkdownText = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed === '---') {
      return <hr key={idx} className="my-6 border-[#2D2D35]" />;
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-[#8B5CF6] rounded-full inline-block" />
          {trimmed.replace('### ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('#### ')) {
      return (
        <h4 key={idx} className="text-lg font-semibold text-[#A78BFA] mt-4 mb-2">
          {trimmed.replace('#### ', '')}
        </h4>
      );
    }
    if (trimmed.startsWith('> ')) {
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-[#8B5CF6] bg-[#8B5CF6]/10 pl-4 py-2 my-2 italic text-gray-200 rounded-r-lg"
        >
          {renderInlineFormatting(trimmed.replace('> ', ''))}
        </blockquote>
      );
    }
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      return (
        <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-2 text-gray-300">
          <span className="text-[#8B5CF6] mt-1.5 text-xs">●</span>
          <span className="leading-relaxed">{renderInlineFormatting(trimmed.slice(2))}</span>
        </div>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s(.*)$/);
      if (match) {
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-2 text-gray-300">
            <span className="text-[#8B5CF6] font-bold min-w-[1.5rem]">{match[1]}</span>
            <span className="leading-relaxed">{renderInlineFormatting(match[2])}</span>
          </div>
        );
      }
    }
    if (trimmed === '') {
      return <div key={idx} className="h-2" />;
    }
    return (
      <p key={idx} className="text-gray-300 leading-relaxed my-2">
        {renderInlineFormatting(line)}
      </p>
    );
  });
};

const renderInlineFormatting = (text) => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="text-[#C4B5FD] italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

const Dashboard = () => {
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('Romanian');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  // Progress state persisted in localStorage
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bac_ai_completed');
      return saved ? JSON.parse(saved) : [1, 8];
    } catch {
      return [1, 8];
    }
  });

  // Modal state
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [activeTab, setActiveTab] = useState('study'); // 'study' | 'quiz' | 'ai'
  const [copied, setCopied] = useState(false);

  // Quiz state inside modal
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // AI Tutor state inside modal
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('/api/materials', { timeout: 2500 });
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Merge rich local quiz/keyPoints with DB rows
          const merged = response.data.map((dbItem) => {
            const localMatch = INITIAL_MATERIALS.find(
              (m) => m.title === dbItem.title || m.id === dbItem.id
            );
            return localMatch ? { ...localMatch, ...dbItem, quiz: localMatch.quiz, keyPoints: localMatch.keyPoints, content: localMatch.content } : dbItem;
          });
          setMaterials(merged.length >= INITIAL_MATERIALS.length ? merged : INITIAL_MATERIALS);
        }
      } catch {
        // Fallback to full embedded database automatically
        setMaterials(INITIAL_MATERIALS);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bac_ai_completed', JSON.stringify(completedIds));
    } catch {
      // ignore storage errors
    }
  }, [completedIds]);

  useEffect(() => {
    if (selectedMaterial) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMaterial]);

  const openMaterialModal = (item, defaultTab = 'study') => {
    setSelectedMaterial(item);
    setActiveTab(defaultTab);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setCopied(false);
    setAiMessages([
      {
        role: 'assistant',
        text: `Salut! Sunt asistentul tău **Bac.ai** pentru lecția **„${item.title}”**. Poți să mă întrebi orice despre structura eseului, argumente pentru Bac, citate/repere cronologice sau putem face o simulare rapidă!`
      }
    ]);
  };

  const toggleCompleted = (id, e) => {
    if (e) e.stopPropagation();
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyContent = () => {
    if (!selectedMaterial) return;
    navigator.clipboard.writeText(selectedMaterial.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateAiResponse = (question, material) => {
    const q = question.toLowerCase();
    if (q.includes('plan') || q.includes('structur') || q.includes('rezumat') || q.includes('scurt')) {
      return `Iată **planul recapitulativ pentru Bac** la **„${material.title}”**:\n\n` +
        (material.keyPoints || []).map((pt, i) => `${i + 1}. **${pt}**`).join('\n') +
        `\n\n**Sfat pentru punctaj maxim (30p):** Respectă ordinea reperelor din barem (încadrare, temă + 2 secvențe comentate, 2 elemente de compoziție și concluzie) și scrie minimum 400 de cuvinte!`;
    }
    if (q.includes('test') || q.includes('intreb') || q.includes('întreb') || q.includes('subiect')) {
      return `**Cerință tip Subiectul al III-lea pentru antrenament:**\n\n> *Redactează un eseu de minimum 400 de cuvinte în care să prezinți particularitățile ${
        material.subject === 'Romanian'
          ? `operei studiate în „${material.title}” (${material.author || ''})`
          : `temei istorice „${material.title}”`
      }.*\n\n**Cum să începi:** Deschide cu o frază amplă despre contextul epocii și încadrarea tematică, apoi dezvoltă cele două secvențe reprezentative din tab-ul **Material de Studiu**!`;
    }
    return `Pentru **„${material.title}”** (${material.category}):\n\n` +
      `• **Ideea centrală:** ${material.description}\n` +
      `• **Reper esențial:** ${(material.keyPoints && material.keyPoints[0]) || ''}\n` +
      `• **Recomandare:** Verifică tab-ul **Test Grilă** din această fereastră pentru a-ți fixa noțiunile cheie!`;
  };

  const handleSendAiMessage = async (customPrompt) => {
    const promptText = customPrompt || aiInput.trim();
    if (!promptText || !selectedMaterial) return;

    const userMsg = { role: 'user', text: promptText };
    setAiMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setAiInput('');
    setAiLoading(true);

    try {
      const res = await axios.post(
        '/api/ai-tutor',
        {
          question: promptText,
          materialId: selectedMaterial.id,
          title: selectedMaterial.title
        },
        { timeout: 2500 }
      );
      setAiMessages((prev) => [
        ...prev,
        { role: 'assistant', text: res.data.answer || generateAiResponse(promptText, selectedMaterial) }
      ]);
    } catch {
      setTimeout(() => {
        setAiMessages((prev) => [
          ...prev,
          { role: 'assistant', text: generateAiResponse(promptText, selectedMaterial) }
        ]);
      }, 350);
    } finally {
      setAiLoading(false);
    }
  };

  // Dynamic categories based on subject
  const subjectMaterials = materials.filter((m) => m.subject === activeSubject);
  const dynamicCategories = ['All', ...Array.from(new Set(subjectMaterials.map((m) => m.category)))];

  const handleSubjectChange = (subject) => {
    setActiveSubject(subject);
    setActiveCategory('All');
    setSearchQuery('');
  };

  const filteredMaterials = materials.filter((item) => {
    const matchesSubject = item.subject === activeSubject;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSubject && matchesSearch && matchesCategory;
  });

  const totalCount = materials.length;
  const completedCount = completedIds.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section id="dashboard" className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative">
      {/* Header & Academic Progress Tracker */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={14} />
              <span>Bibliotecă & Antrenament Bacalaureat</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Study Materials & AI Prep</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Apasă pe orice lecție pentru a citi eseul complet, a rezolva testul grilă și a discuta cu tutorele Bac.ai.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-[#14141D] border border-[#2D2D35] rounded-2xl p-5 min-w-[280px] sm:min-w-[320px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Award size={18} className="text-[#8B5CF6]" />
                Progresul Tău la Bac
              </span>
              <span className="text-sm font-bold text-[#8B5CF6]">
                {completedCount} / {totalCount} parcurse ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#1E1E2A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Subject Toggle (Limba Română vs Istorie) */}
        <div className="flex p-1.5 bg-[#14141D] rounded-2xl w-full max-w-lg mx-auto mb-10 border border-[#2D2D35]">
          <button
            onClick={() => handleSubjectChange('Romanian')}
            className={`flex-1 py-3.5 px-5 rounded-xl flex items-center justify-center gap-2.5 font-semibold transition-all cursor-pointer ${
              activeSubject === 'Romanian'
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen size={18} />
            <span>Limba Română ({materials.filter((m) => m.subject === 'Romanian').length})</span>
          </button>
          <button
            onClick={() => handleSubjectChange('History')}
            className={`flex-1 py-3.5 px-5 rounded-xl flex items-center justify-center gap-2.5 font-semibold transition-all cursor-pointer ${
              activeSubject === 'History'
                ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock size={18} />
            <span>Istorie ({materials.filter((m) => m.subject === 'History').length})</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Caută operă, personaj, temă istorică..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A24] border border-[#2D2D35] rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/20'
                    : 'bg-[#1A1A24] text-gray-400 hover:text-white border border-[#2D2D35] hover:border-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B5CF6]" />
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((item) => {
              const isDone = completedIds.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => openMaterialModal(item, 'study')}
                  className={`bg-[#14141D] rounded-2xl p-6 border transition-all duration-300 flex flex-col h-full cursor-pointer group ${
                    isDone
                      ? 'border-emerald-500/40 hover:border-emerald-400'
                      : 'border-[#2D2D35] hover:border-[#8B5CF6]'
                  } hover:shadow-[0_10px_35px_rgba(139,92,246,0.15)] hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA] bg-[#8B5CF6]/15 px-3 py-1 rounded-full border border-[#8B5CF6]/20">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => toggleCompleted(item.id, e)}
                      title={isDone ? 'Marcat ca învățat' : 'Marchează ca învățat'}
                      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-[#1F1F2E] text-gray-400 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>{isDone ? 'Învățat' : 'Bifează'}</span>
                    </button>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#C4B5FD] transition-colors">
                    {item.title}
                  </h3>
                  {item.author && (
                    <p className="text-xs text-[#8B5CF6] font-medium mb-3">{item.author}</p>
                  )}
                  <p className="text-gray-400 text-sm mb-5 flex-grow leading-relaxed">
                    {item.description}
                  </p>

                  {/* Preview of key points */}
                  {item.keyPoints && item.keyPoints.length > 0 && (
                    <div className="mb-5 p-3 rounded-xl bg-[#0D0D11]/70 border border-[#232332] text-xs text-gray-400 space-y-1">
                      <div className="text-gray-300 font-semibold mb-1">Repere în lecție:</div>
                      <div className="truncate">• {item.keyPoints[0]}</div>
                      {item.keyPoints[1] && <div className="truncate">• {item.keyPoints[1]}</div>}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#252533] gap-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="px-2.5 py-1 rounded-md bg-[#1E1E2C] text-gray-300 font-medium">
                        {item.type}
                      </span>
                      {item.readTime && <span>• {item.readTime}</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMaterialModal(item, 'quiz');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1F1F2E] hover:bg-[#2D2D42] text-xs font-semibold text-gray-200 transition-colors cursor-pointer"
                      >
                        Quiz
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMaterialModal(item, 'study');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white flex items-center gap-1 transition-colors cursor-pointer shadow-sm shadow-[#8B5CF6]/30"
                      >
                        <span>Deschide</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredMaterials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500"
            >
              <GraduationCap size={48} className="mb-4 text-gray-600" />
              <p className="text-lg">Nu am găsit materiale care să corespundă căutării.</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Interactive Study / Quiz / AI Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#07070A]/85 backdrop-blur-md"
              onClick={() => setSelectedMaterial(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
              className="relative w-full max-w-4xl bg-[#111118] border border-[#2D2D3D] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10"
            >
              {/* Modal Top Bar */}
              <div className="p-6 md:px-8 md:pt-7 md:pb-5 border-b border-[#222230] bg-[#14141D]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA] bg-[#8B5CF6]/15 px-3 py-1 rounded-full border border-[#8B5CF6]/30">
                        {selectedMaterial.category}
                      </span>
                      <span className="text-xs text-gray-400 bg-[#1F1F2E] px-2.5 py-1 rounded-full">
                        {selectedMaterial.type}
                      </span>
                      {selectedMaterial.author && (
                        <span className="text-xs text-gray-400">• {selectedMaterial.author}</span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white pr-8">
                      {selectedMaterial.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedMaterial(null)}
                    className="p-2.5 bg-[#1F1F2E] hover:bg-[#2E2E42] text-gray-300 hover:text-white rounded-full transition-colors cursor-pointer shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <button
                    onClick={() => setActiveTab('study')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'study'
                        ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25'
                        : 'bg-[#1C1C28] text-gray-400 hover:text-white'
                    }`}
                  >
                    <FileText size={16} />
                    <span>Material de Studiu (Eseu / Sinteză)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'quiz'
                        ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25'
                        : 'bg-[#1C1C28] text-gray-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    <span>Test Grilă ({selectedMaterial.quiz ? selectedMaterial.quiz.length : 0})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'ai'
                        ? 'bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25'
                        : 'bg-[#1C1C28] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Brain size={16} />
                    <span>Tutore AI (Bac.ai)</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                {/* TAB 1: STUDY MATERIAL */}
                {activeTab === 'study' && (
                  <div>
                    {/* Key Points Box */}
                    {selectedMaterial.keyPoints && selectedMaterial.keyPoints.length > 0 && (
                      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/15 to-[#181824] border border-[#8B5CF6]/30">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-[#C4B5FD] flex items-center gap-2">
                            <Sparkles size={16} />
                            Repere Esențiale pentru Barem
                          </h4>
                          <button
                            onClick={handleCopyContent}
                            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#1F1F2E] hover:bg-[#2D2D44] text-gray-200 transition-colors cursor-pointer"
                          >
                            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            <span>{copied ? 'Copiat!' : 'Copiază Eseul'}</span>
                          </button>
                        </div>
                        <ul className="space-y-2">
                          {selectedMaterial.keyPoints.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-200">
                              <span className="text-[#8B5CF6] font-bold">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Formatted Essay / Synthesis Content */}
                    <div className="text-base leading-relaxed">
                      {formatMarkdownText(selectedMaterial.content)}
                    </div>
                  </div>
                )}

                {/* TAB 2: PRACTICE QUIZ */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-[#181824] border border-[#2D2D3D] flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-white">
                          Verifică-ți cunoștințele: {selectedMaterial.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Alege răspunsul corect pentru fiecare întrebare și apasă pe „Verifică Răspunsurile”.
                        </p>
                      </div>
                      {quizSubmitted && (
                        <button
                          onClick={() => {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#252536] hover:bg-[#323248] text-xs font-semibold text-white cursor-pointer"
                        >
                          <RotateCcw size={14} />
                          <span>Reia Testul</span>
                        </button>
                      )}
                    </div>

                    {selectedMaterial.quiz && selectedMaterial.quiz.length > 0 ? (
                      selectedMaterial.quiz.map((qItem, qIdx) => {
                        const selectedOpt = quizAnswers[qIdx];
                        return (
                          <div
                            key={qIdx}
                            className="p-5 rounded-2xl bg-[#161621] border border-[#262638] space-y-4"
                          >
                            <h4 className="font-semibold text-white text-base">
                              {qIdx + 1}. {qItem.question}
                            </h4>
                            <div className="space-y-2.5">
                              {qItem.options.map((opt, optIdx) => {
                                const isSelected = selectedOpt === optIdx;
                                const isCorrect = qItem.correct === optIdx;
                                let optionStyle =
                                  'bg-[#1E1E2C] border-[#2E2E42] text-gray-300 hover:border-[#8B5CF6]';

                                if (quizSubmitted) {
                                  if (isCorrect) {
                                    optionStyle =
                                      'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-medium';
                                  } else if (isSelected && !isCorrect) {
                                    optionStyle =
                                      'bg-rose-500/15 border-rose-500 text-rose-300';
                                  }
                                } else if (isSelected) {
                                  optionStyle =
                                    'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white font-medium';
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={quizSubmitted}
                                    onClick={() =>
                                      setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
                                    }
                                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrect && (
                                      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <div className="p-3.5 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-sm text-gray-200">
                                <strong className="text-[#C4B5FD]">Explicație: </strong>
                                {qItem.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-400">Nu există întrebări pentru această lecție.</p>
                    )}

                    {!quizSubmitted && selectedMaterial.quiz && selectedMaterial.quiz.length > 0 && (
                      <button
                        onClick={() => setQuizSubmitted(true)}
                        className="w-full py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-colors cursor-pointer shadow-lg shadow-[#8B5CF6]/30"
                      >
                        Verifică Răspunsurile
                      </button>
                    )}
                  </div>
                )}

                {/* TAB 3: AI TUTOR */}
                {activeTab === 'ai' && (
                  <div className="flex flex-col h-[460px]">
                    {/* Quick Prompts */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <button
                        onClick={() => handleSendAiMessage('Fă-mi planul recapitulativ pe scurt pentru Bac!')}
                        className="text-xs px-3 py-1.5 rounded-full bg-[#1E1E2D] hover:bg-[#8B5CF6]/20 border border-[#32324A] text-[#C4B5FD] transition-colors cursor-pointer"
                      >
                        ✨ Planul recapitulativ pe scurt
                      </button>
                      <button
                        onClick={() => handleSendAiMessage('Dă-mi o cerință de Subiectul III pentru antrenament!')}
                        className="text-xs px-3 py-1.5 rounded-full bg-[#1E1E2D] hover:bg-[#8B5CF6]/20 border border-[#32324A] text-[#C4B5FD] transition-colors cursor-pointer"
                      >
                        📝 Cerință Subiectul III
                      </button>
                      <button
                        onClick={() => handleSendAiMessage('Care sunt ideile principale de reținut?')}
                        className="text-xs px-3 py-1.5 rounded-full bg-[#1E1E2D] hover:bg-[#8B5CF6]/20 border border-[#32324A] text-[#C4B5FD] transition-colors cursor-pointer"
                      >
                        🎯 Idei principale
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#0D0D12] border border-[#222230]">
                      {aiMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                              msg.role === 'user'
                                ? 'bg-[#8B5CF6] text-white'
                                : 'bg-[#191926] border border-[#2D2D40] text-gray-200'
                            }`}
                          >
                            {formatMarkdownText(msg.text)}
                          </div>
                        </div>
                      ))}
                      {aiLoading && (
                        <div className="text-xs text-gray-400 italic">Bac.ai scrie răspunsul...</div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
                        placeholder="Întreabă orice despre această lecție..."
                        className="flex-1 bg-[#181824] border border-[#2E2E42] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                      <button
                        onClick={() => handleSendAiMessage()}
                        className="px-5 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-5 md:px-8 border-t border-[#222230] bg-[#14141D] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => toggleCompleted(selectedMaterial.id)}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    completedIds.includes(selectedMaterial.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#1F1F2E] hover:bg-[#2B2B3F] text-white border border-[#323248]'
                  }`}
                >
                  <CheckCircle2 size={18} />
                  <span>
                    {completedIds.includes(selectedMaterial.id)
                      ? 'Lecție parcursă (Marcată ca Învățată)'
                      : 'Marchează Lecția ca Învățată'}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Închide Fereastra
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Dashboard;
