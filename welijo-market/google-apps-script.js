/* ========================================
   GOOGLE APPS SCRIPT - API ENDPOINT
   File ini untuk di-paste ke Google Apps Script
   ======================================== */

/**
 * Fungsi ini akan dipanggil saat ada HTTP GET request
 * Mengembalikan data produk dalam format JSON
 */
function doGet() {
  try {
    // Ambil spreadsheet aktif
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Ambil sheet bernama "Produk"
    var sheet = spreadsheet.getSheetByName('Produk');
    
    // Validasi: cek apakah sheet ada
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: 'Sheet "Produk" tidak ditemukan'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ambil semua data dari sheet
    var data = sheet.getDataRange().getValues();
    
    // Validasi: cek apakah ada data
    if (data.length < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: 'Tidak ada data produk'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ambil header (baris pertama)
    var headers = data[0];
    var products = [];
    
    // Loop mulai dari baris kedua (skip header)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      
      // Skip baris kosong
      if (!row[0]) continue;
      
      var product = {};
      
      // Mapping data berdasarkan header
      for (var j = 0; j < headers.length; j++) {
        product[headers[j]] = row[j];
      }
      
      products.push(product);
    }
    
    // Return JSON response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      products: products,
      total: products.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Handle error
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fungsi untuk testing (opsional)
 * Jalankan fungsi ini untuk test apakah script berjalan
 */
function testAPI() {
  var result = doGet();
  Logger.log(result.getContent());
}

/* ========================================
   CARA DEPLOY:
   
   1. Copy semua kode di atas
   2. Buka Google Spreadsheet Anda
   3. Klik Extensions > Apps Script
   4. Paste kode di atas (hapus kode default)
   5. Klik Save (ikon disket)
   6. Klik Deploy > New deployment
   7. Pilih type: Web app
   8. Execute as: Me
   9. Who has access: Anyone
   10. Klik Deploy
   11. Copy Web app URL
   12. Paste URL tersebut ke file js/app.js
   
   ======================================== */

/* ========================================
   FORMAT SPREADSHEET:
   
   Sheet Name: Produk
   
   Kolom:
   | id | nama | harga | satuan | gambar |
   
   Contoh Data:
   | 1 | Selada Hidroponik | 12000 | ikat | https://images.unsplash.com/... |
   | 2 | Bayam Organik | 10000 | ikat | https://images.unsplash.com/... |
   | 3 | Tomat Segar | 20000 | kg | https://images.unsplash.com/... |
   
   Tips:
   - Gunakan URL gambar dari Unsplash atau hosting gambar lainnya
   - Pastikan URL gambar bisa diakses publik
   - Harga dalam format angka (tanpa Rp atau titik)
   - Satuan: ikat, kg, ons, dll
   
   ======================================== */
