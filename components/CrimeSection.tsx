
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CRIMES_DATA } from '../constants';
import { ShieldAlert } from 'lucide-react';

const CrimeSection: React.FC = () => {
  return (
    <section className="relative min-h-screen py-24 px-6 bg-gradient-to-b from-slate-950 to-red-950/30">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="flex items-center gap-3 text-red-500">
            <ShieldAlert size={48} />
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase">Ночь Судного дня</h2>
          </div>
          
          <div className="space-y-6 text-lg text-slate-300 font-light">
            <p className="border-l-4 border-red-600 pl-4 py-2">
              31 декабря — самая опасная ночь года во всей Европе и странах СНГ. 
              В Нидерландах, Германии и странах содружества это абсолютный пик вызовов полиции и экстренных служб.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">»</span>
                <span>
                  <strong>Всплеск насилия:</strong> По данным ВОЗ, уровень бытового насилия в период зимних праздников в Европе и СНГ возрастает на 25-40%.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">»</span>
                <span>
                  <strong>Алкогольный террор:</strong> Согласно Eurostat, количество госпитализаций с тяжелыми отравлениями и травмами в новогоднюю ночь в 6 раз выше среднегодового показателя.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">»</span>
                <span>
                  <strong>Трагедии на дорогах:</strong> Статистика СНГ и ЕС подтверждает: риск ДТП со смертельным исходом из-за нетрезвого вождения увеличивается в 4.5 раза именно 31 декабря и 1 января.
                </span>
              </li>
            </ul>
            <div className="pt-4 space-y-2">
              <p className="italic text-slate-500 font-ruslan text-2xl">
                «Это не праздник. Это статистика.»
              </p>
              <div className="text-[10px] text-slate-600 uppercase tracking-tighter flex flex-wrap gap-2">
                <span>Источники:</span>
                <span className="underline decoration-red-900">WHO (World Health Organization)</span>
                <span className="underline decoration-red-900">Eurostat</span>
                <span className="underline decoration-red-900">CIS Stat Committee</span>
                <span className="underline decoration-red-900">Politie.nl</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-4">
          <div className="glass-morphism p-6 rounded-3xl border border-red-500/30 overflow-hidden relative shadow-2xl">
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold text-red-600 tracking-tighter bg-black/50 px-2 rounded">CCTV: LIVE STREAM - NYE_EURO_CIS_HUB</span>
            </div>
            <h3 className="text-center text-xs uppercase text-slate-500 mb-8 tracking-widest mt-6">Глобальный индекс происшествий (EU & СНГ)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CRIMES_DATA}>
                  <defs>
                    <linearGradient id="colorCrime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7f1d1d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7f1d1d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #7f1d1d', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#ef4444' }}
                    cursor={{ stroke: '#7f1d1d', strokeWidth: 2 }}
                  />
                  <Area type="monotone" dataKey="crime" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCrime)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-right uppercase tracking-widest">Консолидированные данные по региону за 2019-2024 гг.</p>
        </div>
      </div>
    </section>
  );
};

export default CrimeSection;
