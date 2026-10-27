import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Sparkles, 
  Heart, 
  Home, 
  ShieldCheck, 
  Sun, 
  Star, 
  HelpCircle, 
  ChevronRight 
} from 'lucide-react';

export default function WishCapsuleSection() {
  const { data } = useCelebration();
  const [revealedSecret, setRevealedSecret] = useState(null);

  const wishes = data.wishes || [];
  const secrets = data.secrets || [];

  const getWishIcon = (id) => {
    switch (id) {
      case 1: return <Home className="w-5 h-5 text-luxury-gold" />;
      case 2: return <ShieldCheck className="w-5 h-5 text-luxury-rose" />;
      case 3: return <Star className="w-5 h-5 text-amber-400" />;
      case 4: return <Heart className="w-5 h-5 text-luxury-rose fill-luxury-rose/40" />;
      case 5: return <Sun className="w-5 h-5 text-yellow-400" />;
      case 6: return <Sparkles className="w-5 h-5 text-luxury-gold" />;
      default: return <Sparkles className="w-5 h-5 text-luxury-gold" />;
    }
  };

  return (
    <section id="wishes" className="relative py-28 px-4 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-card border border-rose-500/25 text-rose-300 text-xs tracking-widest uppercase mb-4 shadow-lg">
          <Star className="w-3.5 h-3.5 text-rose-400" />
          <span>Doa & Janji Tulus</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Enam Janji Suci & <span className="text-gold-gradient italic font-normal">Doa Terbaik</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
          Untaian harapan yang kutuliskan di bintang-bintang, agar semesta menjagamu di setiap hembusan nafas.
        </p>
      </motion.div>

      {/* 6 Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        {wishes.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative p-6 sm:p-8 rounded-3xl bg-luxury-card border border-luxury-gold/20 hover:border-luxury-gold/50 shadow-xl transition-all duration-300"
          >
            {/* Top Row: Icon + Badge */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-luxury-surface/80 border border-luxury-gold/25 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {getWishIcon(item.id)}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-luxury-gold/80 uppercase px-3 py-1 rounded-full bg-luxury-surface border border-luxury-gold/20">
                {item.tag || `DOA 0${idx + 1}`}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-lg sm:text-xl font-bold text-luxury-ivory mb-2 group-hover:text-gold-gradient transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-luxury-muted font-light leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Sweet Confessions / Trivia */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-luxury-glass border border-luxury-gold/25 shadow-2xl shadow-black/80 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.2em] font-mono text-luxury-gold">
          <HelpCircle className="w-4 h-4" />
          <span>Hal-Hal Kecil Tentang Kita (Klik untuk Membuka)</span>
        </div>

        <div className="space-y-4">
          {secrets.map((item, idx) => {
            const isRevealed = revealedSecret === idx;
            return (
              <div
                key={idx}
                onClick={() => setRevealedSecret(isRevealed ? null : idx)}
                className="cursor-pointer p-4 sm:p-5 rounded-2xl bg-luxury-surface/80 border border-luxury-gold/15 hover:border-luxury-gold/40 transition-all shadow"
              >
                <div className="flex items-center justify-between">
                  <p className="font-serif text-sm sm:text-base font-semibold text-luxury-ivory flex items-center gap-2">
                    <span className="text-luxury-gold font-mono text-xs">0{idx + 1}.</span>
                    {item.q}
                  </p>
                  <ChevronRight
                    className={`w-4 h-4 text-luxury-gold transition-transform duration-300 ${
                      isRevealed ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-luxury-gold/15 text-xs sm:text-sm text-gold-gradient font-serif italic"
                    >
                      "{item.a}"
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
