import React from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Film, Sparkles, Heart, Eye } from 'lucide-react';

export default function CinematicFilmReel({ onOpenMovieMode }) {
  const { data, setActivePhotoModal } = useCelebration();
  const photo1 = data.photos[0];
  const photo2 = data.photos[1];

  // An array of film reel frames repeating for seamless infinite marquee
  const frames = [
    {
      type: 'photo',
      photo: photo1,
      frameNumber: '01A',
      title: 'Babak I: Hari Pertemuan',
      subtitle: 'Saat Waktu Berhenti',
    },
    {
      type: 'quote',
      text: '"Hanya kamu yang bisa membuatku tersenyum..."',
      author: 'Dash Uciha — Merindukanmu',
      frameNumber: '02',
    },
    {
      type: 'photo',
      photo: photo2,
      frameNumber: '03A',
      title: 'Babak II: Hari Ini & Selamanya',
      subtitle: 'Cahaya di Setiap Langkah',
    },
    {
      type: 'quote',
      text: `"Selamat ulang tahun, ${data.partnerName}. Terima kasih telah lahir ke dunia."`,
      author: 'Arsip Cinta Abadi',
      frameNumber: '04',
    },
  ];

  // Duplicate for infinite continuous smooth scrolling
  const allFrames = [...frames, ...frames, ...frames];

  return (
    <section className="relative py-16 overflow-hidden bg-[#050408] border-y border-luxury-gold/20 select-none">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-20" />

      {/* Header with Cinema Mode Trigger */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-luxury-gold/15 flex items-center justify-center border border-luxury-gold/30">
            <Film className="w-4 h-4 text-luxury-gold" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-luxury-gold/80 uppercase">
              35MM MOTION PICTURE STRIP • 24 FPS
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-luxury-ivory">
              Roll Film Berjalan <span className="text-gold-gradient italic font-normal">Kenangan Kita</span>
            </h3>
          </div>
        </div>

        {/* Big Cinema Movie Player Button */}
        <button
          type="button"
          onClick={onOpenMovieMode}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA84] via-[#F5E4C3] to-[#B88D4E] text-[#09080C] font-semibold text-xs tracking-wider uppercase shadow-xl shadow-amber-950/60 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>Putar Sebagai Film Sinematik (Full Cinema)</span>
        </button>
      </div>

      {/* Continuous Moving Film Strip */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Top Sprocket Perforations */}
        <div className="flex space-x-4 mb-2 overflow-hidden opacity-40">
          {[...Array(60)].map((_, i) => (
            <span
              key={i}
              className="flex-shrink-0 w-3.5 h-2 rounded-sm bg-luxury-gold/40 border border-luxury-gold/60"
            />
          ))}
        </div>

        {/* Infinite Moving Marquee Track */}
        <div className="flex gap-6 sm:gap-8 animate-film-roll hover:[animation-play-state:paused] w-max cursor-grab active:cursor-grabbing">
          {allFrames.map((frame, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-72 sm:w-84 p-4 rounded-xl bg-[#0D0B13] border-2 border-[#2A2338] shadow-2xl flex flex-col justify-between group"
            >
              {/* Film edge metadata stamp */}
              <div className="flex items-center justify-between text-[9px] font-mono text-luxury-gold/60 uppercase mb-2">
                <span>KODAK 500T 5219</span>
                <span className="font-bold text-luxury-gold">EXP {frame.frameNumber}</span>
                <span>SAFETY FILM</span>
              </div>

              {/* Card Body */}
              {frame.type === 'photo' ? (
                <div 
                  className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black/80 border border-luxury-gold/20 cursor-pointer"
                  onClick={() => setActivePhotoModal(frame.photo)}
                >
                  <img
                    src={frame.photo.url}
                    alt={frame.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Photo Title Overlay */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-[10px] font-serif uppercase tracking-wider text-luxury-gold">
                        {frame.subtitle}
                      </p>
                      <p className="text-xs font-serif font-bold truncate">
                        {frame.title}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:bg-luxury-gold group-hover:text-black transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] w-full rounded-lg p-5 bg-gradient-to-br from-[#1A1628] to-[#120F1D] border border-luxury-gold/25 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-5 h-5 text-luxury-gold mb-2" />
                  <p className="font-serif italic text-sm sm:text-base text-luxury-ivory leading-relaxed mb-2">
                    {frame.text}
                  </p>
                  <p className="text-[10px] font-mono text-luxury-gold/70 tracking-widest uppercase">
                    — {frame.author}
                  </p>
                </div>
              )}

              {/* Bottom Film Perforation indicator */}
              <div className="mt-2 flex items-center justify-between text-[8px] font-mono text-luxury-gold/40 tracking-widest uppercase">
                <span>EASTMAN COLOR</span>
                <span>24 FPS SYNC</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sprocket Perforations */}
        <div className="flex space-x-4 mt-2 overflow-hidden opacity-40">
          {[...Array(60)].map((_, i) => (
            <span
              key={i}
              className="flex-shrink-0 w-3.5 h-2 rounded-sm bg-luxury-gold/40 border border-luxury-gold/60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
