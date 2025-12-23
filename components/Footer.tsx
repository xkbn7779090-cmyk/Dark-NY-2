
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 text-center">
        
        <div className="space-y-4">
          <p className="text-[10px] text-slate-600 font-bold tracking-[0.5em] uppercase opacity-70">
            © 2025/2026 СПЕЦПРОЕКТ «ОБРАТНАЯ СТОРОНА»
          </p>
          <p className="text-slate-500 text-sm font-light">
            Автор идеи и реализация: <span className="text-white font-bold tracking-tight">Jan Tar</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
           <button 
            onClick={() => window.open('https://t.me/conscion_nye', '_blank')}
            className="px-10 py-3 border border-slate-800 text-slate-500 text-[11px] uppercase tracking-[0.3em] font-bold hover:text-white hover:border-slate-600 transition-all rounded-full hover:bg-slate-900/30"
          >
            Связаться с сообществом
          </button>
          
          <div className="flex gap-8 text-[9px] text-slate-700 uppercase tracking-widest font-bold">
            <button className="hover:text-slate-400 transition-colors">Методология</button>
            <button className="hover:text-slate-400 transition-colors">Источники</button>
            <button className="hover:text-slate-400 transition-colors">Privacy Policy</button>
          </div>
        </div>

        <p className="text-[9px] text-slate-800 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
          Проект является социальным высказыванием. все данные основаны на открытых источниках и статистических отчетах за 2019-2024 гг.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
