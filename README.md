# 🛠️ Shop - Complete Job-Ready Next.js 13 Auth Project

**Project Name:** shop  
**Tech Stack:** Next.js 13 (App Router), Redux Toolkit, RTK Query, Zod, Tailwind CSS, ShadCN UI, Framer Motion, react-hot-toast, MongoDB, Cloudinary

---

## ✨ Features
- User authentication (Login, Register, Verify Email)
- Persistent Redux state using `redux-persist`
- RTK Query for API requests
- Form validation with Zod + React Hook Form
- Toast notifications for success/error messages
- Smooth animations with Framer Motion
- Prebuilt UI with ShadCN components
- Cloudinary integration for image handling
- MongoDB integration for user data
- Job-ready structure for interviews/demo

---

## 📂 Folder Structure

src/
├── app/
│ ├── auth/
│ │ ├── login/page.jsx
│ │ ├── register/page.jsx
│ │ └── verify-email/page.jsx
│ ├── api/
│ │ └── auth/
│ │ ├── register/route.js
│ │ ├── login/route.js
│ │ └── verify-email/route.js
│ ├── redux/
│ │ ├── api/authApi.js
│ │ ├── slice/userSlice.js
│ │ ├── store/store.js
│ │ ├── Provider.js
│ │ └── storage.js
│ ├── zodValidation/userValidation.js
│ └── styles/globals.css
├── components/ # ShadCN UI components
├── libs/
│ ├── cloudinary.js
│ ├── database.js
│ └── utils.js
└── model/
└── userModel.js


---

## 🔹 Backend API Routes

**Base URL:** `/api/auth/`

| Endpoint                | Method | Description                       |
|-------------------------|--------|-----------------------------------|
| `/register`             | POST   | Register new user                 |
| `/login`                | POST   | Login user                        |
| `/verify-email`         | POST   | Verify user email with token      |

**Sample JSON Response:**
```json
{
  "success": true,
  "user": {
    "_id": "63f4c123...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Login successful"
}

Redux Setup

Store: src/app/redux/store/store.js

Combines userSlice & authApi.reducer

Middleware: authApi.middleware

redux-persist for persistent login

DevTools enabled

Provider: src/app/redux/Provider.js
Wraps app with Provider + PersistGate

userSlice: src/app/redux/slice/userSlice.js
State:user: null
isAuthenticated: false
loading: false
error: null
Reducers: loginStart, loginSuccess, loginFailure, logout, updateUser
Auth API (RTK Query)

src/app/redux/api/authApi.js

Hooks:
useRegisterUserMutation
useLoginUserMutation
useVerifyEmailMutation

Form Validation

src/app/zodValidation/userValidation.js

Zod schemas for:

Register (name, email, password)

Login (email, password)

Integrated with React Hook Form

Displays validation messages on Ui

UI & Libraries

Framer Motion: animations for pages

react-hot-toast: toast notifications for success/error

Tailwind CSS + ShadCN UI: prebuilt responsive components

lucide-react: icons

Cloudinary: image upload/handling

MongoDB: user storage


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  avatar: { type: String, default: "" },
  verificationToken: { type: String }
});

⚡ Installation & Dev Setup

# Clone the repo
git clone https://github.com/<your-username>/shop.git
cd shop

# Install dependencies
yarn install
# or
npm install

# Run the project
yarn dev
# or
npm run dev

# Open in browser
http://localhost:3000
