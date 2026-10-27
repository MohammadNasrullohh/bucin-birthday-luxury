import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    }, 1100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#070306] text-luxury-ivory overflow-hidden select-none"
      >
        {/* Soft Ambient Rose & Ruby Lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] ambient-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-700/10 rounded-full blur-[140px] ambient-glow" />
          <div className="absolute inset-0 bg-grain opacity-30" />
        </div>

        {/* Main Invitation Card / Wax Sealed Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={
            isOpening
              ? { scale: 1.08, opacity: 0, y: -20, filter: 'blur(8px)' }
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md w-full mx-4 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1A0A15] via-[#140811] to-[#0A0409] border border-rose-400/30 shadow-2xl shadow-black/95 text-center flex flex-col items-center z-20"
        >
          {/* Top Heart Badge */}
          <div className="flex items-center gap-2 mb-6 text-rose-300 text-xs tracking-widest uppercase">
            <span className="w-8 h-[1px] bg-rose-400/30" />
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Kado Spesial Untukmu</span>
            <span className="w-8 h-[1px] bg-rose-400/30" />
          </div>

          {/* Recipient Title */}
          <p className="font-serif italic text-rose-300 text-lg mb-1">
            Selamat Ulang Tahun,
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gold-gradient mb-4">
            {data.partnerName}
          </h1>

          <p className="text-sm text-luxury-muted leading-relaxed mb-8 max-w-xs font-light">
            Hari ini adalah hari paling membahagiakan karena kamu hadir di dunia. Sentuh segel hati di bawah untuk membuka surat cinta dan memutar lagu kenangan kita.
          </p>

          {/* Wax Seal Button (Interactive Trigger) */}
          <div className="relative group cursor-pointer mb-8" onClick={handleOpen}>
            {/* Pulsing ring */}
            <div className="absolute -inset-4 rounded-full bg-rose-500/25 blur-md group-hover:bg-rose-500/40 transition-all duration-500 animate-pulse-subtle" />

            <button
              type="button"
              className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FDA4AF] via-[#F43F5E] to-[#881337] p-[2.5px] shadow-2xl shadow-rose-950/70 transition-transform duration-300 group-hover:scale-105 active:scale-95 flex items-center justify-center"
              title="Klik untuk membuka surat dan memutar lagu"
            >
              <div className="w-full h-full rounded-full bg-[#1A0A14] flex flex-col items-center justify-center border border-rose-400/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/30 to-transparent opacity-70" />
                <Heart className="w-8 h-8 text-rose-400 fill-rose-500/50 mb-1 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] font-serif tracking-widest text-rose-200 uppercase font-bold">
                  Buka Surat
                </span>
              </div>
            </button>
          </div>

          {/* Audio Track Tag & Hint */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-luxury-card border border-rose-400/25 text-xs text-rose-200 shadow-inner">
            <Music className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
            <span>Lagu: <strong className="font-semibold text-white">Dash Uciha — Merindukanmu</strong></span>
            <Volume2 className="w-3.5 h-3.5 text-rose-400/70 ml-1" />
          </div>

          {/* Footer Note */}
          <span className="text-[11px] text-luxury-muted/70 mt-6 tracking-wide font-light">
            Nyalakan volume suara untuk mendengarkan lagunya ya
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
