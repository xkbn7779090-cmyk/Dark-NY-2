
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Sparkles, Trash2, Download, Image as ImageIcon, Check, User, Users, Heart, Zap, ShieldCheck, ChevronRight, Share2, Printer, Calendar, Key, AlertCircle, Volume2, Loader2 } from 'lucide-react';
import { PLANNER_CATEGORIES, POSTER_THEMES, SLOGANS, STYLES, MOTIVES, resolvePath } from '../constants';
import { useApp } from '../App';

const AISection: React.FC = () => {
  const { isGentleMode } = useApp();
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingPoster, setLoadingPoster] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [posterResult, setPosterResult] = useState<{ url: string, slogan: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [posterError, setPosterError] = useState<string | null>(null);
  const [burning, setBurning] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  const [age, setAge] = useState(28);
  const [identity, setIdentity] = useState("Женщина");
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const [posterTheme, setPosterTheme] = useState(POSTER_THEMES[0]);
  const [posterSlogan, setPosterSlogan] = useState(SLOGANS[1]);
  const [posterStyle, setPosterStyle] = useState(STYLES[0]);
  const [posterMotive, setPosterMotive] = useState(MOTIVES[0]);

  useEffect(() => {
    const checkKey = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
        const selected = await aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      await aistudio.openSelectKey();
      setHasApiKey(true);
      setError(null);
      setPosterError(null);
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    }
    return false;
  };

  const toggleSelection = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleGeneratePlan = async () => {
    setLoadingPlan(true);
    setPlanResult(null);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Ты — эксперт по осознанному образу жизни и социальной деконструкции. Сгенерируй детальный "Тихий сценарий" на Новый год для человека:
        Возраст: ${age}, Пол/Идентификация: ${identity}
        Компания: ${selectedCompany.join(', ') || 'Одиночество'}
        Вайб: ${selectedVibes.join(', ') || 'Минимализм'}
        Условия: ${selectedConditions.join(', ') || 'Стандартные'}
        
        ОТВЕТЬ В ФОРМАТЕ MARKDOWN С ЗАГОЛОВКАМИ:
        1. **Философия вечера**: Почему этот выбор важен.
        2. **Таймлайн (20:00 - 01:00)**: Пошаговые действия для комфорта.
        3. **Меню для души**: Что съесть и выпить (без похмелья и тяжести).
        4. **Ментальный ритуал**: Упражнение на осознанность.
        5. **Кнопка выхода**: Как уйти от нежелательного общения.
        
        Тон: ${isGentleMode ? 'Бережный, поддерживающий, мягкий.' : 'Прямой, честный, немного циничный в отношении традиций.'}
      `;
      const res = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setPlanResult(res.text || 'Ошибка генерации текста');
      setTimeout(() => planRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
    } catch (e: any) {
      setError("Не удалось связаться с AI. Проверьте ваш API ключ или интернет.");
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleGeneratePoster = async () => {
    setLoadingPoster(true);
    setPosterResult(null);
    setPosterError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A cinematic conceptual poster for a "Conscious New Year". Theme: ${posterTheme}. Idea: ${posterSlogan}. Style: ${posterStyle}. Central element: ${posterMotive}. Moody dark atmosphere with neon highlights in cyan and crimson. Ultra-high detail, professional photography aesthetic. ABSOLUTELY NO TEXT ON IMAGE.`;
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      const imgPart = res.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (imgPart?.inlineData) {
        setPosterResult({
          url: `data:image/png;base64,${imgPart.inlineData.data}`,
          slogan: posterSlogan
        });
      } else {
        throw new Error('Image not generated');
      }
    } catch (e: any) {
      setPosterError("Ошибка генерации манифеста. Попробуйте другой стиль.");
    } finally {
      setLoadingPoster(false);
    }
  };

  const handleDownloadPoster = () => {
    if (!posterResult) return;
    const link = document.createElement('a');
    link.href = posterResult.url;
    link.download = `manifesto-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleHearPlan = async () => {
    if (!planResult || loadingAudio) return;
    setLoadingAudio(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Прочитай этот план спокойным и поддерживающим голосом: ${planResult.slice(0, 1000)}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
        },
      });
      
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
        
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (e) {
      console.error(e);
      alert('Ошибка синтеза речи.');
    } finally {
      setLoadingAudio(false);
    }
  };

  const burnPlan = () => {
    setBurning(true);
    setTimeout(() => {
      setPlanResult(null);
      setError(null);
      setBurning(false);
    }, 1000);
  };

  return (
    <section id="ai-section" className="py-24 px-6 bg-[#020617] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32 md:space-y-48">
        
        {/* Planner Section */}
        <div className="space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-950/40 border border-indigo-500/30 rounded-full text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em]">
              <Sparkles size={14} className="animate-pulse" /> Твой персональный сценарий
            </div>
            <h2 className="text-5xl md:text-9xl font-black font-orbitron leading-none tracking-tighter text-white">
              Генератор <span className="text-indigo-500 italic">Свободы</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-2xl font-light max-w-3xl mx-auto">
              Праздник — это не обязанность. Настрой параметры и получи пошаговый план вечера, где ты — главный герой.
            </p>
          </div>

          {!hasApiKey && (
            <div className="max-w-2xl mx-auto p-8 border border-amber-500/30 bg-amber-500/5 rounded-[2rem] text-center space-y-6 mb-12 backdrop-blur-md">
              <AlertCircle className="mx-auto text-amber-500" size={40} />
              <p className="text-slate-300 font-medium">Для работы AI необходимо активировать платный API-ключ в настройках браузера.</p>
              <button 
                onClick={handleSelectKey}
                className="px-8 py-4 bg-amber-500 text-black font-black rounded-full hover:bg-amber-400 transition-all flex items-center gap-3 mx-auto shadow-xl"
              >
                <Key size={18} /> Выбрать API Ключ
              </button>
            </div>
          )}

          <div className="glass-morphism rounded-[3.5rem] p-8 md:p-20 border border-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative bg-black/40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black">
                      <User size={18} /> Твой возраст
                    </span>
                    <span className="text-4xl font-black font-orbitron text-white">{age}</span>
                  </div>
                  <input 
                    type="range" 
                    min="18" max="100" 
                    value={age} 
                    onChange={e => setAge(Number(e.target.value))} 
                    className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
                  />
                </div>

                <div className="space-y-8">
                  <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-black">
                    <ShieldCheck size={18} /> Идентификация
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {PLANNER_CATEGORIES.identities.map(id => (
                      <button
                        key={id}
                        onClick={() => setIdentity(id)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          identity === id 
                          ? 'bg-indigo-600 text-white shadow-2xl border-indigo-400' 
                          : 'bg-slate-900/40 text-slate-500 border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <CategoryGroup 
                  icon={<Users size={18} />} 
                  title="Компания" 
                  items={PLANNER_CATEGORIES.company} 
                  selected={selectedCompany} 
                  onToggle={i => toggleSelection(selectedCompany, setSelectedCompany, i)} 
                />
                <CategoryGroup 
                  icon={<Zap size={18} />} 
                  title="Условия" 
                  items={PLANNER_CATEGORIES.conditions} 
                  selected={selectedConditions} 
                  onToggle={i => toggleSelection(selectedConditions, setSelectedConditions, i)} 
                />
              </div>
            </div>

            <div className="flex justify-center mt-16">
              <button 
                onClick={handleGeneratePlan}
                disabled={loadingPlan || !hasApiKey}
                className="group w-full md:w-auto px-16 py-7 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2.5rem] font-black text-xl md:text-2xl transition-all shadow-2xl shadow-indigo-900/40 active:scale-95 disabled:opacity-30 flex items-center justify-center gap-5 border border-indigo-400/30"
              >
                {loadingPlan ? (
                  <>
                    <Loader2 className="animate-spin" size={28} />
                    <span>Формирование сценария...</span>
                  </>
                ) : (
                  <>
                    <span>Сгенерировать План</span>
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {(planResult || error) && (
              <div ref={planRef} className={`mt-24 p-10 md:p-20 bg-slate-950/60 rounded-[3rem] border ${error ? 'border-red-500/30' : 'border-indigo-500/20'} relative shadow-inner overflow-hidden ${burning ? 'animate-[burn_1.2s_forwards]' : 'animate-fade-in'}`}>
                <div className="absolute top-10 right-10 flex gap-4 z-10">
                   {planResult && (
                     <>
                      <button 
                        onClick={handleHearPlan} 
                        disabled={loadingAudio}
                        className="p-4 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-full transition-all border border-indigo-500/20" 
                        title="Прослушать план"
                      >
                        {loadingAudio ? <Loader2 size={24} className="animate-spin" /> : <Volume2 size={24} />}
                      </button>
                      <button onClick={() => window.print()} className="p-4 text-slate-500 hover:text-white hover:bg-white/10 rounded-full transition-all" title="Печать">
                        <Printer size={24} />
                      </button>
                     </>
                   )}
                   <button onClick={burnPlan} className="p-4 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all" title="Сжечь план">
                    <Trash2 size={24} />
                  </button>
                </div>
                
                {error ? (
                  <div className="flex items-center gap-6 text-red-400 p-8 bg-red-950/20 rounded-3xl border border-red-900/30">
                    <AlertCircle className="shrink-0 text-red-500" size={32} />
                    <p className="text-xl leading-relaxed">{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="prose prose-invert prose-indigo max-w-none prose-headings:font-orbitron prose-headings:text-indigo-400 prose-headings:uppercase prose-headings:tracking-widest prose-p:text-slate-300 prose-li:text-slate-300">
                       <div className="font-light text-xl md:text-2xl leading-relaxed whitespace-pre-wrap selection:bg-indigo-500/40">
                        {planResult}
                      </div>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-5 border-t border-white/5 pt-12">
                      <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black hover:bg-white/10 transition-all uppercase tracking-widest text-slate-400 hover:text-white">
                        <Calendar size={16} /> Добавить в iCal
                      </button>
                      <button 
                        className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black hover:bg-indigo-500 transition-all uppercase tracking-widest shadow-xl" 
                        onClick={() => {
                          if (planResult) {
                            navigator.clipboard.writeText(planResult);
                            alert('Текст скопирован');
                          }
                        }}
                      >
                        <Share2 size={16} /> Поделиться
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Poster Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-start">
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full text-[10px] text-emerald-400 font-black uppercase tracking-[0.4em]">
                <ImageIcon size={14} /> Визуальный манифест
              </div>
              <h2 className="text-5xl md:text-9xl font-black font-orbitron leading-none tracking-tighter text-white">
                Арт <br /><span className="text-emerald-400">Правда</span>
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl font-light leading-relaxed">
                Твой праздник — твоя позиция. Создай уникальный постер-высказывание для своих социальных сетей.
              </p>
            </div>

            <div className="space-y-12 glass-morphism p-10 md:p-16 rounded-[3.5rem] border border-slate-800 bg-black/40 shadow-2xl">
              <div className="space-y-4">
                <label className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em]">Тема кампании</label>
                <select 
                  value={posterTheme} 
                  onChange={e => setPosterTheme(e.target.value)}
                  className="w-full p-5 bg-slate-950 border border-slate-800 rounded-3xl text-white focus:border-emerald-500 transition-all cursor-pointer text-base font-medium appearance-none"
                >
                  {POSTER_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em]">Лозунг-концепт</label>
                <div className="flex flex-col gap-3">
                  {SLOGANS.map(s => (
                    <button
                      key={s}
                      onClick={() => setPosterSlogan(s)}
                      className={`p-5 text-left rounded-2xl text-sm transition-all border font-bold ${posterSlogan === s ? 'bg-emerald-900/30 border-emerald-500 text-white shadow-xl' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em]">Стиль</label>
                  <select 
                    value={posterStyle} 
                    onChange={e => setPosterStyle(e.target.value)}
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs font-bold appearance-none"
                  >
                    {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase text-slate-600 font-black tracking-[0.3em]">Мотив</label>
                  <select 
                    value={posterMotive} 
                    onChange={e => setPosterMotive(e.target.value)}
                    className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs font-bold appearance-none"
                  >
                    {MOTIVES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              {posterError && (
                <div className="p-6 bg-red-950/20 border border-red-900/30 rounded-2xl flex items-center gap-3 text-red-400 font-bold uppercase text-[10px]">
                  <AlertCircle size={20} />
                  <p>{posterError}</p>
                </div>
              )}

              <button 
                onClick={handleGeneratePoster}
                disabled={loadingPoster || !hasApiKey}
                className="w-full py-7 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-xl md:text-2xl transition-all shadow-2xl shadow-emerald-950/20 active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-4 border border-emerald-400/30"
              >
                {loadingPoster ? <><Loader2 className="animate-spin" size={24} /> Рендеринг манифеста...</> : 'Создать Манифест'}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 w-full glass-morphism rounded-[4rem] border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-black/60 group">
            {posterResult ? (
              <div className="relative w-full animate-fade-in flex flex-col items-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-[3rem] border border-white/5 bg-black/40 shadow-inner">
                   <img 
                    src={resolvePath(posterResult.url)} 
                    alt="AI Poster" 
                    className="w-full h-full object-cover" 
                   />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-6">
                     <button 
                       onClick={handleDownloadPoster}
                       className="px-10 py-5 bg-white text-black font-black rounded-full hover:scale-110 active:scale-95 transition-all flex items-center gap-3 shadow-2xl"
                     >
                       <Download size={24} /> Скачать High-Res
                     </button>
                   </div>
                </div>
                
                <div className="mt-10 w-full text-center space-y-8">
                   <p className="text-emerald-400 font-orbitron text-sm font-black uppercase tracking-[0.5em] truncate px-6">
                    {posterResult.slogan}
                   </p>
                   
                   <div className="flex justify-center">
                    <button 
                      onClick={handleDownloadPoster}
                      className="flex items-center gap-3 px-8 py-4 bg-emerald-600/10 border border-emerald-500/30 rounded-2xl text-[10px] font-black hover:bg-emerald-600 hover:text-white transition-all uppercase tracking-widest text-emerald-400 shadow-xl"
                    >
                      <Download size={18} /> Сохранить манифест
                    </button>
                   </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 opacity-20 group-hover:opacity-30 transition-opacity aspect-square flex flex-col items-center justify-center">
                <ImageIcon size={100} className="mx-auto text-slate-700" />
                <div className="space-y-3">
                  <p className="font-orbitron uppercase text-lg tracking-[0.8em] font-black text-white">READY FOR RENDER</p>
                  <p className="text-[10px] text-slate-500 max-w-[250px] mx-auto uppercase tracking-[0.3em] font-black">Визуальное высказывание будет проявлено после настройки параметров</p>
                </div>
              </div>
            )}

            {loadingPoster && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 z-20">
                <div className="relative">
                  <div className="w-32 h-32 border-8 border-emerald-500/10 rounded-full"></div>
                  <div className="absolute inset-0 w-32 h-32 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-emerald-500"><Sparkles size={32} className="animate-pulse" /></span>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-emerald-400 font-black tracking-[0.6em] animate-pulse font-orbitron uppercase text-sm">ВИЗУАЛИЗАЦИЯ ПОТОКА</p>
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">GEMINI_IMAGE_GEN_v2.5_ACTIVE</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes burn {
          0% { filter: brightness(1) blur(0); transform: scale(1); opacity: 1; }
          30% { filter: brightness(3) contrast(1.5) blur(2px); transform: scale(1.03); }
          100% { filter: brightness(0) blur(60px); transform: translateY(-150px) scale(0.6); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

const CategoryGroup: React.FC<{ icon: React.ReactNode, title: string, items: string[], selected: string[], onToggle: (i: string) => void }> = ({ icon, title, items, selected, onToggle }) => (
  <div className="space-y-8">
    <div className="flex items-center gap-4 text-[10px] uppercase text-slate-600 font-black tracking-[0.4em]">
      {icon} {title}
    </div>
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`flex items-center gap-5 p-5 rounded-3xl text-sm transition-all duration-500 border font-bold ${
            selected.includes(item) 
            ? 'bg-indigo-900/30 border-indigo-500 text-white shadow-2xl' 
            : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
          }`}
        >
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${selected.includes(item) ? 'bg-indigo-600 border-indigo-400 scale-110' : 'bg-slate-950 border-slate-800'}`}>
            {selected.includes(item) && <Check size={16} className="text-white" strokeWidth={3} />}
          </div>
          <span className="truncate">{item}</span>
        </button>
      ))}
    </div>
  </div>
);

export default AISection;
