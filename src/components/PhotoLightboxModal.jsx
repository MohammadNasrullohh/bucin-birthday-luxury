import React, { useEffect } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { X, Download, Calendar, MapPin, Camera, Heart } from 'lucide-react';

export default function PhotoLightboxModal() {
  const { activePhotoModal, setActivePhotoModal } = useCelebration();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhotoModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePhotoModal]);

  if (!activePhotoModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={() => setActivePhotoModal(null)}
      />

      {/* Main Lightbox Box */}
      <div className="relative z-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-luxury-surface border border-luxury-gold/30 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setActivePhotoModal(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-dark transition-colors shadow-lg"
          title="Tutup (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: High Res Image (60%) */}
        <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px]">
          <img
            src={activePhotoModal.url}
            alt={activePhotoModal.title}
            className="w-full h-full max-h-[80vh] object-contain"
          />
        </div>

        {/* Right Side: Editorial Info (40%) */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-luxury-card border-t md:border-t-0 md:border-l border-luxury-gold/20">
          <div>
            {/* Tag & Date */}
            <div className="flex items-center justify-between text-xs text-luxury-gold mb-3 font-mono">
              <span>{activePhotoModal.tag || 'ARCHIVE'}</span>
              <span className="flex items-center gap-1 text-luxury-muted">
                <Calendar className="w-3 h-3 text-luxury-gold/70" />
                {activePhotoModal.date}
              </span>
            </div>

            {/* Title */}
            <p className="text-xs uppercase tracking-widest font-serif text-luxury-gold/80 mb-1">
              {activePhotoModal.subtitle}
            </p>
            <h3 className="font-serif text-2xl font-bold text-luxury-ivory mb-4">
              {activePhotoModal.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-luxury-muted mb-6">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{activePhotoModal.location}</span>
            </div>

            {/* Caption */}
            <p className="text-sm text-luxury-ivory/80 font-serif italic leading-relaxed mb-6 border-l-2 border-luxury-gold/40 pl-3">
              "{activePhotoModal.caption}"
            </p>
          </div>

          {/* Camera Info & Download */}
          <div className="pt-6 border-t border-luxury-gold/15">
            <div className="flex items-center gap-2 text-xs font-mono text-luxury-muted mb-4">
              <Camera className="w-3.5 h-3.5 text-luxury-gold/70" />
              <span>{activePhotoModal.cameraInfo}</span>
            </div>

            <a
              href={activePhotoModal.url}
              download="kenangan-kita.jpg"
              className="w-full py-2.5 px-4 rounded-xl bg-luxury-surface border border-luxury-gold/30 hover:bg-luxury-gold/20 text-luxury-gold text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Simpan Foto Ini</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
