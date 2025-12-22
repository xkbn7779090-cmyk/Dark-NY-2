
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        <div className="w-full h-px bg-slate-900 mb-8"></div>
        
        <div className="text-center space-y-4">
          <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase">
            © 2025/2026 СПЕЦПРОЕКТ «ОБРАТНАЯ СТОРОНА»
          </p>
          <p className="text-slate-500 text-sm font-light">
            Автор идеи и реализация: <span className="text-white font-bold ml-1">Jan Tar</span>
          </p>
        </div>

        <button 
          onClick={() => window.open('https://t.me/conscion_nye', '_blank')}
          className="mt-8 px-6 py-2 border border-slate-800 text-slate-500 text-[10px] uppercase tracking-widest hover:text-white hover:border-slate-600 transition-all rounded"
        >
          Связаться с сообществом
        </button>
      </div>
    </footer>
  );
};

export default Footer;
