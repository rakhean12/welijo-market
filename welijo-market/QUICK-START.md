# 🚀 Quick Start Guide - WELIJO Market

Panduan cepat untuk memulai menggunakan website WELIJO Market.

## ⚡ Langkah Cepat (5 Menit)

### 1. Buka Website
```
Klik 2x pada file: index.html
```
Website akan terbuka di browser dengan data produk dummy.

### 2. Ganti Nomor WhatsApp
Buka file: `js/app.js`

Cari baris ini:
```javascript
const WHATSAPP_NUMBER = '6281234567890';
```

Ganti dengan nomor WhatsApp Anda (format: 628xxx tanpa +)

### 3. Selesai! ✅
Website sudah siap digunakan dengan data dummy.

---

## 🔗 Integrasi Google Spreadsheet (15 Menit)

### Langkah 1: Buat Spreadsheet
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama sheet: **Produk**
4. Buat kolom header:

```
| id | nama | harga | satuan | gambar |
```

5. Isi dengan data produk (lihat file `contoh-data-produk.csv`)

### Langkah 2: Setup Apps Script
1. Di Google Sheets, klik: **Extensions** → **Apps Script**
2. Hapus kode default
3. Copy semua kode dari file: `google-apps-script.js`
4. Paste ke Apps Script editor
5. Klik **Save** (ikon disket)

### Langkah 3: Deploy
1. Klik **Deploy** → **New deployment**
2. Klik ⚙️ (gear icon) → Pilih **Web app**
3. Setting:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy**
5. Klik **Authorize access**
6. Pilih akun Google Anda
7. Klik **Advanced** → **Go to [project name]**
8. Klik **Allow**
9. **Copy URL** yang muncul

### Langkah 4: Update Website
1. Buka file: `js/app.js`
2. Cari baris:
```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```
3. Ganti dengan URL yang Anda copy
4. Save file

### Langkah 5: Test
1. Refresh website (F5)
2. Produk dari spreadsheet akan muncul!

---

## 📋 Checklist

- [ ] File index.html sudah bisa dibuka
- [ ] Nomor WhatsApp sudah diganti
- [ ] Google Spreadsheet sudah dibuat
- [ ] Apps Script sudah di-deploy
- [ ] URL API sudah di-update
- [ ] Website menampilkan produk dari spreadsheet

---

## 🆘 Troubleshooting Cepat

### Produk tidak muncul?
1. Tekan F12 → Lihat tab Console
2. Ada error merah? Screenshot dan cari di Google
3. Cek URL API sudah benar?
4. Cek spreadsheet nama sheet: "Produk" (huruf P besar)

### Tombol WhatsApp tidak berfungsi?
1. Cek nomor format: 628xxx (tanpa + dan tanpa 0 di depan)
2. Contoh benar: 6281234567890
3. Contoh salah: +62812..., 0812..., 62-812...

### Gambar tidak muncul?
1. Cek URL gambar bisa diakses
2. Gunakan URL dari Unsplash atau hosting gambar
3. Jangan pakai URL dari Google Drive (tidak bisa diakses publik)

---

## 📱 Test Responsif

Buka website dan test di:
- [ ] Desktop (lebar penuh)
- [ ] Tablet (resize browser)
- [ ] Mobile (F12 → Toggle device toolbar)

---

## 🎨 Kustomisasi Cepat

### Ubah Warna
Edit `index.html` bagian Tailwind config (baris 24-30)

### Ubah Judul
Edit `index.html` bagian Hero Section (baris 70-72)

### Tambah Produk
Edit `js/app.js` bagian dummyProducts (baris 180-230)

---

## 📚 Dokumentasi Lengkap

- **README.md** - Dokumentasi utama
- **PANDUAN-SISWA.md** - Panduan untuk siswa SMK
- **google-apps-script.js** - Kode untuk Google Apps Script
- **contoh-data-produk.csv** - Contoh data produk

---

## 🎯 Next Steps

Setelah website jalan:
1. ✅ Deploy ke hosting (GitHub Pages, Netlify)
2. ✅ Tambah fitur keranjang belanja
3. ✅ Tambah filter dan search
4. ✅ Buat dashboard admin
5. ✅ Integrasi payment gateway

---

**Butuh bantuan?** Baca file PANDUAN-SISWA.md untuk penjelasan detail!

**WELIJO Market** 🌱
