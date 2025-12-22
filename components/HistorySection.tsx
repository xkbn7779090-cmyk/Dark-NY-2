
import React, { useState } from 'react';
import { HISTORY_CHARACTERS } from '../constants';
import { Plus, Minus } from 'lucide-react';

const HistorySection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('krampus');

  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-amber-500">Корни праздника</h2>
          <p className="text-slate-400 font-light text-lg">Добрый дедушка не всегда был добрым</p>
        </div>

        <div className="space-y-4">
          {HISTORY_CHARACTERS.map((char) => (
            <div 
              key={char.id} 
              className={`glass-morphism rounded-3xl border transition-all duration-500 overflow-hidden ${openId === char.id ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'}`}
            >
              <button 
                onClick={() => setOpenId(openId === char.id ? null : char.id)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className="text-3xl font-ruslan text-white group-hover:text-amber-500 transition-colors">{char.name}</span>
                <div className={`p-2 rounded-full transition-all ${openId === char.id ? 'bg-amber-500 text-black rotate-180' : 'bg-slate-900 text-slate-500'}`}>
                  {openId === char.id ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              {openId === char.id && (
                <div className="p-8 pt-0 flex flex-col md:flex-row gap-12 items-center md:items-start animate-fade-in">
                  <div className="flex-1 space-y-6">
                    <p className="text-slate-300 leading-relaxed text-xl font-light">{char.description}</p>
                    <p className="text-slate-500 italic text-sm border-l-2 border-slate-800 pl-4">
                      Раньше праздники служили способом задобрить тьму, а не просто поводом для шоппинга. 
                      Мы забыли истинные лица тех, кто приходит в самую длинную ночь года.
                    </p>
                  </div>
                  {char.image && (
                    <div className="w-full md:w-64 h-80 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
                      <img 
                        src={char.image} 
                        alt={char.name} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                        style={{ opacity: 0, transition: 'opacity 0.5s' }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[2rem] bg-gradient-to-br from-amber-900/10 to-transparent border border-amber-500/10 text-center">
          <p className="text-2xl text-amber-100 font-light font-ruslan max-w-2xl mx-auto leading-relaxed">
            «Святой Николай забирал детей в рабство. Йоулупукки варил непослушных в котле. 
            Советская власть сделала их добрыми, чтобы контролировать наши мечты.»
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
