import React, { useState, useEffect } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Sparkles, 
  Heart,
  Film,
  Compass,
  ArrowDownCircle
} from 'lucide-react';

export default function Navbar() {
  const { 
    data, 
    isPlaying, 
    togglePlay, 
    volume, 
    changeVolume,
    setIsCustomizerOpen,
    setIsMovieModeOpen,
    isAutoScrollActive,
    setIsAutoScrollActive
  } = useCelebration();

  const [prevVolume, setPrevVolume] = useState(0.85);

  // Smooth Auto-Scroll loop
  useEffect(() => {
    let scrollRafId;
    if (isAutoScrollActive) {
      const scrollStep = () => {
        window.scrollBy(0, 1.2);
        // If reached bottom, stop
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
          setIsAutoScrollActive(false);
          return;
        }
        scrollRafId = requestAnimationFrame(scrollStep);
      };
      scrollRafId = requestAnimationFrame(scrollStep);
    }
    return () => {
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
    };
  }, [isAutoScrollActive, setIsAutoScrollActive]);

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      changeVolume(0);
    } else {
      changeVolume(prevVolume || 0.85);
    }
  };

  const navLinks = [
    { label: 'Roll Film', href: '#film-reel' },
    { label: 'Dua Foto', href: '#photos' },
    { label: 'Lagu & Lirik', href: '#music' },
    { label: 'Tiup Lilin', href: '#candle' },
    { label: 'Surat Rahasia', href: '#letter' },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-luxury-glass border border-luxury-gold/20 shadow-2xl shadow-black/80 max-w-6xl w-full backdrop-blur-xl">
        
        {/* Brand / Name Tag */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-luxury-gold hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full bg-luxury-gold/15 flex items-center justify-center border border-luxury-gold/30">
            <Heart className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold" />
          </div>
          <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-gold-gradient hidden sm:inline">
            {data.partnerNickname || data.partnerName}
          </span>
        </a>

        {/* Center Nav Links (Hidden on small screens) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1 rounded-full text-xs text-luxury-ivory/80 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all font-light tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Audio Player Pill & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Cinema Movie Mode Button (NEW!) */}
          <button
            type="button"
            onClick={() => setIsMovieModeOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DFBA84] via-[#F5E4C3] to-[#B88D4E] text-[#09080C] text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all"
            title="Buka Mode Bioskop Otomatis"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Mode Film</span>
          </button>

          {/* Auto Scroll Toggle Button */}
          <button
            type="button"
            onClick={() => setIsAutoScrollActive(!isAutoScrollActive)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isAutoScrollActive
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                : 'bg-luxury-surface/70 text-luxury-gold border-luxury-gold/25 hover:bg-luxury-gold/10'
            }`}
            title="Gulir otomatis sinematik tanpa tangan"
          >
            <Compass className={`w-3.5 h-3.5 ${isAutoScrollActive ? 'animate-spin' : ''}`} />
            <span>{isAutoScrollActive ? 'Jeda Gulir' : 'Auto-Gulir'}</span>
          </button>

          {/* Song Mini Widget */}
          <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-luxury-surface/80 border border-luxury-gold/20">
            <button
              type="button"
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-luxury-gold text-luxury-dark flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
              title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
            </button>

            {/* Song title & animated equalizer bars */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] sm:text-xs font-medium text-luxury-gold/90 truncate max-w-[90px] sm:max-w-[130px]">
                Dash Uciha — Merindukanmu
              </span>
              <div className="flex items-center gap-0.5 h-2">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`w-0.5 bg-luxury-gold rounded-full transition-all duration-300 ${
                      isPlaying 
                        ? 'animate-pulse' 
                        : 'h-1 opacity-40'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.sin(i * 1.5) * 6 + 7}px` : '3px',
                      animationDelay: `${i * 150}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mute button */}
            <button
              type="button"
              onClick={toggleMute}
              className="text-luxury-muted hover:text-luxury-gold p-1 transition-colors ml-1 hidden sm:inline"
              title={volume === 0 ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Customize Button */}
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-luxury-gold/15 hover:bg-luxury-gold/25 border border-luxury-gold/30 text-luxury-gold text-xs font-medium transition-all"
            title="Kustomisasi Foto & Ucapan"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
