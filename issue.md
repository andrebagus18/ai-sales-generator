# 🛠️ Fix: Tombol "Sign in with Google" Belum Berfungsi

Halo tim! (Atau AI asisten yang akan bantu kerjain ini 👋)

Saat ini kalau kita klik tombol **"Sign in with Google"** di halaman `/login` atau `/register`, tidak terjadi apa-apa atau prosesnya gagal. Hal ini wajar karena kita belum menyambungkan aplikasi kita dengan layanan otentikasi Google secara penuh.

Secara kode, fungsi `signIn("google")` dari `next-auth` sebenarnya sudah ada di komponen kita, tapi dia butuh **"kunci rahasia"** dari Google untuk bisa bekerja.

Berikut adalah langkah-langkah santai tapi pasti untuk membereskan fitur ini:

---

## 🎯 Tahap 1: Setup di Google Cloud Console (Dapetin Kunci Rahasia)

Kita harus mendaftarkan aplikasi kita ke Google supaya diizinkan pakai fitur Login mereka.

1. Buka [Google Cloud Console](https://console.cloud.google.com/).
2. Buat **Project Baru** (misal namanya: `ai-sales-generator`).
3. Masuk ke menu **APIs & Services** > **OAuth consent screen**.
   - Pilih **External** (agar semua akun Google bisa login).
   - Isi nama aplikasi, email dukungan (pakai email kamu aja), dan email developer. Yang lain biarkan kosong lalu simpan.
4. Masuk ke menu **Credentials**.
   - Klik **Create Credentials** > **OAuth client ID**.
   - Pilih Application type: **Web application**.
   - Beri nama (bebas, misal: `Web Client 1`).
   - Di bagian **Authorized JavaScript origins**, tambahkan:
     `http://localhost:3000` (penting untuk testing lokal).
   - Di bagian **Authorized redirect URIs**, tambahkan:
     `http://localhost:3000/api/auth/callback/google` (ini jalur baliknya `next-auth`).
   - Klik **Create**.
5. 🎉 **BOOM!** Kamu akan dapat **Client ID** dan **Client Secret**. Jangan tutup modalnya dulu, kita butuh ini di tahap 2.

---

## 🎯 Tahap 2: Konfigurasi File `.env` (Masukin Kuncinya)

Sekarang kita kasih tahu aplikasi kita kunci yang barusan kita dapat.

1. Buka file `.env` di root project kita.
2. Tambahkan variabel berikut (kalau sudah ada, tinggal isi valuenya):

```env
GOOGLE_CLIENT_ID="copas_client_id_dari_google_kesini"
GOOGLE_CLIENT_SECRET="copas_client_secret_dari_google_kesini"

# Pastikan dua variabel ini juga ada untuk next-auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="bikin_rahasia_acak_apa_aja_misal_super_secret_key_123"
```
*(Catatan: Jangan pernah commit file `.env` ini ke GitHub ya!)*

---

## 🎯 Tahap 3: Verifikasi Kode (Memastikan Semuanya Connect)

Sebenarnya kode kita sudah lumayan lengkap, tapi coba pastikan hal-hal berikut:

1. **Cek file `lib/auth.ts`**:
   Pastikan di bagian `providers`, `GoogleProvider` mengambil dari `process.env` dengan benar:
   ```typescript
   GoogleProvider({
     clientId: process.env.GOOGLE_CLIENT_ID ?? "",
     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
   }),
   ```

2. **Cek `app/api/auth/[...nextauth]/route.ts`**:
   Pastikan file ini ada dan sudah me-*return* handler dari `next-auth`. (Harusnya sudah aman kalau login biasa jalan).

3. **Cek Database (Prisma)**:
   Karena kita pakai Database (PostgreSQL/Prisma), kita harus pastikan `next-auth` punya adapter untuk menyimpan user yang login pakai Google.
   - Cek `lib/auth.ts`, apakah sudah pakai `PrismaAdapter`?
   - Kalau belum ada adapter, user bisa login via Google tapi datanya **tidak akan tersimpan** ke database kita. 
   - *Tugas tambahan:* Jika ingin menyimpan user Google ke database kita, mungkin perlu menambahkan `PrismaAdapter` di `authOptions` dan memastikan schema Prisma mendukung tabel `Account`, `Session`, `User` standar bawaan `next-auth`. Tapi kalau cuma mau sekadar "masuk dashboard", konfigurasi di atas sudah cukup.

---

### 🚀 Cara Testing:
1. Restart server Next.js kamu (`npm run dev`).
2. Buka halaman `/login`.
3. Klik "Sign in with Google".
4. Harusnya akan muncul popup login Google. Setelah sukses pilih akun, kamu akan otomatis dibawa ke `/dashboard`.

Semangat codingnya! Jangan sungkan untuk tanya kalau mentok di settingan Google Cloud Console-nya. 💻✨
