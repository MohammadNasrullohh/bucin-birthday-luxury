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
    }, 750);
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
          className="relative max-w-md w-full mx-3 sm:mx-4 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1A0A15] via-[#140811] to-[#0A0409] border border-rose-400/30 shadow-2xl shadow-black/95 text-center flex flex-col items-center z-20"
        >
          {/* Top Heart Badge */}
          <div className="flex items-center gap-2 mb-5 sm:mb-6 text-rose-300 text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase">
            <span className="w-6 sm:w-8 h-[1px] bg-rose-400/30" />
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Kado Spesial Untukmu</span>
            <span className="w-6 sm:w-8 h-[1px] bg-rose-400/30" />
          </div>

          {/* Recipient Title */}
          <p className="font-serif italic text-rose-300 text-base sm:text-lg mb-1">
            Selamat Ulang Tahun,
          </p>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-gold-gradient mb-3 sm:mb-4">
            {data.partnerName}
          </h1>

          <p className="text-xs sm:text-sm text-luxury-muted leading-relaxed mb-6 sm:mb-8 max-w-xs font-light">
            Hari ini adalah hari paling membahagiakan karena kamu hadir di dunia. Sentuh segel hati di bawah untuk membuka surat cinta dan memutar lagu kenangan kita.
          </p>

          {/* Wax Seal Button (Interactive Trigger) */}
          <div className="relative group cursor-pointer mb-7 flex flex-col items-center" onClick={handleOpen}>
            {/* Ambient Pulsing Glow */}
            <div className="absolute top-0 w-24 h-24 rounded-full bg-rose-500/30 blur-xl group-hover:bg-rose-500/50 transition-all duration-500 animate-pulse" />

            {/* Circular Wax Seal */}
            <button
              type="button"
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FDA4AF] via-[#F43F5E] to-[#881337] p-[2.5px] shadow-2xl shadow-rose-950/80 transition-transform duration-300 group-hover:scale-105 active:scale-95 flex items-center justify-center animate-shimmer"
              title="Sentuh untuk membuka surat cinta"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#250B1C] to-[#12040D] flex items-center justify-center border border-rose-400/50 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/25 to-transparent opacity-70" />
                {/* Concentric engraved ring of royal wax seal */}
                <div className="w-[82%] h-[82%] rounded-full border border-rose-400/25 border-dashed flex items-center justify-center">
                  <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-rose-300 fill-rose-500/60 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)] group-hover:scale-110 transition-transform duration-300 animate-heartbeat" />
                </div>
              </div>
            </button>

            {/* Clean, Elegant Action Pill */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/35 backdrop-blur-sm text-rose-200 text-xs font-serif tracking-widest uppercase font-semibold shadow-md group-hover:bg-rose-500/25 group-hover:border-rose-400/60 transition-all">
              <span>Buka Surat</span>
              <Sparkles className="w-3 h-3 text-rose-300" />
            </div>
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
