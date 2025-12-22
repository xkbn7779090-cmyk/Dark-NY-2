
import React, { useEffect } from 'react';
import Snowfall from './components/Snowfall';
import Hero from './components/Hero';
import CrimeSection from './components/CrimeSection';
import HistorySection from './components/HistorySection';
import EcologySection from './components/EcologySection';
import SocialSection from './components/SocialSection';
import HealthSection from './components/HealthSection';
import AISection from './components/AISection';
import Footer from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    // Scroll handling for smooth animations if needed
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.body.style.setProperty('--scroll', String(scrolled));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-x-hidden selection:bg-cyan-500/30">
      <Snowfall />
      
      <main className="relative z-10">
        <Hero />
        
        <div id="crime-section">
          <CrimeSection />
        </div>
        
        <HistorySection />
        
        <EcologySection />
        
        <SocialSection />
        
        <HealthSection />
        
        <AISection />
      </main>

      <Footer />

      {/* Persistent Call-to-Action for AI Planner */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center"
        >
          <span className="sr-only">AI Планировщик</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
        </button>
      </div>
    </div>
  );
};

export default App;
