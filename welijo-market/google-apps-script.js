/* ========================================
   GOOGLE APPS SCRIPT - WELIJO Market
   Copy-paste seluruh file ini ke Google Apps Script
   ======================================== */

/**
 * doGet: Handle GET request
 * - Tanpa parameter: kembalikan daftar produk
 * - Dengan ?action=checkout: simpan data transaksi
 */
function doGet(e) {
  try {
    var params = e && e.parameter ? e.parameter : {};

    // Jika ada action=checkout, simpan transaksi
    if (params.action === 'checkout') {
      return simpanTransaksi(params);
    }

    // Default: kembalikan daftar produk
    return ambilProduk();

  } catch (err) {
    return jsonResponse({ error: true, message: err.toString() });
  }
}

/**
 * Simpan data transaksi ke sheet "Transaksi"
 */
function simpanTransaksi(params) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Transaksi');

  // Buat sheet + header jika belum ada
  if (!sheet) {
    sheet = ss.insertSheet('Transaksi');
    var header = sheet.getRange(1, 1, 1, 8);
    header.setValues([['Tanggal', 'Nama Pembeli', 'WhatsApp', 'Alamat', 'Produk', 'Harga', 'Jumlah', 'Total']]);
    header.setBackground('#22c55e').setFontColor('#ffffff').setFontWeight('bold');
  }

  sheet.appendRow([
    params.tanggal  || '',
    params.nama     || '',
    params.whatsapp || '',
    params.alamat   || '',
    params.produk   || '',
    Number(params.harga)  || 0,
    Number(params.jumlah) || 0,
    Number(params.total)  || 0
  ]);

  return jsonResponse({ success: true, message: 'Pesanan berhasil disimpan' });
}

/**
 * Ambil daftar produk dari sheet "Produk"
 */
function ambilProduk() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Produk');

  if (!sheet) {
    return jsonResponse({ error: true, message: 'Sheet "Produk" tidak ditemukan' });
  }

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return jsonResponse({ error: true, message: 'Tidak ada data produk' });
  }

  var headers = data[0];
  var products = [];

  for (var i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    var product = {};
    headers.forEach(function(h, j) { product[h] = data[i][j]; });
    products.push(product);
  }

  return jsonResponse({ success: true, products: products, total: products.length });
}

/**
 * doPost: Tetap ada sebagai fallback (tidak dipakai aktif)
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    return simpanTransaksi(body);
  } catch (err) {
    return jsonResponse({ error: true, message: err.toString() });
  }
}

/**
 * Helper: buat response JSON
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test manual — jalankan dari editor Apps Script
 */
function testSimpanTransaksi() {
  var fakeParams = {
    action:   'checkout',
    tanggal:  '15/04/2026, 10:00',
    nama:     'Budi Santoso',
    whatsapp: '08123456789',
    alamat:   'Jl. Merdeka No. 1, Bandung',
    produk:   'Selada Hidroponik',
    harga:    '12000',
    jumlah:   '2',
    total:    '24000'
  };
  var result = simpanTransaksi(fakeParams);
  Logger.log(result.getContent());
}

/* ========================================
   CARA DEPLOY WEB APP:

   1. Buka Google Spreadsheet Anda
   2. Klik Extensions > Apps Script
   3. Hapus kode default, paste seluruh kode ini
   4. Klik Save (Ctrl+S)
   5. Klik Deploy > New deployment
   6. Klik ikon gear > Web app
   7. Isi deskripsi (opsional)
   8. Execute as: Me
   9. Who has access: Anyone
   10. Klik Deploy > Authorize access
   11. Copy URL Web app yang muncul
   12. Paste URL tersebut ke app.js pada variabel CHECKOUT_URL

   CATATAN:
   - Setiap kali edit script, buat deployment BARU
     (Deploy > New deployment), bukan "Manage deployments"
   - Sheet "Transaksi" akan dibuat otomatis saat ada pesanan pertama
   - Sheet "Produk" harus dibuat manual dengan kolom:
     id | nama | harga | satuan | gambar

   ======================================== */
