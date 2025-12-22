
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Trash2, Download, Image as ImageIcon, Check, User, Users, Heart, Zap, ShieldCheck } from 'lucide-react';
import { PLANNER_CATEGORIES, POSTER_THEMES, SLOGANS, STYLES, MOTIVES } from '../constants';

const AISection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [burning, setBurning] = useState(false);

  // Planner State
  const [age, setAge] = useState(25);
  const [identity, setIdentity] = useState("Женщина");
  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // Poster State
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
    setLoading(true);
    setPlanResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        Ты — эксперт по осознанному образу жизни. Сгенерируй сценарий праздника для человека:
        Возраст: ${age}, Идентификация: ${identity}
        Компания: ${selectedCompany.join(', ')}
        Вайб: ${selectedVibes.join(', ')}
        Условия: ${selectedConditions.join(', ')}
        Сценарий должен быть на русском, в 4-6 пунктах, осознанный, атмосферный и без лишних трат.
      `;
      const res = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setPlanResult(res.text || 'Ошибка генерации');
    } catch (e) {
      setPlanResult("Не удалось связаться с AI. Проверьте подключение.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePoster = async () => {
    setLoading(true);
    setImageUrl(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        Conceptual artistic image for a "conscious New Year". 
        Theme: ${posterTheme}. 
        Slogan (Context): ${posterSlogan}. 
        Style: ${posterStyle}. 
        Motive: ${posterMotive}.
        Dark cinematic lighting, symbolic representation, no direct text on image, high resolution.
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
      setLoading(false);
    }
  };

  const burnPlan = () => {
    setBurning(true);
    setTimeout(() => {
      setPlanResult(null);
      setBurning(false);
    }, 1000);
  };

  return (
    <section id="ai-section" className="py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Planner Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold font-orbitron">
              Генератор <span className="text-indigo-400 italic">Альтернативы</span>
            </h2>
            <p className="text-slate-500 mt-4">Создайте сценарий праздника, который подходит именно вам.</p>
          </div>

          <div className="glass-morphism rounded-[2.5rem] p-10 border border-slate-800 space-y-12">
            {/* Age and Identity Row */}
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-bold">
                    <User size={14} /> Возраст
                  </span>
                  <span className="text-2xl font-bold font-orbitron">{age} лет</span>
                </div>
                <input 
                  type="range" 
                  min="18" max="100" 
                  value={age} 
                  onChange={e => setAge(Number(e.target.value))} 
                  className="w-full accent-indigo-500" 
                />
              </div>
              <div className="space-y-4">
                <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-bold">
                  <ShieldCheck size={14} /> Я идентифицирую себя как
                </span>
                <div className="flex flex-wrap gap-2">
                  {PLANNER_CATEGORIES.identities.map(id => (
                    <button
                      key={id}
                      onClick={() => setIdentity(id)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${identity === id ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selection Grids */}
            <div className="grid md:grid-cols-3 gap-12">
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

            <div className="flex justify-center pt-8">
              <button 
                onClick={handleGeneratePlan}
                disabled={loading}
                className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xl transition-all shadow-xl shadow-indigo-900/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Создаем реальность...' : 'Создать План'}
              </button>
            </div>

            {planResult && (
              <div className={`p-8 bg-slate-900/50 rounded-3xl border border-indigo-500/30 animate-fade-in ${burning ? 'animate-[burn_1s_forwards]' : ''}`}>
                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-light text-lg whitespace-pre-wrap">
                  {planResult}
                </div>
                <button onClick={burnPlan} className="flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-bold mt-8">
                  <Trash2 size={16} /> Сожги этот план
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Poster Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/50 border border-indigo-500/30 rounded-full text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
              <Sparkles size={12} /> AI Дизайнер
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-orbitron leading-tight">
              Материалы для <br /><span className="text-indigo-400">Осознанности</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Сгенерируйте уникальный визуальный контент — плакат, открытку или слайд. Выберите тему, лозунг и стиль, чтобы донести правду.
            </p>

            <div className="space-y-6 glass-morphism p-8 rounded-3xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Тема</label>
                <select 
                  value={posterTheme} 
                  onChange={e => setPosterTheme(e.target.value)}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors"
                >
                  {POSTER_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Слоган (Концепт)</label>
                <div className="grid gap-2">
                  {SLOGANS.map(s => (
                    <button
                      key={s}
                      onClick={() => setPosterSlogan(s)}
                      className={`p-4 text-left rounded-xl text-sm transition-all border ${posterSlogan === s ? 'bg-indigo-900/30 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Стиль</label>
                  <select 
                    value={posterStyle} 
                    onChange={e => setPosterStyle(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-indigo-500"
                  >
                    {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Мотив</label>
                  <select 
                    value={posterMotive} 
                    onChange={e => setPosterMotive(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-indigo-500"
                  >
                    {MOTIVES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <button 
                onClick={handleGeneratePoster}
                disabled={loading}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all"
              >
                {loading ? 'Отрисовка...' : 'Создать Арт'}
              </button>
            </div>
          </div>

          {/* Poster Preview */}
          <div className="relative aspect-square glass-morphism rounded-[2.5rem] border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            {imageUrl ? (
              <div className="relative w-full h-full group animate-fade-in">
                <img src={imageUrl} alt="AI Generated Poster" className="w-full h-full object-cover rounded-3xl" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity rounded-3xl gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-full font-bold">
                    <Download size={18} /> Скачать Арт
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 opacity-20">
                <ImageIcon size={80} className="mx-auto" />
                <p className="font-orbitron uppercase text-sm tracking-[0.3em]">Визуальный Превью</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-indigo-400 font-bold tracking-widest animate-pulse">ВИЗУАЛИЗАЦИЯ...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes burn {
          0% { filter: brightness(1); transform: scale(1); opacity: 1; }
          20% { filter: brightness(2) contrast(1.5); transform: scale(1.02); }
          100% { filter: brightness(0) blur(20px); transform: translateY(-50px) scale(0.9); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

const CategoryGroup: React.FC<{ icon: React.ReactNode, title: string, items: string[], selected: string[], onToggle: (i: string) => void }> = ({ icon, title, items, selected, onToggle }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-2 text-[10px] uppercase text-slate-500 font-bold tracking-widest">
      {icon} {title}
      <span className="ml-auto text-[8px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Мульти-выбор</span>
    </div>
    <div className="grid gap-2">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`flex items-center gap-3 p-4 rounded-2xl text-sm transition-all border ${selected.includes(item) ? 'bg-indigo-900/20 border-indigo-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'}`}
        >
          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selected.includes(item) ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-950 border-slate-800'}`}>
            {selected.includes(item) && <Check size={14} className="text-white" />}
          </div>
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default AISection;
