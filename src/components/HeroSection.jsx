import React, { useState, useEffect } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Sparkles, Heart, ChevronDown, Calendar, Clock, Music } from 'lucide-react';

export default function HeroSection() {
  const { data, isPlaying, togglePlay } = useCelebration();
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
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none ambient-glow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-luxury-rose/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Chapter pill badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-glass border border-luxury-gold/25 mb-6 shadow-lg shadow-black/40">
        <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-luxury-gold">
          CHAPTER {data.age} • PRIVATE ARCHIVE
        </span>
      </div>

      {/* Main Luxury Serif Heading */}
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.15] mb-6">
        Selamat Ulang Tahun, <br />
        <span className="text-gold-gradient italic font-normal">
          {data.partnerName}
        </span>
      </h1>

      {/* Poetic Subheading */}
      <p className="text-base sm:text-xl text-luxury-muted font-light max-w-2xl leading-relaxed mb-10">
        {data.heroSubtitle || "Sebuah arsip digital persembahan cinta untuk merayakan kehadiran jiwa paling indah di dunia ini."}
      </p>

      {/* Live Counter Display: Time Alive in the World */}
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-luxury-card border border-luxury-gold/20 shadow-2xl mb-10">
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
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-luxury-surface/70 border border-luxury-gold/15"
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
      </div>

      {/* Dash Uciha Lyric Snippet Highlight */}
      <div className="flex flex-col sm:flex-row items-center gap-3 px-5 py-3 rounded-full bg-luxury-glass border border-luxury-gold/20 mb-10 max-w-lg">
        <div className="flex items-center gap-2 text-luxury-gold text-xs font-serif italic">
          <Music className="w-4 h-4 text-luxury-gold animate-bounce" />
          <span>"Hanya kamu yang bisa membuatku tersenyum..."</span>
        </div>
        <span className="hidden sm:inline text-luxury-gold/30">•</span>
        <span className="text-xs text-luxury-muted font-light">
          Dash Uciha — Merindukanmu
        </span>
      </div>

      {/* Quick Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#photos"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#DFBA84] via-[#C59B63] to-[#A07A44] text-[#09080C] font-medium text-sm tracking-wider uppercase shadow-lg shadow-amber-900/40 hover:opacity-95 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Lihat Dua Foto Kita</span>
        </a>

        <a
          href="#music"
          className="px-6 py-3 rounded-full bg-luxury-surface border border-luxury-gold/30 text-luxury-gold font-medium text-sm tracking-wider uppercase hover:bg-luxury-gold/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Music className="w-4 h-4" />
          <span>Lagu & Lirik</span>
        </a>
      </div>

      {/* Floating scroll down indicator */}
      <a 
        href="#photos" 
        className="mt-14 text-luxury-gold/50 hover:text-luxury-gold flex flex-col items-center gap-1 transition-colors group"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-light">Gulir ke Bawah</span>
        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  );
}
