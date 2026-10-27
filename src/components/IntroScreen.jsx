import React, { useState } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Sparkles, Music, Heart, Volume2 } from 'lucide-react';

export default function IntroScreen() {
  const { data, hasStarted, startExperience } = useCelebration();
  const [isOpening, setIsOpening] = useState(false);

  if (hasStarted) return null;

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      startExperience();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07060A] text-luxury-ivory transition-all duration-1000 ${
        isOpening ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Ambient background particles & glowing spheres */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-[120px] ambient-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-rose/10 rounded-full blur-[120px] ambient-glow" />
        <div className="absolute inset-0 bg-grain opacity-40" />
      </div>

      {/* Main Invitation Card / Wax Sealed Envelope */}
      <div className="relative max-w-md w-full mx-4 p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#181624] to-[#0F0E17] border border-luxury-gold/25 shadow-2xl shadow-black/90 text-center flex flex-col items-center">
        
        {/* Top Gold Ornament */}
        <div className="flex items-center gap-2 mb-6 text-luxury-gold/70 text-xs tracking-[0.3em] uppercase">
          <span className="w-8 h-[1px] bg-luxury-gold/30" />
          <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Arsip Eksklusif</span>
          <span className="w-8 h-[1px] bg-luxury-gold/30" />
        </div>

        {/* Recipient Title */}
        <p className="font-serif italic text-luxury-gold text-lg mb-1">
          Sebuah Persembahan Istimewa Untuk
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gold-gradient mb-4">
          {data.partnerName}
        </h1>

        <p className="text-sm text-luxury-muted leading-relaxed mb-8 max-w-xs font-light">
          Hari ini semesta tersenyum merayakan kelahiranmu. Sentuh segel emas di bawah untuk membuka kisah kita dan memutar melodi kenangan.
        </p>

        {/* Wax Seal Button (Interactive Trigger) */}
        <div className="relative group cursor-pointer mb-8" onClick={handleOpen}>
          {/* Pulsing ring */}
          <div className="absolute -inset-3 rounded-full bg-luxury-gold/20 blur-md group-hover:bg-luxury-gold/30 transition-all duration-500 animate-pulse-subtle" />
          
          <button
            type="button"
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#E6C79C] via-[#C59B63] to-[#8E6D3B] p-[2px] shadow-xl shadow-amber-950/60 transition-transform duration-300 group-hover:scale-105 active:scale-95 flex items-center justify-center"
            title="Klik untuk membuka"
          >
            <div className="w-full h-full rounded-full bg-[#1A1522] flex flex-col items-center justify-center border border-luxury-gold/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/20 to-transparent opacity-60" />
              <Heart className="w-7 h-7 text-luxury-gold fill-luxury-gold/40 mb-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-serif tracking-widest text-luxury-gold/80 uppercase">
                Buka
              </span>
            </div>
          </button>
        </div>

        {/* Audio Track Tag & Hint */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-luxury-card border border-luxury-gold/15 text-xs text-luxury-gold/90">
          <Music className="w-3.5 h-3.5 text-luxury-gold animate-bounce" />
          <span>Diputar: <strong className="font-medium">Dash Uciha — Merindukanmu</strong></span>
          <Volume2 className="w-3.5 h-3.5 text-luxury-gold/60 ml-1" />
        </div>

        {/* Footer Note */}
        <span className="text-[11px] text-luxury-muted/70 mt-6 tracking-wider">
          Best viewed with sound enabled • Dibuat dengan segenap rasa
        </span>
      </div>
    </div>
  );
}
