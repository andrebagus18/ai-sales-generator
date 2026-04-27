# 🚀 Next Up: Fitur Template Landing Page & Alur Generate Page

Halo tim! (Atau rekan AI model yang lagi ngerjain task ini 👋).

Task kali ini sangat seru, kita akan menambahkan fitur **Template** untuk halaman sales/landing page kita. Tujuannya supaya desain yang dihasilkan tidak monoton dan user bisa memilih tema visual sesuai kebutuhan mereka.

Berikut adalah detail rencana kerjanya. Tolong kerjakan secara berurutan (*step-by-step*) dengan santai tapi pasti ya!

---

## 🎨 Step 1: Membuat 3 Komponen Template UI
Tugas pertama kamu adalah membuat 3 variasi desain komponen template. Komponen-komponen ini nantinya akan menerima *props*: `{ title, description, targetMarket }`. (Kamu bisa membuatnya di dalam folder `components/templates/`).

Buatlah 3 tipe desain berikut:

1. **Template 1 (Dark Blue Tech)**
   - **Background**: Super gelap (gunakan Tailwind class seperti `bg-slate-950` atau `bg-zinc-950`).
   - **Efek Visual**: Berikan sentuhan *Glassmorphism* (efek transparan dengan `backdrop-blur`).
   - **Aksen**: Gunakan warna biru yang menyala atau *glowing* (misalnya `text-blue-500` atau `blue-600` dengan tambahan *drop shadow* terang).

2. **Template 2 (Professional Clean)**
   - **Background**: Sangat bersih, gunakan putih polos atau abu-abu sangat muda (`bg-white` atau `bg-slate-50`).
   - **Tipografi & Desain**: Gaya minimalis, rapi, dan menggunakan font yang terlihat sangat profesional/korporat.
   - **Aksen**: Gunakan warna *Royal Blue* (misal `text-blue-700`) untuk *highlight* elemen penting.

3. **Template 3 (Modern Split)**
   - **Layout**: Layar terbagi dua bagian (*split-screen* vertical).
   - **Warna**: Satu sisi menggunakan warna *Solid Blue* (blok warna biru penuh), sedangkan sisi sebelahnya berwarna putih.
   - **Tipografi**: Gunakan font dengan ketebalan ekstra (*bold/black*) agar terlihat tegas dan *edgy*.

---

## 🧭 Step 2: Integrasi ke Sidebar (Menu "Templates")
Sekarang kita sambungkan desain tersebut ke navigasi aplikasi:
- Buka file navigasi Sidebar kita.
- Ketika user mengklik menu **Templates**, tampilkan halaman (atau modal) yang memuat pilihan ketiga desain template di atas.
- **Logika Navigasi**: Jika user **memilih salah satu template**, arahkan (redirect) mereka ke halaman **Generate New Page**.
- *Hint:* Jangan lupa bawa informasi (misal lewat URL parameter `?template=dark-tech`) agar halaman generator tahu template mana yang dipilih.

---

## ⚙️ Step 3: Modifikasi Alur di Halaman Generate & Dashboard
Di tahap ini, kita mengatur apa yang terjadi saat AI selesai meng-generate konten.

- **Skenario A: User masuk dari menu "Templates" (Memilih Template)**
  - Di halaman *generate page*, gunakan template yang sudah dipilih user tersebut untuk menampilkan/membuat *landing page*-nya.
  - Sesuaikan tema dan layout-nya persis dengan *style* template yang di-*request*.
  - **Thumbnail Card**: Berikan gambar *thumbnail* secara **acak** menggunakan gambar *dummy* yang sudah tersedia di folder `public/dummy-image/`.

- **Skenario B: User masuk dari menu "New Page" (Tanpa Memilih Template)**
  - Arahkan user ke halaman *generate new page* seperti biasa.
  - Karena user tidak memilih template, gunakan **Template Default** (kamu bebas memilih salah satu dari 3 template di atas untuk dijadikan *default*).
  - **Thumbnail Card**: Sama seperti skenario A, gunakan gambar *thumbnail* acak dari folder `public/dummy-image/`.

---

## 💡 Tips Implementasi untuk Tim / AI:
- **Kerjakan UI-nya dulu:** Fokus bikin 3 komponen template di Step 1 sampai *styling*-nya benar-benar kelihatan bagus. Isi dengan data *dummy* dulu nggak masalah.
- **Simpan pilihan di Database:** Kamu mungkin perlu mengubah skema database (`prisma/schema.prisma`) untuk menambahkan *field* `templateType` pada tabel yang menyimpan data page, supaya saat page di-load di lain waktu, sistem tahu harus pakai desain yang mana.
- **Gunakan fungsi Random:** Untuk urusan gambar *thumbnail* acak, cukup pakai fungsi `Math.random()` sederhana untuk memilih nama file dari folder `dummy-image`.

Semangat *coding*-nya! Buat UI-nya sekeren mungkin ya! 🚀
