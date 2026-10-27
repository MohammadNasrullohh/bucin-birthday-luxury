import React from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Sparkles, Heart, Eye, Play } from 'lucide-react';

export default function CinematicFilmReel({ onOpenMovieMode }) {
  const { data, setActivePhotoModal } = useCelebration();
  const photo1 = data.photos[0];
  const photo2 = data.photos[1];

  const frames = [
    {
      type: 'photo',
      photo: photo1,
      frameNumber: '01',
      title: 'Awal Mula Pertemuan',
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
      frameNumber: '03',
      title: 'Hari Ini & Seterusnya',
      subtitle: 'Cahaya di Setiap Hariku',
    },
    {
      type: 'quote',
      text: `"Selamat ulang tahun, ${data.partnerName}. Terima kasih telah lahir ke dunia."`,
      author: 'Dari Lubuk Hatiku',
      frameNumber: '04',
    },
  ];

  const allFrames = [...frames, ...frames, ...frames];

  return (
    <section className="relative py-16 overflow-hidden bg-[#070306] border-y border-rose-500/20 select-none">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-20" />

      {/* Header with Movie Mode Trigger */}
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500/15 flex items-center justify-center border border-rose-400/30">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-500/50 animate-heartbeat" />
          </div>
          <div>
            <span className="text-[10px] tracking-widest text-rose-300 uppercase font-medium">
              Untaian Waktu
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">
              Roll Foto <span className="text-gold-gradient italic font-normal">Kenangan Manis Kita</span>
            </h3>
          </div>
        </div>

        {/* Big Cinema Movie Player Button */}
        <button
          type="button"
          onClick={onOpenMovieMode}
          className="animate-shimmer w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FDA4AF] via-[#F43F5E] to-[#BE123C] text-white font-semibold text-xs tracking-wider uppercase shadow-xl shadow-rose-950/60 hover:scale-105 active:scale-95 transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Putar Cerita Layar Penuh</span>
        </button>
      </div>

      {/* Continuous Moving Film Strip */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Top Perforations */}
        <div className="flex space-x-4 mb-2 overflow-hidden opacity-30">
          {[...Array(60)].map((_, i) => (
            <span
              key={i}
              className="flex-shrink-0 w-3.5 h-2 rounded-sm bg-rose-400/40 border border-rose-400/60"
            />
          ))}
        </div>

        {/* Infinite Moving Marquee Track */}
        <div className="flex gap-6 sm:gap-8 animate-film-roll hover:[animation-play-state:paused] w-max cursor-grab active:cursor-grabbing">
          {allFrames.map((frame, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-64 sm:w-80 p-3.5 sm:p-4 rounded-2xl bg-[#140811] border border-rose-500/25 shadow-2xl flex flex-col justify-between group hover:border-rose-400/60 hover:shadow-[0_0_40px_rgba(244,63,94,0.35)] transition-all duration-500"
            >
              {/* Frame tag */}
              <div className="flex items-center justify-between text-[10px] text-rose-300 uppercase mb-2 font-medium">
                <span>Kenangan Indah</span>
                <span className="font-bold text-rose-400">Bagian {frame.frameNumber}</span>
                <span>Bersamamu</span>
              </div>

              {/* Card Body */}
              {frame.type === 'photo' ? (
                <div 
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/80 border border-rose-400/20 cursor-pointer"
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
                      <p className="text-[10px] font-serif uppercase tracking-wider text-rose-300">
                        {frame.subtitle}
                      </p>
                      <p className="text-xs font-serif font-bold truncate">
                        {frame.title}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] w-full rounded-xl p-5 bg-gradient-to-br from-[#1C0B18] to-[#120710] border border-rose-500/25 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-5 h-5 text-rose-400 mb-2" />
                  <p className="font-serif italic text-sm sm:text-base text-white leading-relaxed mb-2">
                    {frame.text}
                  </p>
                  <p className="text-[10px] text-rose-300 tracking-wider uppercase font-medium">
                    — {frame.author}
                  </p>
                </div>
              )}

              {/* Bottom Tag */}
              <div className="mt-2 flex items-center justify-between text-[9px] text-rose-400/50 tracking-wider uppercase">
                <span>Selalu di Hati</span>
                <span>Abadi</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Perforations */}
        <div className="flex space-x-4 mt-2 overflow-hidden opacity-30">
          {[...Array(60)].map((_, i) => (
            <span
              key={i}
              className="flex-shrink-0 w-3.5 h-2 rounded-sm bg-rose-400/40 border border-rose-400/60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
