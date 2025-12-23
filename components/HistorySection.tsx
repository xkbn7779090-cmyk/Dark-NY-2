import React, { useState, useEffect, useRef } from 'react';
import { HISTORY_CHARACTERS, AI_STYLE_GUIDE, BASE_URL } from '../constants';
import { ChevronRight, Info, Book, Sparkles, Wand2, Loader2, Key, Library, RotateCcw, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type TabType = 'fact' | 'legend' | 'interpretation';

const HistorySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(HISTORY_CHARACTERS[0].id);
  const [activeTab, setActiveTab] = useState<TabType>('fact');
  const [generating, setGenerating] = useState<string | null>(null);
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>(() => {
    const cached = localStorage.getItem('history_portraits_v2');
    return cached ? JSON.parse(cached) : {};
  });
  
  const dossierRef = useRef<HTMLDivElement>(null);

  const currentChar = HISTORY_CHARACTERS.find(c => c.id === selectedId) || HISTORY_CHARACTERS[0];

  useEffect(() => {
    localStorage.setItem('history_portraits_v2', JSON.stringify(generatedImages));
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
      } catch (e) {
        console.error("Failed to open API key selection dialog", e);
      }
    }
  };

  const generatePortrait = async (char: typeof HISTORY_CHARACTERS[0]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const fullPrompt = `${char.prompt} ${AI_STYLE_GUIDE}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: fullPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
          imageSize: "2K"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find(p => p.inlineData);

    if (imagePart?.inlineData) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }
    throw new Error("No image data returned from API");
  };

  const handleGenerateAI = async (char: typeof HISTORY_CHARACTERS[0]) => {
    if (generating || isBulkGenerating) return;

    if (!hasApiKey) {
      await handleSelectKey();
    }

    setGenerating(char.id);
    try {
      const imageUrl = await generatePortrait(char);
      setGeneratedImages(prev => ({ ...prev, [char.id]: imageUrl }));
    } catch (error: any) {
      console.error('Failed to generate portrait:', error);
      if (error?.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert('Пожалуйста, выберите корректный платный API ключ для работы Pro модели.');
      } else {
        alert('Ошибка при генерации портрета. Проверьте настройки ключа.');
      }
    } finally {
      setGenerating(null);
    }
  };

  const handleGenerateMissing = async () => {
    if (generating || isBulkGenerating) return;

    if (!hasApiKey) {
      await handleSelectKey();
    }

    const missingChars = HISTORY_CHARACTERS.filter(char => !generatedImages[char.id]);
    
    if (missingChars.length === 0) {
      if (confirm('Архив уже полностью укомплектован 2K портретами. Хотите перегенерировать всё заново?')) {
        setGeneratedImages({});
      } else {
        return;
      }
    }

    const finalChars = missingChars.length > 0 ? missingChars : HISTORY_CHARACTERS;
    setIsBulkGenerating(true);
    setBulkProgress({ current: 0, total: finalChars.length });
    
    let currentNewImages = { ...generatedImages };

    try {
      for (let i = 0; i < finalChars.length; i++) {
        const char = finalChars[i];
        setGenerating(char.id);
        setBulkProgress(prev => ({ ...prev, current: i + 1 }));
        
        const imageUrl = await generatePortrait(char);
        currentNewImages[char.id] = imageUrl;
        setGeneratedImages({ ...currentNewImages });
      }
    } catch (error: any) {
      console.error('Bulk generation error:', error);
      if (error?.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
      }
      alert('Произошла ошибка при массовой генерации. Процесс приостановлен.');
    } finally {
      setIsBulkGenerating(false);
      setGenerating(null);
    }
  };

  const handleResetArchive = () => {
    if (confirm('Вы уверены, что хотите удалить все сгенерированные AI-портреты и вернуться к стандартным изображениям?')) {
      setGeneratedImages({});
      localStorage.removeItem('history_portraits_v2');
    }
  };

  const displayImage = generatedImages[currentChar.id] || currentChar.image;
  const missingCount = HISTORY_CHARACTERS.length - Object.keys(generatedImages).length;
  const completionPercentage = Math.round((Object.keys(generatedImages).length / HISTORY_CHARACTERS.length) * 100);

  const getPlaceholder = (text: string, width = 800, height = 600) => 
    `https://via.placeholder.com/${width}x${height}/020617/fbbf24?text=${encodeURIComponent(text)}`;

  return (
    <section id="history-section" className="py-16 md:py-24 px-4 md:px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="text-left space-y-2 md:space-y-4">
            <h2 className="text-4xl md:text-8xl font-orbitron font-bold uppercase text-amber-500 tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              Корни праздника
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-slate-400 font-light text-base md:text-xl max-w-xl">
                Архив фольклорных сущностей. Каждое изображение воссоздано Pro-моделью в 2K качестве.
              </p>
              {missingCount > 0 && !isBulkGenerating && (
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] text-amber-500 font-bold uppercase tracking-widest animate-pulse">
                  <AlertCircle size={12} /> Обнаружены пустые ячейки архива
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleGenerateMissing}
              disabled={isBulkGenerating || !!generating}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50 ${
                missingCount > 0 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {isBulkGenerating ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Архивация: {bulkProgress.current} / {bulkProgress.total}</span>
                </div>
              ) : (
                <>
                  <Library size={16} />
                  <span>{missingCount > 0 ? `Восстановить архив (${missingCount})` : 'Обновить облики (Pro 2K)'}</span>
                </>
              )}
            </button>
            
            {Object.keys(generatedImages).length > 0 && !isBulkGenerating && (
              <button 
                onClick={handleResetArchive}
                className="flex items-center justify-center p-4 bg-slate-900/50 hover:bg-red-950/30 text-slate-500 hover:text-red-500 border border-slate-800 hover:border-red-900/50 rounded-xl transition-all"
                title="Сбросить архив"
              >
                <RotateCcw size={18} />
              </button>
            )}

            {!hasApiKey && !isBulkGenerating && (
              <button 
                onClick={handleSelectKey}
                className="flex items-center gap-2 px-6 py-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-amber-500/20 transition-all"
              >
                <Key size={16} /> Подключить Pro-модель
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden relative border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-amber-600 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            style={{ width: `${completionPercentage}%` }}
          ></div>
          {isBulkGenerating && (
             <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite] pointer-events-none"></div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 custom-scrollbar snap-x snap-mandatory">
              {HISTORY_CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => handleSelect(char.id)}
                  className={`flex-shrink-0 w-[280px] lg:w-full snap-center group text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 border ${
                    selectedId === char.id 
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                    : 'bg-slate-900/40 border-slate-800/50 grayscale hover:grayscale-0 hover:border-slate-700'
                  }`}
                >
                  <div className="w-14 h-18 md:w-16 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800 bg-slate-800 relative">
                    <img 
                      src={generatedImages[char.id] || char.image} 
                      alt={char.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholder(char.name[0], 150, 200); }}
                    />
                    {(generating === char.id || (isBulkGenerating && !generatedImages[char.id])) && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Loader2 className="animate-spin text-amber-500" size={16} />
                      </div>
                    )}
                    {generatedImages[char.id] && (
                      <div className="absolute top-1 right-1">
                        <Sparkles size={10} className="text-amber-500 fill-amber-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: char.accent }}></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{char.region}</span>
                    </div>
                    <h3 className={`text-lg md:text-xl font-ruslan truncate leading-tight ${selectedId === char.id ? 'text-amber-500' : 'text-slate-300'}`}>
                      {char.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter mt-1">{char.tagline}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div ref={dossierRef} className="lg:col-span-8 order-1 lg:order-2">
            <div className="glass-morphism rounded-[2.5rem] border border-slate-800 overflow-hidden min-h-[600px] flex flex-col transition-all duration-500 shadow-2xl relative">
              <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-slate-900">
                {generating === currentChar.id ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-amber-500 space-y-4">
                    <Loader2 className="animate-spin" size={48} />
                    <p className="font-orbitron uppercase text-xs tracking-widest animate-pulse">Воссоздание облика 2K...</p>
                  </div>
                ) : (
                  <img 
                    key={currentChar.id + (generatedImages[currentChar.id] ? '_gen' : '_orig')}
                    src={displayImage} 
                    alt={currentChar.name} 
                    className="w-full h-full object-cover animate-fade-in grayscale-[0.3] hover:grayscale-0 transition-all duration-700" 
                    onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholder(currentChar.name); }}
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase rounded-full backdrop-blur-md">
                      СТАТУС: АКТИВЕН
                    </span>
                    {generatedImages[currentChar.id] && (
                      <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold uppercase rounded-full backdrop-blur-md flex items-center gap-1">
                        <Sparkles size={10} /> Pro Визуализация
                      </span>
                    )}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-ruslan text-white drop-shadow-2xl leading-none">{currentChar.name}</h3>
                </div>
                
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 group">
                  <button 
                    onClick={() => handleGenerateAI(currentChar)}
                    disabled={!!generating || isBulkGenerating}
                    className="p-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-90 disabled:opacity-50 disabled:scale-100 flex items-center justify-center"
                    title="Сгенерировать High-Res портрет"
                  >
                    {generating === currentChar.id ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
                  </button>
                  <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-slate-900 border border-emerald-500/30 px-4 py-2 rounded-xl text-[10px] text-emerald-400 font-bold uppercase tracking-widest whitespace-nowrap shadow-2xl">
                      Сгенерировать Pro Portrait
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 md:top-10 md:right-10">
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-black/30">
                     <span className="text-[10px] font-bold font-orbitron text-slate-500">#{currentChar.id.toUpperCase().slice(0,3)}</span>
                   </div>
                </div>
              </div>

              <div className="p-6 md:p-12 space-y-8 flex-1 flex flex-col bg-slate-950/40">
                <p className="text-lg md:text-2xl font-light text-slate-300 italic border-l-4 pl-6 leading-relaxed" style={{ borderColor: currentChar.accent }}>
                  «{currentChar.tagline}»
                </p>

                <div className="space-y-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/50 rounded-2xl self-start border border-white/5">
                    {[
                      { id: 'fact', label: 'Факт', icon: <Info size={14} /> },
                      { id: 'legend', label: 'Легенда', icon: <Book size={14} /> },
                      { id: 'interpretation', label: 'Интерпретация', icon: <Sparkles size={14} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`px-4 py-2 md:px-7 md:py-3 rounded-xl text-[10px] md:text-xs font-bold flex items-center gap-2 transition-all duration-300 ${
                          activeTab === tab.id 
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                          : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-base md:text-xl text-slate-300 leading-relaxed font-light animate-fade-in flex-1">
                    {activeTab === 'fact' && currentChar.fact}
                    {activeTab === 'legend' && currentChar.legend}
                    {activeTab === 'interpretation' && currentChar.interpretation}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row gap-8 md:items-center">
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold block">Почему важно сейчас</span>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed">{currentChar.importance}</p>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-[8px] text-slate-600 hover:text-slate-400 transition-colors uppercase vertical-rl">Billing Info</a>
                    <button className="px-8 py-3.5 border border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white hover:border-slate-600 transition-all rounded-2xl bg-slate-900/40 shrink-0">
                      Источники Архива
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        @media (min-width: 1024px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 0;
          }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .vertical-rl { writing-mode: vertical-rl; }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default HistorySection;
