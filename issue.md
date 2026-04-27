# 🚀 Next Up: Penyempurnaan Dashboard & Fix Error Generate Page

Halo tim! (Atau rekan AI yang akan melanjutkan task ini 👋).

Ada beberapa *task* lanjutan dari branch `redesign` kemarin. Tugas kali ini fokus untuk merapikan UI, memperbaiki error *critical* saat generate page, dan memoles UX (User Experience) agar makin nyaman digunakan.

Berikut adalah detail rencana kerjanya. Tolong dikerjakan secara berurutan (*step-by-step*) ya supaya gampang di-*track* dan di-*review*!

---

## 🌍 Step 1: Translate ke Bahasa Inggris & Polishing Teks
Kita ingin aplikasi ini terlihat lebih profesional.
- Cek semua file komponen dan halaman (terutama di dalam `app/(dashboard)/*` dan `components/dashboard/*`).
- Ubah **semua teks**, mulai dari placeholder input, deskripsi singkat, sapaan, pesan *error*, sampai *alert/toast* ke **Bahasa Inggris**.
- Perbagus kalimatnya agar terdengar natural. (Contoh: "Belum ada page dibuat" -> *"You haven't created any pages yet. Let's build your first one!"*).

---

## 🖼️ Step 2: Perbaikan Card Content
Fokus ke komponen card halaman yang sudah di-generate (`components/dashboard/page-card.tsx`):
1. **Thumbnail Gambar Dummy**: 
   - Tolong **jangan pakai API Unsplash**. 
   - Siapkan/cari gambar *dummy* sendiri yang ukurannya kecil (resolusi rendah saja agar *loading* cepat) yang temanya cocok dengan landing page/bisnis.
   - Simpan gambar-gambar tersebut di folder `public/dummy-image/`.
   - Panggil gambar tersebut dari folder lokal untuk dijadikan *thumbnail* di card.
2. **Seragamkan Lebar Button**:
   - Di dalam action card (tombol Preview, Copy Link, Publish, Delete), pastikan lebarnya seragam.
   - Kalau sebelumnya ada yang panjang dan ada yang pendek, buat *button*-nya sama lebar agar tidak ada perbedaan, misalnya menggunakan utility class `flex-1` atau grid.

---

## 📱 Step 3: Koreksi Responsive Layout
Ada sedikit '*bug* UI' di layar berukuran lebih kecil dari laptop (tablet/mobile):
- Teks sapaan "Welcome" atau header konten tertutup oleh *navbar/header* menu saat di tampilan mobile.
- Silakan koreksi dengan menambahkan `margin-top` atau `padding-top` yang cukup pada kontainer utama dashboard, sehingga konten tidak tertabrak/bersembunyi di balik navbar atas.

---

## 🐛 Step 4: Fix Error Generate Page (Critical!)
Ini prioritas utama! Saat ini di branch `redesign`, terjadi *error* ketika user (terutama user baru) mencoba melakukan **Generate Page**.
- **Kemungkinan Penyebab**: Terdapat salah ketik (*typo*) atau perbedaan penamaan variabel saat proses mengambil data/menyimpan ke database (Prisma) antara versi sebelum di-redesign dengan versi sekarang.
- **Yang harus dilakukan**:
  - Cek kembali kode di *server action* terkait (misal di `app/actions/generate-sales-page.ts`).
  - Pastikan penamaan variabel dan logika pengambilan nilainya (khususnya relasi ke `userId` atau `user`) sudah sesuai persis dengan struktur sebelumnya agar tidak *error*.
  - Silakan *test* dengan akun baru sampai proses generate page sukses tanpa kendala.

---

## 🧭 Step 5: Update Sidebar
Buka komponen `Sidebar` (`components/dashboard/sidebar.tsx`) dan lakukan penyesuaian berikut:
1. **Pindahkan Posisi Logout**: 
   - Pindahkan tombol/menu **Logout** posisinya menjadi **tepat di atas profil user** (jangan di paling bawah).
   - Pastikan sudah memakai *icon* keluar (seperti icon `LogOut` dari Lucide).
2. **Aktifkan Menu History (Riwayat)**:
   - Jadikan menu History bisa di-klik. 
   - Ketika di-klik, user akan diarahkan ke halaman detail History yang isinya daftar page yang sudah pernah mereka generate. (Buat file *page route*-nya jika belum ada).
3. **Notifikasi "Request Feature" pada Setting**:
   - Pada menu Setting (Pengaturan), modifikasi sedikit dengan memberikan indikator/notifikasi bertuliskan **"Request Feature"**.
   - Ini bertujuan agar user tahu bahwa mereka bisa meminta fitur tambahan kepada Admin melalui bagian tersebut.

---

## 💡 Tips Implementasi untuk Tim / AI:
- **Satu per satu:** Kerjakan mulai dari Step 1 sampai Step 5. Jangan lompat-lompat ya biar lebih terstruktur.
- **Debugging:** Untuk Step 4, gunakan `console.log()` di bagian *backend action* untuk mengecek apakah data *form* dari *client* berhasil masuk atau ada data `null` yang bikin *database* menolak eksekusi.
- **Testing UI:** Setelah mengerjakan Step 3, jangan lupa *resize* jendela browser ke ukuran *mobile* untuk memastikan teks "Welcome" sudah benar-benar terlihat.
- Semangat *coding*-nya! 🚀
