import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Music, 
  Sparkles, 
  Heart
} from 'lucide-react';

export default function MusicLyricsPlayer() {
  const { 
    data, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    duration, 
    seekTo, 
    volume, 
    changeVolume,
    currentLyricIndex 
  } = useCelebration();

  const lyricsContainerRef = useRef(null);
  const activeLyricRef = useRef(null);

  // Format time mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Auto-scroll lyrics smoothly to keep active line centered
  useEffect(() => {
    if (activeLyricRef.current && lyricsContainerRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentLyricIndex]);

  const lyrics = data.music?.lyrics || [];

  return (
    <section id="music" className="relative py-28 px-4 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-luxury-card border border-rose-500/25 text-rose-300 text-xs tracking-widest uppercase mb-4 shadow-lg">
          <Music className="w-3.5 h-3.5 text-rose-400" />
          <span>Lagu Yang Selalu Kurindukan</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Lagu Kita: <span className="text-gold-gradient italic font-normal">Dash Uciha — Merindukanmu</span>
        </h2>
        <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
          Setiap petikan senar dan untaian liriknya selalu membawaku kembali pada hangatnya hari-hari saat bersamamu.
        </p>
      </motion.div>

      {/* Main Console Grid: Vinyl Record (Left) + Synced Lyrics (Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center bg-luxury-card p-6 sm:p-12 rounded-3xl border border-rose-500/25 shadow-2xl shadow-black/90 backdrop-blur-xl"
      >
        
        {/* Left Side: Luxury Vinyl Deck (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            
            {/* Vinyl Outer Shadow / Glow */}
            <div className="absolute inset-0 rounded-full bg-rose-500/10 blur-2xl ambient-glow" />

            {/* Tonearm (Needle) */}
            <div 
              className={`absolute top-0 right-4 w-24 h-36 origin-top-right transition-transform duration-1000 ease-out z-20 pointer-events-none ${
                isPlaying ? 'rotate-[26deg]' : 'rotate-0'
              }`}
            >
              <div className="w-2.5 h-24 bg-gradient-to-b from-[#FDA4AF] via-[#F43F5E] to-[#881337] rounded-full mx-auto shadow-xl" />
              <div className="w-5 h-7 bg-[#2A0E1F] border border-rose-400 rounded-sm ml-auto mr-1 -mt-1 flex items-center justify-center shadow">
                <span className="w-1 h-2 bg-rose-400 rounded-full" />
              </div>
            </div>

            {/* Rotating Vinyl Record */}
            <div 
              onClick={togglePlay}
              className={`relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#0D050B] border-4 border-[#220B19] shadow-2xl flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-[1.03] ${
                isPlaying ? 'vinyl-playing' : 'vinyl-paused'
              }`}
            >
              {/* Vinyl Grooves concentric rings */}
              <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-20 rounded-full border border-white/5 pointer-events-none" />

              {/* Center Vinyl Label */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#9F1239] via-[#F43F5E] to-[#FDA4AF] p-[2px] shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1C0916] flex flex-col items-center justify-center text-center p-2 border border-rose-400/50">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-500 mb-0.5 animate-pulse" />
                  <span className="text-[9px] font-bold tracking-widest text-rose-300 uppercase leading-tight font-serif">
                    DASH UCIHA
                  </span>
                  <span className="text-[8px] text-rose-200/80 tracking-tight font-sans">
                    Merindukanmu
                  </span>
                  {/* Spindle hole */}
                  <div className="w-3 h-3 rounded-full bg-black border border-rose-400/40 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Vinyl Status Tag */}
          <div className="mt-6 flex items-center gap-2.5 text-xs text-rose-300/80 font-light px-4 py-1.5 rounded-full bg-luxury-surface/80 border border-rose-500/20">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-rose-400 animate-ping' : 'bg-rose-500/40'}`} />
            <span className="text-xs tracking-wide">
              {isPlaying ? 'Lagu sedang berputar lembut' : 'Klik piringan untuk memutar'}
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Synchronized Lyrics & Scrubber (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          
          {/* Synchronized Lyrics Container */}
          <div className="relative mb-6">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-rose-500/15">
              <span className="text-xs uppercase tracking-widest text-rose-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                Untaian Lirik Menyentuh Hati
              </span>
              <span className="text-xs text-rose-300/70">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Scrollable Lyrics Box with smooth blur focusing */}
            <div 
              ref={lyricsContainerRef}
              className="h-64 sm:h-72 overflow-y-auto px-4 py-8 space-y-5 rounded-2xl bg-luxury-surface/60 border border-rose-500/15 scrollbar-thin text-center select-none backdrop-blur-md"
            >
              {lyrics.map((line, idx) => {
                const isActive = currentLyricIndex === idx;
                const isPast = currentLyricIndex > idx;

                return (
                  <motion.div
                    key={idx}
                    ref={isActive ? activeLyricRef : null}
                    onClick={() => seekTo(line.time)}
                    animate={{
                      filter: isActive ? 'blur(0px)' : 'blur(1.2px)',
                      opacity: isActive ? 1 : isPast ? 0.45 : 0.25,
                      scale: isActive ? 1.06 : 0.98,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`cursor-pointer transition-all duration-300 py-1.5 px-3 rounded-xl ${
                      isActive
                        ? 'text-gold-gradient font-serif font-bold text-lg sm:text-2xl bg-rose-500/15 border border-rose-400/35 shadow-lg'
                        : 'text-white/90 font-light text-sm sm:text-base hover:text-rose-300 hover:opacity-80'
                    }`}
                  >
                    {line.text}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Audio Scrubber & Controls */}
          <div className="p-5 rounded-2xl bg-luxury-surface/80 border border-rose-500/20 shadow-xl">
            {/* Timeline Progress Bar */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-rose-300/70 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 262}
                step="0.5"
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#090407] rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
              />
              <span className="text-xs text-rose-300/70 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between">
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => changeVolume(volume === 0 ? 0.85 : 0)}
                  className="text-rose-300/70 hover:text-rose-300 transition-colors"
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => changeVolume(parseFloat(e.target.value))}
                  className="w-16 sm:w-24 h-1 bg-[#090407] rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              {/* Main Playback Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => seekTo(currentTime - 10)}
                  className="p-2 rounded-full text-rose-300/70 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                  title="Mundur 10 Detik"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-13 h-13 rounded-full bg-gradient-to-r from-[#FDA4AF] via-[#F43F5E] to-[#BE123C] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-rose-950/60 p-3"
                  title={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => seekTo(currentTime + 10)}
                  className="p-2 rounded-full text-rose-300/70 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                  title="Maju 10 Detik"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Song Tag */}
              <span className="text-xs text-rose-300/70 hidden sm:inline font-light">
                Dash Uciha — Merindukanmu
              </span>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
