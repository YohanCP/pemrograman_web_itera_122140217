# Personal Book Manager (Aplikasi Manajemen Buku Pribadi)

Aplikasi Manajemen Buku Pribadi adalah aplikasi web yang memungkinkan pengguna untuk mencatat dan mengelola koleksi buku mereka. Aplikasi ini dibangun menggunakan React dengan hooks modern dan dilengkapi dengan fitur-fitur seperti filter, pencarian, dan penyimpanan data di localStorage.

## Screenshot Aplikasi

![Halaman Utama](https://api.placeholder.com/800/450?text=Halaman+Utama)
![Halaman Statistik](https://api.placeholder.com/800/450?text=Halaman+Statistik)

## Fitur Utama

- **Manajemen Buku**
  - Menambah buku baru dengan judul, penulis, status (milik/baca/beli), dan deskripsi
  - Mengedit informasi buku yang sudah ada
  - Menghapus buku dari koleksi

- **Pengorganisasian**
  - Filter buku berdasarkan status (Semua, Dimiliki, Sedang Dibaca, Ingin Dibeli)
  - Pencarian buku berdasarkan judul atau penulis

- **Statistik**
  - Tampilan statistik lengkap tentang koleksi buku
  - Informasi tentang total buku, jumlah buku berdasarkan status, jumlah penulis unik, dll.

## Teknologi yang Digunakan

- **React**: Menggunakan functional components dan Hooks
- **React Router**: Untuk navigasi multi-halaman
- **Context API**: Untuk state management
- **LocalStorage**: Untuk menyimpan data secara lokal
- **CSS3**: Untuk styling dan responsif design

## Konsep React yang Diimplementasikan

### Hooks

- `useState`: Untuk mengelola state lokal di komponen
- `useEffect`: Untuk efek samping seperti sinkronisasi dengan localStorage
- `useContext`: Untuk mengakses context data
- `useReducer`: Untuk mengelola state yang lebih kompleks pada BookContext

### Custom Hooks

1. `useLocalStorage`: Hook untuk menyimpan data ke localStorage secara otomatis
2. `useBookStats`: Hook untuk menghitung statistik dari koleksi buku

### Context API

Menggunakan BookContext untuk mengelola state global aplikasi dan memungkinkan komponen untuk mengakses data buku tanpa prop drilling.

### Reusable Components

Beberapa komponen yang dibuat dapat digunakan kembali:
- `BookForm`: Formulir untuk menambah dan mengedit buku
- `BookItem`: Kartu buku individual
- `BookFilter`: Komponen untuk filter dan pencarian

## Instalasi dan Menjalankan Aplikasi

### Prasyarat
- Node.js versi 14.0.0 atau lebih baru
- NPM versi 6.0.0 atau lebih baru

### Langkah-langkah Instalasi

1. Clone repositori ini:
   ```
   git clone https://github.com/username/personal-book-manager.git
   ```

2. Masuk ke direktori aplikasi:
   ```
   cd personal-book-manager
   ```

3. Install dependensi:
   ```
   npm install
   ```

4. Jalankan aplikasi dalam mode pengembangan:
   ```
   npm start
   ```

5. Aplikasi akan dibuka secara otomatis di browser pada alamat [http://localhost:3000](http://localhost:3000).

## Menjalankan Test

Aplikasi ini dilengkapi dengan test unit menggunakan React Testing Library. Untuk menjalankan test:

```
npm test
```

## Struktur Proyek

```
src/
├── components/
│   ├── BookForm/
│   │   └── BookForm.js
│   ├── BookList/
│   │   ├── BookList.js
│   │   └── BookItem.js
│   └── BookFilter/
│       └── BookFilter.js
├── pages/
│   ├── Home/
│   │   └── Home.js
│   └── Stats/
│       └── Stats.js
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── context/
│   └── BookContext.js
├── App.js
└── App.css
```

## Fitur React yang Digunakan

1. **Functional Components**: Semua komponen dalam aplikasi menggunakan functional components modern dengan Hooks.

2. **Hooks**:
   - `useState`: Untuk mengelola state lokal seperti data formulir, toggle form, dll.
   - `useEffect`: Untuk efek samping seperti load data dari localStorage.
   - `useReducer`: Untuk mengelola state kompleks pada Context API.
   - `useContext`: Untuk mengakses Context API di berbagai komponen.

3. **Context API**: Digunakan untuk mengelola state global aplikasi, menghindari prop drilling, dan membuat komponen lebih bersih.

4. **Custom Hooks**: Dua custom hooks dibuat untuk mengenkapsulasi logika yang dapat digunakan kembali.

5. **Error Handling**: Implementasi validasi form dan penanganan error.

6. **Conditional Rendering**: Komponen dan UI elements dirender secara kondisional berdasarkan state.

## Error Handling

Aplikasi ini menangani berbagai error seperti:
- Validasi form saat menambah/mengedit buku
- Pencarian yang tidak mengembalikan hasil
- Konfirmasi sebelum menghapus buku

## Tantangan dan Solusi

1. **Sinkronisasi dengan localStorage**:
   - Tantangan: Menjaga sinkronisasi state React dengan localStorage
   - Solusi: Membuat custom hook useLocalStorage untuk otomatisasi

2. **State Management**:
   - Tantangan: Mengelola state kompleks di seluruh aplikasi
   - Solusi: Menggunakan Context API dengan useReducer

3. **Filter dan Pencarian**:
   - Tantangan: Mengimplementasikan filter dan pencarian yang efisien
   - Solusi: Membuat fungsi filter terpusat di Context