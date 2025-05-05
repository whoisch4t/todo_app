# 🧠 Full-Stack Todo App (React + Node.js + MySQL + JWT)

Bu proje, modern web teknolojileriyle oluşturulmuş bir **todo uygulaması**.  
Kullanıcılar kayıt olabilir, giriş yapabilir, görevlerini oluşturabilir, tamamlayabilir veya silebilir.  
Veriler **MySQL** üzerinde saklanır, oturum yönetimi için **JWT** tabanlı kimlik doğrulama kullanılır.

---

## 🚀 Özellikler

- ✅ Kullanıcı kaydı & giriş (JWT ile)
- ✅ Görev ekleme, silme, güncelleme
- ✅ Kullanıcıya özel görev listesi
- ✅ React + Bootstrap 5 ile Dark UI
- ✅ MySQL ile veri saklama
- ✅ Token-based güvenli API erişimi
- ✅ Mobil uyumlu (responsive) tasarım

---

## 🛠️ Teknolojiler

| Katman    | Teknoloji                     |
|-----------|-------------------------------|
| Frontend  | React, TypeScript, Bootstrap  |
| Backend   | Node.js, Express.js           |
| Veritabanı| MySQL                         |
| Kimlik Doğrulama | JWT, Bcrypt            |

---

## 📁 Proje Yapısı

```
todo-app/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── db.js
│   ├── server.js
│   └── .env.example 
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── main.css
└── README.md
```

---

## ⚙️ Kurulum

### 1. Repo'yu Klonla

```bash
git clone https://github.com/kullaniciadiniz/todo-app.git
cd todo-app
```

### 2. Backend Kurulumu

```bash
cd backend
npm install
cp .env.example
```

`.env` dosyasına şu bilgileri gir:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todo_app
JWT_SECRET=
```

> MySQL'de veritabanını kur:
```sql
todo_app.sql kurunuz
```

Sunucuyu başlat:

```bash
node server.js
```

### 3. Frontend Kurulumu

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧪 API Endpoint'leri

| Metot | Endpoint           | Açıklama               |
|-------|--------------------|------------------------|
| POST  | /api/auth/register | Kullanıcı kaydı        |
| POST  | /api/auth/login    | Giriş (token döner)    |
| GET   | /api/tasks         | Kullanıcının görevleri |
| POST  | /api/tasks         | Yeni görev oluştur     |
| PUT   | /api/tasks/:id     | Görev güncelleme       |
| DELETE| /api/tasks/:id     | Görev silme            |

---

## 🔐 Güvenlik

- Parolalar `bcrypt` ile hash'lenir
- Kimlik doğrulama JWT ile sağlanır
- Tüm görev işlemleri token doğrulaması gerektirir (`Authorization: Bearer <token>`)

---

## 📄 Lisans

MIT Lisansı
