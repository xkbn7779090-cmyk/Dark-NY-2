
import React from 'react';
import { Instagram, CreditCard } from 'lucide-react';

const SocialSection: React.FC = () => {
  const scrollToPlanner = () => {
    document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-blue-400">FOMO* и долги</h2>
          <p className="text-slate-400 font-light text-xl">Ты не должен соответствовать маркетингу</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-morphism p-8 rounded-3xl border border-blue-500/20 space-y-6 relative overflow-hidden group">
            <Instagram className="text-blue-500 w-12 h-12" />
            <h3 className="text-xl font-bold text-white">Иллюзия успеха</h3>
            <p className="text-slate-400 leading-relaxed">
              В Instagram все летят в Лапландию или покупают подарки на 500 €. 
              Это создает чувство неполноценности у тех, чей бюджет в Европе ограничен 200 € на всё.
            </p>
            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Instagram size={120} />
            </div>
          </div>

          <div className="glass-morphism p-8 rounded-3xl border border-blue-500/20 space-y-6 relative overflow-hidden group">
            <CreditCard className="text-red-500 w-12 h-12" />
            <h3 className="text-xl font-bold text-white">Кредитная мишура</h3>
            <p className="text-slate-400 leading-relaxed">
              Многие празднуют в долг, используя Klarna или кредитные карты. 
              Январь становится месяцем жесткой экономии и депрессии из-за праздничной пыли в глаза.
            </p>
            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <CreditCard size={120} />
            </div>
          </div>

          <div className="glass-morphism p-8 rounded-3xl border border-green-500/20 space-y-6 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-orbitron font-bold text-green-400">Выход есть</h3>
            <p className="text-slate-300 text-lg">
              Настоящая радость не в вещах. 
              Ты имеешь право провести этот вечер спокойно, без долгов и пустых трат.
            </p>
            <button 
              onClick={scrollToPlanner}
              className="mt-6 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-95"
            >
              Я отказываюсь от суеты
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest max-w-lg mx-auto">
            *FOMO (Fear of Missing Out) — синдром упущенной выгоды: страх пропустить интересное событие или выглядеть «хуже других» в социальных сетях.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             {['#ОсознанныйНГ', '#БезДолгов', '#НастоящийПраздник', '#MinimalistNY'].map((tag, i) => (
               <span key={i} className="px-4 py-1 rounded-full border border-slate-700 text-slate-500 text-xs font-bold tracking-widest">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
