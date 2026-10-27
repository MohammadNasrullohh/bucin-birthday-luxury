import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { Play, Pause, Compass, ArrowDown, ChevronDown } from 'lucide-react';

export default function AutoScrollDirector() {
  const { 
    hasStarted, 
    isAutoScrollActive, 
    setIsAutoScrollActive, 
    isMovieModeOpen 
  } = useCelebration();

  const [scrollSpeed, setScrollSpeed] = useState(0.95); // Smooth cinematic pace (px/frame)
  const [showPill, setShowPill] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const rafRef = useRef(null);

  // Automatically start auto-glide 3.2 seconds after envelope is unsealed
  useEffect(() => {
    if (hasStarted && !userPaused && !isMovieModeOpen) {
      const startTimer = setTimeout(() => {
        setIsAutoScrollActive(true);
        setShowPill(true);
      }, 3200);

      return () => clearTimeout(startTimer);
    }
  }, [hasStarted, userPaused, isMovieModeOpen, setIsAutoScrollActive]);

  // Continuous buttery smooth auto-scroll loop
  useEffect(() => {
    if (!isAutoScrollActive || isMovieModeOpen) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const step = () => {
      // Scroll down by speed amount
      window.scrollBy(0, scrollSpeed);

      // Check if reached bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
      if (isBottom) {
        setIsAutoScrollActive(false);
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAutoScrollActive, scrollSpeed, isMovieModeOpen, setIsAutoScrollActive]);

  // If user presses spacebar or escape, toggle pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsAutoScrollActive((prev) => {
          setUserPaused(prev);
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAutoScrollActive]);

  const toggleScroll = () => {
    if (isAutoScrollActive) {
      setIsAutoScrollActive(false);
      setUserPaused(true);
    } else {
      setIsAutoScrollActive(true);
      setUserPaused(false);
    }
  };

  // Only show when the experience has started and not inside Fullscreen Cinema
  if (!hasStarted || isMovieModeOpen || !showPill) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4"
      >
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-[#180814]/85 border border-rose-400/35 shadow-2xl shadow-black/80 backdrop-blur-xl text-xs">
          
          {/* Animated Status Indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isAutoScrollActive ? 'bg-rose-500 animate-ping' : 'bg-rose-400/50'
              }`}
            />
            <span className="font-serif italic text-rose-200 hidden sm:inline">
              {isAutoScrollActive ? 'Sinema Berjalan Otomatis' : 'Berjalan Dijeda'}
            </span>
          </div>

          <span className="text-rose-400/30 hidden sm:inline">|</span>

          {/* Pause / Resume Button */}
          <button
            type="button"
            onClick={toggleScroll}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/35 border border-rose-400/40 text-rose-200 font-medium transition-all hover:scale-105 active:scale-95"
            title={isAutoScrollActive ? 'Jeda gulir otomatis' : 'Lanjutkan gulir otomatis'}
          >
            {isAutoScrollActive ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Lanjutkan</span>
              </>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() => setScrollSpeed((prev) => (prev === 0.95 ? 1.6 : prev === 1.6 ? 0.6 : 0.95))}
            className="px-2.5 py-1 rounded-full bg-luxury-surface/80 border border-rose-400/25 text-[11px] font-mono text-rose-300 hover:text-white transition-colors"
            title="Ubah kecepatan gulir"
          >
            {scrollSpeed === 0.95 ? '1.0x' : scrollSpeed === 1.6 ? '1.8x' : '0.6x'}
          </button>

          {/* Hint */}
          <span className="text-[10px] font-mono text-rose-300/60 hidden md:inline">
            (Spasi: jeda)
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
