import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { CelebrationProvider, useCelebration } from './context/CelebrationContext';
import IntroScreen from './components/IntroScreen';
import HeroSection from './components/HeroSection';
import CinematicFilmReel from './components/CinematicFilmReel';
import DualPhotoShowcase from './components/DualPhotoShowcase';
import MusicLyricsPlayer from './components/MusicLyricsPlayer';
import CandleCakeSection from './components/CandleCakeSection';
import LoveLetterSection from './components/LoveLetterSection';
import WishCapsuleSection from './components/WishCapsuleSection';
import Footer from './components/Footer';
import PhotoLightboxModal from './components/PhotoLightboxModal';
import CinematicParticles from './components/CinematicParticles';
import CursorGlow from './components/CursorGlow';
import CinematicMovieMode from './components/CinematicMovieMode';
import AutoScrollDirector from './components/AutoScrollDirector';

function MainApp() {
  const { isMovieModeOpen, setIsMovieModeOpen } = useCelebration();

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
    <div className="min-h-screen bg-[#07060A] text-luxury-ivory font-sans selection:bg-luxury-gold/30 selection:text-luxury-gold relative overflow-x-hidden">
      {/* Film grain subtle overlay */}
      <div className="fixed inset-0 bg-grain opacity-25 pointer-events-none z-20" />

      {/* Ambient Cinema Particles (Floating golden dust) */}
      <CinematicParticles />

      {/* Smooth Cursor Glow Follower */}
      <CursorGlow />

      {/* Intro Curtain Screen */}
      <IntroScreen />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection />

        {/* 35mm Roll Film Berjalan (Infinite Running Film Reel) */}
        <div id="film-reel">
          <CinematicFilmReel onOpenMovieMode={() => setIsMovieModeOpen(true)} />
        </div>

        <DualPhotoShowcase />
        <MusicLyricsPlayer />
        <CandleCakeSection />
        <LoveLetterSection />
        <WishCapsuleSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auto-Scroll Cinematic Director (Smooth Auto-Glide Down) */}
      <AutoScrollDirector />

      {/* Full Cinema Movie Player Modal (Mode Bioskop Berjalan) */}
      <CinematicMovieMode
        isOpen={isMovieModeOpen}
        onClose={() => setIsMovieModeOpen(false)}
      />

      {/* Modals & Drawers */}
      <PhotoLightboxModal />
    </div>
  );
}

export default function App() {
  return (
    <CelebrationProvider>
      <MainApp />
    </CelebrationProvider>
  );
}
