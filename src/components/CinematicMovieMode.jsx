import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { 
  X, 
  Play, 
  Pause, 
  Film, 
  Sparkles, 
  Heart, 
  Maximize, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  ChevronRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CinematicMovieMode({ isOpen, onClose }) {
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

  const [countdown, setCountdown] = useState(3);
  const [hasCountdownFinished, setHasCountdownFinished] = useState(false);

  const photo1 = data.photos[0];
  const photo2 = data.photos[1];

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Vintage 3... 2... 1 countdown on open
  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      setHasCountdownFinished(false);

      const timer1 = setTimeout(() => setCountdown(2), 900);
      const timer2 = setTimeout(() => setCountdown(1), 1800);
      const timer3 = setTimeout(() => {
        setHasCountdownFinished(true);
        if (!isPlaying) togglePlay();
      }, 2700);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine current scene based on audio currentTime
  // 00:00 - 00:40 : Scene 1 (Photo 1 - First Sight)
  // 00:41 - 01:08 : Scene 2 (Chorus Climax - Dual Blend)
  // 01:09 - 01:37 : Scene 3 (Photo 2 - The Promise)
  // 01:37 - 02:04 : Scene 4 (Candle Blow & Confetti Celebration)
  // 02:05 - End   : Scene 5 (Love Letter Rolling Credits)
  const getScene = () => {
    if (currentTime < 41) return 1;
    if (currentTime < 69) return 2;
    if (currentTime < 120) return 3;
    if (currentTime < 155) return 4;
    return 5;
  };

  const scene = getScene();
  const currentLyric = data.music.lyrics[currentLyricIndex]?.text || '';

  const jumpToScene = (targetTime) => {
    seekTo(targetTime);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-hidden select-none animate-fade-in">
      
      {/* Film Grain & Scratches Texture Overlay */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none z-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-20" />

      {/* TOP LETTERBOX BAR: Film Header */}
      <div className="relative z-40 h-16 sm:h-20 bg-black/90 px-6 sm:px-12 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
          <span className="text-xs sm:text-sm tracking-widest text-rose-300 uppercase font-bold">
            Kisah Kasih Kita
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="font-serif italic text-xs sm:text-sm text-white/80 hidden sm:inline">
            "Kado Terindah untuk {data.partnerName}"
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-rose-500 hover:text-white border border-white/20 text-xs tracking-wider uppercase transition-all"
        >
          <span>Tutup</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* CENTER SCREEN: Cinematic Canvas & Scenes */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden w-full max-w-6xl mx-auto my-auto aspect-[16/9] sm:aspect-[2.39/1] max-h-[75vh] border-y border-luxury-gold/30 shadow-2xl bg-black">
        
        {/* Retro 3-2-1 Countdown Leader */}
        {!hasCountdownFinished && (
          <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-full border-4 border-luxury-gold/40 flex items-center justify-center relative">
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-luxury-gold/40" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-luxury-gold/40" />
              <span className="font-mono text-7xl sm:text-8xl font-bold text-luxury-gold animate-ping">
                {countdown}
              </span>
            </div>
            <p className="text-xs text-rose-300 tracking-widest uppercase mt-6 font-medium">
              Memutar Kenangan Manis Kita...
            </p>
          </div>
        )}

        {/* SCENE 1: Photo 1 Ken Burns Zoom (0 - 41s) */}
        {hasCountdownFinished && scene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.img
              src={photo1.url}
              alt="Scene 1"
              initial={{ scale: 1, x: 0 }}
              animate={{ scale: 1.15, x: 20 }}
              transition={{ duration: 38, ease: 'linear' }}
              className="w-full h-full object-cover"
            />
            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
            {/* Title Card */}
            <div className="absolute top-8 left-8 sm:left-12 max-w-md">
              <span className="text-xs tracking-wider text-rose-300 uppercase px-2.5 py-1 rounded bg-black/70 border border-rose-400/30">
                Bagian I: Pertemuan Pertama
              </span>
              <h4 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
                {photo1.title}
              </h4>
            </div>
          </motion.div>
        )}

        {/* SCENE 2: Chorus Climax & Dual Blend (41 - 69s) */}
        {hasCountdownFinished && scene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 grid grid-cols-2 gap-1 bg-black"
          >
            <div className="relative overflow-hidden h-full">
              <motion.img
                src={photo1.url}
                alt="Photo 1"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 25, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative overflow-hidden h-full">
              <motion.img
                src={photo2.url}
                alt="Photo 2"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 25, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Center Climax Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Sparkles className="w-10 h-10 text-luxury-gold mb-2 animate-bounce" />
              <h3 className="font-serif italic text-2xl sm:text-5xl font-bold text-gold-gradient text-center max-w-xl px-4 drop-shadow-2xl">
                "Hanya kamu yang bisa membuatku tersenyum..."
              </h3>
            </div>
          </motion.div>
        )}

        {/* SCENE 3: Photo 2 The Promise (69 - 120s) */}
        {hasCountdownFinished && scene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.img
              src={photo2.url}
              alt="Scene 3"
              initial={{ scale: 1.15, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 45, ease: 'linear' }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
            <div className="absolute top-8 left-8 sm:left-12 max-w-md">
              <span className="text-xs tracking-wider text-rose-300 uppercase px-2.5 py-1 rounded bg-black/70 border border-rose-400/30">
                Bagian II: Janji Hari Esok
              </span>
              <h4 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
                {photo2.title}
              </h4>
            </div>
          </motion.div>
        )}

        {/* SCENE 4: Candle Blow Celebration (120 - 155s) */}
        {hasCountdownFinished && scene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-gradient-to-b from-[#141020] via-black to-[#0A0712] flex flex-col items-center justify-center p-8 text-center"
          >
            <Flame className="w-12 h-12 text-amber-400 animate-bounce mb-3" />
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient mb-3">
              Selamat Ulang Tahun, {data.partnerName}!
            </h3>
            <p className="font-serif italic text-lg sm:text-2xl text-white/90 max-w-xl leading-relaxed mb-6">
              "Semoga setiap langkah hidupmu senantiasa dipeluk oleh kebahagiaan dan kehangatan abadi."
            </p>
            <button
              type="button"
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ['#DFBA84', '#F5E4C3', '#E8BAC5', '#FFFFFF'],
                });
              }}
              className="px-6 py-2.5 rounded-full bg-luxury-gold text-black font-semibold text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Hujani Konfeti Emas ✨
            </button>
          </motion.div>
        )}

        {/* SCENE 5: Love Letter Credits (155s+) */}
        {hasCountdownFinished && scene === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <Heart className="w-10 h-10 text-luxury-gold fill-luxury-gold/60 mb-4 animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-luxury-gold mb-2">
              SEBUAH KISAH UNTUK SELAMANYA
            </p>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white max-w-lg mb-4">
              "Terima kasih telah memilih untuk berjalan bersamaku."
            </h3>
            <p className="font-serif italic text-sm sm:text-base text-luxury-muted max-w-md">
              Milikmu seutuhnya, hari ini, esok, dan di setiap babak kehidupan selanjutnya.
            </p>
          </motion.div>
        )}

        {/* CINEMATIC SUBTITLE OVERLAY (Lirik Lagu Berjalan di Bawah Layar) */}
        {hasCountdownFinished && currentLyric && (
          <div className="absolute bottom-6 inset-x-4 flex justify-center pointer-events-none z-30">
            <motion.div
              key={currentLyric}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-6 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-luxury-gold/30 text-center shadow-2xl"
            >
              <p className="font-serif text-base sm:text-xl font-bold text-luxury-gold tracking-wide drop-shadow">
                {currentLyric}
              </p>
              <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                Dash Uciha — Merindukanmu
              </span>
            </motion.div>
          </div>
        )}

      </div>

      {/* BOTTOM LETTERBOX BAR: Cinema Controls & Scene Scrubber */}
      <div className="relative z-40 bg-black/95 px-6 sm:px-12 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Play/Pause & Time */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-rose-950/60"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <span className="font-mono text-xs text-white/70">
            {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / {Math.floor((duration || 262) / 60)}:{String(Math.floor((duration || 262) % 60)).padStart(2, '0')}
          </span>
        </div>

        {/* Scene Jump Pills (Babak 1, 2, 3, 4, 5) */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full text-xs">
          {[
            { label: 'Foto Pertama', time: 13, sceneId: 1 },
            { label: 'Lirik Reff', time: 41, sceneId: 2 },
            { label: 'Foto Kedua', time: 69, sceneId: 3 },
            { label: 'Tiup Lilin', time: 120, sceneId: 4 },
            { label: 'Surat Kasih', time: 155, sceneId: 5 },
          ].map((sc) => (
            <button
              key={sc.sceneId}
              type="button"
              onClick={() => jumpToScene(sc.time)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                scene === sc.sceneId
                  ? 'bg-rose-500 text-white font-bold shadow'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Volume toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeVolume(volume === 0 ? 0.85 : 0)}
            className="text-white/70 hover:text-luxury-gold p-1"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

    </div>
  );
}
