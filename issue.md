# 🚀 Enhancement Plan: UI Polish & Better UX

Halo tim! (Atau AI asisten yang sedang bertugas 👋)

Kita punya beberapa tugas *enhancement* (peningkatan fitur) untuk membuat UI aplikasi kita terasa lebih hidup, interaktif, dan modern. Jangan khawatir, ini mayoritas urusan *styling* Tailwind CSS dan sedikit penambahan *state* di React. 

Berikut adalah daftar pekerjaan yang perlu dieksekusi. Tolong kerjakan secara berurutan ya!

---

## 🎯 Task 1: Bikin Semua Tombol Lebih "Hidup" (Global)

**Masalah:** Beberapa tombol saat ini terasa kaku saat di-*hover* dan kadang *cursor* mouse-nya belum berubah jadi bentuk tangan (*pointer*).
**Goal:** Pastikan semua elemen yang bisa diklik punya efek hover yang *smooth* (misalnya sedikit membesar atau berubah warna) dan pastikan kursornya jadi pointer.

**Langkah-langkah Eksekusi:**
1. **Cek Halaman Depan (`app/page.tsx`):**
   - Cari tombol seperti "Get Started" atau link login dan Register.
   - Pastikan ada class `cursor-pointer`.
   - Tambahkan class animasi seperti `transition-all duration-200 hover:scale-105 active:scale-95` agar tombol membesar sedikit saat di-hover dan mengecil saat diklik.

2. **Cek Halaman Dashboard (`app/dashboard/page.tsx` & `components/dashboard/page-actions.tsx`):**
   - Terapkan efek transisi yang serupa pada tombol "New Page", "Preview", "Copy Link", dll.
   - Pastikan semua punya class `cursor-pointer`.

3. **Cek Halaman Generate (`app/generator/page.tsx`):**
   - Pastikan tombol "Next", "Back", "Generate" punya hover state yang jelas dan `cursor-pointer`.

---

## 🎯 Task 2: Animasi Logout di Dashboard

**Masalah:** Saat ini kalau tombol Logout diklik, user langsung terlempar keluar begitu saja (atau mungkin loadingnya nggak kelihatan). Kita ingin UX-nya lebih manis.
**Goal:** Tampilkan *custom alert* atau indikator loading saat proses logout berlangsung.

**Langkah-langkah Eksekusi:**
1. Buka komponen yang meng-handle tombol logout (biasanya di `components/dashboard/dashboard-navbar.tsx` atau sejenisnya).
2. Buat *state* baru menggunakan `useState`: 
   ```javascript
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   ```
3. Ubah fungsi onClick pada tombol logout menjadi seperti ini:
   - Set `setIsLoggingOut(true)`.
   - Jalankan fungsi `signOut({ callbackUrl: '/' })`.
4. Di bagian render tombol (JSX), ubah teks/icon tombol secara dinamis:
   ```jsx
   <button disabled={isLoggingOut} onClick={handleLogout} className="...">
     {isLoggingOut ? (
       <span className="flex items-center gap-2">
         <svg className="animate-spin h-4 w-4 ..." /* icon spinner tailwind */ />
         Logging out...
       </span>
     ) : (
       "Logout"
     )}
   </button>
   ```
5. *(Opsional)* Jika ingin lebih cantik, gunakan komponen Toast/Alert yang sudah ada untuk memunculkan pesan "See you later! 👋" tepat sebelum logout.

---

## 🎯 Task 3: Percantik Halaman Generate Page (`/generator`)

Ini bagian yang paling seru! Kita akan merombak sedikit tampilan *progress bar* dan tombol navigasi agar lebih senada dengan tema AI kita.

**Langkah-langkah Eksekusi:**

1. **Ubah Progress Bar (Step Indicator):**
   - Buka `app/generator/page.tsx`.
   - Cari bagian yang me-render step 1, 2, 3 (progress bar).
   - **Untuk step yang sedang berjalan (Active) atau selesai (Completed):** Berikan warna background solid yang merepresentasikan "AI" (misalnya gradasi ungu ke biru: `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500` atau setidaknya solid `bg-indigo-600`).
   - **Untuk step yang belum berjalan (Upcoming):** Jangan beri background solid. Berikan saja outline/border (misalnya `border-2 border-zinc-700 bg-transparent text-zinc-500`).

2. **Ubah Link "Back to Dashboard" Jadi Tombol:**
   - Cari teks/link "Back to Dashboard".
   - Ubah elemen tersebut (entah itu `<a>` atau `<Link>`) agar memiliki tampilan tombol.
   - Berikan class dasar tombol: `inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all`.

3. **Ubah Warna Tombol Menjadi `#252525`:**
   - Untuk tombol navigasi di halaman generator (seperti "Back to Dashboard", "Next", atau "Generate"), ubah warna background utamanya menjadi hex code `#252525`.
   - Karena Tailwind tidak punya nama spesifik untuk `#252525`, kamu bisa pakai class *arbitrary value* milik Tailwind: `bg-[#252525]`.
   - Jangan lupa tambahkan efek hover, misalnya `hover:bg-[#333333]`.
   - Pastikan warna teks di dalamnya terang (`text-white` atau `text-zinc-100`) agar kontrasnya pas.

---

### Catatan Tambahan untuk Developer:
- Selalu tes di mode responsif (mobile) untuk memastikan animasi hover dan ukuran tombol tetap nyaman ditekan pakai jari.
- Jangan sampai mengubah logika backend/database, fokus kita murni di **UI/UX dan Frontend State** saja.

Semangat codingnya! 💻✨
