import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Sparkles, 
  Maximize2, 
  Heart, 
  Calendar, 
  MapPin 
} from 'lucide-react';

export default function DualPhotoShowcase() {
  const { data, setActivePhotoModal } = useCelebration();
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' or 'single-focus'
  const [focusedIndex, setFocusedIndex] = useState(0);

  const photos = data.photos || [];
  const photo1 = photos[0];
  const photo2 = photos[1];

  return (
    <section id="photos" className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-card border border-rose-500/25 text-rose-300 text-xs tracking-widest uppercase mb-4 shadow-lg">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/50" />
          <span>Dua Potret Senyummu</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Dua Momen, <span className="text-gold-gradient italic font-normal">Satu Semesta Abadi</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
          Dari jutaan detik yang kita lalui bersama, dua potret ini merangkum seluruh alasan mengapa mencintaimu adalah anugerah terindah.
        </p>

        {/* View Switcher Pill */}
        <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-luxury-surface/80 border border-rose-500/25 mt-5 sm:mt-6 text-xs backdrop-blur-md max-w-full">
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs transition-all duration-300 ${
              viewMode === 'side-by-side'
                ? 'bg-rose-500 text-white font-semibold shadow-lg shadow-rose-950/40'
                : 'text-luxury-muted hover:text-white'
            }`}
          >
            Dua Bingkai Berdampingan
          </button>
          <button
            type="button"
            onClick={() => setViewMode('single-focus')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs transition-all duration-300 ${
              viewMode === 'single-focus'
                ? 'bg-rose-500 text-white font-semibold shadow-lg shadow-rose-950/40'
                : 'text-luxury-muted hover:text-white'
            }`}
          >
            Sorotan Bergantian
          </button>
        </div>
      </motion.div>

      {/* Hidden File Inputs for quick upload */}
      {/* View Mode: SIDE-BY-SIDE */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
          {/* Card 1: The Encounter */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhotoCard
              photo={photo1}
              index={0}
              onZoom={() => setActivePhotoModal(photo1)}
              rotation="-rotate-1 hover:rotate-0"
            />
          </motion.div>

          {/* Card 2: The Promise */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhotoCard
              photo={photo2}
              index={1}
              onZoom={() => setActivePhotoModal(photo2)}
              rotation="rotate-1 hover:rotate-0"
            />
          </motion.div>
        </div>
      )}

      {/* View Mode: SINGLE-FOCUS / SLIDER */}
      {viewMode === 'single-focus' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Active Photo Card */}
          <div className="w-full mb-8">
            <PhotoCard
              photo={photos[focusedIndex]}
              index={focusedIndex}
              onZoom={() => setActivePhotoModal(photos[focusedIndex])}
              rotation="rotate-0"
            />
          </div>

          {/* Selector Tabs */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFocusedIndex(0)}
              className={`px-6 py-2.5 rounded-full border text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                focusedIndex === 0
                  ? 'bg-rose-500 text-white border-rose-500 font-bold shadow-xl shadow-rose-950/50 scale-105'
                  : 'bg-luxury-surface/80 text-luxury-muted border-rose-400/20 hover:text-white'
              }`}
            >
              Potret I: Pertemuan Pertama
            </button>
            <button
              type="button"
              onClick={() => setFocusedIndex(1)}
              className={`px-6 py-2.5 rounded-full border text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                focusedIndex === 1
                  ? 'bg-rose-500 text-white border-rose-500 font-bold shadow-xl shadow-rose-950/50 scale-105'
                  : 'bg-luxury-surface/80 text-luxury-muted border-rose-400/20 hover:text-white'
              }`}
            >
              Potret II: Janji Masa Depan
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

// Subcomponent: Individual Luxury Photo Card with 3D tilt & sweet loving accents
function PhotoCard({ photo, index, onZoom, rotation }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  // 3D Parallax Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className={`relative group rounded-2xl sm:rounded-3xl p-4 sm:p-8 bg-gradient-to-b from-[#1C0B18] via-[#140811] to-[#0A0409] border border-rose-500/25 shadow-2xl transition-all duration-300 ${rotation}`}
    >
      {/* Top Rose Badge */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#FFE4E8] via-[#FB7185] to-[#BE123C] shadow-lg text-[9px] font-medium tracking-widest text-white uppercase">
        <Heart className="w-2.5 h-2.5 fill-current" />
        <span>Kenangan #{index + 1}</span>
      </div>

      {/* Top Metadata Row */}
      <div className="flex items-center justify-between text-xs text-rose-300/80 mb-4 pt-1">
        <div className="flex items-center gap-2 text-rose-300 font-medium tracking-wide text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          <span>{index === 0 ? 'Awal Cerita' : 'Hari Ini & Seterusnya'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-rose-300/80">
          <Calendar className="w-3.5 h-3.5 text-rose-400" />
          <span>{photo.date}</span>
        </div>
      </div>

      {/* Image Container with Dark Vignette & Zoom */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/80 border border-rose-500/20 mb-6 shadow-2xl group/img hover:border-rose-400/50 hover:shadow-[0_0_50px_rgba(244,63,94,0.3)] transition-all duration-500">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110 will-change-transform animate-ken-burns"
        />

        {/* Cinematic dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Action Buttons overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={onZoom}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl hover:scale-110 active:scale-95"
            title="Lihat Detail & Perbesar"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Tag inside Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px]">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>{photo.location}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-500/30 backdrop-blur-md font-serif italic text-xs text-rose-200 font-medium border border-rose-400/30">
            {photo.highlightWord}
          </span>
        </div>
      </div>

      {/* Editorial Title & Subtitle */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest font-serif text-rose-300 mb-1">
          {photo.subtitle}
        </p>
        <h3 className="font-serif text-2xl font-bold text-white tracking-tight group-hover:text-gold-gradient transition-colors">
          {photo.title}
        </h3>
      </div>

      {/* Caption / Deep Emotional Note */}
      <p className="text-sm text-luxury-muted font-light leading-relaxed mb-6 italic">
        "{photo.caption}"
      </p>

      {/* Bottom Footer Info & Quick Upload Button */}
      <div className="pt-4 border-t border-rose-500/15 flex items-center justify-between">
        <span className="text-xs text-rose-300/80 flex items-center gap-1.5 font-light">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/50" />
          <span>Tersimpan abadi di relung hati</span>
        </span>
        <span className="font-serif italic text-xs text-rose-300/90 font-medium">
          {index === 0 ? 'Momen Tak Terlupakan' : 'Cinta Selamanya'}
        </span>
      </div>
    </div>
  );
}
