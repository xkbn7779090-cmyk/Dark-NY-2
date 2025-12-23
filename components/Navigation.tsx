
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: 'Старт' },
  { id: 'crime-section', label: 'Статистика' },
  { id: 'history-section', label: 'Архив' },
  { id: 'ecology-section', label: 'Экология' },
  { id: 'social-section', label: 'FOMO' },
  { id: 'health-section', label: '4 утра' },
  { id: 'ai-section', label: 'Генератор' },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - windowHeight;
      setScrollProgress((scrollY / fullHeight) * 100);

      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const current = sectionElements.reduce((acc, el, i) => {
        if (el && scrollY >= el.offsetTop - 200) {
          return SECTIONS[i].id;
        }
        return acc;
      }, SECTIONS[0].id);

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="pointer-events-auto">
             <button 
              onClick={() => scrollTo('hero')}
              className="font-orbitron font-bold text-lg md:text-xl text-white tracking-tighter flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-red-600 rounded-sm group-hover:rotate-45 transition-transform"></div>
              <span>DARK NY <span className="text-red-600">2.0</span></span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 p-1.5 glass-morphism rounded-full pointer-events-auto border-white/5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeSection === s.id 
                  ? 'bg-white text-black shadow-lg' 
                  : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="pointer-events-auto lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center text-white border-white/10"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Progress Rail */}
      <div className="fixed top-0 left-0 w-full h-1 z-[101] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-indigo-500 to-emerald-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99] bg-slate-950 transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`text-3xl font-orbitron font-bold uppercase tracking-tighter flex items-center gap-4 ${activeSection === s.id ? 'text-red-500' : 'text-slate-500'}`}
          >
            {s.label}
            {activeSection === s.id && <ArrowRight />}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
