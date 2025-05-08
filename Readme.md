# Chatter - Full Stack App

A minimal Twitter-style full stack application built with modern web technologies.

## 🛠️ Tech Stack

- 🧠 **Frontend:** Next.js (App Router) + Tailwind CSS
- 🔐 **Backend:** Node.js + Express + JWT Auth
- 💾 **Database:** MongoDB
- 📦 **API:** RESTful endpoints for user auth

---

## 🔧 Features

- User Registration & Login with JWT
- Protected Dashboard route
- Tweet creation, reading, and deletion
- User profile management
- Form validation & error handling
- Client-side state management with React hooks
- Responsive UI using Tailwind CSS

---

## 🖼️ Project Structure

```
.
├── backend/                # Express backend
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── middleware/         # Auth middleware
│   └── server.js           # Entry point
├── client/                 # Next.js frontend
│   ├── app/                # App router pages
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utility functions
│   ├── public/             # Static assets
│   └── tailwind.config.js  # Tailwind configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatter.git
cd chatter
```

### 📦 Backend Setup

#### Install dependencies

```bash
cd backend
npm install
```

#### Create .env

```bash
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

#### Start the server

```bash
npm run dev
```

Server runs at: http://localhost:5000

### 💻 Frontend Setup

#### Install dependencies

```bash
cd client
npm install
```

#### Create .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Run the development server

```bash
npm run dev
```

Frontend runs at: http://localhost:3000

---

## 🔨 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

Your Name - [@bobsstwt](https://twitter.com/bobsstwt)

Project Link: [https://github.com/bobbyy16/chatter](https://github.com/bobbyy16/chatter)
