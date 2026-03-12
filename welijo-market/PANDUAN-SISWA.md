# 📚 PANDUAN LENGKAP UNTUK SISWA SMK

Panduan ini dibuat khusus untuk membantu siswa SMK memahami dan mengembangkan website WELIJO Market.

## 🎯 Tujuan Pembelajaran

Setelah mempelajari project ini, kamu akan bisa:
1. Membuat website responsif dengan HTML dan Tailwind CSS
2. Menggunakan JavaScript untuk membuat website interaktif
3. Mengintegrasikan website dengan Google Spreadsheet sebagai database
4. Memahami konsep API dan fetch data
5. Membuat fitur pemesanan via WhatsApp

## 📖 Penjelasan Struktur File

### 1. index.html
File ini adalah halaman utama website yang berisi:
- **Navbar**: Menu navigasi di bagian atas
- **Hero Section**: Banner besar dengan judul dan tombol
- **Katalog Produk**: Tempat menampilkan produk-produk
- **Section Tentang**: Informasi tentang WELIJO Market
- **Section Kontak**: Informasi kontak
- **Footer**: Bagian bawah website

### 2. css/style.css
File CSS yang berisi styling tambahan untuk:
- Efek hover pada card produk
- Animasi fade in
- Custom scrollbar
- Responsive design

### 3. js/app.js
File JavaScript yang mengatur:
- Fetch data produk dari API
- Menampilkan produk secara dinamis
- Mobile menu toggle
- Smooth scrolling
- Integrasi WhatsApp

## 🔍 Penjelasan Kode Penting

### A. Fetch Data dari API

```javascript
async function fetchProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayProducts(data.products);
}
```

**Penjelasan:**
- `async/await`: Cara modern untuk handle operasi asynchronous
- `fetch()`: Fungsi untuk mengambil data dari URL
- `.json()`: Mengubah response menjadi format JSON

### B. Membuat Card Produk Dinamis

```javascript
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.innerHTML = `...HTML content...`;
    return card;
}
```

**Penjelasan:**
- `createElement()`: Membuat elemen HTML baru
- `innerHTML`: Mengisi konten HTML ke dalam elemen
- Template literal (backtick): Memudahkan menulis HTML dengan variabel

### C. Format Harga

```javascript
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
```

**Penjelasan:**
- Mengubah 12000 menjadi 12.000
- Menggunakan regex untuk menambahkan titik setiap 3 digit

### D. Integrasi WhatsApp

```javascript
const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
window.open(whatsappURL, '_blank');
```

**Penjelasan:**
- Format URL WhatsApp API
- `encodeURIComponent()`: Mengubah teks menjadi format URL-safe
- `window.open()`: Membuka link di tab baru

## 🎨 Memahami Tailwind CSS

Tailwind CSS menggunakan utility classes. Contoh:

```html
<div class="bg-white rounded-xl shadow-md p-4">
```

**Artinya:**
- `bg-white`: Background putih
- `rounded-xl`: Border radius extra large
- `shadow-md`: Shadow medium
- `p-4`: Padding 1rem (16px)

### Responsive Classes

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

**Artinya:**
- `grid-cols-1`: 1 kolom di mobile
- `md:grid-cols-2`: 2 kolom di tablet (≥768px)
- `lg:grid-cols-4`: 4 kolom di desktop (≥1024px)

## 🛠️ Cara Modifikasi Website

### 1. Mengubah Warna Tema

Edit di `index.html` bagian Tailwind config:

```javascript
colors: {
    'primary-green': '#22c55e',  // Ubah kode warna ini
}
```

### 2. Menambah Produk (Manual)

Edit array `dummyProducts` di `js/app.js`:

```javascript
{
    id: 9,
    nama: 'Produk Baru',
    harga: 15000,
    satuan: 'kg',
    gambar: 'URL_GAMBAR'
}
```

### 3. Mengubah Nomor WhatsApp

Edit di `js/app.js`:

```javascript
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor Anda
```

Format: 62 + nomor (tanpa 0 di depan, tanpa +)

### 4. Menambah Menu Navigasi

Edit di `index.html` bagian navbar:

```html
<a href="#menu-baru" class="text-gray-700 hover:text-primary-green">Menu Baru</a>
```

Lalu buat section baru dengan id="menu-baru"

## 🚀 Langkah Deploy Website

### Opsi 1: GitHub Pages (Gratis)

1. Buat akun GitHub
2. Buat repository baru
3. Upload semua file project
4. Ke Settings > Pages
5. Pilih branch: main
6. Website akan online di: username.github.io/nama-repo

### Opsi 2: Netlify (Gratis)

1. Buat akun di netlify.com
2. Drag & drop folder project
3. Website langsung online

### Opsi 3: Hosting Berbayar

Upload ke hosting seperti:
- Hostinger
- Niagahoster
- IDCloudHost

## 💡 Tips Pengembangan Lanjutan

### 1. Tambah Fitur Keranjang Belanja

Buat array untuk menyimpan produk yang dipilih:

```javascript
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
}
```

### 2. Tambah Filter Produk

Buat dropdown untuk filter berdasarkan kategori:

```javascript
function filterProducts(category) {
    const filtered = products.filter(p => p.kategori === category);
    displayProducts(filtered);
}
```

### 3. Tambah Search Bar

Buat input search untuk mencari produk:

```javascript
function searchProducts(keyword) {
    const results = products.filter(p => 
        p.nama.toLowerCase().includes(keyword.toLowerCase())
    );
    displayProducts(results);
}
```

### 4. Tambah Local Storage

Simpan data keranjang di browser:

```javascript
// Simpan
localStorage.setItem('cart', JSON.stringify(cart));

// Ambil
const savedCart = JSON.parse(localStorage.getItem('cart'));
```

## 🐛 Debugging Tips

### 1. Produk Tidak Muncul

Buka Console (F12) dan cek:
- Apakah ada error merah?
- Apakah fetch berhasil?
- Apakah data JSON valid?

### 2. Styling Tidak Sesuai

Cek:
- Apakah Tailwind CSS CDN sudah dimuat?
- Apakah class name sudah benar?
- Cek di Inspector (F12) > Elements

### 3. JavaScript Tidak Jalan

Cek:
- Apakah file js/app.js sudah di-link di HTML?
- Apakah ada syntax error?
- Cek Console untuk error message

## 📝 Tugas Latihan

### Level 1 (Mudah)
1. Ubah warna tema menjadi biru
2. Ganti judul hero section
3. Tambah 2 produk dummy baru
4. Ubah nomor WhatsApp

### Level 2 (Sedang)
1. Tambah kategori produk (Sayur, Buah, Bumbu)
2. Buat filter berdasarkan kategori
3. Tambah animasi baru pada card
4. Buat halaman detail produk

### Level 3 (Sulit)
1. Implementasi keranjang belanja
2. Tambah fitur search
3. Buat sistem rating produk
4. Integrasi dengan payment gateway

## 🎓 Sumber Belajar Tambahan

### HTML & CSS
- [W3Schools](https://www.w3schools.com)
- [MDN Web Docs](https://developer.mozilla.org)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

### JavaScript
- [JavaScript.info](https://javascript.info)
- [FreeCodeCamp](https://www.freecodecamp.org)

### Google Apps Script
- [Apps Script Documentation](https://developers.google.com/apps-script)

## ❓ FAQ (Pertanyaan Sering Ditanya)

**Q: Apakah harus pakai Google Spreadsheet?**
A: Tidak harus. Bisa pakai data dummy atau API lain.

**Q: Apakah bisa ditambah fitur pembayaran online?**
A: Bisa! Bisa integrasi dengan Midtrans, Xendit, atau payment gateway lainnya.

**Q: Apakah website ini bisa untuk jualan beneran?**
A: Bisa! Tapi untuk skala besar, disarankan pakai database proper seperti MySQL.

**Q: Bagaimana cara backup data produk?**
A: Kalau pakai Google Sheets, data otomatis tersimpan di cloud.

**Q: Apakah perlu belajar backend?**
A: Untuk project ini tidak perlu, karena pakai Google Apps Script sebagai backend sederhana.

## 🏆 Challenge Project

Coba kembangkan fitur-fitur ini:

1. ✅ Sistem login untuk admin
2. ✅ Dashboard admin untuk kelola produk
3. ✅ Upload gambar produk
4. ✅ Sistem notifikasi pesanan
5. ✅ Laporan penjualan
6. ✅ Multi-language (Indonesia & English)
7. ✅ Dark mode toggle
8. ✅ Progressive Web App (PWA)

## 📞 Butuh Bantuan?

Jika ada yang tidak dipahami:
1. Baca ulang dokumentasi
2. Cek Console untuk error
3. Google error message yang muncul
4. Tanya guru atau teman
5. Cari di Stack Overflow

---

**Selamat Belajar! 🚀**

Ingat: "The only way to learn programming is by programming!"

**WELIJO Market** - Project untuk Belajar Web Development 🌱
