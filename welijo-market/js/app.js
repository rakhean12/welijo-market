/* ========================================
   WELIJO Market - JavaScript Application
   File ini mengatur fungsi-fungsi interaktif website
   ======================================== */

// ========================================
// KONFIGURASI API
// ========================================

// URL API Google Apps Script untuk mengambil data produk
// GANTI URL INI dengan URL Google Apps Script Anda
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Nomor WhatsApp untuk pemesanan (format: 628xxxxxxxxxx tanpa +)
const WHATSAPP_NUMBER = '6281234567890';

// ========================================
// MOBILE MENU TOGGLE
// Fungsi untuk membuka/menutup menu mobile
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Event listener untuk tombol menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Tutup menu saat link diklik
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
});

// ========================================
// SMOOTH SCROLLING
// Membuat scroll halus saat klik menu navigasi
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FETCH PRODUCTS FROM API
// Mengambil data produk dari Google Spreadsheet
// ========================================

async function fetchProducts() {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error-message');
    const productContainer = document.getElementById('product-container');
    
    try {
        // Tampilkan loading
        loadingElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
        
        // Fetch data dari API
        const response = await fetch(API_URL);
        
        // Cek apakah response berhasil
        if (!response.ok) {
            throw new Error('Gagal mengambil data produk');
        }
        
        // Parse response menjadi JSON
        const data = await response.json();
        
        // Sembunyikan loading
        loadingElement.classList.add('hidden');
        
        // Cek apakah ada data produk
        if (data.products && data.products.length > 0) {
            displayProducts(data.products);
        } else {
            throw new Error('Tidak ada produk tersedia');
        }
        
    } catch (error) {
        // Tampilkan pesan error
        console.error('Error:', error);
        loadingElement.classList.add('hidden');
        errorElement.classList.remove('hidden');
        
        // Untuk development: tampilkan produk dummy jika API gagal
        console.log('Menggunakan data dummy untuk development');
        displayDummyProducts();
    }
}

// ========================================
// DISPLAY PRODUCTS
// Menampilkan produk ke dalam grid
// ========================================

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Kosongkan container
    
    // Loop setiap produk dan buat card
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productContainer.appendChild(productCard);
    });
}

// ========================================
// CREATE PRODUCT CARD
// Membuat elemen card untuk setiap produk
// ========================================

function createProductCard(product, index) {
    // Buat elemen div untuk card
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`; // Animasi delay bertahap
    
    // Format harga dengan pemisah ribuan
    const formattedPrice = formatPrice(product.harga);
    
    // HTML content untuk card
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.gambar}" alt="${product.nama}" 
                 onerror="this.src='https://via.placeholder.com/400x300/22c55e/ffffff?text=Sayur+Segar'">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.nama}</h3>
            <p class="product-price">Rp ${formattedPrice}</p>
            <p class="product-unit">per ${product.satuan}</p>
            <a href="#" class="btn-buy" onclick="orderProduct('${product.nama}', '${formattedPrice}', '${product.satuan}'); return false;">
                <svg class="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Beli via WhatsApp
            </a>
        </div>
    `;
    
    return card;
}

// ========================================
// FORMAT PRICE
// Memformat harga dengan pemisah ribuan
// ========================================

function formatPrice(price) {
    // Konversi ke number jika masih string
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    
    // Format dengan pemisah ribuan (titik)
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ========================================
// ORDER PRODUCT
// Mengarahkan ke WhatsApp untuk pemesanan
// ========================================

function orderProduct(productName, price, unit) {
    // Buat pesan WhatsApp
    const message = `Halo WELIJO Market, saya ingin memesan:\n\n` +
                   `Produk: ${productName}\n` +
                   `Harga: Rp ${price}/${unit}\n\n` +
                   `Mohon informasi lebih lanjut. Terima kasih!`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
}

// ========================================
// DUMMY PRODUCTS
// Data produk dummy untuk development/testing
// ========================================

function displayDummyProducts() {
    const dummyProducts = [
        {
            id: 1,
            nama: 'Selada Hidroponik',
            harga: 12000,
            satuan: 'ikat',
            gambar: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop'
        },
        {
            id: 2,
            nama: 'Bayam Organik',
            harga: 10000,
            satuan: 'ikat',
            gambar: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop'
        },
        {
            id: 3,
            nama: 'Tomat Segar',
            harga: 20000,
            satuan: 'kg',
            gambar: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop'
        },
        {
            id: 4,
            nama: 'Cabai Rawit',
            harga: 30000,
            satuan: 'kg',
            gambar: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=400&h=300&fit=crop'
        },
        {
            id: 5,
            nama: 'Wortel Organik',
            harga: 15000,
            satuan: 'kg',
            gambar: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop'
        },
        {
            id: 6,
            nama: 'Brokoli Segar',
            harga: 25000,
            satuan: 'kg',
            gambar: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop'
        },
        {
            id: 7,
            nama: 'Kangkung Hidroponik',
            harga: 8000,
            satuan: 'ikat',
            gambar: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=400&h=300&fit=crop'
        },
        {
            id: 8,
            nama: 'Sawi Hijau',
            harga: 9000,
            satuan: 'ikat',
            gambar: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=300&fit=crop'
        }
    ];
    
    displayProducts(dummyProducts);
}

// ========================================
// INITIALIZE APP
// Jalankan saat halaman selesai dimuat
// ========================================

// Panggil fungsi fetchProducts saat halaman dimuat
window.addEventListener('load', function() {
    fetchProducts();
});

// ========================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// Tombol untuk kembali ke atas halaman
// ========================================

// Buat tombol scroll to top
window.addEventListener('scroll', function() {
    // Bisa ditambahkan fitur scroll to top button di sini
    // Untuk saat ini diabaikan agar kode tetap minimal
});
