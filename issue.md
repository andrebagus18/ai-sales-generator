# 🐛 Bug Report — AI Sales Generator

> **Tanggal Pengujian:** 24 April 2026  
> **Versi Next.js:** 16.2.4  
> **Tester:** Automated E2E via Browser Agent  
> **Status:** 4 bug ditemukan, 1 sudah diperbaiki saat testing

---

## Ringkasan Pengujian

| Tahapan | Status | Catatan |
|---------|--------|---------|
| Register user baru | ✅ Berhasil | User `testuser_april24@example.com` berhasil dibuat |
| Login otomatis setelah register | ✅ Berhasil | Redirect ke `/dashboard` |
| Generator form (3 step) | ✅ Berhasil | Form validation & navigasi bekerja |
| AI Generation | ⚠️ Gagal lalu berhasil | Gagal 3x karena model deprecated, berhasil setelah fix |
| Dashboard list | ✅ Berhasil | Sales page muncul di dashboard |
| Publish toggle | ✅ Berhasil | Status berubah dari Draft → Published |
| Preview page (`/preview/[id]`) | ⚠️ Bug visual | Heading nyaris tidak terlihat |
| Public page (`/p/[id]`) | ⚠️ Bug visual | Heading nyaris tidak terlihat + markdown mentah |
| Copy Link | ✅ Berhasil | Link disalin ke clipboard |
| Delete | ✅ Berhasil | Sales page terhapus |

---

## BUG #1 — Model AI Deprecated (CRITICAL) ✅ SUDAH DIPERBAIKI

### Deskripsi
Model `gemini-1.5-flash` sudah deprecated dan tidak tersedia lagi di API Google Generative AI. Saat user mencoba generate sales page, muncul error:

> "Generation failed: Failed after 3 attempts. Last error: This model is currently experiencing high demand."

### Akar Masalah
File `lib/ai.ts` baris 40 menggunakan model lama:
```typescript
model: google("gemini-1.5-flash"), // ❌ Deprecated
```

### Perbaikan yang Sudah Dilakukan
```diff
- model: google("gemini-1.5-flash"),
+ model: google("gemini-2.5-flash"),
```

### File yang Diubah
- `lib/ai.ts` — baris 40

---

## BUG #2 — Heading Tidak Terlihat di Public/Preview Page (HIGH)

### Deskripsi
Heading "The Problem", "What You Get", dan "FAQ" di halaman public (`/p/[id]`) dan preview (`/preview/[id]`) nyaris **tidak terlihat** karena warna teks hampir sama dengan background.

### Screenshot Bug
Perhatikan heading "The Problem" dan "What You Get" yang nyaris tidak terlihat (warna sangat pucat):

### Akar Masalah
Ada konflik antara global CSS dan desain halaman public:

1. **`app/globals.css`** mengatur warna teks body menjadi terang untuk dark theme:
   ```css
   body {
     color: var(--foreground); /* = #f5f5f5 (putih/terang) */
   }
   ```

2. **`app/p/[id]/page.tsx`** menggunakan background terang:
   ```tsx
   <main className="bg-gradient-to-b from-white via-zinc-50 to-zinc-100">
   ```

3. Heading `<h2>` di baris 73, 84, dan 115 **tidak punya class warna eksplisit**:
   ```tsx
   <h2 className="text-2xl font-semibold">The Problem</h2>     // ❌ baris 73
   <h2 className="text-2xl font-semibold">What You Get</h2>     // ❌ baris 84
   <h2 className="text-2xl font-semibold">FAQ</h2>              // ❌ baris 115
   ```

   Heading ini mewarisi `color: #f5f5f5` dari body → teks putih di atas background putih = **tidak terlihat**.

### Cara Perbaiki (Step-by-Step untuk Junior Developer)

**File:** `app/p/[id]/page.tsx`

**Langkah 1:** Buka file `app/p/[id]/page.tsx`

**Langkah 2:** Cari baris 73, tambahkan class `text-zinc-900`:
```diff
- <h2 className="text-2xl font-semibold">The Problem</h2>
+ <h2 className="text-2xl font-semibold text-zinc-900">The Problem</h2>
```

**Langkah 3:** Cari baris 84, tambahkan class `text-zinc-900`:
```diff
- <h2 className="text-2xl font-semibold">What You Get</h2>
+ <h2 className="text-2xl font-semibold text-zinc-900">What You Get</h2>
```

**Langkah 4:** Cari baris 115, tambahkan class `text-zinc-900`:
```diff
- <h2 className="text-2xl font-semibold">FAQ</h2>
+ <h2 className="text-2xl font-semibold text-zinc-900">FAQ</h2>
```

**Langkah 5:** Simpan file dan refresh halaman public. Heading sekarang seharusnya terlihat gelap di atas background putih.

> **Kenapa `text-zinc-900`?** Karena heading lain di halaman yang sama (baris 53) sudah menggunakan `text-zinc-900` dan terlihat dengan baik. Kita harus konsisten.

---

## BUG #3 — Markdown Mentah Muncul di Benefits Section (MEDIUM)

### Deskripsi
AI terkadang mengembalikan teks benefits yang mengandung format markdown `**bold**`. Teks ini ditampilkan mentah (literal) di halaman alih-alih diformat sebagai bold.

Contoh yang muncul di halaman:
```
**Automate High-Converting Copy:** Let advanced AI write persuasive...
**Design for Maximum Sales:** Leverage AI-optimized content structures...
**Launch & Optimize in Minutes:** Go from idea to a live, SEO-friendly...
```

Seharusnya `**` tidak muncul, dan teks di antara `**` harus tebal.

### Akar Masalah
Ada dua pendekatan untuk memperbaiki ini:

**Opsi A (Recommended):** Strip markdown di sisi server saat parsing AI response.  
**Opsi B:** Instruksikan AI secara lebih tegas untuk TIDAK menggunakan markdown.

### Cara Perbaiki — Opsi A: Strip Markdown di `lib/ai.ts`

**File:** `lib/ai.ts`

**Langkah 1:** Tambahkan fungsi helper untuk strip markdown bold:
```typescript
// Tambahkan di atas function generateSalesCopy, sekitar baris 33
function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1");
}
```

**Langkah 2:** Setelah parsing JSON response (sekitar baris 67-68), bersihkan data sebelum return:
```diff
  const parsed = JSON.parse(normalized) as unknown;
- return salesCopySchema.parse(parsed);
+ const validated = salesCopySchema.parse(parsed);
+
+ // Strip markdown formatting dari AI response
+ return {
+   ...validated,
+   painPoints: validated.painPoints.map(stripMarkdownBold),
+   benefits: validated.benefits.map(stripMarkdownBold),
+   offer: stripMarkdownBold(validated.offer),
+   headline: stripMarkdownBold(validated.headline),
+   subheadline: stripMarkdownBold(validated.subheadline),
+   callToAction: stripMarkdownBold(validated.callToAction),
+   faq: validated.faq.map((item) => ({
+     question: stripMarkdownBold(item.question),
+     answer: stripMarkdownBold(item.answer),
+   })),
+ };
```

### Cara Perbaiki — Opsi B: Perbaiki Prompt

**File:** `lib/ai.ts`

**Langkah 1:** Tambahkan instruksi di prompt (sekitar baris 48):
```diff
  Return ONLY valid JSON as a single object (no markdown, no code fences, no extra text).
+ IMPORTANT: Do NOT use markdown formatting like **bold** or *italic* in any values. Return plain text only.
```

> **Rekomendasi:** Gunakan **kedua opsi** (A dan B) sekaligus. Opsi B mengurangi kemungkinan markdown muncul, dan Opsi A menjadi safety net jika AI tetap menggunakan markdown.

---

## BUG #4 — Button Hover Warna Tidak Konsisten di Dashboard (LOW)

### Deskripsi
Tombol-tombol aksi di dashboard (Preview, Copy Link, Publish, Delete) menggunakan class `hover:bg-zinc-50` yang merupakan warna terang. Pada dark theme, saat di-hover, tombol akan menunjukkan background putih yang terlihat janggal.

### File yang Bermasalah
`components/dashboard/page-actions.tsx` — baris 95, 101, 110

### Cara Perbaiki

**File:** `components/dashboard/page-actions.tsx`

**Langkah 1:** Ganti semua `hover:bg-zinc-50` dengan `hover:bg-zinc-700` agar konsisten dengan dark theme:

```diff
// Baris 95
- <a href={`/preview/${id}`} className="rounded-md border px-3 py-1 transition hover:bg-zinc-50">
+ <a href={`/preview/${id}`} className="rounded-md border border-white/10 px-3 py-1 transition hover:bg-zinc-700">

// Baris 101
- className="rounded-md border px-3 py-1 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
+ className="rounded-md border border-white/10 px-3 py-1 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"

// Baris 110
- className="rounded-md border px-3 py-1 transition hover:bg-zinc-50 disabled:opacity-60"
+ className="rounded-md border border-white/10 px-3 py-1 transition hover:bg-zinc-700 disabled:opacity-60"
```

**Langkah 2:** Untuk tombol Delete (baris 118), ganti juga:
```diff
- className="rounded-md border border-red-200 px-3 py-1 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
+ className="rounded-md border border-red-400/40 px-3 py-1 text-red-400 transition hover:bg-red-900/30 disabled:opacity-60"
```

**Langkah 3:** Ganti juga warna border dan text Delete Modal (baris 127-148) supaya konsisten dengan dark theme:
```diff
- <div ref={modalRef} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
-   <h3 className="text-lg font-semibold">Delete sales page?</h3>
-   <p className="mt-2 text-sm text-zinc-600">
+ <div ref={modalRef} className="w-full max-w-md rounded-2xl bg-[#202020] border border-white/10 p-6 shadow-2xl">
+   <h3 className="text-lg font-semibold text-white">Delete sales page?</h3>
+   <p className="mt-2 text-sm text-zinc-400">
```

---

## Prioritas Perbaikan

| # | Bug | Severity | Effort | Status |
|---|-----|----------|--------|--------|
| 1 | Model AI Deprecated | 🔴 Critical | 1 menit | ✅ Fixed |
| 2 | Heading Tidak Terlihat | 🟠 High | 5 menit | ❌ Belum |
| 3 | Markdown Mentah di Benefits | 🟡 Medium | 15 menit | ❌ Belum |
| 4 | Button Hover Inkonsisten | 🟢 Low | 10 menit | ❌ Belum |

---

## Cara Verifikasi Setelah Fix

1. **Bug #2:** Buka `/p/[id]` → heading "The Problem", "What You Get", "FAQ" harus terlihat jelas (teks gelap di background putih)
2. **Bug #3:** Generate sales page baru → pastikan teks benefits tidak mengandung `**` 
3. **Bug #4:** Hover tombol di dashboard → background hover harus gelap, bukan putih

---

## Catatan Tambahan

- **Database:** PostgreSQL di `localhost:5432/ai_generator_db` — pastikan sudah running sebelum test
- **API Key:** Google Generative AI key ada di `.env` — pastikan masih valid
- **Model AI:** Sudah diupdate ke `gemini-2.5-flash` (pengganti `gemini-1.5-flash` yang deprecated)
- **Session:** Menggunakan NextAuth JWT strategy dengan expiry 15 menit
