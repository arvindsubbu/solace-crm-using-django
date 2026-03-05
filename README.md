# Solace CRM – Full Stack Application

A simple CRM application built with **Django REST Framework** for the backend and **React (Vite)** for the frontend.
The system allows users to authenticate and manage real estate agents through a dashboard.

---

## 🚀 Tech Stack

### Backend

* Django
* Django REST Framework
* JWT Authentication (SimpleJWT)
* MySQL

### Frontend

* React
* Vite
* Axios
* Bootstrap

---

# 📂 Project Structure

```
SOLACE-CRM-DJANGO
│
├── agents/            # Agents app (CRUD APIs)
├── users/             # User registration and authentication
├── crm_backend/       # Django project settings
│
├── crm_frontend/      # React frontend application
│
├── manage.py
├── requirements.txt
└── README.md
```

---

# ⚙️ Backend Setup

## 1. Clone the repository

```
git clone <your-repo-url>
cd SOLACE-CRM-DJANGO
```

## 2. Create virtual environment

```
python -m venv venv
```

Activate:

Windows

```
venv\Scripts\activate
```

Mac/Linux

```
source venv/bin/activate
```

---

## 3. Install dependencies

```
pip install -r requirements.txt
```

---

## 4. Configure Database

Update database settings in:

```
crm_backend/settings.py
```

Example:

```
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "crm_db",
        "USER": "root",
        "PASSWORD": "your_password",
        "HOST": "localhost",
        "PORT": "3306",
    }
}
```

---

## 5. Run migrations

```
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Create superuser

```
python manage.py createsuperuser
```

---

## 7. Start backend server

```
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

# 🎨 Frontend Setup

Navigate to frontend folder:

```
cd crm_frontend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔐 Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

Login endpoint:

```
POST /api/login/
```

Response:

```
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token"
}
```

The access token is stored in **localStorage** and sent with every API request.

Authorization header:

```
Authorization: Bearer <access_token>
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/register/` | Register new user |
| POST   | `/api/login/`    | Login user        |

---

## Agents

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/agents/`      | Get all agents   |
| POST   | `/api/agents/`      | Create new agent |
| PUT    | `/api/agents/{id}/` | Update agent     |
| DELETE | `/api/agents/{id}/` | Delete agent     |

---

# 👤 Agent Fields

```
name
company
email
mobile
status
created_by
created_at
```

---

# 🔒 Protected Routes

All agent APIs require authentication.

Example:

```
Authorization: Bearer <access_token>
```

---

# 📊 Features

* User Registration
* JWT Authentication
* Agent Management (CRUD)
* React Dashboard
* Modal based forms
* Protected routes
* Axios API integration

---

# 🧪 Testing

You can test the APIs using:

* Postman
* Browser DevTools
* React frontend interface

---

# 👨‍💻 Author

Arvind S

---
