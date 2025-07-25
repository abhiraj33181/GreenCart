
# 🛒 GreenCart

**GreenCart** is a full-stack e-commerce platform that enables farmers to sell their crops directly to customers without intermediaries. This solution aims to empower farmers, ensure fair pricing, and deliver fresh produce to end users.

---

## 📌 Table of Contents

- [🚀 Demo](#-demo)
- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Environment Variables](#️-environment-variables)
- [💻 Local Setup Instructions](#-local-setup-instructions)
- [🧪 Testing](#-testing)
- [🛡️ Security & Best Practices](#️-security--best-practices)
- [📷 Screenshots](#-screenshots)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)
- [📡 API Documentation](#-api-documentation)

---

## 🚀 Demo

> **Live Demo:** Coming Soon  
> _You can deploy it easily using Vercel (frontend) and Render/Heroku (backend)._

---

## 🌟 Features

- 👩‍🌾 Farmers can register and list their crops.
- 🛒 Customers can browse and buy directly from farmers.
- 🔐 JWT-based secure authentication for both roles.
- 📦 Product management (add/update/delete)
- 🧾 Order placement and tracking (Coming soon)
- 🧠 Clean MVC architecture
- ⚡ Fast performance with Vite + React frontend

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Axios
- Tailwind CSS (or any CSS framework)
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- jsonwebtoken
- bcryptjs

---

## 📁 Folder Structure

```
greencart/
├── client/               # Frontend (Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   └── index.html
├── server/               # Backend (Node.js + Express)
│   ├── config/           # DB config, JWT secret
│   ├── controllers/      # Request handling logic
│   ├── models/           # Mongoose models
│   ├── routes/           # API endpoints
│   ├── middleware/       # JWT auth, error handling
│   └── server.js
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Environment Variables

### `.env` for `server/`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 💻 Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/abhiraj33181/greencart.git
cd greencart
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env   # fill it with your values
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

> Visit `http://localhost:5173` to view the frontend, and backend runs on `http://localhost:5000`

---

## 🧪 Testing

Currently, basic manual testing is being used. In future:
- Jest + Supertest (Backend)
- React Testing Library (Frontend)

---

## 🛡️ Security & Best Practices

- 🔐 JWT-based authentication
- 🔑 Passwords hashed using bcrypt
- 🚫 `.env` and `node_modules` are ignored via `.gitignore`
- 💥 Graceful error handling middleware
- 📦 MongoDB validation at schema level

---

## 📷 Screenshots

> Add screenshots here if you have UI implemented  
> You can use `client/public/screenshots/` to store them

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch: `git checkout -b feature/featureName`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/featureName`
5. Open a pull request

---

## 📬 Contact

Made with ❤️ by **Abhiraj**  
🔗 GitHub: [@abhiraj33181](https://github.com/abhiraj33181)

---

## 📡 API Documentation

All API endpoints are prefixed with: `http://localhost:5000/api`

> 🔐 Most endpoints require authentication using JWT in headers:  
`Authorization: Bearer <token>`

### 📁 Auth Routes (`/auth`)

| Method | Endpoint         | Description                   | Access |
|--------|------------------|-------------------------------|--------|
| POST   | `/auth/register` | Register new user             | Public |
| POST   | `/auth/login`    | Login and get JWT             | Public |

### 👩‍🌾 Farmer Routes (`/farmers`)

| Method | Endpoint         | Description              | Access  |
|--------|------------------|--------------------------|---------|
| GET    | `/farmers`       | Get all farmers          | Public  |
| GET    | `/farmers/:id`   | Get single farmer by ID  | Public  |
| PUT    | `/farmers/:id`   | Update farmer profile    | Private |
| DELETE | `/farmers/:id`   | Delete farmer account    | Private |

### 🛒 Product Routes (`/products`)

| Method | Endpoint         | Description           | Access           |
|--------|------------------|-----------------------|------------------|
| GET    | `/products`      | Get all products      | Public           |
| GET    | `/products/:id`  | Get single product    | Public           |
| POST   | `/products`      | Create new product    | Private (Farmer) |
| PUT    | `/products/:id`  | Update product        | Private (Farmer) |
| DELETE | `/products/:id`  | Delete product        | Private (Farmer) |

### 🧾 Orders (Coming Soon)

| Method | Endpoint              | Description             | Access  |
|--------|-----------------------|-------------------------|---------|
| POST   | `/orders`             | Place new order         | Private |
| GET    | `/orders`             | View user orders        | Private |
| GET    | `/orders/farmer`      | View farmer’s orders    | Private |
| PUT    | `/orders/:id/status`  | Update order status     | Private (Farmer) |

---
