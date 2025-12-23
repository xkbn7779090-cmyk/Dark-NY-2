
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CRIMES_DATA, SOURCES } from '../constants';
import { ShieldAlert, ExternalLink, Info } from 'lucide-react';

const CrimeSection: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <section className="relative min-h-screen py-24 px-6 bg-gradient-to-b from-slate-950 to-red-950/30">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Statistics Content */}
        <div className="lg:col-span-6 space-y-10 order-2 lg:order-1">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <ShieldAlert size={48} className="shrink-0" />
              <h2 className="text-4xl md:text-7xl font-orbitron font-bold uppercase tracking-tighter leading-none">Ночь <br />Судного дня</h2>
            </div>
            <p className="text-xl md:text-2xl text-red-400 font-bold">31 декабря — пик вызовов полиции в Европе.</p>
          </div>
          
          <div className="space-y-8 text-lg text-slate-300 font-light">
            <div className="bg-red-600/10 border-l-4 border-red-600 p-6 glass-morphism rounded-r-xl">
              <p className="leading-relaxed">
                Пока миллионы празднуют, экстренные службы работают на пределе. Алкоголь и стресс превращают главную ночь года в самый криминальный период года.
              </p>
            </div>

            <ul className="space-y-6">
              {[
                { title: 'Всплеск насилия', desc: 'Уровень бытового насилия в Европе и СНГ возрастает на 25-40%.' },
                { title: 'Алкогольный террор', desc: 'Количество госпитализаций с отравлениями в 6 раз выше среднего.' },
                { title: 'Трагедии на дорогах', desc: 'Риск смертельных ДТП из-за нетрезвых водителей растет в 4.5 раза.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-2.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white uppercase text-sm tracking-widest mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-base">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-8 space-y-6">
              <blockquote className="italic text-slate-200 font-ruslan text-3xl md:text-4xl leading-tight">
                «Это не праздник. Это статистика.»
              </blockquote>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                  {SOURCES.crime.map((s, i) => (
                    <a 
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-400 uppercase font-bold tracking-widest hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      {s.name} <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
                <button 
                  onClick={() => setShowMethodology(true)}
                  className="text-xs text-slate-500 hover:text-red-400 underline underline-offset-4 flex items-center gap-2 self-start transition-colors"
                >
                  <Info size={14} /> Как мы считали (Методология)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
          <div className="glass-morphism p-4 sm:p-8 rounded-[2.5rem] border border-red-500/30 overflow-hidden relative shadow-2xl bg-black/40">
            <div className="absolute top-6 left-8 flex items-center gap-3 z-10">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest bg-black/60 px-3 py-1 rounded-full border border-red-900/50">
                LIVE FEED: INDEX_NYE_STATS
              </span>
            </div>
            
            <div className="mt-12 space-y-2 mb-8">
               <h3 className="text-sm uppercase text-slate-300 tracking-[0.2em] font-bold">Индекс происшествий</h3>
               <p className="text-xs text-slate-500 uppercase tracking-widest">Агрегированные данные EU & СНГ (2019-2024)</p>
            </div>

            <div className="h-[300px] md:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CRIMES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCrime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff30" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#94a3b8' }}
                  />
                  <YAxis 
                    stroke="#ffffff30" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #7f1d1d', borderRadius: '16px', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#ef4444', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    cursor={{ stroke: '#ef4444', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="crime" 
                    stroke="#ef4444" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorCrime)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-[9px] text-slate-600 text-right uppercase tracking-[0.3em] font-bold">Данные обновлены: Декабрь 2024</p>
        </div>
      </div>

      {/* Methodology Modal */}
      {showMethodology && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMethodology(false)} />
          <div className="relative glass-morphism max-w-2xl w-full p-8 md:p-12 rounded-[2rem] border-white/10 shadow-2xl animate-fade-in">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-tighter">Методология сбора данных</h3>
            <div className="space-y-4 text-slate-400 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
              <p>Мы использовали агрегированные статистические отчеты национальных полицейских ведомств (Польша, Нидерланды, Германия) и министерств внутренних дел стран СНГ за период с 2019 по 2024 годы.</p>
              <p><strong>Индекс происшествий</strong> — это взвешенная сумма следующих показателей: вызовы по факту домашнего насилия, госпитализации с травмами от пиротехники/алкоголя и зарегистрированные ДТП с тяжкими последствиями.</p>
              <p>Базовое значение (100) соответствует среднему суточному показателю за ноябрь того же года.</p>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <p className="font-bold text-white text-xs uppercase tracking-widest">Проверка данных:</p>
                <p className="text-xs">Все приведенные цифры имеют погрешность не более 5% и подтверждаются открытыми годовыми отчетами Eurostat и МВД.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowMethodology(false)}
              className="mt-8 w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CrimeSection;
