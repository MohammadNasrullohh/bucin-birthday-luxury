import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useCelebration } from '../context/CelebrationContext';
import { Flame, Sparkles, Heart, RotateCcw, Send } from 'lucide-react';

export default function CandleCakeSection() {
  const { data, isCandleBlown, setIsCandleBlown } = useCelebration();
  const [secretWish, setSecretWish] = useState('');
  const [isWishSaved, setIsWishSaved] = useState(false);

  // Trigger luxury golden confetti
  const triggerConfetti = () => {
    // Left side burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7, x: 0.3 },
      colors: ['#DFBA84', '#F5E4C3', '#E8BAC5', '#FFFFFF', '#B88D4E'],
    });

    // Right side burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7, x: 0.7 },
      colors: ['#DFBA84', '#F5E4C3', '#E8BAC5', '#FFFFFF', '#B88D4E'],
    });

    // Fireworks star burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        shapes: ['circle'],
        colors: ['#DFBA84', '#FFF0D6', '#E2A9B0'],
      });
    }, 400);
  };

  const handleBlowCandle = () => {
    setIsCandleBlown(true);
    triggerConfetti();
  };

  const handleRelight = () => {
    setIsCandleBlown(false);
  };

  const handleSaveWish = (e) => {
    e.preventDefault();
    if (secretWish.trim()) {
      setIsWishSaved(true);
      triggerConfetti();
    }
  };

  return (
    <section id="candle" className="relative py-24 px-4 max-w-4xl mx-auto text-center">
      {/* Background ambient warm circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-luxury-card border border-luxury-gold/20 text-luxury-gold text-xs tracking-[0.25em] uppercase mb-4">
        <Flame className="w-3.5 h-3.5" />
        <span>RITUAL ULANG TAHUN • TIUP LILIN</span>
      </div>
      <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
        Satu Doa untuk <span className="text-gold-gradient italic font-normal">Semua Esokmu</span>
      </h2>
      <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-12">
        Pejamkan matamu sejenak, bisikkan satu permohonan paling tulus di dalam hati, lalu tiup lilin ini bersama-sama.
      </p>

      {/* Main Luxury Cake Illustration with CSS / SVG Candle */}
      <div className="relative max-w-md mx-auto p-8 sm:p-12 rounded-3xl bg-luxury-card border border-luxury-gold/25 shadow-2xl flex flex-col items-center">
        
        {/* Candle Flame & Wick */}
        <div className="relative mb-2 flex flex-col items-center">
          {/* Flame element */}
          {!isCandleBlown ? (
            <div className="relative candle-flame cursor-pointer group" onClick={handleBlowCandle}>
              {/* Outer glow sphere */}
              <div className="absolute -inset-4 bg-amber-400/30 rounded-full blur-md" />
              {/* Inner Flame teardrop */}
              <div className="w-6 h-10 rounded-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-100 shadow-[0_0_20px_rgba(255,190,60,0.9)]" />
              {/* Core flame white point */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-white blur-[0.5px]" />
            </div>
          ) : (
            /* Extinguished smoke wisps */
            <div className="relative h-10 flex flex-col items-center justify-end">
              <div className="w-1 h-6 bg-luxury-muted/30 rounded-full animate-fade-in blur-[1px]" />
              <span className="text-[10px] text-luxury-gold/70 font-serif italic mt-1 animate-pulse">
                Terhembus dengan tulus...
              </span>
            </div>
          )}

          {/* Candle Wick */}
          <div className="w-1 h-3 bg-neutral-800 rounded-t" />

          {/* Candle Stick */}
          <div className="w-5 h-16 rounded-t-sm bg-gradient-to-r from-[#DFBA84] via-[#FFF1D6] to-[#B88D4E] shadow-md border-t border-white/40 flex flex-col items-center justify-between py-1">
            <span className="w-full h-[1px] bg-amber-900/20" />
            <span className="w-full h-[1px] bg-amber-900/20" />
            <span className="w-full h-[1px] bg-amber-900/20" />
          </div>
        </div>

        {/* Minimalist Chic Tiered Cake */}
        <div className="w-full flex flex-col items-center">
          {/* Top Tier */}
          <div className="w-44 h-14 rounded-t-2xl bg-gradient-to-b from-[#252033] to-[#171424] border-t-2 border-x-2 border-luxury-gold/30 shadow-inner relative flex items-center justify-center">
            {/* Gold pearl trim */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
            <span className="text-[10px] font-serif tracking-widest text-luxury-gold/70 uppercase">
              {data.age} TAHUN BAHAGIA
            </span>
          </div>

          {/* Bottom Tier */}
          <div className="w-64 h-18 rounded-t-2xl bg-gradient-to-b from-[#1C182A] to-[#120F1D] border-t-2 border-x-2 border-luxury-gold/30 shadow-lg relative flex items-center justify-center">
            <div className="absolute inset-x-4 top-2 h-[1px] bg-luxury-gold/20" />
            <span className="font-serif italic text-luxury-gold text-xs tracking-wide">
              {data.partnerName}
            </span>
            {/* Edible gold flakes decoration */}
            <div className="absolute bottom-1 inset-x-0 flex justify-around px-4">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-luxury-gold/40 shadow-sm" />
              ))}
            </div>
          </div>

          {/* Cake Stand (Pedestal) */}
          <div className="w-72 h-4 rounded-full bg-gradient-to-r from-[#8E6D3B] via-[#DFBA84] to-[#8E6D3B] shadow-xl mt-[-2px]" />
          <div className="w-28 h-6 bg-gradient-to-b from-[#DFBA84] to-[#6E5328] rounded-b-xl shadow-md" />
        </div>

        {/* Interactive Action Area */}
        <div className="mt-8 w-full">
          {!isCandleBlown ? (
            <button
              type="button"
              onClick={handleBlowCandle}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#DFBA84] via-[#C59B63] to-[#A07A44] text-[#09080C] font-semibold text-sm tracking-wider uppercase shadow-xl shadow-amber-950/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Tiup Lilin Sekarang</span>
            </button>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {/* Unrolled Wish Message */}
              <div className="p-4 rounded-2xl bg-luxury-surface/90 border border-luxury-gold/30 text-left">
                <div className="flex items-center gap-2 text-luxury-gold text-xs font-serif font-bold uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Doa Telah Diterbangkan ke Langit</span>
                </div>
                <p className="text-xs text-luxury-muted font-light leading-relaxed">
                  "Semoga setiap hela nafasmu dipenuhi kehangatan, setiap langkahmu dipandu keberuntungan, dan setiap hari esok membawamu lebih dekat pada semua mimpimu."
                </p>
              </div>

              {/* Relight button */}
              <button
                type="button"
                onClick={handleRelight}
                className="inline-flex items-center gap-1.5 text-xs text-luxury-gold/80 hover:text-luxury-gold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nyalakan Lilin Kembali</span>
              </button>
            </div>
          )}
        </div>

        {/* Wish Whisper Box */}
        <form onSubmit={handleSaveWish} className="mt-6 w-full pt-6 border-t border-luxury-gold/15">
          <label className="block text-xs text-luxury-muted font-light mb-2">
            Punya harapan rahasia untuk hari ini? Simpan di sini:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={secretWish}
              onChange={(e) => setSecretWish(e.target.value)}
              placeholder="Contoh: Selalu bahagia bersamamu..."
              className="flex-1 px-4 py-2 rounded-xl bg-luxury-surface border border-luxury-gold/20 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-luxury-gold/20 hover:bg-luxury-gold/30 border border-luxury-gold/30 text-luxury-gold text-xs font-medium transition-colors flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Kirim</span>
            </button>
          </div>
          {isWishSaved && (
            <p className="text-[11px] text-emerald-400 mt-2 font-light">
              ✨ Harapanmu telah tersimpan rapi di dalam arsip ini.
            </p>
          )}
        </form>

      </div>
    </section>
  );
}
