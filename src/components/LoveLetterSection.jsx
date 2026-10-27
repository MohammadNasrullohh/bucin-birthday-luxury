import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { Mail, Copy, Check, Heart, Sparkles } from 'lucide-react';

export default function LoveLetterSection() {
  const { data } = useCelebration();
  const [copied, setCopied] = useState(false);

  const letter = data.letter || {};
  const paragraphs = letter.paragraphs || [];

  const handleCopy = () => {
    const fullText = `${letter.heading}\n\n${paragraphs.join('\n\n')}\n\n${letter.closing}\n${letter.signature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="letter" className="relative py-28 px-4 max-w-4xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-luxury-rose/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-card border border-rose-500/25 text-rose-300 text-xs tracking-widest uppercase mb-4 shadow-lg">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>Surat Khusus Untukmu</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Warkat Cinta untuk <span className="text-gold-gradient italic font-normal">{data.partnerName}</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
          Kata-kata yang tak selalu sempat kuucapkan di sela riuh dunia, kutitipkan seluruhnya dalam surat ini.
        </p>
      </motion.div>

      {/* Luxury Parchment Folio Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#181625] via-[#13111F] to-[#0D0C15] border border-luxury-gold/30 shadow-2xl shadow-black/90 overflow-hidden"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-luxury-gold/50" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-luxury-gold/50" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-luxury-gold/50" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-luxury-gold/50" />

        {/* Top Wax Stamp & Date */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 mb-8 border-b border-luxury-gold/15 gap-4">
          <div className="flex items-center gap-3">
            {/* Miniature Wax Seal */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FDA4AF] to-[#9F1239] p-[2px] shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1C0916] flex items-center justify-center border border-rose-400/50">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-500/80" />
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase font-medium text-rose-300">
                Surat Cinta Spesial
              </p>
              <p className="font-serif text-sm text-white">
                Hari Ulang Tahun yang Indah
              </p>
            </div>
          </div>

          {/* Action button (Copy) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-luxury-surface border border-rose-400/25 hover:border-rose-400/60 text-xs text-rose-200 transition-all hover:scale-105 active:scale-95 shadow"
              title="Salin isi surat ini"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
              <span>{copied ? 'Tersalin' : 'Salin Surat'}</span>
            </button>
          </div>
        </div>

        {/* Heading */}
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-gold-gradient mb-3">
          {letter.heading}
        </h3>
        <p className="text-xs text-luxury-muted font-light italic mb-8">
          {letter.subheading}
        </p>

        {/* Letter Paragraphs with Cormorant Garamond typography */}
        <div className="space-y-6 text-luxury-ivory/90 font-serif text-base sm:text-lg leading-relaxed font-light tracking-wide text-justify">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:text-luxury-gold">
              {p}
            </p>
          ))}
        </div>

        {/* Signature & Sign-Off Section */}
        <div className="mt-14 pt-8 border-t border-luxury-gold/15 flex flex-col sm:flex-row items-end justify-between gap-6">
          <div className="text-left w-full sm:w-auto">
            <p className="text-xs text-luxury-muted font-light tracking-wider uppercase mb-1">
              Catatan Khusus:
            </p>
            <p className="text-xs text-luxury-gold/80 italic font-serif">
              "Selama melodi Merindukanmu masih bersuara, rasa ini akan tetap sama."
            </p>
          </div>

          <div className="text-right w-full sm:w-auto">
            <p className="text-sm font-light text-luxury-muted mb-2">
              {letter.closing || "Milikmu seutuhnya,"}
            </p>
            <p className="font-serif italic text-2xl sm:text-3xl font-bold text-gold-gradient">
              {letter.signature || "Teman Seumur Hidupmu"}
            </p>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
