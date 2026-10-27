# ✨ A Symphony of Love — Website Bucin Happy Birthday Luxury

Web bucin perayaan ulang tahun bertema **Luxury Editorial Archive** (desain profesional kelas agensi boutique, bukan template AI murahan). Dilengkapi lagu nostalgia **Dash Uciha - Merindukanmu** dengan lirik tersinkronisasi (*real-time synchronized lyrics*), pemutar piringan hitam interaktif, serta showcase khusus **2 Foto Kenangan** dengan efek *3D Parallax Tilt*.

---

## 🌟 Fitur Utama (Boutique & Harga Mahal)

1. **Wax-Sealed Envelope Intro (Unseal Experience)**
   - Tirai pembuka berupa amplop berstempel lilin emas (*antique wax seal*).
   - Memecahkan batasan autoplay browser secara elegan: saat pasangan menekan segel lilin, musik **Dash Uciha - Merindukanmu** otomatis mulai mengalun lembut.

2. **Pameran Khusus 2 Foto ("Dua Momen, Satu Semesta")**
   - Didesain khusus secara presisi untuk **2 Foto**:
     - **Foto 1**: *Babak I — Awal Dimana Waktu Berhenti (Potret Senyum Pertamamu)*
     - **Foto 2**: *Babak II — Selamanya di Setiap Hari Esok (Cahaya di Setiap Hariku)*
   - Efek *3D Parallax Tilt* dinamis mengikuti gerakan kursor mouse.
   - Dilengkapi *film strip metadata*, klip kuningan (*brass clips*), dan tombol **Ganti Foto Ini** langsung di kartu untuk mengunggah foto Anda sendiri tanpa coding.
   - Mode ganda: *Side-by-Side Dual Frames* atau *Single Focus Tabs*.
   - Lightbox modal resolusi tinggi saat foto diklik.

3. **Vinyl Player & Lirik Lagu Tersinkronisasi (Dash Uciha - Merindukanmu)**
   - Piringan hitam (*vinyl record*) 33 RPM yang berputar secara dinamis dengan jarum *tonearm* emas yang mendarat otomatis saat lagu diputar.
   - Lirik lagu **Dash Uciha — Merindukanmu** tersinkronisasi detik demi detik:
     - Baris lirik aktif bersinar keemasan (*champagne gold glow*) dan auto-scroll ke tengah.
     - Anda atau pasangan dapat **mengklik baris lirik mana saja** untuk langsung melompat (*seek*) ke bagian lagu tersebut!
   - Dilengkapi slider durasi waktu, volume, tombol mundur/maju 10 detik.

4. **Ritual Tiup Lilin Interaktif (Minimalist Luxury Cake)**
   - Kue ulang tahun modern bertingkat dengan lilin berapi animasi realistis (*SVG flame flicker*).
   - Pasangan bisa mengetikkan permohonan rahasia ke dalam kotak doa.
   - Menekan tombol **Tiup Lilin** akan mematikan api secara lembut dengan efek asap (*smoke wisp*) dan ledakan hujan konfeti foil emas & mawar (*canvas-confetti*).

5. **Warkat / Surat Bucin Berkelas (Love Letter Folio)**
   - Disusun dengan bahasa Indonesia puitis, tulus, dewasa, dan mendalam (*zero cringe*).
   - Tombol salin warkat dan tanda tangan digital.

6. **Kapsul Harapan (6 Golden Vows) & Trivia Manis**
   - 6 kartu janji suci (*Tempat Pulang, Damai, Mimpi, Menua Bersama, dll.*).
   - Kartu rahasia interaktif yang bisa diklik untuk membuka jawaban manis.

7. **Laci Kustomisasi Lengkap (Customizer Drawer)**
   - Pasangan atau Anda dapat mengubah langsung dari tampilan web:
     - Nama Pasangan & Nama Panggilan
     - Usia Ulang Tahun & Tanggal Lahir (otomatis menghitung hitungan waktu detik demi detik di beranda)
     - Foto 1 & Foto 2 (Drag & Drop / Upload file langsung dari HP atau Laptop, otomatis tersimpan ke `localStorage`)
     - Isi Surat Cinta & Tanda Tangan

---

## 🚀 Cara Menjalankan

Web server lokal sudah aktif di:
👉 **`http://localhost:5173/`**

### Perintah Penting:
```bash
# Menjalankan development server
npm run dev

# Membangun versi produksi (hasil di folder dist/)
npm run build

# Menjalankan preview produksi
npm run preview
```

---

## 📁 Struktur File Penting
- `public/audio/dash-uciha-merindukanmu.mp3`: File audio resmi Dash Uciha
- `public/photos/photo1.jpg`: Foto pertama default
- `public/photos/photo2.jpg`: Foto kedua default
- `src/components/DualPhotoShowcase.jsx`: Komponen pameran 2 foto
- `src/components/MusicLyricsPlayer.jsx`: Pemutar vinyl & lirik tersinkronisasi
- `src/components/CandleCakeSection.jsx`: Interaksi tiup lilin & konfeti
- `src/components/LoveLetterSection.jsx`: Surat cinta eksklusif
- `src/data/defaults.js`: Teks, lirik, dan konfigurasi bawaan
