# Tronic-Hub

🚀 **Live Demo:** [https://tronic-hub-frontend.vercel.app/](https://tronic-hub-frontend.vercel.app/)

Tronic-Hub is a full-stack **MERN (MongoDB, Express.js, React, Node.js)** E-Commerce web application that combines both **frontend** and **backend** into a single repository for showcase and deployment purposes.

This repository demonstrates real-world full-stack development practices, secure environment handling, and clean project structure.

---

## 🌐 Live Application

- **Frontend (Vercel):** [https://tronic-hub-frontend.vercel.app/](https://tronic-hub-frontend.vercel.app/)
- **Backend:** Deployed separately (API-based)

---

## 📁 Project Structure

```
Tronic-Hub/
├── frontend/        # React frontend (Vite)
├── backend/         # Node.js + Express backend
├── .gitignore
└── README.md
```

---

## 🚀 Features

- Full-stack MERN architecture
- RESTful API using Express.js
- React frontend with Vite
- JWT-based authentication
- MongoDB database integration
- Image upload using Cloudinary
- Email functionality (EmailJS & Nodemailer)
- Secure environment variable usage
- Production-ready folder structure

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- EmailJS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Nodemailer

### Tools & Platforms

- Git & GitHub
- Postman
- Vercel (Frontend Deployment)

---

## 🔐 Environment Variables

This project uses environment variables for configuration.\
Create `.env` files in both frontend and backend directories.

---

### 🧩 Frontend Environment Variables (`frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

---

### 🧩 Backend Environment Variables (`backend/.env`)

```env
BASE_URL=your_frontend_url
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_passkey
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/thamod-03/Tronic-Hub.git
cd Tronic-Hub
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:8000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔁 Running the Application

1. Start the backend server
2. Start the frontend srver
3. Open the live site or local frontend
4. Frontend communicates with backend via REST APIs

---

## 🔒 Security Best Practices

- `.env` files are excluded using `.gitignore`
- Sensitive credentials are never committed
- Use platform environment variables for production
- JWT secrets and API keys are securely stored

---

## 🚀 Deployment Notes

- Frontend can be deployed on **Vercel / Netlify**
- Backend can be deployed on **Render / Railway / Vercel**
- Update `VITE_BACKEND_URL` with deployed backend URL
- Update `BASE_URL` with deployed frontend URL
- Configure CORS properly for production

---

## 📌 Future Improvements

- API rate limiting
- Improved UI/UX
- CI/CD pipeline
- Payment Gateway integration

---

## 📄 License

This project is open-source and intended for learning and portfolio use.

---

## 🙌 Acknowledgements

Developed as a full-stack MERN project for educational and portfolio purposes.

---

### ⭐ If you find this project useful, consider giving it a star!

