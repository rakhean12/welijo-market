# WELIJO Market - Marketplace Sayur Organik

Website marketplace untuk jual beli sayur segar langsung dari petani dengan tampilan modern dan responsif.

## 🌿 Fitur Utama

- ✅ Tampilan modern dan responsif (mobile-friendly)
- ✅ Katalog produk dinamis dari Google Spreadsheet
- ✅ Integrasi WhatsApp untuk pemesanan
- ✅ Navigasi sticky dengan smooth scrolling
- ✅ Animasi hover dan transisi yang smooth
- ✅ Loading state dan error handling
- ✅ Desain dengan tema hijau, putih, dan kuning

## 📁 Struktur Folder

```
welijo-market/
├── index.html          # Halaman utama website
├── css/
│   └── style.css      # Custom styling
├── js/
│   └── app.js         # JavaScript logic & API integration
├── assets/
│   └── images/        # Folder untuk gambar lokal (opsional)
└── README.md          # Dokumentasi project
```

## 🚀 Cara Menggunakan

### 1. Buka Website

Cukup buka file `index.html` di browser Anda. Website akan langsung berjalan dengan data produk dummy.

### 2. Integrasi dengan Google Spreadsheet

Untuk menghubungkan dengan data produk dari Google Spreadsheet:

#### A. Buat Google Spreadsheet

1. Buat spreadsheet baru di Google Sheets
2. Buat sheet bernama "Produk"
3. Buat kolom dengan header berikut:

| id | nama | harga | satuan | gambar |
|----|------|-------|--------|--------|
| 1 | Selada Hidroponik | 12000 | ikat | https://link-gambar.jpg |
| 2 | Bayam Organik | 10000 | ikat | https://link-gambar.jpg |

#### B. Buat Google Apps Script

1. Di Google Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus kode default dan paste kode berikut:

```javascript
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Produk');
  var data = sheet.getDataRange().getValues();
  
  // Ambil header (baris pertama)
  var headers = data[0];
  var products = [];
  
  // Loop mulai dari baris kedua (skip header)
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var product = {};
    
    for (var j = 0; j < headers.length; j++) {
      product[headers[j]] = row[j];
    }
    
    products.push(product);
  }
  
  // Return JSON
  return ContentService.createTextOutput(JSON.stringify({
    products: products
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Klik **Deploy** > **New deployment**
4. Pilih type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Klik **Deploy**
8. Copy **Web app URL** yang diberikan

#### C. Update Kode JavaScript

1. Buka file `js/app.js`
2. Cari baris:
```javascript
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```
3. Ganti dengan URL yang Anda copy dari Google Apps Script
4. Ganti nomor WhatsApp:
```javascript
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor Anda
```

### 3. Kustomisasi

#### Mengubah Warna

Edit file `index.html` pada bagian Tailwind config:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary-green': '#22c55e',    // Warna hijau utama
                'dark-green': '#16a34a',       // Hijau gelap
                'light-green': '#86efac',      // Hijau muda
                'primary-yellow': '#fbbf24',   // Kuning
            }
        }
    }
}
```

#### Mengubah Konten

- **Judul Hero**: Edit di `index.html` bagian Hero Section
- **Tentang**: Edit di `index.html` bagian Section Tentang
- **Kontak**: Edit di `index.html` bagian Section Kontak

## 📱 Fitur Responsif

Website otomatis menyesuaikan tampilan untuk:
- 📱 Mobile (1 kolom)
- 📱 Tablet (2 kolom)
- 💻 Desktop (4 kolom)

## 🎨 Teknologi yang Digunakan

- **HTML5** - Struktur website
- **Tailwind CSS** - Framework CSS untuk styling
- **JavaScript (Vanilla)** - Logic dan interaktivitas
- **Google Apps Script** - Backend API untuk data produk
- **Google Spreadsheet** - Database produk

## 🔧 Troubleshooting

### Produk tidak muncul?

1. Cek console browser (F12) untuk melihat error
2. Pastikan URL API sudah benar
3. Pastikan Google Apps Script sudah di-deploy dengan akses "Anyone"
4. Cek format data di spreadsheet sudah sesuai

### Tombol WhatsApp tidak berfungsi?

1. Pastikan nomor WhatsApp sudah benar (format: 628xxx tanpa +)
2. Cek apakah WhatsApp terinstall di device

## 📝 Catatan untuk Pengembangan

- Data produk dummy akan muncul jika API gagal (untuk development)
- Gambar produk menggunakan placeholder jika URL gambar error
- Semua kode sudah diberi komentar untuk memudahkan pembelajaran

## 🎓 Cocok untuk

- Tugas sekolah SMK jurusan RPL/TKJ
- Project marketplace skala kecil
- Belajar integrasi API dengan Google Sheets
- Portfolio web development

## 📞 Support

Jika ada pertanyaan atau butuh bantuan, silakan hubungi:
- Email: info@welijomarket.com
- WhatsApp: +62 812-3456-7890

## 📄 Lisensi

Project ini bebas digunakan untuk keperluan pembelajaran dan komersial.

---

**WELIJO Market** - Fresh From Farm 🌱
