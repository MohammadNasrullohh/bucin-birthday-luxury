import React from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Heart, Sparkles, ChevronUp, Music } from 'lucide-react';

export default function Footer() {
  const { data } = useCelebration();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-16 px-4 border-t border-luxury-gold/15 bg-[#060509] text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-12 h-12 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center mb-6 shadow-inner">
          <Heart className="w-5 h-5 text-luxury-gold fill-luxury-gold/60" />
        </div>

        {/* Poetic quote */}
        <p className="font-serif italic text-lg sm:text-xl text-luxury-ivory max-w-lg mb-2">
          "Karena di setiap detak waktu yang tersisa, kamu adalah rumah tempatku kembali."
        </p>
        <p className="text-xs uppercase tracking-[0.25em] font-mono text-luxury-gold/70 mb-8">
          UNTUK {data.partnerName} • DIBUAT DENGAN SEPENUH CINTA
        </p>

        {/* Soundtrack Info */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-luxury-surface border border-luxury-gold/15 text-xs text-luxury-muted mb-8">
          <Music className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Soundtrack: Dash Uciha — Merindukanmu</span>
        </div>

        {/* Scroll To Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs text-luxury-gold hover:opacity-80 transition-opacity uppercase tracking-widest font-mono"
        >
          <span>Kembali ke Atas</span>
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Small Copyright */}
        <p className="text-[11px] text-luxury-muted/40 mt-10 tracking-wider">
          © {new Date().getFullYear()} Private Romantic Keepsake Archive. Designed with bespoke typography & motion.
        </p>
      </div>
    </footer>
  );
}
