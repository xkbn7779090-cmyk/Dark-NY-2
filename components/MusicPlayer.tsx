
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using a dark ambient atmospheric track
  const audioUrl = "https://cdn.pixabay.com/audio/2022/01/21/audio_249339e09d.mp3"; // "Cyberpunk City" ambient loop

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3; // Low volume for atmosphere
    audio.loop = true;

    const startAudio = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          console.log("Autoplay blocked. Waiting for interaction.");
        });
    };

    // Attempt autoplay
    startAudio();

    // Interaction listener to start if blocked
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        startAudio();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-50 flex items-center gap-3">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="hidden md:block">
        <div className={`text-[10px] font-orbitron uppercase tracking-widest transition-all duration-500 ${isPlaying ? 'text-indigo-400 opacity-100' : 'text-slate-600 opacity-50'}`}>
          {isPlaying ? 'System Audio: Active' : 'System Audio: Muted'}
        </div>
      </div>

      <button
        onClick={togglePlay}
        className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-500 ${
          isPlaying 
            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
            : 'bg-slate-900 border-slate-800 text-slate-500'
        }`}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 size={20} />
            <div className="absolute -inset-1 bg-indigo-500/20 rounded-full animate-ping"></div>
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </button>

      {/* Visualizer bars */}
      <div className="flex items-end gap-1 h-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-0.5 bg-indigo-500 transition-all duration-300 rounded-full ${
              isPlaying ? 'animate-music-bar' : 'h-1'
            }`}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              height: isPlaying ? '100%' : '2px'
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar {
          animation: music-bar 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
