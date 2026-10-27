import React from 'react';
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

export default function App() {
  return (
    <CelebrationProvider>
      <div className="min-h-screen bg-[#07060A] text-luxury-ivory font-sans selection:bg-luxury-gold/30 selection:text-luxury-gold relative">
        {/* Film grain subtle overlay */}
        <div className="fixed inset-0 bg-grain opacity-30 pointer-events-none z-30" />

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
