import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Trash2, Download, Image as ImageIcon, Check, User, Users, Heart, Zap, ShieldCheck, ChevronRight, Share2 } from 'lucide-react';
import { PLANNER_CATEGORIES, POSTER_THEMES, SLOGANS, STYLES, MOTIVES } from '../constants';

const AISection: React.FC = () => {
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingPoster, setLoadingPoster] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [burning, setBurning] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  const [age, setAge] = useState(25);
  const [identity, setIdentity] = useState("Женщина");
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const [posterTheme, setPosterTheme] = useState(POSTER_THEMES[0]);
  const [posterSlogan, setPosterSlogan] = useState(SLOGANS[1]);
  const [posterStyle, setPosterStyle] = useState(STYLES[0]);
  const [posterMotive, setPosterMotive] = useState(MOTIVES[0]);

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
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Ты — эксперт по осознанному образу жизни. Сгенерируй сценарий праздника для человека:
        Возраст: ${age}, Идентификация: ${identity}
        Компания: ${selectedCompany.join(', ')}
        Вайб: ${selectedVibes.join(', ')}
        Условия: ${selectedConditions.join(', ')}
        
        Сценарий должен быть на русском, иметь четкую структуру:
        1. Таймлайн (вечер/ночь)
        2. Мини-ритуал для себя
        3. Социальный сценарий (если не один)
        4. Если накроет тревога (поддержка)
        
        Используй теплую, поддерживающую интонацию.
      `;
      const res = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setPlanResult(res.text || 'Ошибка генерации');
      setTimeout(() => planRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (e) {
      setPlanResult("Не удалось связаться with AI. Проверьте подключение.");
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleGeneratePoster = async () => {
    setLoadingPoster(true);
    setImageUrl(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Conceptual artistic image for a "conscious New Year" campaign. 
        Theme: ${posterTheme}. 
        Visual Slogan Concept: ${posterSlogan}. 
        Style: ${posterStyle}. 
        Motive: ${posterMotive}.
        
        Dark cinematic noir aesthetic. Symbolic, deep shadows, neon highlights.
        NO TEXT ON THE IMAGE.
      `;
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      const parts = res.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find(p => p.inlineData);
      if (imgPart?.inlineData) {
        setImageUrl(`data:image/png;base64,${imgPart.inlineData.data}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPoster(false);
    }
  };

  const burnPlan = () => {
    setBurning(true);
    setTimeout(() => {
      setPlanResult(null);
      setBurning(false);
    }, 1000);
  };

  const getPlaceholder = (text: string) => 
    `https://via.placeholder.com/1080/020617/6366f1?text=${encodeURIComponent(text)}`;

  return (
    <section id="ai-section" className="py-16 md:py-24 px-4 md:px-6 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
        
        <div className="space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold font-orbitron leading-tight tracking-tighter">
              Генератор <span className="text-indigo-500 italic">Альтернативы</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-lg font-light">Создайте сценарий праздника, который подходит именно вам.</p>
          </div>

          <div className="glass-morphism rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-14 border border-slate-800 space-y-12 md:space-y-16 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
              <div className="space-y-6 md:space-y-8">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-indigo-400 font-bold">
                    <User size={14} /> Возраст
                  </span>
                  <span className="text-2xl md:text-3xl font-bold font-orbitron text-white">{age} лет</span>
                </div>
                <input 
                  type="range" 
                  min="18" max="100" 
                  value={age} 
                  onChange={e => setAge(Number(e.target.value))} 
                  className="w-full accent-indigo-500 h-1.5 md:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" 
                />
              </div>

              <div className="space-y-4 md:space-y-6">
                <span className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-indigo-400 font-bold">
                  <ShieldCheck size={14} /> Я идентифицирую себя как
                </span>
                <div className="flex flex-wrap gap-2">
                  {PLANNER_CATEGORIES.identities.map(id => (
                    <button
                      key={id}
                      onClick={() => setIdentity(id)}
                      className={`px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold transition-all ${
                        identity === id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                        : 'bg-slate-900/40 text-slate-400 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <CategoryGroup 
                icon={<Users size={16} />} 
                title="Компания" 
                items={PLANNER_CATEGORIES.company} 
                selected={selectedCompany} 
                onToggle={i => toggleSelection(selectedCompany, setSelectedCompany, i)} 
              />
              <CategoryGroup 
                icon={<Heart size={16} />} 
                title="Вайб" 
                items={PLANNER_CATEGORIES.vibes} 
                selected={selectedVibes} 
                onToggle={i => toggleSelection(selectedVibes, setSelectedVibes, i)} 
              />
              <CategoryGroup 
                icon={<Zap size={16} />} 
                title="Условия" 
                items={PLANNER_CATEGORIES.conditions} 
                selected={selectedConditions} 
                onToggle={i => toggleSelection(selectedConditions, setSelectedConditions, i)} 
              />
            </div>

            <div className="flex justify-center pt-4 md:pt-8">
              <button 
                onClick={handleGeneratePlan}
                disabled={loadingPlan}
                className="group w-full sm:w-auto px-10 md:px-20 py-4 md:py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] md:rounded-[2rem] font-bold text-lg md:text-2xl transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {loadingPlan ? 'Инициализация...' : 'Создать Сценарий'}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {planResult && (
              <div ref={planRef} className={`mt-12 md:mt-20 p-6 md:p-12 bg-slate-900/30 rounded-[2rem] md:rounded-[3rem] border border-indigo-500/20 animate-fade-in relative shadow-inner ${burning ? 'animate-[burn_1s_forwards]' : ''}`}>
                <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-2 md:gap-4">
                   <button onClick={burnPlan} className="p-2 md:p-4 text-red-500 hover:bg-red-500/10 rounded-full transition-colors" title="Сжечь">
                    <Trash2 size={24} className="md:w-7 md:h-7" />
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed font-light text-base md:text-2xl whitespace-pre-wrap">
                  {planResult}
                </div>
                <div className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                    <Download size={14} /> PDF
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                    <Share2 size={14} /> Поделиться
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-8 md:space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/40 border border-indigo-500/30 rounded-full text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
              <Sparkles size={12} /> AI Дизайнер
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold font-orbitron leading-tight tracking-tighter">
              Материалы для <br /><span className="text-indigo-400">Осознанности</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Сгенерируйте уникальный визуальный контент — плакат, открытку или слайд. Выберите тему, лозунг и стиль.
            </p>

            <div className="space-y-6 md:space-y-8 glass-morphism p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-800">
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Тема</label>
                <select 
                  value={posterTheme} 
                  onChange={e => setPosterTheme(e.target.value)}
                  className="w-full p-3 md:p-4 bg-slate-950 border border-slate-800 rounded-xl md:rounded-2xl text-white outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer text-sm md:text-base"
                >
                  {POSTER_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-3 md:space-y-4">
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Слоган (Концепт)</label>
                <div className="grid gap-2">
                  {SLOGANS.map(s => (
                    <button
                      key={s}
                      onClick={() => setPosterSlogan(s)}
                      className={`p-3 md:p-4 text-left rounded-xl md:rounded-2xl text-xs md:text-sm transition-all border ${posterSlogan === s ? 'bg-indigo-900/30 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Стиль</label>
                  <select 
                    value={posterStyle} 
                    onChange={e => setPosterStyle(e.target.value)}
                    className="w-full p-2.5 md:p-3 bg-slate-950 border border-slate-800 rounded-xl md:rounded-2xl text-white outline-none focus:border-indigo-500 text-xs md:text-sm"
                  >
                    {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Мотив</label>
                  <select 
                    value={posterMotive} 
                    onChange={e => setPosterMotive(e.target.value)}
                    className="w-full p-2.5 md:p-3 bg-slate-950 border border-slate-800 rounded-xl md:rounded-2xl text-white outline-none focus:border-indigo-500 text-xs md:text-sm"
                  >
                    {MOTIVES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGeneratePoster}
                disabled={loadingPoster}
                className="w-full py-4 md:py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl md:rounded-3xl font-bold text-base md:text-xl transition-all shadow-xl shadow-indigo-900/20 active:scale-[0.98] disabled:opacity-50"
              >
                {loadingPoster ? 'Отрисовка Арт-объекта...' : 'Создать Арт'}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 aspect-[4/5] w-full glass-morphism rounded-[2rem] md:rounded-[3rem] border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 shadow-2xl bg-slate-900/50">
            {imageUrl ? (
              <div className="relative w-full h-full group animate-fade-in flex flex-col">
                <div className="flex-1 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/5 bg-black/20">
                   <img 
                    src={imageUrl} 
                    alt="AI Generated Poster" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholder('Generated Poster'); }}
                   />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity rounded-[1.5rem] md:rounded-[2rem] gap-4 md:gap-6">
                  <button className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all text-sm md:text-base">
                    <Download size={20} /> Скачать
                  </button>
                </div>
                <div className="mt-4 md:mt-6 text-center">
                   <p className="text-indigo-400 font-orbitron text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] truncate px-2">{posterSlogan}</p>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 md:space-y-6 opacity-20">
                <ImageIcon size={64} className="mx-auto md:w-20 md:h-20" />
                <p className="font-orbitron uppercase text-xs md:text-sm tracking-[0.4em] font-bold">Ожидание Сигнала</p>
                <p className="text-[8px] md:text-xs text-slate-500 max-w-[150px] md:max-w-[200px] mx-auto uppercase">Визуальная правда будет здесь</p>
              </div>
            )}

            {loadingPoster && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 md:gap-6 z-20">
                <div className="w-12 h-12 md:w-20 md:h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center space-y-1 md:space-y-2">
                  <p className="text-indigo-400 font-bold tracking-[0.5em] animate-pulse font-orbitron uppercase text-[10px] md:text-xs">ВИЗУАЛИЗАЦИЯ...</p>
                  <p className="text-[8px] md:text-[10px] text-slate-600 font-bold">GEMINI ENGINE: ACTIVE</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes burn {
          0% { filter: brightness(1); transform: scale(1); opacity: 1; }
          20% { filter: brightness(2) contrast(1.5); transform: scale(1.02); }
          100% { filter: brightness(0) blur(40px); transform: translateY(-100px) scale(0.8); opacity: 0; }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
          cursor: pointer;
        }
        @media (min-width: 768px) {
          input[type='range']::-webkit-slider-thumb {
            height: 24px;
            width: 24px;
          }
        }
      `}</style>
    </section>
  );
};

const CategoryGroup: React.FC<{ icon: React.ReactNode, title: string, items: string[], selected: string[], onToggle: (i: string) => void }> = ({ icon, title, items, selected, onToggle }) => (
  <div className="space-y-4 md:space-y-6">
    <div className="flex items-center gap-3 text-[9px] md:text-[10px] uppercase text-slate-500 font-bold tracking-[0.4em]">
      {icon} {title}
      <span className="ml-auto text-[7px] md:text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Multi</span>
    </div>
    <div className="grid gap-2 md:gap-3">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`flex items-center gap-3 md:gap-4 p-3 md:p-5 rounded-xl md:rounded-[1.5rem] text-xs md:text-sm transition-all duration-300 border ${
            selected.includes(item) 
            ? 'bg-indigo-900/10 border-indigo-500 text-white shadow-xl shadow-indigo-600/10' 
            : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
          }`}
        >
          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg flex items-center justify-center border transition-all ${selected.includes(item) ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-950 border-slate-800'}`}>
            {selected.includes(item) && <Check size={14} className="text-white md:w-4 md:h-4" />}
          </div>
          <span className="font-medium truncate">{item}</span>
        </button>
      ))}
    </div>
  </div>
);

export default AISection;
