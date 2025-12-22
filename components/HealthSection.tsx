
import React from 'react';
import { Clock, Moon } from 'lucide-react';

const HealthSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-12 z-10 relative">
        <div className="space-y-4">
          <Clock className="w-16 h-16 text-slate-600 mx-auto animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-slate-300">4 утра</h2>
          <p className="text-xl text-slate-500 italic">Ты устал, пьян, зол.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-400">Физическое выгорание</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Переедание, алкоголь, нарушение сна. Организм в шоке от праздничного марафона. 
              Статистика инфарктов 1 января достигает годового максимума.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">Праздничная депрессия</h3>
            <p className="text-slate-400 font-light leading-relaxed">
              Одиночество в Европе чувствуется особенно остро, когда нет большой семьи. 
              Чувство пустоты после "самой важной ночи" ведет к апатии.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        
        <div className="p-8 glass-morphism rounded-3xl border border-slate-500/20 max-w-2xl">
          <Moon className="text-slate-500 mb-4 mx-auto" />
          <p className="text-lg text-slate-300">
            «Многие из нас встречают Новый год в одиночестве или только вдвоём. 
            Вместо тепла — стресс, алкоголь, тоска. Но одиночество — это не приговор, а время для себя.»
          </p>
        </div>
      </div>
      
      {/* Decorative fading silhouette effect */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default HealthSection;
