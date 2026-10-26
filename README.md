# Portfolio Next.js

Website portofolio pribadi dibuat dengan Next.js (App Router), TypeScript, dan Tailwind CSS.
Konten portofolio & pendidikan diambil dari file JSON, jadi menambah proyek baru cukup edit JSON — tidak perlu tulis ulang komponen.

## Struktur penting

```
src/
  app/
    page.tsx            -> Halaman Beranda (Hero)
    about/page.tsx       -> Halaman Tentang
    education/page.tsx   -> Halaman Riwayat Pendidikan
    portfolio/page.tsx   -> Halaman Portofolio (grid + filter kategori)
    layout.tsx           -> Layout global (font, Navbar, Footer)
    globals.css          -> Design tokens & style global
  components/
    Navbar.tsx
    Footer.tsx
    PortfolioCard.tsx     -> Kartu portofolio (dipakai berulang dari JSON)
    EducationEntry.tsx    -> Entri riwayat pendidikan (dipakai berulang dari JSON)
  data/
    profile.json          -> Nama, bio, skill, kontak, sosial media
    portfolio.json         -> Daftar proyek portofolio
    education.json          -> Daftar riwayat pendidikan
```

## Cara edit konten

- **Ganti data diri / bio / skill:** edit `src/data/profile.json`
- **Tambah / ubah proyek portofolio:** edit `src/data/portfolio.json` (tinggal tambah objek baru di array, kartu otomatis muncul)
- **Tambah / ubah riwayat pendidikan:** edit `src/data/education.json`

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Build untuk produksi

```bash
npm run build
npm start
```
