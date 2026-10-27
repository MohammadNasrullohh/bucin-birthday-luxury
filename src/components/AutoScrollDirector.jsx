import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebration } from '../context/CelebrationContext';
import { Play, Pause, Heart } from 'lucide-react';

export default function AutoScrollDirector() {
  const { 
    hasStarted, 
    isAutoScrollActive, 
    setIsAutoScrollActive, 
    isMovieModeOpen 
  } = useCelebration();

  const [showPill, setShowPill] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const rafRef = useRef(null);

  // Automatically start slow romantic scrolling down 3.2 seconds after letter is opened
  useEffect(() => {
    if (hasStarted && !userPaused && !isMovieModeOpen) {
      const startTimer = setTimeout(() => {
        setIsAutoScrollActive(true);
        setShowPill(true);
      }, 3200);

      return () => clearTimeout(startTimer);
    }
  }, [hasStarted, userPaused, isMovieModeOpen, setIsAutoScrollActive]);

  // Continuous buttery smooth auto-scroll loop (speed: 0.95px per frame)
  useEffect(() => {
    if (!isAutoScrollActive || isMovieModeOpen) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const step = () => {
      window.scrollBy(0, 0.95);

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
  }, [isAutoScrollActive, isMovieModeOpen, setIsAutoScrollActive]);

  const toggleScroll = () => {
    if (isAutoScrollActive) {
      setIsAutoScrollActive(false);
      setUserPaused(true);
    } else {
      setIsAutoScrollActive(true);
      setUserPaused(false);
    }
  };

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
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-full bg-[#1A0A16]/90 border border-rose-400/35 shadow-2xl shadow-black/90 backdrop-blur-xl text-xs">
          
          {/* Animated Status Indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isAutoScrollActive ? 'bg-rose-500 animate-ping' : 'bg-rose-400/50'
              }`}
            />
            <span className="font-serif italic text-rose-200">
              {isAutoScrollActive ? 'Menyusuri Kenangan Indah...' : 'Gulir Dijeda'}
            </span>
          </div>

          <span className="text-rose-400/30">|</span>

          {/* Pause / Resume Button */}
          <button
            type="button"
            onClick={toggleScroll}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/40 text-white font-medium transition-all hover:scale-105 active:scale-95"
            title={isAutoScrollActive ? 'Jeda perjalanan' : 'Lanjutkan perjalanan'}
          >
            {isAutoScrollActive ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                <span>Lanjut</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
