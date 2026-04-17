/* ========================================
   WELIJO Market - JavaScript Application
   ======================================== */

// ========================================
// KONFIGURASI
// ========================================

// URL Google Apps Script (satu URL untuk semua — GET produk & checkout)
const API_URL = 'https://script.google.com/macros/s/AKfycbwFy13kM1begQH4OH7iZXPTIiNievU_Ft9W0IfULVi0S2N41lo-AulX2-KR7-PTyTqCbA/exec';
const CHECKOUT_URL = 'https://script.google.com/macros/s/AKfycbyE1pQWiC1I-Qwbe2_FPWTNyIgCQXkVcIlNO4pFgmPNGnpcPxuQILNSv5TT8AxVjSPJ/exec';

// Nomor WhatsApp (format: 628xxxxxxxxxx)
const WHATSAPP_NUMBER = '6281234567890';

// ========================================
// STATE APLIKASI
// ========================================

// Menyimpan produk yang sedang di-checkout
let currentProduct = null;

// Riwayat transaksi sesi ini (disimpan di memori)
const transactionHistory = [];

// ========================================
// INISIALISASI
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupSmoothScroll();
    setupCheckoutModal();
    fetchProducts();
});

// ========================================
// MOBILE MENU
// ========================================

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => menu.classList.toggle('hidden'));

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.add('hidden'));
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ========================================
// FETCH PRODUK DARI API
// ========================================

async function fetchProducts() {
    const loading = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');

    try {
        loading.classList.remove('hidden');
        errorEl.classList.add('hidden');

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal mengambil data');

        const data = await response.json();
        loading.classList.add('hidden');

        if (data.products && data.products.length > 0) {
            displayProducts(data.products);
        } else {
            throw new Error('Tidak ada produk');
        }
    } catch (error) {
        console.warn('API gagal, menggunakan data dummy:', error.message);
        loading.classList.add('hidden');
        displayDummyProducts();
    }
}

// ========================================
// TAMPILKAN PRODUK
// ========================================

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    products.forEach((product, index) => {
        container.appendChild(createProductCard(product, index));
    });
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;

    const formattedPrice = formatPrice(product.harga);

    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.gambar}" alt="${product.nama}"
                 onerror="this.src='https://via.placeholder.com/400x300/22c55e/ffffff?text=Sayur+Segar'">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.nama}</h3>
            <p class="product-price">Rp ${formattedPrice}</p>
            <p class="product-unit">per ${product.satuan}</p>
            <button onclick="openCheckout(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                class="btn-buy w-full mt-2 flex items-center justify-center">
                <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-10H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Beli Sekarang
            </button>
        </div>
    `;
    return card;
}

// ========================================
// FORMAT HARGA
// ========================================

function formatPrice(price) {
    const num = typeof price === 'string' ? parseInt(price) : price;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// ========================================
// MODAL CHECKOUT
// ========================================

function setupCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('checkout-form');
    const qtyInput = document.getElementById('buyer-qty');

    // Tutup modal
    closeBtn.addEventListener('click', closeCheckout);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCheckout();
    });

    // Tombol +/-
    document.getElementById('qty-minus').addEventListener('click', () => {
        if (qtyInput.value > 1) { qtyInput.value--; updateTotal(); }
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        qtyInput.value++;
        updateTotal();
    });
    qtyInput.addEventListener('input', updateTotal);

    // Submit form
    form.addEventListener('submit', handleCheckoutSubmit);
}

function openCheckout(product) {
    currentProduct = product;

    document.getElementById('checkout-product-name').textContent = product.nama;
    document.getElementById('checkout-product-price').textContent =
        `Rp ${formatPrice(product.harga)} / ${product.satuan}`;
    document.getElementById('checkout-unit').textContent = product.satuan;
    document.getElementById('buyer-qty').value = 1;
    document.getElementById('form-error').classList.add('hidden');
    document.getElementById('checkout-form').reset();
    document.getElementById('buyer-qty').value = 1;

    updateTotal();

    const modal = document.getElementById('checkout-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    currentProduct = null;
}

function updateTotal() {
    if (!currentProduct) return;
    const qty = parseInt(document.getElementById('buyer-qty').value) || 1;
    const total = currentProduct.harga * qty;
    document.getElementById('checkout-total').textContent = `Rp ${formatPrice(total)}`;
}

// ========================================
// SUBMIT CHECKOUT
// ========================================

async function handleCheckoutSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('buyer-name').value.trim();
    const wa = document.getElementById('buyer-wa').value.trim();
    const address = document.getElementById('buyer-address').value.trim();
    const qty = parseInt(document.getElementById('buyer-qty').value);
    const errorEl = document.getElementById('form-error');

    // Validasi sederhana
    if (!name || !wa || !address || qty < 1) {
        showFormError('Semua field wajib diisi dengan benar.');
        return;
    }

    const total = currentProduct.harga * qty;
    const now = new Date();
    const tanggal = now.toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });

    const orderData = {
        tanggal: tanggal,
        nama: name,
        whatsapp: wa,
        alamat: address,
        produk: currentProduct.nama,
        harga: currentProduct.harga,
        jumlah: qty,
        total: total
    };

    setLoadingState(true);
    errorEl.classList.add('hidden');

    try {
        await kirimKeSpreadsheet(orderData);
        setLoadingState(false);
        closeCheckout();
        tambahRiwayat(orderData);
        showSuccessToast();
    } catch (err) {
        setLoadingState(false);
        showFormError('Gagal mengirim pesanan. Coba lagi atau hubungi kami via WhatsApp.');
        console.error('Checkout error:', err);
    }
}

// ========================================
// KIRIM DATA KE GOOGLE SPREADSHEET
// ========================================

async function kirimKeSpreadsheet(data) {
    // Jika URL belum diset, simulasikan sukses (untuk development)
    if (CHECKOUT_URL === 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA') {
        console.log('Mode development: data tidak dikirim ke server.', data);
        await new Promise(resolve => setTimeout(resolve, 800));
        return;
    }

    // Kirim via GET + query params — cara paling reliable untuk Google Apps Script
    // GAS sering redirect POST request sehingga CORS gagal
    const params = new URLSearchParams({
        tanggal:  data.tanggal,
        nama:     data.nama,
        whatsapp: data.whatsapp,
        alamat:   data.alamat,
        produk:   data.produk,
        harga:    data.harga,
        jumlah:   data.jumlah,
        total:    data.total,
        action:   'checkout'
    });

    // Gunakan no-cors agar tidak diblokir CORS (terutama saat development lokal)
    // Data tetap masuk ke Spreadsheet meskipun response tidak bisa dibaca
    await fetch(`${CHECKOUT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow'
    });

    // Dengan no-cors, kita tidak bisa baca response — anggap sukses jika tidak throw
}

// ========================================
// RIWAYAT TRANSAKSI
// ========================================

function tambahRiwayat(order) {
    transactionHistory.unshift(order); // tambah di awal

    const empty = document.getElementById('riwayat-empty');
    const container = document.getElementById('riwayat-container');
    const tbody = document.getElementById('riwayat-tbody');

    empty.classList.add('hidden');
    container.classList.remove('hidden');

    // Render ulang tabel
    tbody.innerHTML = transactionHistory.map(t => `
        <tr class="hover:bg-green-50 transition">
            <td class="px-4 py-3 text-gray-600 whitespace-nowrap">${t.tanggal}</td>
            <td class="px-4 py-3 font-medium text-gray-800">${t.nama}</td>
            <td class="px-4 py-3 text-gray-700">${t.produk}</td>
            <td class="px-4 py-3 text-center text-gray-700">${t.jumlah}</td>
            <td class="px-4 py-3 font-semibold text-dark-green">Rp ${formatPrice(t.total)}</td>
        </tr>
    `).join('');
}

// ========================================
// UI HELPERS
// ========================================

function setLoadingState(isLoading) {
    const btn = document.getElementById('submit-btn');
    const text = document.getElementById('submit-text');
    const spinner = document.getElementById('submit-spinner');

    btn.disabled = isLoading;
    text.textContent = isLoading ? 'Memproses...' : 'Pesan Sekarang';
    spinner.classList.toggle('hidden', !isLoading);
    btn.classList.toggle('opacity-70', isLoading);
}

function showFormError(message) {
    const el = document.getElementById('form-error');
    el.textContent = message;
    el.classList.remove('hidden');
}

function showSuccessToast() {
    const toast = document.getElementById('success-toast');
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

// ========================================
// DATA DUMMY (fallback jika API gagal)
// ========================================

function displayDummyProducts() {
    const dummyProducts = [
        { id: 1, nama: 'Selada Hidroponik', harga: 12000, satuan: 'ikat', gambar: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop' },
        { id: 2, nama: 'Bayam Organik', harga: 10000, satuan: 'ikat', gambar: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop' },
        { id: 3, nama: 'Tomat Segar', harga: 20000, satuan: 'kg', gambar: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop' },
        { id: 4, nama: 'Cabai Rawit', harga: 30000, satuan: 'kg', gambar: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=400&h=300&fit=crop' },
        { id: 5, nama: 'Wortel Organik', harga: 15000, satuan: 'kg', gambar: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop' },
        { id: 6, nama: 'Brokoli Segar', harga: 25000, satuan: 'kg', gambar: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop' },
        { id: 7, nama: 'Kangkung Hidroponik', harga: 8000, satuan: 'ikat', gambar: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=400&h=300&fit=crop' },
        { id: 8, nama: 'Sawi Hijau', harga: 9000, satuan: 'ikat', gambar: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=300&fit=crop' }
    ];
    displayProducts(dummyProducts);
}
