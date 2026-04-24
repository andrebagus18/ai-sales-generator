# 🚀 AI Sales Page Generator

AI Sales Page Generator adalah aplikasi web modern yang memanfaatkan kecerdasan buatan (AI) Google Gemini untuk membuat *copywriting* halaman penjualan (sales landing page) secara otomatis. Hanya dengan memasukkan nama produk, deskripsi singkat, dan target pasar, AI akan menyusun struktur *sales page* profesional yang mencakup *Headline*, *Pain Points*, *Benefits*, FAQ, dan *Call to Action* (CTA).

Aplikasi ini dilengkapi dengan fitur manajemen halaman (draft/publish), preview pribadi, dan otentikasi pengguna menggunakan Google Sign-In maupun Email/Password.

---

## 🛠️ Technology Stack & Libraries

Aplikasi ini dibangun menggunakan teknologi web terkini:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) dengan [React 19](https://react.dev/) & TypeScript.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) untuk utilitas CSS dan [Framer Motion](https://www.framer.com/motion/) untuk animasi UI yang mulus.
- **Database:** [PostgreSQL](https://www.postgresql.org/) sebagai database utama, dikelola dengan ORM [Prisma](https://www.prisma.io/).
- **Authentication:** [NextAuth.js v4](https://next-auth.js.org/) untuk login via Google OAuth dan Credentials (Email/Password).
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/) & `@ai-sdk/google` menggunakan model **Gemini 2.5 Flash**.
- **Security & Validation:** `bcrypt` untuk hashing password dan `Zod` untuk validasi data input/output.

---

## 📂 Arsitektur & Struktur Folder

Aplikasi ini menggunakan pola **App Router** dari Next.js, yang memisahkan antara UI, Server Actions, dan API Routes.

```text
ai-sales-generator/
├── app/                      # Inti dari Next.js App Router
│   ├── api/                  # REST API Endpoints (/register & /auth)
│   ├── actions/              # Server Actions (Mutasi data tanpa API route manual)
│   │   ├── generate-sales-page.ts
│   │   └── manage-sales-pages.ts
│   ├── dashboard/            # Halaman Dashboard user (Private)
│   ├── generator/            # Halaman Form untuk generate AI (Private)
│   ├── login/ & register/    # Halaman Otentikasi (Public)
│   ├── p/[id]/               # Halaman Sales Page yang di-publish (Public Link)
│   ├── preview/[id]/         # Halaman Preview Draft (Private, hanya pemilik)
│   └── page.tsx              # Landing Page Utama Aplikasi
├── components/               # Komponen UI Reusable (Auth, Dashboard, Public Page)
├── lib/                      # Konfigurasi dan Fungsi Core
│   ├── ai.ts                 # Setup Vercel AI SDK & Gemini Prompt
│   ├── auth.ts               # Konfigurasi NextAuth & PrismaAdapter
│   ├── prisma.ts             # Inisialisasi Prisma Client
│   └── sales-pages.ts        # Fungsi helper untuk query ke database
├── prisma/
│   └── schema.prisma         # Definisi Skema Database PostgreSQL
└── .env                      # File Environment Variables (Tidak di-commit)
```

---

## ⚙️ Cara Kerja Aplikasi

1. **Otentikasi:** Pengguna harus mendaftar atau login (via Email atau Google) untuk masuk ke Dashboard.
2. **Generate Page:** Di halaman `/generator`, pengguna mengisi *Product Name*, *Description*, dan *Target Market*.
3. **AI Processing:** Server akan mengirim prompt terstruktur ke Google Gemini. AI mengembalikan response dalam format JSON murni yang berisi elemen-elemen *sales copy*.
4. **Penyimpanan:** Hasil dari AI disimpan ke database PostgreSQL bersama dengan relasi ke User yang membuatnya.
5. **Preview & Publish:** 
   - Pengguna dapat melihat hasil di tab **Preview** (hanya bisa diakses pembuatnya).
   - Pengguna dapat melakukan **Publish**, yang akan mengaktifkan URL publik (`/p/[id]`) untuk dibagikan ke calon pelanggan.

---

## 🗄️ Schema Database

Aplikasi menggunakan Prisma dengan skema berikut:

- **`User`**: Menyimpan data pengguna (Nama, Email, Password hashed).
- **`Account`, `Session`, `VerificationToken`**: Tabel standar dari NextAuth untuk menangani sesi login dan Google OAuth.
- **`SalesPage`**: Tabel utama penyimpan karya. Memiliki relasi ke tabel `User`.
  - Field penting: `productName`, `originalDescription`, `targetMarket`, `aiContent` (JSON dari hasil Gemini), dan `isPublished` (Boolean).

---

## 📡 API & Server Actions yang Tersedia

Alih-alih menggunakan banyak REST API, aplikasi ini lebih banyak memanfaatkan **React Server Actions** untuk efisiensi komunikasi Client-Server.

**REST APIs (`/app/api/`)**:
- `POST /api/register`: Menerima payload JSON (name, email, password), memvalidasi dengan Zod, melakukan hashing password, dan menyimpan User baru ke DB.
- `GET/POST /api/auth/[...nextauth]`: Dikelola otomatis oleh NextAuth untuk *callback* Google dan pengecekan kredensial.

**Server Actions (`/app/actions/`)**:
- `generateSalesCopy(input)`: Menghubungkan ke Gemini API, memvalidasi JSON output, dan membuat record `SalesPage` baru di database.
- `togglePublishSalesPage(formData)`: Mengubah status `isPublished` (True/False) dari sebuah *sales page*.
- `deleteSalesPage(formData)`: Menghapus record *sales page* dari database.

---

 Selamat mencoba! 🎉
