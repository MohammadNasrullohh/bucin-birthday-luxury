import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialCelebrationData } from '../data/defaults';

const CelebrationContext = createContext(null);

export function CelebrationProvider({ children }) {
  // Load saved state or default
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('luxury_birthday_data_v8');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse localStorage data', e);
    }
    return initialCelebrationData;
  });

  // Presentation State
  const [hasStarted, setHasStarted] = useState(false);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [activeTheme, setActiveTheme] = useState('midnight-gold'); // 'midnight-gold', 'champagne-silk', 'rose-noir'
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [isMovieModeOpen, setIsMovieModeOpen] = useState(false);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(false);

  // Audio State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(262);
  const [volume, setVolume] = useState(0.85);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [audioError, setAudioError] = useState(null);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('luxury_birthday_data_v8', JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [data]);

  // Audio initialization and event listeners
  useEffect(() => {
    const audio = new Audio(data.music.audioSrc || '/audio/dash-uciha-merindukanmu.mp3');
    audioRef.current = audio;
    audio.preload = 'auto';
    audio.volume = volume;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 262);
    };

    const onTimeUpdate = () => {
      const time = audio.currentTime;
      setCurrentTime(time);

      // Find active lyric index
      const lyrics = data.music.lyrics;
      let activeIndex = -1;
      for (let i = 0; i < lyrics.length; i++) {
        if (time >= lyrics[i].time) {
          activeIndex = i;
        } else {
          break;
        }
      }
      setCurrentLyricIndex(activeIndex);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onError = (e) => {
      console.warn('Audio playback error', e);
      setAudioError('Audio file could not be loaded directly');
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [data.music.audioSrc]);

  // Audio Controls
  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn('Playback gesture required:', err);
    }
  };

  const seekTo = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(seconds);
  };

  const changeVolume = (val) => {
    const v = Math.max(0, Math.min(val, 1));
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  // Start Experience: unseal envelope and play music seamlessly
  const startExperience = async () => {
    setHasStarted(true);
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('User interaction permitted audio, but browser restricted:', err);
      }
    }
  };

  // Update specific photo (id: "photo-1" | "photo-2")
  const updatePhoto = (photoId, newFields) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === photoId ? { ...p, ...newFields } : p)),
    }));
  };

  // Update general celebration data
  const updateCelebrationData = (updates) => {
    setData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Reset to default factory settings
  const resetToDefaults = () => {
    localStorage.removeItem('luxury_birthday_data');
    setData(initialCelebrationData);
  };

  return (
    <CelebrationContext.Provider
      value={{
        data,
        hasStarted,
        startExperience,
        isCandleBlown,
        setIsCandleBlown,
        activeTheme,
        setActiveTheme,
        isCustomizerOpen,
        setIsCustomizerOpen,
        activePhotoModal,
        setActivePhotoModal,
        isMovieModeOpen,
        setIsMovieModeOpen,
        isAutoScrollActive,
        setIsAutoScrollActive,
        // Audio
        isPlaying,
        togglePlay,
        currentTime,
        duration,
        seekTo,
        volume,
        changeVolume,
        currentLyricIndex,
        audioError,
        // Updaters
        updatePhoto,
        updateCelebrationData,
        resetToDefaults,
      }}
    >
      {children}
    </CelebrationContext.Provider>
  );
}

export function useCelebration() {
  const context = useContext(CelebrationContext);
  if (!context) {
    throw new Error('useCelebration must be used within CelebrationProvider');
  }
  return context;
}
