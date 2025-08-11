# Trading Income Manager (TradeMan)

**TradeMan** adalah sebuah aplikasi web yang dirancang untuk membantu para trader mencatat, mengelola, dan menganalisis pendapatan dari berbagai instrumen trading seperti Forex, Saham, dan Crypto. Aplikasi ini juga dilengkapi fitur penetapan sasaran finansial untuk membantu pengguna tetap termotivasi.

## ✨ Fitur Utama

- **Dashboard Ringkasan**: Tampilan visual performa trading secara keseluruhan (Total Profit/Loss, Net Profit) menggunakan grafik.
- **Pencatatan per Instrumen**: Halaman khusus untuk mencatat transaksi Forex, Saham, dan Crypto secara terpisah.
- **Laporan Komprehensif**: Rekapitulasi semua transaksi dengan fitur filter berdasarkan jenis instrumen dan rentang tanggal.
- **Sasaran Finansial**: Tetapkan tujuan keuangan (misal: "Dana Liburan") dan lacak progres tabungan Anda secara visual.
- **Autentikasi Pengguna**: Sistem login dan registrasi untuk menjaga keamanan dan privasi data setiap pengguna.
- **Desain Responsif**: Tampilan yang optimal di berbagai perangkat, mulai dari desktop hingga mobile.

## 🚀 Teknologi yang Digunakan

### Frontend
- **HTML5**
- **Tailwind CSS**: Untuk styling dan layout yang cepat dan modern.
- **JavaScript (Vanilla JS)**: Untuk logika interaktivitas, manipulasi DOM, dan komunikasi dengan backend.
- **Chart.js**: Untuk visualisasi data dalam bentuk grafik.
- **Boxicons**: Untuk ikonografi yang bersih dan konsisten.

### Backend
- **PHP**: Sebagai bahasa pemrograman di sisi server.
- **MySQL**: Sebagai sistem manajemen database untuk menyimpan data pengguna, transaksi, dan sasaran.

## 📁 Struktur Direktori Final


/trading-income-manager
│
├── index.html, forex.html, saham.html, crypto.html, laporan.html, goals.html
├── login.html, register.html
│
├── assets/
│   ├── css/style.css
│   └── js/ (api.js, main.js, chart.js, dan file js per halaman)
│
├── backend/
│   ├── config.php, delete_data.php
│   ├── auth/ (login.php, register.php, logout.php)
│   ├── forex/ (insert_forex.php, get_forex.php)
│   ├── saham/ (insert_saham.php, get_saham.php)
│   ├── crypto/ (insert_crypto.php, get_crypto.php)
│   ├── laporan/ (get_laporan.php)
│   └── goals/ (add_goal.php, get_goals.php, update_goal.php, delete_goal.php)
│
└── README.md


## 🛠️ Instalasi & Setup

### Frontend (GitHub Pages)
1.  Clone repositori ini.
2.  Buka file `assets/js/api.js`.
3.  Ubah nilai konstanta `BASE_URL` menjadi URL direktori `backend` Anda yang telah di-hosting (misalnya di InfinityFree).
4.  Push semua file ke repositori GitHub Anda.
5.  Aktifkan GitHub Pages melalui menu **Settings** > **Pages** di repositori Anda.

### Backend (InfinityFree)
1.  Buat akun di [InfinityFree](https://www.infinityfree.com/).
2.  Buat website baru dan dapatkan detail FTP serta database.
3.  Buka **Control Panel** dan masuk ke **phpMyAdmin**.
4.  Buat database baru.
5.  Impor skrip SQL yang telah disediakan untuk membuat tabel `users`, `transactions`, dan `goals`.
6.  Buka file `backend/config.php` dan sesuaikan detail koneksi database (host, username, password, nama database) dengan yang Anda dapatkan dari InfinityFree.
7.  Upload seluruh isi folder `backend/` ke direktori `htdocs/` di server InfinityFree Anda menggunakan FileZilla atau file manager online.