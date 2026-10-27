import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Sparkles, 
  Maximize2, 
  Camera, 
  Upload, 
  Heart, 
  Calendar, 
  MapPin, 
  Film,
  Layers
} from 'lucide-react';

export default function DualPhotoShowcase() {
  const { data, updatePhoto, setActivePhotoModal } = useCelebration();
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' or 'single-focus'
  const [focusedIndex, setFocusedIndex] = useState(0);

  // File upload input refs for photo 1 & photo 2
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleFileUpload = (e, photoId) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updatePhoto(photoId, { url: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const photos = data.photos || [];
  const photo1 = photos[0];
  const photo2 = photos[1];

  return (
    <section id="photos" className="relative py-28 px-4 max-w-7xl mx-auto">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-luxury-rose/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-card border border-luxury-gold/25 text-luxury-gold text-xs tracking-[0.25em] uppercase mb-4 shadow-lg">
          <Film className="w-3.5 h-3.5" />
          <span>DUAL CINEMATIC FRAMES • 2 POTRET KITA</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Dua Momen, <span className="text-gold-gradient italic font-normal">Satu Semesta Abadi</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
          Dari jutaan detik yang kita lalui bersama, dua potret ini merangkum seluruh alasan mengapa mencintaimu adalah anugerah terindah.
        </p>

        {/* View Switcher Pill */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-luxury-surface/80 border border-luxury-gold/25 mt-6 text-xs backdrop-blur-md">
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              viewMode === 'side-by-side'
                ? 'bg-luxury-gold text-luxury-dark font-semibold shadow-lg shadow-amber-950/40'
                : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            Dua Bingkai Berdampingan
          </button>
          <button
            type="button"
            onClick={() => setViewMode('single-focus')}
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              viewMode === 'single-focus'
                ? 'bg-luxury-gold text-luxury-dark font-semibold shadow-lg shadow-amber-950/40'
                : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            Sorotan Bergantian
          </button>
        </div>
      </motion.div>

      {/* Hidden File Inputs for quick upload */}
      <input
        type="file"
        ref={fileInputRef1}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, 'photo-1')}
      />
      <input
        type="file"
        ref={fileInputRef2}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, 'photo-2')}
      />

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
              onReplace={() => fileInputRef1.current?.click()}
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
              onReplace={() => fileInputRef2.current?.click()}
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
              onReplace={() => {
                if (focusedIndex === 0) fileInputRef1.current?.click();
                else fileInputRef2.current?.click();
              }}
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
                  ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold shadow-xl shadow-amber-950/50 scale-105'
                  : 'bg-luxury-surface/80 text-luxury-muted border-luxury-gold/20 hover:text-luxury-ivory'
              }`}
            >
              Potret I: Pertemuan Pertama
            </button>
            <button
              type="button"
              onClick={() => setFocusedIndex(1)}
              className={`px-6 py-2.5 rounded-full border text-xs font-serif tracking-widest uppercase transition-all duration-300 ${
                focusedIndex === 1
                  ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold shadow-xl shadow-amber-950/50 scale-105'
                  : 'bg-luxury-surface/80 text-luxury-muted border-luxury-gold/20 hover:text-luxury-ivory'
              }`}
            >
              Potret II: Janji Masa Depan
            </button>
          </div>
        </motion.div>
      )}

      {/* Customizer Note / Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-14 text-center"
      >
        <p className="text-xs text-luxury-muted/80 max-w-md mx-auto flex items-center justify-center gap-2 font-light">
          <Upload className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Kamu bisa langsung menekan tombol <strong>"Ganti Foto Ini"</strong> pada setiap kartu untuk memasukkan 2 foto milikmu sendiri.</span>
        </p>
      </motion.div>
    </section>
  );
}

// Subcomponent: Individual Luxury Photo Card with 3D tilt & cinematic film strip borders
function PhotoCard({ photo, index, onZoom, onReplace, rotation }) {
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
      className={`relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#181625] via-[#12111D] to-[#0A0910] border border-luxury-gold/25 shadow-2xl transition-all duration-300 ${rotation}`}
    >
      {/* Antique Brass Clip Ornament */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#FFE4E8] via-[#FB7185] to-[#BE123C] shadow-lg text-[9px] font-mono tracking-widest text-[#09080C] font-bold uppercase">
        <Film className="w-2.5 h-2.5" />
        <span>CINEMA MEMOIR #{index + 1}</span>
      </div>

      {/* Top Metadata Row with Film Perforation Style */}
      <div className="flex items-center justify-between text-xs text-luxury-muted mb-4 pt-1">
        <div className="flex items-center gap-2 text-luxury-gold/90 font-mono tracking-widest text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-ping" />
          <span>{photo.tag || `ACT 0${index + 1}`}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-luxury-muted">
          <Calendar className="w-3 h-3 text-luxury-gold/70" />
          <span>{photo.date}</span>
        </div>
      </div>

      {/* Image Container with Film Grain, Dark Vignette & Zoom */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/80 border border-luxury-gold/20 mb-6 shadow-2xl group/img">
        
        {/* Film edge perforations emulation */}
        <div className="absolute top-2 left-2 z-10 font-mono text-[8px] text-white/40 tracking-widest uppercase">
          KODAK 500T • 35MM
        </div>
        <div className="absolute top-2 right-2 z-10 font-mono text-[8px] text-white/40 tracking-widest uppercase">
          FRAME 0{index + 1}
        </div>

        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-108 will-change-transform"
        />

        {/* Cinematic dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Action Buttons overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={onZoom}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition-all shadow-xl hover:scale-110 active:scale-95"
            title="Lihat Detail & Perbesar"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Tag inside Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px]">
            <MapPin className="w-3 h-3 text-luxury-gold" />
            <span>{photo.location}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-luxury-gold/30 backdrop-blur-md font-serif italic text-xs text-luxury-gold font-medium border border-luxury-gold/30">
            {photo.highlightWord}
          </span>
        </div>
      </div>

      {/* Editorial Title & Subtitle */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.25em] font-serif text-luxury-gold/80 mb-1">
          {photo.subtitle}
        </p>
        <h3 className="font-serif text-2xl font-bold text-luxury-ivory tracking-tight group-hover:text-gold-gradient transition-colors">
          {photo.title}
        </h3>
      </div>

      {/* Caption / Deep Emotional Note */}
      <p className="text-sm text-luxury-muted font-light leading-relaxed mb-6 italic">
        "{photo.caption}"
      </p>

      {/* Bottom Footer Info & Quick Upload Button */}
      <div className="pt-4 border-t border-luxury-gold/15 flex items-center justify-between">
        <span className="text-[11px] font-mono text-luxury-muted/70 flex items-center gap-1.5">
          <Camera className="w-3 h-3 text-luxury-gold/70" />
          <span>{photo.cameraInfo}</span>
        </span>

        {/* Replace Photo Button */}
        <button
          type="button"
          onClick={onReplace}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-luxury-gold/10 hover:bg-luxury-gold/25 border border-luxury-gold/30 text-luxury-gold text-xs font-medium transition-all hover:scale-105 active:scale-95"
          title="Unggah foto Anda sendiri untuk posisi ini"
        >
          <Upload className="w-3 h-3" />
          <span>Ganti Foto Ini</span>
        </button>
      </div>
    </div>
  );
}
