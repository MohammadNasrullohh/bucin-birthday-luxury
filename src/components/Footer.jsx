import React from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Heart, ChevronUp, Music } from 'lucide-react';

export default function Footer() {
  const { data } = useCelebration();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-16 px-4 border-t border-rose-500/15 bg-[#060305] text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Heart Seal */}
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center mb-6 shadow-inner">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500/60" />
        </div>

        {/* Poetic quote */}
        <p className="font-serif italic text-lg sm:text-xl text-white max-w-lg mb-2">
          "Karena di setiap detak waktu yang tersisa, kamu adalah rumah tempatku kembali."
        </p>
        <p className="text-xs uppercase tracking-widest text-rose-300 mb-8 font-medium">
          UNTUK {data.partnerName} • DENGAN SEPENUH CINTA
        </p>

        {/* Soundtrack Info */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface border border-rose-400/20 text-xs text-rose-200 mb-8">
          <Music className="w-3.5 h-3.5 text-rose-400" />
          <span>Lagu Kita: Dash Uciha — Merindukanmu</span>
        </div>

        {/* Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-luxury-surface/80 hover:bg-rose-500/20 border border-rose-400/20 text-xs text-rose-300 hover:text-white transition-all tracking-wider uppercase font-medium hover:scale-105 active:scale-95 shadow"
        >
          <span>Kembali ke Atas</span>
          <ChevronUp className="w-4 h-4 text-rose-400" />
        </button>

        {/* Bottom Note */}
        <p className="text-xs text-rose-300/50 mt-10 tracking-wide font-light">
          Hari ini dan selamanya, aku akan selalu mencintaimu.
        </p>
      </div>
    </footer>
  );
}
