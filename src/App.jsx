import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { CelebrationProvider } from './context/CelebrationContext';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DualPhotoShowcase from './components/DualPhotoShowcase';
import MusicLyricsPlayer from './components/MusicLyricsPlayer';
import CandleCakeSection from './components/CandleCakeSection';
import LoveLetterSection from './components/LoveLetterSection';
import WishCapsuleSection from './components/WishCapsuleSection';
import Footer from './components/Footer';
import CustomizerModal from './components/CustomizerModal';
import PhotoLightboxModal from './components/PhotoLightboxModal';
import CinematicParticles from './components/CinematicParticles';
import CursorGlow from './components/CursorGlow';
import CinematicFrame from './components/CinematicFrame';

export default function App() {
  // Initialize Lenis buttery-smooth inertial scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <CelebrationProvider>
      <div className="min-h-screen bg-[#07060A] text-luxury-ivory font-sans selection:bg-luxury-gold/30 selection:text-luxury-gold relative overflow-x-hidden">
        {/* Film grain subtle overlay */}
        <div className="fixed inset-0 bg-grain opacity-25 pointer-events-none z-20" />

        {/* Ambient Cinema Particles (Floating golden dust) */}
        <CinematicParticles />

        {/* Smooth Cursor Glow Follower */}
        <CursorGlow />

        {/* Subtle Cinematic Status Frame (24 FPS, REC timecode) */}
        <CinematicFrame />

        {/* Intro Curtain Screen */}
        <IntroScreen />

        {/* Fixed Navigation & Music Bar */}
        <Navbar />

        {/* Main Content Flow */}
        <main className="relative z-10">
          <HeroSection />
          <DualPhotoShowcase />
          <MusicLyricsPlayer />
          <CandleCakeSection />
          <LoveLetterSection />
          <WishCapsuleSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Drawers */}
        <CustomizerModal />
        <PhotoLightboxModal />
      </div>
    </CelebrationProvider>
  );
}
