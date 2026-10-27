import React, { useState, useEffect } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { Film, Volume2 } from 'lucide-react';

export default function CinematicFrame() {
  const { data, isPlaying } = useCelebration();
  const [timecode, setTimecode] = useState('00:00:00:00');

  // Live cinematic timecode counter
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const hrs = '00';
      const mins = String(Math.floor(frame / (24 * 60)) % 60).padStart(2, '0');
      const secs = String(Math.floor(frame / 24) % 60).padStart(2, '0');
      const f = String(frame % 24).padStart(2, '0');
      setTimecode(`${hrs}:${mins}:${secs}:${f}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Subtle Cinematic Status Bar */}
      <div className="fixed top-0 inset-x-0 z-30 pointer-events-none h-6 px-4 sm:px-8 flex items-center justify-between text-[10px] font-mono text-luxury-gold/50 tracking-widest bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="uppercase text-luxury-gold/80 font-bold">REC ● 24 FPS</span>
          <span className="hidden sm:inline text-luxury-gold/30">|</span>
          <span className="hidden sm:inline font-mono">PORTRA 400 • 35MM CINEMATIC</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="tabular-nums tracking-widest font-mono text-luxury-gold/70">
            {timecode}
          </span>
          <span className="hidden sm:inline text-luxury-gold/30">|</span>
          <span className="hidden sm:inline uppercase text-luxury-gold/60">
            {isPlaying ? 'AUDIO SYNC ACTIVE' : 'AUDIO PAUSED'}
          </span>
        </div>
      </div>

      {/* Subtle Anamorphic Lens Flare Line (Soft horizontal streak) */}
      <div className="fixed top-1/3 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none z-10 blur-[1px]" />
    </>
  );
}
