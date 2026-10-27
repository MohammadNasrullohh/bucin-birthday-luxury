import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useCelebration } from '../context/CelebrationContext';
import { Flame, Sparkles, Heart, RotateCcw, Send } from 'lucide-react';

export default function CandleCakeSection() {
  const { data, isCandleBlown, setIsCandleBlown } = useCelebration();
  const [secretWish, setSecretWish] = useState('');
  const [isWishSaved, setIsWishSaved] = useState(false);

  // Trigger luxury golden/rose confetti
  const triggerConfetti = () => {
    // Left side burst
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65, x: 0.25 },
      colors: ['#F43F5E', '#FDA4AF', '#E11D48', '#FFE4E8', '#FFFFFF'],
    });

    // Right side burst
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65, x: 0.75 },
      colors: ['#F43F5E', '#FDA4AF', '#E11D48', '#FFE4E8', '#FFFFFF'],
    });

    // Center Fireworks star burst
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 110,
        origin: { y: 0.45 },
        shapes: ['circle'],
        colors: ['#FB7185', '#FFF1F2', '#BE123C'],
      });
    }, 350);
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
    <section id="candle" className="relative py-28 px-4 max-w-4xl mx-auto text-center">
      {/* Background ambient warm circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-card border border-luxury-gold/25 text-luxury-gold text-xs tracking-[0.25em] uppercase mb-4 shadow-lg">
          <Flame className="w-3.5 h-3.5" />
          <span>RITUAL ULANG TAHUN • TIUP LILIN</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Satu Doa untuk <span className="text-gold-gradient italic font-normal">Semua Esokmu</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-12">
          Pejamkan matamu sejenak, bisikkan satu permohonan paling tulus di dalam hati, lalu tiup lilin ini bersama-sama.
        </p>
      </motion.div>

      {/* Main Luxury Cake Illustration with CSS / SVG Candle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-md mx-auto p-8 sm:p-12 rounded-3xl bg-luxury-card border border-luxury-gold/25 shadow-2xl shadow-black/90 flex flex-col items-center"
      >
        {/* Candle Flame & Wick */}
        <div className="relative mb-2 flex flex-col items-center">
          {/* Flame element */}
          {!isCandleBlown ? (
            <motion.div 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="relative candle-flame cursor-pointer group" 
              onClick={handleBlowCandle}
            >
              {/* Outer glow sphere */}
              <div className="absolute -inset-4 bg-amber-400/35 rounded-full blur-md" />
              {/* Inner Flame teardrop */}
              <div className="w-6 h-10 rounded-full bg-gradient-to-t from-red-500 via-amber-400 to-yellow-100 shadow-[0_0_22px_rgba(255,190,60,0.95)]" />
              {/* Core flame white point */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-white blur-[0.5px]" />
            </motion.div>
          ) : (
            /* Extinguished smoke wisps */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-10 flex flex-col items-center justify-end"
            >
              <div className="w-1 h-6 bg-luxury-muted/30 rounded-full animate-fade-in blur-[1px]" />
              <span className="text-[10px] text-luxury-gold/80 font-serif italic mt-1 animate-pulse">
                Terhembus dengan penuh cinta...
              </span>
            </motion.div>
          )}

          {/* Candle Wick */}
          <div className="w-1 h-3 bg-neutral-800 rounded-t" />

          {/* Candle Stick */}
          <div className="w-5 h-16 rounded-t-sm bg-gradient-to-r from-[#FDA4AF] via-[#FFF1F2] to-[#BE123C] shadow-md border-t border-white/40 flex flex-col items-center justify-between py-1">
            <span className="w-full h-[1px] bg-rose-950/20" />
            <span className="w-full h-[1px] bg-rose-950/20" />
            <span className="w-full h-[1px] bg-rose-950/20" />
          </div>
        </div>

        {/* Minimalist Chic Tiered Cake */}
        <div className="w-full flex flex-col items-center">
          {/* Top Tier */}
          <div className="w-44 h-14 rounded-t-2xl bg-gradient-to-b from-[#252033] to-[#171424] border-t-2 border-x-2 border-luxury-gold/30 shadow-inner relative flex items-center justify-center">
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />
            <span className="text-[10px] font-serif tracking-widest text-luxury-gold/80 uppercase">
              {data.age} TAHUN BAHAGIA
            </span>
          </div>

          {/* Bottom Tier */}
          <div className="w-64 h-18 rounded-t-2xl bg-gradient-to-b from-[#1C182A] to-[#120F1D] border-t-2 border-x-2 border-luxury-gold/30 shadow-lg relative flex items-center justify-center">
            <div className="absolute inset-x-4 top-2 h-[1px] bg-luxury-gold/20" />
            <span className="font-serif italic text-luxury-gold text-sm tracking-wide">
              {data.partnerName}
            </span>
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
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleBlowCandle}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#FDA4AF] via-[#F43F5E] to-[#BE123C] text-white font-semibold text-xs tracking-widest uppercase shadow-xl shadow-rose-950/60 transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Tiup Lilin Sekarang</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Unrolled Wish Message */}
              <div className="p-5 rounded-2xl bg-luxury-surface/90 border border-luxury-gold/35 text-left shadow-xl">
                <div className="flex items-center gap-2 text-luxury-gold text-xs font-serif font-bold uppercase mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Doa Telah Diterbangkan ke Langit</span>
                </div>
                <p className="text-xs text-luxury-ivory/90 font-serif italic leading-relaxed">
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
            </motion.div>
          )}
        </div>

        {/* Wish Whisper Box */}
        <form onSubmit={handleSaveWish} className="mt-6 w-full pt-6 border-t border-luxury-gold/15">
          <label className="block text-xs text-luxury-muted font-light mb-2">
            Punya permohonan rahasia? Simpan di sini:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={secretWish}
              onChange={(e) => setSecretWish(e.target.value)}
              placeholder="Contoh: Selalu bahagia bersamamu..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] text-emerald-400 mt-2 font-light"
            >
              ✨ Harapanmu telah tersimpan rapi di dalam arsip ini.
            </motion.p>
          )}
        </form>

      </motion.div>
    </section>
  );
}
