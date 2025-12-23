
import React, { useState, useEffect, useRef } from 'react';
import { HISTORY_CHARACTERS, AI_STYLE_GUIDE, resolvePath } from '../constants';
import { Info, Book, Sparkles, Wand2, Loader2, Key, RotateCcw, ShieldAlert, Fingerprint } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type TabType = 'fact' | 'legend' | 'interpretation';

const HistorySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(HISTORY_CHARACTERS[0].id);
  const [activeTab, setActiveTab] = useState<TabType>('fact');
  const [generating, setGenerating] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>(() => {
    try {
      const cached = localStorage.getItem('history_portraits_v3');
      return cached ? JSON.parse(cached) : {};
    } catch (e) {
      return {};
    }
  });
  
  const dossierRef = useRef<HTMLDivElement>(null);

  const currentChar = HISTORY_CHARACTERS.find(c => c.id === selectedId) || HISTORY_CHARACTERS[0];

  useEffect(() => {
    localStorage.setItem('history_portraits_v3', JSON.stringify(generatedImages));
  }, [generatedImages]);

  useEffect(() => {
    const checkKey = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
        try {
          const selected = await aistudio.hasSelectedApiKey();
          setHasApiKey(selected);
        } catch (e) {
          console.error("Failed to check API key status", e);
        }
      }
    };
    checkKey();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (window.innerWidth < 1024) {
      dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      try {
        await aistudio.openSelectKey();
        setHasApiKey(true);
        // Small delay for env
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  const generatePortrait = async (char: typeof HISTORY_CHARACTERS[0]) => {
    const aistudio = (window as any).aistudio;
    if (!(await aistudio.hasSelectedApiKey())) {
      const success = await handleSelectKey();
      if (!success) throw new Error("API Key required");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const fullPrompt = `${char.prompt}. ${AI_STYLE_GUIDE}. Extremely detailed, cinematic 4k, mythological horror aesthetic. No text.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
          imageSize: "1K"
        }
      }
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }
    throw new Error("Failed to generate image");
  };

  const handleGenerateAI = async (char: typeof HISTORY_CHARACTERS[0]) => {
    if (generating) return;
    setGenerating(char.id);
    try {
      const imageUrl = await generatePortrait(char);
      setGeneratedImages(prev => ({ ...prev, [char.id]: imageUrl }));
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes("entity was not found")) {
        setHasApiKey(false);
        alert('Пожалуйста, выберите платный API ключ для доступа к модели Pro Image.');
      } else {
        alert('Ошибка генерации. Проверьте настройки ключа.');
      }
    } finally {
      setGenerating(null);
    }
  };

  const handleResetArchive = () => {
    if (confirm('Сбросить все сгенерированные AI-портреты?')) {
      setGeneratedImages({});
      localStorage.removeItem('history_portraits_v3');
    }
  };

  const displayImage = resolvePath(generatedImages[currentChar.id] || currentChar.image);
  const completionPercentage = Math.round((Object.keys(generatedImages).length / HISTORY_CHARACTERS.length) * 100);

  return (
    <section id="history-section" className="py-24 px-6 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-900 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
               <ShieldAlert size={24} />
               <span className="text-xs font-black uppercase tracking-[0.6em]">CLASSIFIED ARCHIVE: MYTHOS</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-orbitron font-bold uppercase text-white tracking-tighter leading-none">
              Тёмные <span className="text-amber-500">Корни</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl font-light">
              Праздник, каким мы его знаем, вырос на почве страха и подчинения. Исследуй тени прошлого.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {Object.keys(generatedImages).length > 0 && (
              <button 
                onClick={handleResetArchive}
                className="p-4 bg-slate-900/50 hover:bg-red-950/20 text-slate-500 hover:text-red-500 border border-slate-800 rounded-2xl transition-all"
                title="Сбросить архив"
              >
                <RotateCcw size={20} />
              </button>
            )}

            {!hasApiKey && (
              <button 
                onClick={handleSelectKey}
                className="px-6 py-4 bg-amber-600 hover:bg-amber-500 text-white hover:text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center gap-3 shadow-2xl shadow-amber-950/20"
              >
                <Key size={16} /> Активировать High-Res
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-amber-500 transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-4">
            {HISTORY_CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => handleSelect(char.id)}
                className={`group text-left p-5 rounded-3xl transition-all duration-500 flex items-center gap-6 border ${
                  selectedId === char.id 
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-2xl' 
                  : 'bg-slate-900/40 border-slate-800/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800 border border-slate-700 relative">
                  <img 
                    src={resolvePath(generatedImages[char.id] || char.image)} 
                    alt={char.name} 
                    className={`w-full h-full object-cover transition-all duration-700 ${selectedId === char.id ? 'scale-110 blur-0' : 'grayscale'}`}
                  />
                  {generating === char.id && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="animate-spin text-amber-500" size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{char.region}</span>
                  </div>
                  <h3 className={`text-xl md:text-2xl font-ruslan truncate ${selectedId === char.id ? 'text-amber-500' : 'text-slate-300'}`}>
                    {char.name}
                  </h3>
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter truncate">{char.tagline}</p>
                </div>
              </button>
            ))}
          </div>

          <div ref={dossierRef} className="lg:col-span-8 order-1 lg:order-2">
            <div className="glass-morphism rounded-[3rem] border border-slate-800/50 overflow-hidden min-h-[700px] flex flex-col shadow-2xl bg-black/40 relative">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
                {generating === currentChar.id ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-amber-500 space-y-6">
                    <Loader2 className="animate-spin" size={64} />
                    <p className="font-orbitron uppercase text-sm tracking-[0.5em] animate-pulse font-black">Reconstructing Archetype...</p>
                  </div>
                ) : (
                  <img 
                    key={currentChar.id}
                    src={displayImage} 
                    alt={currentChar.name} 
                    className="w-full h-full object-cover animate-fade-in transition-all duration-1000 scale-[1.01] hover:scale-105" 
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent"></div>
                
                <div className="absolute top-8 left-8 flex items-center gap-4">
                   <div className="p-3 bg-black/60 border border-white/5 backdrop-blur-md rounded-2xl flex items-center gap-3">
                     <Fingerprint size={20} className="text-amber-500" />
                     <div className="flex flex-col">
                       <span className="text-[8px] uppercase font-black tracking-widest text-slate-500">Subject ID</span>
                       <span className="text-xs font-orbitron text-white">#{currentChar.id.toUpperCase()}</span>
                     </div>
                   </div>
                </div>

                <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] font-black uppercase rounded-full backdrop-blur-xl tracking-widest">
                      ARCHIVE STATUS: UNLOCKED
                    </span>
                    {generatedImages[currentChar.id] && (
                      <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 text-[10px] font-black uppercase rounded-full backdrop-blur-xl flex items-center gap-2">
                        <Sparkles size={12} /> AI Visual Enhancement
                      </span>
                    )}
                  </div>
                  <h3 className="text-5xl md:text-8xl font-ruslan text-white leading-none drop-shadow-2xl">{currentChar.name}</h3>
                </div>
                
                <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16">
                  <button 
                    onClick={() => handleGenerateAI(currentChar)}
                    disabled={!!generating}
                    className="w-20 h-20 bg-amber-500 hover:bg-amber-400 text-black rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all hover:scale-110 active:scale-90 disabled:opacity-50 disabled:scale-100 flex items-center justify-center relative overflow-hidden group"
                    title="Generate AI Portrait"
                  >
                    {generating === currentChar.id ? <Loader2 className="animate-spin" size={32} /> : <Wand2 size={32} />}
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </div>

              <div className="p-8 md:p-16 space-y-12 flex-1 flex flex-col">
                <blockquote className="text-2xl md:text-4xl font-light text-slate-300 italic border-l-8 pl-8 leading-tight py-2" style={{ borderColor: currentChar.accent }}>
                  «{currentChar.tagline}»
                </blockquote>

                <div className="space-y-10 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-3 p-1.5 bg-slate-900/60 rounded-[1.5rem] self-start border border-white/5 backdrop-blur-md">
                    {[
                      { id: 'fact', label: 'Данные', icon: <Info size={16} /> },
                      { id: 'legend', label: 'Миф', icon: <Book size={16} /> },
                      { id: 'interpretation', label: 'Анализ', icon: <Sparkles size={16} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`px-6 py-3 md:px-10 md:py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${
                          activeTab === tab.id 
                          ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' 
                          : 'text-slate-500 hover:text-slate-200'
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light animate-fade-in flex-1">
                    {activeTab === 'fact' && currentChar.fact}
                    {activeTab === 'legend' && currentChar.legend}
                    {activeTab === 'interpretation' && currentChar.interpretation}
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row gap-10 md:items-center">
                  <div className="flex-1 space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-black block">КОММЕНТАРИЙ АНАЛИТИКА</span>
                    <p className="text-base text-slate-400 leading-relaxed">{currentChar.importance}</p>
                  </div>
                  <button className="px-10 py-4 border border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black hover:text-white hover:border-slate-600 transition-all rounded-2xl bg-slate-950/50 backdrop-blur-md">
                    ПОДРОБНЫЕ ИСТОЧНИКИ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default HistorySection;
