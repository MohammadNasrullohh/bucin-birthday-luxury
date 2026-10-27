import React, { useState, useRef } from 'react';
import { useCelebration } from '../context/CelebrationContext';
import { 
  X, 
  Upload, 
  Check, 
  RotateCcw, 
  Sliders, 
  User, 
  Camera, 
  Mail, 
  Heart 
} from 'lucide-react';

export default function CustomizerModal() {
  const { 
    data, 
    updateCelebrationData, 
    updatePhoto, 
    resetToDefaults,
    isCustomizerOpen, 
    setIsCustomizerOpen 
  } = useCelebration();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'photos', 'letter'
  const file1Ref = useRef(null);
  const file2Ref = useRef(null);

  if (!isCustomizerOpen) return null;

  const handlePhotoUpload = (e, photoId) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updatePhoto(photoId, { url: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const photo1 = data.photos[0];
  const photo2 = data.photos[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={() => setIsCustomizerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-xl h-full bg-[#100F17] border-l border-luxury-gold/30 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-luxury-gold/20 flex items-center justify-between bg-luxury-surface/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-luxury-gold/15 flex items-center justify-center border border-luxury-gold/30">
              <Sliders className="w-4 h-4 text-luxury-gold" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-luxury-ivory">
                Kustomisasi Web Bucin
              </h3>
              <p className="text-xs text-luxury-muted">
                Ubah nama, 2 foto kenangan, dan surat cinta Anda
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomizerOpen(false)}
            className="p-2 rounded-full hover:bg-luxury-gold/10 text-luxury-muted hover:text-luxury-ivory transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-luxury-gold/15 bg-luxury-surface/50 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 font-medium transition-all ${
              activeTab === 'profile'
                ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5'
                : 'border-transparent text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil & Usia</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 font-medium transition-all ${
              activeTab === 'photos'
                ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5'
                : 'border-transparent text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>2 Foto Spesial</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-1.5 border-b-2 font-medium transition-all ${
              activeTab === 'letter'
                ? 'border-luxury-gold text-luxury-gold bg-luxury-gold/5'
                : 'border-transparent text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Surat Bucin</span>
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Nama Pasangan (Lengkap)
                </label>
                <input
                  type="text"
                  value={data.partnerName}
                  onChange={(e) => updateCelebrationData({ partnerName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  placeholder="Contoh: Adinda Putri"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Nama Panggilan / Kesayangan
                </label>
                <input
                  type="text"
                  value={data.partnerNickname}
                  onChange={(e) => updateCelebrationData({ partnerNickname: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  placeholder="Contoh: Sayang / Dinda"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                    Ulang Tahun Ke-
                  </label>
                  <input
                    type="number"
                    value={data.age}
                    onChange={(e) => updateCelebrationData({ age: parseInt(e.target.value) || 20 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={data.birthDate}
                    onChange={(e) => updateCelebrationData({ birthDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Nama Anda / Pengirim
                </label>
                <input
                  type="text"
                  value={data.yourName}
                  onChange={(e) => updateCelebrationData({ yourName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                  placeholder="Contoh: Aku yang Selalu Mencintaimu"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Sub-judul Beranda
                </label>
                <textarea
                  rows="3"
                  value={data.heroSubtitle}
                  onChange={(e) => updateCelebrationData({ heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>
          )}

          {/* TAB 2: DUAL PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <input
                type="file"
                ref={file1Ref}
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoUpload(e, 'photo-1')}
              />
              <input
                type="file"
                ref={file2Ref}
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhotoUpload(e, 'photo-2')}
              />

              {/* Photo 1 Editor */}
              <div className="p-4 rounded-2xl bg-luxury-surface border border-luxury-gold/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-luxury-gold">
                    Potret 1: Awal Mula Pertemuan
                  </span>
                  <button
                    type="button"
                    onClick={() => file1Ref.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-gold text-luxury-dark text-xs font-semibold"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Unggah Foto 1</span>
                  </button>
                </div>

                <div className="flex gap-4 items-center">
                  <img
                    src={photo1.url}
                    alt="Preview 1"
                    className="w-16 h-20 object-cover rounded-lg border border-luxury-gold/30"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={photo1.title}
                      onChange={(e) => updatePhoto('photo-1', { title: e.target.value })}
                      placeholder="Judul Foto 1"
                      className="w-full px-3 py-1.5 rounded-lg bg-luxury-dark border border-luxury-gold/20 text-xs text-luxury-ivory"
                    />
                    <input
                      type="text"
                      value={photo1.caption}
                      onChange={(e) => updatePhoto('photo-1', { caption: e.target.value })}
                      placeholder="Keterangan singkat"
                      className="w-full px-3 py-1.5 rounded-lg bg-luxury-dark border border-luxury-gold/20 text-xs text-luxury-ivory"
                    />
                  </div>
                </div>
              </div>

              {/* Photo 2 Editor */}
              <div className="p-4 rounded-2xl bg-luxury-surface border border-luxury-gold/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-luxury-gold">
                    Potret 2: Janji Masa Depan
                  </span>
                  <button
                    type="button"
                    onClick={() => file2Ref.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-luxury-gold text-luxury-dark text-xs font-semibold"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Unggah Foto 2</span>
                  </button>
                </div>

                <div className="flex gap-4 items-center">
                  <img
                    src={photo2.url}
                    alt="Preview 2"
                    className="w-16 h-20 object-cover rounded-lg border border-luxury-gold/30"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={photo2.title}
                      onChange={(e) => updatePhoto('photo-2', { title: e.target.value })}
                      placeholder="Judul Foto 2"
                      className="w-full px-3 py-1.5 rounded-lg bg-luxury-dark border border-luxury-gold/20 text-xs text-luxury-ivory"
                    />
                    <input
                      type="text"
                      value={photo2.caption}
                      onChange={(e) => updatePhoto('photo-2', { caption: e.target.value })}
                      placeholder="Keterangan singkat"
                      className="w-full px-3 py-1.5 rounded-lg bg-luxury-dark border border-luxury-gold/20 text-xs text-luxury-ivory"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOVE LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Judul Surat
                </label>
                <input
                  type="text"
                  value={data.letter?.heading || ''}
                  onChange={(e) =>
                    updateCelebrationData({
                      letter: { ...data.letter, heading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Isi Surat (Pisahkan paragraf dengan baris baru ganda)
                </label>
                <textarea
                  rows="9"
                  value={data.letter?.paragraphs?.join('\n\n') || ''}
                  onChange={(e) =>
                    updateCelebrationData({
                      letter: {
                        ...data.letter,
                        paragraphs: e.target.value.split('\n\n').filter((p) => p.trim()),
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold font-serif"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-luxury-gold mb-1.5 font-mono">
                  Tanda Tangan Pengirim
                </label>
                <input
                  type="text"
                  value={data.letter?.signature || ''}
                  onChange={(e) =>
                    updateCelebrationData({
                      letter: { ...data.letter, signature: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-luxury-surface border border-luxury-gold/25 text-sm text-luxury-ivory focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-luxury-gold/20 flex items-center justify-between bg-luxury-surface/90">
          <button
            type="button"
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 text-xs text-rose-400/80 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Awal</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCustomizerOpen(false)}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA84] to-[#B88D4E] text-[#09080C] font-semibold text-xs tracking-wider uppercase shadow-lg shadow-amber-950/40 hover:opacity-95"
          >
            Simpan & Selesai
          </button>
        </div>

      </div>
    </div>
  );
}
