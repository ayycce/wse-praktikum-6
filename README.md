# Laporan Praktikum 6: RESTful API Best Practices

Nama: [Aisyah Safitri]
NIM: [230104040117]
Kelas: [TI23B]

## 1. Dokumentasi Endpoint API

Base URL: `http://localhost:3000`

| Method | Endpoint | Deskripsi | Status Sukses | Status Error |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Cek status API (Health Check) | `200 OK` | - |
| `GET` | `/api/products` | Ambil semua produk | `200 OK` | - |
| `GET` | `/api/products/:id` | Ambil produk berdasarkan ID | `200 OK` | `404 Not Found` |
| `POST` | `/api/products` | Tambah produk baru | `201 Created` | `400 Bad Request` |
| `PUT` | `/api/products/:id` | Update penuh data produk | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `PATCH` | `/api/products/:id` | Update sebagian data produk | `200 OK` | `404 Not Found` |
| `DELETE` | `/api/products/:id` | Hapus produk | `200 OK` | `404 Not Found` |
| `GET` | `/api/products/crash/test` | (Internal) Tes Error Handler | - | `500 Internal Server Error` |

---

## 2. Review 7 RESTful Principles

[cite_start]Berikut adalah 7 prinsip RESTful yang diterapkan dalam praktikum ini [cite: 12-25]:

1.  **Resource-Oriented URI:** Ya, menggunakan kata benda jamak (`/products`).
2.  **Proper HTTP Methods:** Ya, menggunakan `GET`, `POST`, `PUT`, `PATCH`, dan `DELETE` sesuai fungsinya.
3.  **Stateless Communication:** Ya, server tidak menyimpan sesi. Setiap request (misal: POST) berisi semua info yang dibutuhkan.
4.  **Consistent HTTP Status Codes:** Ya, menggunakan `200`, `201`, `400`, `404`, dan `500` dengan tepat.
5.  **Content Negotiation (JSON):** Ya, semua respons dikirim dalam format `application/json` yang konsisten.
6.  **Validation & Error Handling:** Ya, diimplementasikan melalui middleware `validateProduct.js` (untuk error `400`) dan `errorHandler.js` (untuk error `500`).
7.  **Discoverability/Documentation-Friendly:** Ya, dengan adanya endpoint `/api/health` dan dokumentasi README.md ini.

---

## 3. Kesulitan yang Ditemui 