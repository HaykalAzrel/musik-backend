# Musik Backend API

REST API sederhana untuk manajemen data musik menggunakan Node.js + Express, data disimpan di file JSON.

## Fitur
- Melihat daftar lagu: `GET /music`
- Menambah lagu baru: `POST /music`
- Melihat detail lagu: `GET /music/:title`
- Menghapus lagu: `DELETE /music/:title`

## Struktur Data
Semua data lagu disimpan di file `music.json` dengan format:
```json
[
  {
    "url": "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
    "title": "Guess I'll Never Know",
    "artist": "TrackTribe",
    "artwork": "https://f4.bcbits.com/img/a3736661212_65",
    "rating": 1,
    "playlist": ["Chill 🌱"]
  }
]
```

## Cara Menjalankan Lokal
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server:
   ```bash
   npm start
   ```
3. API berjalan di `http://localhost:3000`

## Deploy ke Vercel
- Push repo ke GitHub
- Import ke Vercel, pilih framework "Express"
- Root directory: `./`
- Build Command dan Output Directory dikosongkan
- Klik Deploy

## Endpoint
| Method | Endpoint         | Deskripsi                |
|--------|------------------|-------------------------|
| GET    | /music           | Daftar semua lagu       |
| POST   | /music           | Tambah lagu baru        |
| GET    | /music/:title    | Detail lagu berdasarkan judul |
| DELETE | /music/:title    | Hapus lagu berdasarkan judul  |

## Contoh Request
### Tambah Lagu
```http
POST /music
Content-Type: application/json
{
  "url": "https://contoh.com/audio.mp3",
  "title": "Judul Lagu",
  "artist": "Nama Artist",
  "artwork": "https://contoh.com/artwork.jpg",
  "rating": 5,
  "playlist": ["Chill 🌱"]
}
```

### Hapus Lagu
```http
DELETE /music/Judul%20Lagu
```

## Lisensi
MIT
