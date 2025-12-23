
import React, { useState, useEffect, createContext, useContext } from 'react';
import Snowfall from './components/Snowfall';
import Hero from './components/Hero';
import CrimeSection from './components/CrimeSection';
import HistorySection from './components/HistorySection';
import EcologySection from './components/EcologySection';
import SocialSection from './components/SocialSection';
import HealthSection from './components/HealthSection';
import AISection from './components/AISection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';

interface AppContextType {
  isGentleMode: boolean;
  setIsGentleMode: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [isGentleMode, setIsGentleMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.body.style.setProperty('--scroll', String(scrolled));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppContext.Provider value={{ isGentleMode, setIsGentleMode }}>
      <div className={`relative min-h-screen bg-[#020617] text-slate-200 selection:bg-red-500/30 transition-colors duration-700 ${isGentleMode ? 'gentle-mode' : ''}`}>
        {!isGentleMode && <Snowfall />}
        <Navigation />
        <MusicPlayer />
        
        <main className="relative z-10">
          <section id="hero">
            <Hero />
          </section>
          
          <section id="crime-section">
            <CrimeSection />
          </section>
          
          <section id="history-section">
            <HistorySection />
          </section>
          
          <section id="ecology-section">
            <EcologySection />
          </section>
          
          <section id="social-section">
            <SocialSection />
          </section>
          
          <section id="health-section">
            <HealthSection />
          </section>
          
          <section id="ai-section">
            <AISection />
          </section>
        </main>

        <Footer />

        {/* Floating Toggle for Gentle Mode */}
        <div className="fixed bottom-24 right-8 z-50 group">
          <button 
            onClick={() => setIsGentleMode(!isGentleMode)}
            className={`w-14 h-14 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center border backdrop-blur-md ${isGentleMode ? 'bg-amber-500 border-amber-400 text-black' : 'bg-slate-900/80 border-white/10 text-slate-400'}`}
          >
            <span className="sr-only">Переключить режим</span>
            <span className="text-xl">{isGentleMode ? '🌿' : '👁️'}</span>
          </button>
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/90 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {isGentleMode ? 'Вернуть динамику' : 'Включить бережный режим'}
          </div>
        </div>

        {/* Persistent Call-to-Action for AI Planner */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center border border-indigo-400/30"
          >
            <span className="sr-only">AI Планировщик</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </button>
        </div>
      </div>

      <style>{`
        .gentle-mode * {
          animation: none !important;
          transition: background-color 0.5s ease, color 0.5s ease !important;
        }
        .gentle-mode .glass-morphism {
          background: rgba(15, 23, 42, 0.98);
          backdrop-filter: none;
        }
        .gentle-mode .glitch-text {
          animation: none !important;
          text-shadow: none !important;
        }
        html {
          scroll-behavior: smooth;
        }
        ::selection {
          background: rgba(239, 68, 68, 0.3);
          color: white;
        }
      `}</style>
    </AppContext.Provider>
  );
};

export default App;
