import React from 'react';
import { X, Download, Heart, QrCode } from 'lucide-react';

export default function QrCodeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      
      <div className="relative z-10 max-w-sm w-full p-6 sm:p-8 rounded-3xl bg-[#140811] border border-rose-500/30 shadow-2xl text-center flex flex-col items-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heart Icon Badge */}
        <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center mb-3">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500/60 animate-heartbeat" />
        </div>

        <h3 className="font-serif text-xl font-bold text-white mb-1">
          Barcode Cinta
        </h3>
        <p className="text-xs text-rose-300/80 mb-6 font-light">
          Arahkan kamera ponsel untuk membuka kado ulang tahun ini
        </p>

        {/* QR Code Preview Frame */}
        <div className="relative p-3 rounded-2xl bg-[#FFF0F5] border-2 border-rose-400/50 shadow-xl mb-6">
          <img
            src="/qr-code-love.png"
            alt="Love Pink QR Code"
            className="w-56 h-56 rounded-xl object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-2.5">
          <a
            href="/qr-code-love-card.png"
            download="Kado-Ulang-Tahun-Megawati-QR.png"
            className="animate-shimmer py-3 px-5 rounded-full bg-gradient-to-r from-[#FDA4AF] via-[#F43F5E] to-[#BE123C] text-white font-semibold text-xs tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Kartu Barcode (HD)</span>
          </a>

          <a
            href="/qr-code-love.png"
            download="QR-Love-Pink.png"
            className="py-2.5 px-4 rounded-full bg-luxury-surface border border-rose-400/30 text-rose-200 text-xs font-medium hover:bg-rose-500/15 transition-all flex items-center justify-center gap-2"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Unduh Barcode Saja</span>
          </a>
        </div>
      </div>
    </div>
  );
}
