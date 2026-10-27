import React, { useState } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Sparkles, 
  Heart,
  Palette,
  Image as ImageIcon
} from 'lucide-react';

export default function Navbar() {
  const { 
    data, 
    isPlaying, 
    togglePlay, 
    volume, 
    changeVolume,
    setIsCustomizerOpen,
    activeTheme,
    setActiveTheme
  } = useCelebration();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.85);

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      changeVolume(0);
    } else {
      changeVolume(prevVolume || 0.85);
    }
  };

  const navLinks = [
    { label: 'Dua Foto Kita', href: '#photos' },
    { label: 'Lagu & Lirik', href: '#music' },
    { label: 'Tiup Lilin', href: '#candle' },
    { label: 'Surat Rahasia', href: '#letter' },
    { label: 'Kapsul Harapan', href: '#wishes' },
  ];

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-luxury-glass border border-luxury-gold/20 shadow-2xl shadow-black/80 max-w-5xl w-full">
        
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
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
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
              <span className="text-[10px] sm:text-xs font-medium text-luxury-gold/90 truncate max-w-[110px] sm:max-w-[140px]">
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
              className="text-luxury-muted hover:text-luxury-gold p-1 transition-colors ml-1"
              title={volume === 0 ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Customize Button (User can edit photos, names, letter) */}
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-luxury-gold/15 hover:bg-luxury-gold/25 border border-luxury-gold/30 text-luxury-gold text-xs font-medium transition-all"
            title="Kustomisasi Foto & Ucapan"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kustomisasi</span>
          </button>
        </div>

      </div>
    </header>
  );
}
