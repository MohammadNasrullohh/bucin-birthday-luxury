import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { 
  X, 
  Play, 
  Pause, 
  Sparkles, 
  Heart, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TOTAL_SCENES = 5;
const SCENE_DURATION = 7.5; // ~7.5 seconds per scene => ~37.5 seconds total runtime (ideal cinematic reel)

const SCENES_DATA = [
  { id: 1, label: 'Pertemuan', title: 'Bagian I: Pertemuan Pertama' },
  { id: 2, label: 'Dua Potret', title: 'Bagian II: Senyum Terindah' },
  { id: 3, label: 'Janji Hati', title: 'Bagian III: Janji Hari Esok' },
  { id: 4, label: 'Tiup Lilin', title: 'Bagian IV: Doa & Harapan' },
  { id: 5, label: 'Surat Kasih', title: 'Bagian V: Cinta Selamanya' },
];

export default function CinematicMovieMode({ isOpen, onClose }) {
  const { 
    data, 
    isPlaying, 
    togglePlay, 
    volume, 
    changeVolume,
    currentLyricIndex 
  } = useCelebration();

  const [countdown, setCountdown] = useState(3);
  const [hasCountdownFinished, setHasCountdownFinished] = useState(false);
  const [currentScene, setCurrentScene] = useState(1);
  const [sceneProgress, setSceneProgress] = useState(0); // 0.0 to 1.0
  const [isPaused, setIsPaused] = useState(false);

  const photo1 = data.photos[0];
  const photo2 = data.photos[1];

  const timerRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Snappy 3... 2... 1 countdown on open (total 1.2s instead of 2.7s)
  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      setHasCountdownFinished(false);
      setCurrentScene(1);
      setSceneProgress(0);
      setIsPaused(false);

      const t1 = setTimeout(() => setCountdown(2), 400);
      const t2 = setTimeout(() => setCountdown(1), 800);
      const t3 = setTimeout(() => {
        setHasCountdownFinished(true);
        if (!isPlaying) togglePlay();
      }, 1200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  // Confetti trigger helper
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#DFBA84', '#F5E4C3', '#E8BAC5', '#FFFFFF', '#F43F5E'],
    });
  };

  // Fire confetti when reaching Scene 4
  useEffect(() => {
    if (hasCountdownFinished && currentScene === 4) {
      triggerConfetti();
    }
  }, [hasCountdownFinished, currentScene]);

  // Story progression loop (smooth 60fps timer)
  useEffect(() => {
    if (!isOpen || !hasCountdownFinished || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    const updateProgress = (now) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }
      const deltaSec = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setSceneProgress((prev) => {
        const next = prev + deltaSec / SCENE_DURATION;
        if (next >= 1) {
          if (currentScene < TOTAL_SCENES) {
            setCurrentScene((sc) => sc + 1);
            return 0;
          } else {
            // Reached end of scene 5 - pause gracefully at 100%
            setIsPaused(true);
            return 1;
          }
        }
        return next;
      });

      timerRef.current = requestAnimationFrame(updateProgress);
    };

    timerRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [isOpen, hasCountdownFinished, isPaused, currentScene]);

  if (!isOpen) return null;

  const currentLyric = data.music.lyrics[currentLyricIndex]?.text || '';

  const goToScene = (sceneId) => {
    setCurrentScene(sceneId);
    setSceneProgress(0);
    setIsPaused(false);
  };

  const handleNext = () => {
    if (currentScene < TOTAL_SCENES) {
      goToScene(currentScene + 1);
    } else {
      goToScene(1);
    }
  };

  const handlePrev = () => {
    if (currentScene > 1) {
      goToScene(currentScene - 1);
    } else {
      setSceneProgress(0);
    }
  };

  const handleTogglePlay = () => {
    setIsPaused(!isPaused);
    togglePlay();
  };

  const handleReplay = () => {
    goToScene(1);
    if (!isPlaying) togglePlay();
  };

  const totalElapsedTime = Math.floor((currentScene - 1) * SCENE_DURATION + sceneProgress * SCENE_DURATION);
  const totalDuration = Math.floor(TOTAL_SCENES * SCENE_DURATION);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between overflow-hidden select-none animate-fade-in">
      
      {/* Film Grain & Cinematic Atmosphere Overlay */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none z-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-20" />

      {/* TOP LETTERBOX BAR: Film Header & Story Progress Bars */}
      <div className="relative z-40 bg-black/95 px-4 sm:px-10 pt-3 pb-2.5 border-b border-white/10 flex flex-col gap-2.5">
        
        {/* Story Segmented Progress Bar (5 Segments) */}
        <div className="grid grid-cols-5 gap-1.5 w-full">
          {SCENES_DATA.map((sc) => {
            let fillPercent = 0;
            if (sc.id < currentScene) fillPercent = 100;
            else if (sc.id === currentScene) fillPercent = Math.min(100, Math.max(0, sceneProgress * 100));

            return (
              <div 
                key={sc.id} 
                onClick={() => goToScene(sc.id)}
                className="h-1 sm:h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer"
                title={sc.label}
              >
                <div 
                  className="h-full bg-gradient-to-r from-rose-400 to-luxury-gold transition-all duration-100 ease-linear"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Header Title & Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
            <span className="text-xs sm:text-sm tracking-wider text-rose-300 uppercase font-bold">
              Kisah Kasih Kita
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="font-serif italic text-xs sm:text-sm text-white/80 hidden sm:inline">
              "Kado Terindah untuk {data.partnerName}"
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
              Babak {currentScene} / {TOTAL_SCENES}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-rose-500 hover:text-white border border-white/20 text-xs tracking-wider uppercase transition-all"
            >
              <span>Tutup</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CENTER SCREEN: Cinematic Canvas & Dynamic Scenes */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden w-full max-w-6xl mx-auto my-auto aspect-[4/3] sm:aspect-[2.39/1] max-h-[65vh] sm:max-h-[75vh] border-y border-luxury-gold/30 shadow-2xl bg-black">
        
        {/* Retro 3-2-1 Countdown Leader (Quick 1.2s) */}
        {!hasCountdownFinished && (
          <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-luxury-gold/40 flex items-center justify-center relative shadow-[0_0_30px_rgba(251,113,133,0.3)]">
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-luxury-gold/40" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-luxury-gold/40" />
              <span className="font-mono text-6xl sm:text-8xl font-bold text-luxury-gold animate-ping">
                {countdown}
              </span>
            </div>
            <p className="text-xs text-rose-300 tracking-widest uppercase mt-5 font-medium animate-pulse">
              Memutar Sorotan Sinematik...
            </p>
          </div>
        )}

        {/* Tap Left / Tap Right Navigation Zones */}
        {hasCountdownFinished && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 inset-y-0 w-1/5 z-30 opacity-0 hover:opacity-100 flex items-center justify-start pl-4 transition-opacity group cursor-pointer focus:outline-none"
              title="Babak Sebelumnya"
            >
              <div className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white shadow-lg">
                <ChevronLeft className="w-5 h-5" />
              </div>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 inset-y-0 w-1/5 z-30 opacity-0 hover:opacity-100 flex items-center justify-end pr-4 transition-opacity group cursor-pointer focus:outline-none"
              title="Babak Selanjutnya"
            >
              <div className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/70 group-hover:text-white shadow-lg">
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </>
        )}

        {/* SCENE 1: Photo 1 Ken Burns Zoom (~7.5s) */}
        {hasCountdownFinished && currentScene === 1 && (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.img
              src={photo1.url}
              alt="Scene 1"
              initial={{ scale: 1, x: 0 }}
              animate={{ scale: 1.1, x: 12 }}
              transition={{ duration: SCENE_DURATION, ease: 'easeOut' }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45" />
            
            <div className="absolute top-6 left-6 sm:left-12 max-w-md pointer-events-none">
              <span className="text-[11px] sm:text-xs tracking-wider text-rose-300 uppercase px-2.5 py-1 rounded bg-black/75 border border-rose-400/30">
                Bagian I: Pertemuan Pertama
              </span>
              <h4 className="font-serif text-xl sm:text-3xl font-bold text-white mt-2 drop-shadow-md">
                {photo1.title}
              </h4>
            </div>
          </motion.div>
        )}

        {/* SCENE 2: Dual Blend & Chorus Highlight (~7.5s) */}
        {hasCountdownFinished && currentScene === 2 && (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 grid grid-cols-2 gap-1 bg-black"
          >
            <div className="relative overflow-hidden h-full">
              <motion.img
                src={photo1.url}
                alt="Photo 1"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: SCENE_DURATION, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            <div className="relative overflow-hidden h-full">
              <motion.img
                src={photo2.url}
                alt="Photo 2"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: SCENE_DURATION, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-luxury-gold mb-2 animate-bounce" />
              <h3 className="font-serif italic text-xl sm:text-4xl font-bold text-gold-gradient text-center max-w-xl drop-shadow-2xl">
                "Hanya kamu yang bisa membuatku tersenyum..."
              </h3>
            </div>
          </motion.div>
        )}

        {/* SCENE 3: Photo 2 The Promise (~7.5s) */}
        {hasCountdownFinished && currentScene === 3 && (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.img
              src={photo2.url}
              alt="Scene 3"
              initial={{ scale: 1.1, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: SCENE_DURATION, ease: 'easeOut' }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45" />
            
            <div className="absolute top-6 left-6 sm:left-12 max-w-md pointer-events-none">
              <span className="text-[11px] sm:text-xs tracking-wider text-rose-300 uppercase px-2.5 py-1 rounded bg-black/75 border border-rose-400/30">
                Bagian II: Janji Hari Esok
              </span>
              <h4 className="font-serif text-xl sm:text-3xl font-bold text-white mt-2 drop-shadow-md">
                {photo2.title}
              </h4>
            </div>
          </motion.div>
        )}

        {/* SCENE 4: Candle Blow & Confetti Celebration (~7.5s) */}
        {hasCountdownFinished && currentScene === 4 && (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-b from-[#180A16] via-black to-[#0E050D] flex flex-col items-center justify-center p-6 text-center"
          >
            <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-bounce mb-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-gold-gradient mb-2">
              Selamat Ulang Tahun, {data.partnerName}!
            </h3>
            <p className="font-serif italic text-sm sm:text-xl text-white/90 max-w-lg leading-relaxed mb-5">
              "Semoga setiap langkah hidupmu senantiasa dipeluk oleh kebahagiaan dan kehangatan abadi."
            </p>
            <button
              type="button"
              onClick={triggerConfetti}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-luxury-gold text-black font-semibold text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Hujani Konfeti Emas ✨</span>
            </button>
          </motion.div>
        )}

        {/* SCENE 5: Love Letter Rolling Credits (~7.5s + Finale) */}
        {hasCountdownFinished && currentScene === 5 && (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <Heart className="w-9 h-9 sm:w-11 sm:h-11 text-luxury-gold fill-luxury-gold/60 mb-3 animate-pulse" />
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-rose-300 mb-2">
              SEBUAH KISAH UNTUK SELAMANYA
            </p>
            <h3 className="font-serif text-xl sm:text-3xl font-bold text-white max-w-lg mb-3">
              "Terima kasih telah memilih untuk berjalan bersamaku."
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-luxury-muted max-w-md mb-6">
              Milikmu seutuhnya, hari ini, esok, dan di setiap babak kehidupan selanjutnya.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReplay}
                className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Putar Ulang</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 font-medium text-xs tracking-wider uppercase transition-all border border-white/20"
              >
                Selesai
              </button>
            </div>
          </motion.div>
        )}

        {/* CINEMATIC SUBTITLE OVERLAY (Lirik Lagu Berjalan di Bawah Layar) */}
        {hasCountdownFinished && currentLyric && (
          <div className="absolute bottom-5 inset-x-4 flex justify-center pointer-events-none z-30">
            <motion.div
              key={currentLyric}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-luxury-gold/30 text-center shadow-2xl max-w-md"
            >
              <p className="font-serif text-sm sm:text-lg font-bold text-luxury-gold tracking-wide drop-shadow">
                {currentLyric}
              </p>
              <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">
                Dash Uciha — Merindukanmu
              </span>
            </motion.div>
          </div>
        )}

      </div>

      {/* BOTTOM LETTERBOX BAR: Cinema Controls & Scene Scrubber */}
      <div className="relative z-40 bg-black/95 px-4 sm:px-10 py-2.5 sm:py-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Play/Pause & Elapsed Reel Time */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-rose-950/60"
            title={isPaused ? 'Lanjutkan pemutaran' : 'Jeda pemutaran'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Pause className="w-4 h-4 fill-current" />}
          </button>

          <span className="font-mono text-xs text-white/70">
            {String(Math.floor(totalElapsedTime / 60)).padStart(2, '0')}:{String(Math.floor(totalElapsedTime % 60)).padStart(2, '0')} / {String(Math.floor(totalDuration / 60)).padStart(2, '0')}:{String(Math.floor(totalDuration % 60)).padStart(2, '0')}
          </span>
        </div>

        {/* Scene Jump Pills (5 Babak) */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full text-xs py-0.5 scrollbar-none w-full sm:w-auto justify-start sm:justify-center">
          {SCENES_DATA.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => goToScene(sc.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                currentScene === sc.id
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
            title={volume === 0 ? 'Nyalakan suara' : 'Bisukan suara'}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

      </div>

    </div>
  );
}
