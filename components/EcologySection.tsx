import React, { useState } from 'react';
import { TreeDeciduous } from 'lucide-react';

const EcologySection: React.FC = () => {
  const [budget, setBudget] = useState(100);

  const stats = {
    trees: Math.floor(budget / 30),
    co2: budget * 0.5,
    trash: Math.floor(budget / 10)
  };

  const getPlaceholder = (text: string) => 
    `https://via.placeholder.com/800x1000/020617/059669?text=${encodeURIComponent(text)}`;

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-950 to-emerald-950/20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-emerald-500">
            <TreeDeciduous size={48} />
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase">Цена праздника</h2>
          </div>
          
          <h3 className="text-2xl font-bold text-emerald-200">10 лет роста — 8 дней в твоей гостиной</h3>
          
          <div className="space-y-6 text-lg text-slate-300 font-light">
            <p>
              В Европе живая ёлка стоит 50–120 €. Через неделю она отправится в мусор. 
              Фейерверки официально запрещены почти везде, но штрафы в 400–900 € не пугают тех, кто привык тратить.
            </p>
            <p className="text-emerald-400 font-bold">
              Каждая ёлка — это не просто дерево. Это выброшенный в атмосферу метан при гниении на свалке.
            </p>
          </div>

          <div className="glass-morphism p-8 rounded-3xl border border-emerald-500/20 space-y-6">
            <h4 className="text-xl font-orbitron text-white">Калькулятор вреда</h4>
            <div className="space-y-4">
              <label className="block text-sm text-slate-400">Твой праздничный бюджет (€)</label>
              <input 
                type="range" 
                min="0" max="1000" step="10" 
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="text-4xl font-orbitron font-bold text-emerald-500">{budget} €</div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.trees}</div>
                <div className="text-[10px] uppercase text-slate-500">Посадок деревьев</div>
              </div>
              <div className="text-center border-x border-slate-800">
                <div className="text-2xl font-bold text-white">{stats.co2}</div>
                <div className="text-[10px] uppercase text-slate-500">кг CO₂ выбросов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.trash}</div>
                <div className="text-[10px] uppercase text-slate-500">кг мусора</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl aspect-[4/5] bg-slate-900 border border-emerald-500/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1545642433-286821d3f961?q=80&w=800&auto=format&fit=crop" 
            alt="Discarded Christmas trees on the street" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            onError={(e) => { (e.target as HTMLImageElement).src = getPlaceholder('Ecology Issue'); }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-8">
            <div className="p-4 bg-red-600/80 text-white text-xs font-bold uppercase tracking-widest inline-block mb-4 self-start">
              Экоцид по расписанию
            </div>
            <p className="text-slate-400 text-sm">
              Миллионы деревьев ежегодно вырубаются ради 200 часов «уюта» (среднее время жизни елки в доме). 
              Остатки пиротехники десятилетиями загрязняют почву и воду в парках Европы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcologySection;
