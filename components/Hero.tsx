
import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2025-12-31T23:59:59').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10">
      <style>{`
        @keyframes tinsel-crack {
          0% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 0.7; }
          30% { clip-path: polygon(0% 0%, 40% 10%, 60% 0%, 100% 10%, 100% 40%, 70% 50%, 100% 60%, 100% 100%, 60% 90%, 40% 100%, 0% 90%, 30% 50%, 0% 40%); }
          60% { clip-path: polygon(10% 10%, 30% 5%, 50% 15%, 80% 5%, 90% 30%, 60% 40%, 85% 60%, 70% 80%, 40% 70%, 20% 90%, 5% 60%, 25% 45%, 5% 25%); opacity: 0.4; }
          100% { clip-path: polygon(20% 20%, 25% 22%, 22% 25%, 30% 30%, 28% 32%, 35% 35%, 30% 40%); opacity: 0; transform: translateY(100vh) rotate(15deg); }
        }
        .tinsel-overlay { position: absolute; inset: 0; background: linear-gradient(45deg, rgba(0,255,234,0.05), rgba(127,29,29,0.05)); pointer-events: none; z-index: -1; }
        .tinsel-line { position: absolute; width: 120%; height: 2px; background: linear-gradient(90deg, transparent, #00ffea, #7f1d1d, transparent); box-shadow: 0 0 15px #00ffea; left: -10%; animation: tinsel-crack 8s infinite ease-in-out; }
        .tinsel-line-1 { top: 20%; transform: rotate(-5deg); animation-delay: 0s; }
        .tinsel-line-2 { top: 50%; transform: rotate(3deg); animation-delay: 2s; }
        .tinsel-line-3 { top: 80%; transform: rotate(-2deg); animation-delay: 4s; }
      `}</style>

      <div className="tinsel-overlay">
        <div className="tinsel-line tinsel-line-1"></div>
        <div className="tinsel-line tinsel-line-2"></div>
        <div className="tinsel-line tinsel-line-3"></div>
      </div>

      <div className="space-y-8 max-w-4xl relative">
        <h1 className="text-5xl md:text-8xl font-orbitron font-bold tracking-tighter text-white glitch-text uppercase">
          Ты всё ещё <br />
          <span className="text-red-600">веришь в чудо?</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Мандарины по 3 €/кг, ёлка за 80 €, фейерверки под запретом. <br className="hidden md:block" />
          Добро пожаловать на <span className="text-cyan-400 font-bold">обратную сторону</span> Нового года.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollToSection('crime-section')}
            className="group px-8 py-4 bg-red-950/30 hover:bg-red-900/50 text-red-500 border border-red-500/30 rounded-full font-bold transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <AlertTriangle size={18} /> Узнать правду
          </button>
          <button 
            onClick={() => scrollToSection('ai-section')}
            className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2"
          >
            <Sparkles size={18} /> Сразу к альтернативе
          </button>
        </div>

        <div className="glass-morphism p-6 rounded-2xl inline-block border border-cyan-500/20">
          <p className="text-[10px] uppercase tracking-widest text-cyan-500 mb-2 font-bold">До конца потребительской суеты</p>
          <div className="flex gap-4 md:gap-8 justify-center items-center">
            {[
              { label: 'Дней', val: timeLeft.days },
              { label: 'Часов', val: timeLeft.hours },
              { label: 'Минут', val: timeLeft.minutes },
              { label: 'Секунд', val: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl md:text-5xl font-orbitron font-bold text-white tabular-nums">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-slate-500 font-bold">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="animate-bounce w-8 h-8 text-slate-700" />
      </div>
    </section>
  );
};

export default Hero;
