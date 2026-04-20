# ✨ Ella&Lux — Full Stack Fashion Store

Ella&Lux is a modern full-stack fashion web application built to showcase and manage a growing clothing brand. It features a sleek customer-facing storefront and a powerful admin backend for managing products, categories, and media.

---

## 🚀 Features

### 🛍️ Frontend (React + Vite)

* Responsive, luxury-themed UI
* Dynamic product listing & category filtering
* Product detail pages with:

  * Multiple images
  * Video support
  * Swipe gallery (mobile)
  * Fullscreen preview (desktop)
* WhatsApp order integration
* Featured products section
* Dynamic categories from backend

---

### ⚙️ Backend (Django + DRF)

* RESTful API with Django REST Framework
* Admin dashboard for:

  * Products
  * Categories
  * Product media (images & videos)
* Image & media upload handling
* Dynamic serializers for list & detail views
* Contact form API
* CORS enabled for frontend communication

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* CSS (custom styling)

### Backend

* Django
* Django REST Framework
* SQLite (dev)

---

## 📁 Project Structure

```
ellaluxe/
│
├── backend/        # Django API
│   ├── ellaluxe/
│   ├── Main/
│   ├── media/
│   └── manage.py
│
├── frontend/       # React (Vite)
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ellaluxe.git
cd ellaluxe
```

---

## 🔧 Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt
```

### Create `.env` file:

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
```

### Run migrations:

```bash
python manage.py migrate
```

### Create superuser:

```bash
python manage.py createsuperuser
```

### Start server:

```bash
python manage.py runserver
```

Backend runs on:

```
http://localhost:8000
```

---

## 🎨 Frontend Setup (React)

```bash
cd frontend
npm install
```

### Create `.env` file:

```
VITE_API_BASE=/api
VITE_BACKEND_URL=http://localhost:8000
```

### Start dev server:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Endpoint             | Description    |
| -------------------- | -------------- |
| `/api/products/`     | List products  |
| `/api/products/:id/` | Product detail |
| `/api/categories/`   | Categories     |
| `/api/contact/`      | Contact form   |

---

## 📸 Media Handling

* Main product image stored in:

```
/media/products/
```

* Additional media (images/videos) supported via:

```
ProductMedia model
```

---

## 📱 Ordering Flow

1. User browses products
2. Selects size
3. Clicks **Order on WhatsApp**
4. Pre-filled message opens with product details

---

## 🔐 Environment Variables

### Backend

```
SECRET_KEY=
DEBUG=
ALLOWED_HOSTS=
```

### Frontend

```
VITE_API_BASE=
VITE_BACKEND_URL=
```

---

## 🚀 Deployment (Suggested)

* **Backend:** Render / Railway
* **Frontend:** netlify
* **Media:** Cloudinary / S3 (optional upgrade)

---
---

## 🤝 Contribution

This project was built to support a growing fashion brand and to push technical growth. Contributions, ideas, and improvements are welcome.

---

## 📄 License

This project is for educational and commercial use.

---

## 👤 Author

Built with intent and growth in mind.
