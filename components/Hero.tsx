
import React, { useState, useEffect } from 'react';
import { ChevronDown, AlertTriangle, Sparkles, SlidersHorizontal, Moon, Wallet, WifiOff, MapPin } from 'lucide-react';
import { useApp } from '../App';

const Hero: React.FC = () => {
  const { isGentleMode, setIsGentleMode } = useApp();
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

  const CHIPS = [
    { label: 'Тихий план', icon: <Moon size={14} /> },
    { label: 'Нулевой бюджет', icon: <Wallet size={14} /> },
    { label: 'Digital detox', icon: <WifiOff size={14} /> },
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden z-10 bg-[#020617]">
      <style>{`
        @keyframes tinsel-crack {
          0% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 0.6; }
          30% { clip-path: polygon(0% 0%, 40% 10%, 60% 0%, 100% 10%, 100% 40%, 70% 50%, 100% 60%, 100% 100%, 60% 90%, 40% 100%, 0% 90%, 30% 50%, 0% 40%); }
          100% { clip-path: polygon(20% 20%, 25% 22%, 22% 25%, 30% 30%, 28% 32%, 35% 35%, 30% 40%); opacity: 0; transform: translateY(50vh) rotate(10deg); }
        }
        .hero-title {
          font-size: clamp(3rem, 12vw, 8.5rem);
          line-height: 0.85;
          letter-spacing: -0.05em;
        }
        .tinsel-line {
          position: absolute;
          width: 150%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 234, 0.4), rgba(239, 68, 68, 0.4), transparent);
          box-shadow: 0 0 20px rgba(0, 255, 234, 0.2);
          left: -25%;
          pointer-events: none;
        }
      `}</style>

      {!isGentleMode && (
        <div className="absolute inset-0 z-0">
          <div className="tinsel-line top-[25%] rotate-[-4deg] animate-[tinsel-crack_12s_infinite]"></div>
          <div className="tinsel-line top-[60%] rotate-[2deg] animate-[tinsel-crack_15s_infinite_2s]"></div>
        </div>
      )}

      <div className="space-y-12 md:space-y-16 max-w-6xl relative z-10">
        <div className="space-y-8">
           <div className="flex items-center justify-center gap-2 mb-4">
             <MapPin size={14} className="text-slate-500" />
             <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-500">Проект для тех, кто не дома</span>
           </div>
           
           <h1 className="hero-title font-orbitron font-bold text-white glitch-text uppercase select-none">
            Ты всё ещё <br />
            <span className={isGentleMode ? "text-amber-500" : "text-red-600 transition-colors duration-1000"}>веришь в чудо?</span>
          </h1>
          
          <p className="text-lg md:text-3xl text-slate-400 font-light max-w-3xl mx-auto leading-tight">
            Если праздничная суета вызывает лишь тревогу — <br className="hidden md:block"/>
            <span className="text-slate-100 font-medium">пришло время сменить сценарий.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            {CHIPS.map((chip, i) => (
              <button 
                key={i}
                onClick={() => scrollToSection('ai-section')}
                className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-slate-800 bg-slate-900/40 text-slate-400 text-xs md:text-sm font-bold hover:border-indigo-500/50 hover:text-indigo-400 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                {chip.icon}
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4">
          <button 
            onClick={() => scrollToSection('crime-section')}
            className="w-full sm:w-auto px-10 py-5 bg-transparent hover:bg-white/5 text-slate-300 border border-slate-700 rounded-full font-bold text-base transition-all transform hover:scale-105 flex items-center justify-center gap-3 group"
          >
            <AlertTriangle size={20} className="group-hover:text-red-500 transition-colors" /> Почему это тяжело?
          </button>
          <button 
            onClick={() => scrollToSection('ai-section')}
            className={`w-full sm:w-auto px-10 py-5 text-white rounded-full font-bold text-base transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl ${isGentleMode ? 'bg-amber-600 hover:bg-amber-500 text-black' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          >
            <Sparkles size={20} /> Собрать тихий план
          </button>
        </div>

        <div className="flex flex-col items-center gap-8 pt-10">
          <div className="glass-morphism px-8 py-6 rounded-3xl inline-block border border-white/5 bg-black/40 shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-4 font-black">Обратный отсчет до пика суеты</p>
            <div className="flex gap-6 md:gap-12 justify-center items-center">
              {[
                { label: 'Дни', val: timeLeft.days },
                { label: 'Часы', val: timeLeft.hours },
                { label: 'Мин', val: timeLeft.minutes },
                { label: 'Сек', val: timeLeft.seconds },
              ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl md:text-6xl font-orbitron font-bold text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {String(unit.val).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] uppercase text-slate-600 font-black tracking-widest mt-1">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setIsGentleMode(!isGentleMode)}
            className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.4em] text-slate-600 hover:text-white transition-all py-3 px-6 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5"
          >
            <SlidersHorizontal size={14} />
            {isGentleMode ? "Активировать динамику" : "Бережный режим"}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block opacity-30">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] uppercase tracking-widest font-bold text-slate-500">Листай вниз</span>
          <ChevronDown className="animate-bounce w-5 h-5 text-slate-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
