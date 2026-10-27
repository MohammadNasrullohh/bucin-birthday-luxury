import React, { useState, useRef } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Sparkles, 
  Maximize2, 
  Camera, 
  Upload, 
  Heart, 
  Calendar, 
  MapPin, 
  Eye,
  SlidersHorizontal
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
    <section id="photos" className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-rose/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-luxury-card border border-luxury-gold/20 text-luxury-gold text-xs tracking-[0.25em] uppercase mb-4">
          <Camera className="w-3.5 h-3.5" />
          <span>DUAL PORTRAIT ARCHIVE • 2 POTRET KITA</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Dua Momen, <span className="text-gold-gradient italic font-normal">Satu Semesta Abadi</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
          Dari jutaan detik yang kita lalui bersama, dua potret ini merangkum seluruh alasan mengapa mencintaimu adalah anugerah terindah.
        </p>

        {/* View Switcher Pill */}
        <div className="inline-flex items-center p-1 rounded-full bg-luxury-surface border border-luxury-gold/20 mt-6 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-luxury-gold text-luxury-dark font-medium shadow'
                : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            Dua Bingkai Berdampingan
          </button>
          <button
            type="button"
            onClick={() => setViewMode('single-focus')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              viewMode === 'single-focus'
                ? 'bg-luxury-gold text-luxury-dark font-medium shadow'
                : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            Sorotan Bergantian
          </button>
        </div>
      </div>

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
          <PhotoCard
            photo={photo1}
            index={0}
            onZoom={() => setActivePhotoModal(photo1)}
            onReplace={() => fileInputRef1.current?.click()}
            rotation="-rotate-1 hover:rotate-0"
          />

          {/* Card 2: The Promise */}
          <PhotoCard
            photo={photo2}
            index={1}
            onZoom={() => setActivePhotoModal(photo2)}
            onReplace={() => fileInputRef2.current?.click()}
            rotation="rotate-1 hover:rotate-0"
          />
        </div>
      )}

      {/* View Mode: SINGLE-FOCUS / SLIDER */}
      {viewMode === 'single-focus' && (
        <div className="max-w-3xl mx-auto flex flex-col items-center">
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
              className={`px-5 py-2.5 rounded-full border text-xs font-serif tracking-wider uppercase transition-all ${
                focusedIndex === 0
                  ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-luxury-surface/80 text-luxury-muted border-luxury-gold/20 hover:text-luxury-ivory'
              }`}
            >
              Potret I: Pertemuan Pertama
            </button>
            <button
              type="button"
              onClick={() => setFocusedIndex(1)}
              className={`px-5 py-2.5 rounded-full border text-xs font-serif tracking-wider uppercase transition-all ${
                focusedIndex === 1
                  ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-luxury-surface/80 text-luxury-muted border-luxury-gold/20 hover:text-luxury-ivory'
              }`}
            >
              Potret II: Janji Masa Depan
            </button>
          </div>
        </div>
      )}

      {/* Customizer Note / Tip */}
      <div className="mt-14 text-center">
        <p className="text-xs text-luxury-muted/80 max-w-md mx-auto flex items-center justify-center gap-1.5 font-light">
          <Upload className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Kamu bisa langsung klik tombol <strong>"Ganti Foto Ini"</strong> pada setiap kartu untuk memasukkan 2 foto fotomu sendiri.</span>
        </p>
      </div>
    </section>
  );
}

// Subcomponent: Individual Luxury Photo Card with 3D tilt & editorial details
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

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
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
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-[#DFBA84] via-[#C59B63] to-[#9E783E] shadow-md text-[9px] font-mono tracking-widest text-[#09080C] font-bold uppercase">
        <span>MEMOIR #{index + 1}</span>
      </div>

      {/* Top Metadata Row */}
      <div className="flex items-center justify-between text-xs text-luxury-muted mb-4 pt-1">
        <div className="flex items-center gap-1.5 text-luxury-gold/90 font-mono tracking-wider text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
          <span>{photo.tag || `ACT 0${index + 1}`}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-luxury-muted/80">
          <Calendar className="w-3 h-3 text-luxury-gold/60" />
          <span>{photo.date}</span>
        </div>
      </div>

      {/* Image Container with Film Grain & Zoom Trigger */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/60 border border-luxury-gold/15 mb-6 shadow-inner group/img">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
        />

        {/* Gradient dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Action Buttons overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {/* Zoom Modal Button */}
          <button
            type="button"
            onClick={onZoom}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition-colors shadow-lg"
            title="Lihat Detail & Perbesar"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Tag inside Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 font-mono text-[10px]">
            <MapPin className="w-3 h-3 text-luxury-gold" />
            <span>{photo.location}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-luxury-gold/30 backdrop-blur-md font-serif italic text-[11px] text-luxury-gold">
            {photo.highlightWord}
          </span>
        </div>
      </div>

      {/* Editorial Title & Subtitle */}
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] font-serif text-luxury-gold/80 mb-1">
          {photo.subtitle}
        </p>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-ivory tracking-tight">
          {photo.title}
        </h3>
      </div>

      {/* Caption / Deep Emotional Note */}
      <p className="text-sm text-luxury-muted font-light leading-relaxed mb-6 italic">
        "{photo.caption}"
      </p>

      {/* Bottom Footer Info & Quick Upload Button */}
      <div className="pt-4 border-t border-luxury-gold/15 flex items-center justify-between">
        <span className="text-[11px] font-mono text-luxury-muted/70">
          {photo.cameraInfo}
        </span>

        {/* Replace Photo Button */}
        <button
          type="button"
          onClick={onReplace}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-luxury-gold/10 hover:bg-luxury-gold/25 border border-luxury-gold/25 text-luxury-gold text-xs transition-colors"
          title="Unggah foto Anda sendiri untuk posisi ini"
        >
          <Upload className="w-3 h-3" />
          <span>Ganti Foto Ini</span>
        </button>
      </div>
    </div>
  );
}
