import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { Sparkles, Music, Heart, Volume2, Film } from 'lucide-react';

export default function IntroScreen() {
  const { data, hasStarted, startExperience } = useCelebration();
  const [isOpening, setIsOpening] = useState(false);

  if (hasStarted) return null;

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      startExperience();
    }, 1100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050408] text-luxury-ivory overflow-hidden select-none"
      >
        {/* Cinematic Letterbox Top & Bottom Black Bars */}
        <motion.div
          animate={isOpening ? { height: 0 } : { height: '36px' }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="absolute top-0 inset-x-0 bg-black z-30 flex items-center justify-between px-6 text-[10px] font-mono text-luxury-gold/50 tracking-widest border-b border-luxury-gold/15"
        >
          <span>CINEMA ARCHIVE • 2.39:1 SCOPE</span>
          <span className="flex items-center gap-1.5 text-luxury-gold/70">
            <Film className="w-3 h-3 text-luxury-gold" />
            <span>24 FRAMES PER SECOND</span>
          </span>
        </motion.div>

        <motion.div
          animate={isOpening ? { height: 0 } : { height: '36px' }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="absolute bottom-0 inset-x-0 bg-black z-30 flex items-center justify-between px-6 text-[10px] font-mono text-luxury-gold/50 tracking-widest border-t border-luxury-gold/15"
        >
          <span>KODAK VISION3 500T EMULSION</span>
          <span>DASH UCIHA • MERINDUKANMU</span>
        </motion.div>

        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-luxury-gold/10 rounded-full blur-[140px] ambient-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-luxury-rose/10 rounded-full blur-[140px] ambient-glow" />
          <div className="absolute inset-0 bg-grain opacity-40" />
        </div>

        {/* Main Invitation Card / Wax Sealed Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={
            isOpening
              ? { scale: 1.1, opacity: 0, y: -20, filter: 'blur(8px)' }
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md w-full mx-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#181624] via-[#12101B] to-[#0A0910] border border-luxury-gold/30 shadow-2xl shadow-black/95 text-center flex flex-col items-center z-20"
        >
          {/* Subtle Anamorphic gold lens streak */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/60 to-transparent" />

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
            Hari ini semesta tersenyum merayakan kehadiranmu. Sentuh segel lilin emas untuk membuka kisah sinematik kita dan menyalakan melodi kenangan.
          </p>

          {/* Wax Seal Button (Interactive Trigger) */}
          <div className="relative group cursor-pointer mb-8" onClick={handleOpen}>
            {/* Pulsing ring */}
            <div className="absolute -inset-4 rounded-full bg-luxury-gold/20 blur-md group-hover:bg-luxury-gold/35 transition-all duration-500 animate-pulse-subtle" />

            <button
              type="button"
              className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#F5E4C3] via-[#DFBA84] to-[#7A5A2B] p-[2.5px] shadow-2xl shadow-amber-950/70 transition-transform duration-300 group-hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Klik untuk membuka segel dan memutar lagu"
            >
              <div className="w-full h-full rounded-full bg-[#181422] flex flex-col items-center justify-center border border-luxury-gold/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-gold/25 to-transparent opacity-70" />
                <Heart className="w-8 h-8 text-luxury-gold fill-luxury-gold/40 mb-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] font-serif tracking-widest text-luxury-gold uppercase font-bold">
                  Buka Segel
                </span>
              </div>
            </button>
          </div>

          {/* Audio Track Tag & Hint */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-luxury-card border border-luxury-gold/20 text-xs text-luxury-gold/90 shadow-inner">
            <Music className="w-3.5 h-3.5 text-luxury-gold animate-bounce" />
            <span>Soundtrack: <strong className="font-semibold text-luxury-ivory">Dash Uciha — Merindukanmu</strong></span>
            <Volume2 className="w-3.5 h-3.5 text-luxury-gold/70 ml-1" />
          </div>

          {/* Footer Note */}
          <span className="text-[11px] text-luxury-muted/70 mt-6 tracking-wider">
            Audio otomatis mengalun saat segel disentuh • 24 FPS Cinema
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
