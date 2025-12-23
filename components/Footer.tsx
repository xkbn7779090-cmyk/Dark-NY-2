
import React from 'react';
import { SOURCES } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto space-y-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
             <h4 className="font-orbitron font-bold text-lg text-white tracking-tighter">DARK NY <span className="text-red-600">2.0</span></h4>
             <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
              Иммерсивный проект-высказывание о праздновании Нового года для русскоязычной диаспоры в Европе.
             </p>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Статистика</h5>
            <div className="flex flex-col gap-3">
              {SOURCES.crime.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener" className="text-slate-500 hover:text-white transition-colors text-xs">{s.name}</a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Экология</h5>
            <div className="flex flex-col gap-3">
              {SOURCES.ecology.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener" className="text-slate-500 hover:text-white transition-colors text-xs">{s.name}</a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Сообщество</h5>
            <div className="flex flex-col gap-4 items-start">
               <button 
                onClick={() => window.open('https://t.me/conscion_nye', '_blank')}
                className="px-6 py-3 border border-slate-800 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white hover:border-slate-600 transition-all rounded-xl bg-slate-900/40"
              >
                Telegram Чат
              </button>
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Support: hello@darkny.org</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <p className="text-[10px] text-slate-700 font-bold tracking-[0.5em] uppercase">
              © 2024/2025 СПЕЦПРОЕКТ «ОБРАТНАЯ СТОРОНА»
            </p>
            <p className="text-slate-600 text-xs font-light">
              Дизайн и реализация: <span className="text-slate-400 font-bold">Jan Tar</span>
            </p>
          </div>
          
          <div className="flex gap-8 text-[9px] text-slate-700 uppercase tracking-[0.2em] font-bold">
            <button className="hover:text-slate-400 transition-colors">Методология</button>
            <button className="hover:text-slate-400 transition-colors">GDPR</button>
            <button className="hover:text-slate-400 transition-colors">Cookie Policy</button>
          </div>
        </div>

        <p className="text-[10px] text-slate-800 text-center uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed font-bold">
          Проект является социальным высказыванием. Все данные основаны на открытых источниках и статистических отчетах за 2019-2024 гг. Мы уважаем ваши традиции и не принуждаем к действию.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
