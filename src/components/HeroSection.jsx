import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { Sparkles, Heart, ChevronDown, Calendar, Clock, Music, Film } from 'lucide-react';

export default function HeroSection() {
  const { data, setIsMovieModeOpen } = useCelebration();
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate live time elapsed since birth date
  useEffect(() => {
    const calculateTime = () => {
      const birth = new Date(data.birthDate || '2003-10-27');
      const now = new Date();
      const diff = Math.max(0, now.getTime() - birth.getTime());

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.birthDate]);

  return (
    <section className="relative min-h-[96vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[160px] pointer-events-none ambient-glow" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-luxury-rose/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Chapter pill badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-glass border border-rose-400/25 mb-6 shadow-xl shadow-black/40"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span className="text-xs uppercase tracking-widest font-medium text-rose-300">
          Untukmu yang Tersayang • {data.age} Tahun Penuh Makna
        </span>
      </motion.div>

      {/* Main Luxury Serif Heading with smooth blur reveal */}
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[1.12] mb-6"
      >
        Selamat Ulang Tahun, <br />
        <span className="text-gold-gradient italic font-normal tracking-wide">
          {data.partnerName}
        </span>
      </motion.h1>

      {/* Poetic Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-xl text-luxury-muted font-light max-w-2xl leading-relaxed mb-10"
      >
        {data.heroSubtitle || "Sebuah arsip digital persembahan cinta untuk merayakan kehadiran jiwa paling indah di dunia ini."}
      </motion.p>

      {/* Live Counter Display: Time Alive in the World */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-luxury-card border border-luxury-gold/25 shadow-2xl shadow-black/80 mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-xs tracking-[0.2em] uppercase text-luxury-gold/80 font-medium">
          <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Waktu Penuh Syukur Sejak Kehadiranmu</span>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: 'Hari', value: timeElapsed.days },
            { label: 'Jam', value: String(timeElapsed.hours).padStart(2, '0') },
            { label: 'Menit', value: String(timeElapsed.minutes).padStart(2, '0') },
            { label: 'Detik', value: String(timeElapsed.seconds).padStart(2, '0') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-luxury-surface/80 border border-luxury-gold/15 shadow-inner"
            >
              <span className="font-serif text-2xl sm:text-4xl font-bold text-gold-gradient tabular-nums">
                {item.value}
              </span>
              <span className="text-[10px] sm:text-xs text-luxury-muted tracking-wider uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dash Uciha Lyric Snippet Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-full bg-luxury-glass border border-luxury-gold/25 mb-10 max-w-lg shadow-lg"
      >
        <div className="flex items-center gap-2 text-luxury-gold text-xs font-serif italic">
          <Music className="w-4 h-4 text-luxury-gold animate-bounce" />
          <span>"Hanya kamu yang bisa membuatku tersenyum..."</span>
        </div>
        <span className="hidden sm:inline text-luxury-gold/30">•</span>
        <span className="text-xs text-luxury-muted font-light font-mono">
          Dash Uciha — Merindukanmu
        </span>
      </motion.div>

      {/* Quick Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          type="button"
          onClick={() => setIsMovieModeOpen(true)}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FDA4AF] via-[#F43F5E] to-[#BE123C] text-white font-bold text-xs tracking-widest uppercase shadow-2xl shadow-rose-950/60 hover:opacity-95 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Putar Cerita Manis Kita</span>
        </button>

        <a
          href="#photos"
          className="px-6 py-3.5 rounded-full bg-luxury-surface/90 border border-rose-400/30 text-rose-200 font-medium text-xs tracking-widest uppercase hover:bg-rose-500/15 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Lihat Dua Foto Kita</span>
        </a>
      </motion.div>

      {/* Floating scroll down indicator */}
      <motion.a 
        href="#photos"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-16 text-rose-300/70 hover:text-rose-200 flex flex-col items-center gap-1.5 transition-colors group"
      >
        <span className="text-[10px] tracking-widest uppercase font-light">Menyusuri Kenangan</span>
        <ChevronDown className="w-4 h-4 text-rose-400 group-hover:translate-y-1 transition-transform" />
      </motion.a>
    </section>
  );
}
