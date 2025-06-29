# 🛍️ E-Commerce Store (MERN + GraphQL)

A modern full-stack e-commerce application built with:

- **MongoDB** for product & user data
- **Express** & **Node.js** backend
- **React (TypeScript)** frontend
- **GraphQL** API
- **Apollo Client** for querying GraphQL
- **AWS S3** for image uploads
- **JWT** for authentication

---

## 🚀 Features

### ✅ User Authentication
- Register and login
- Admin vs regular user roles
- Token-based auth with JWT

### ✅ Image Uploads to AWS S3
- Uses pre-signed S3 URLs for secure uploads
- Profile pictures and product images stored in public S3 bucket

### ✅ Registration Form
- Responsive, styled with custom CSS
- Optional profile picture upload
- Address fields included (street, apartment, city, state, zip code)
- Gender-based default avatar fallback

### ✅ Toast Notifications
- Clean feedback on registration success/failure using `react-hot-toast`

---

## 📂 Folder Structure

```bash
server/
├── graphql/
│   ├── resolvers.ts
│   ├── typeDefs.ts
│   ├── types/
├── lib/
│   ├── uploadImage.ts
│   └── s3.ts
├── models/
├── utils/
└── index.ts

client/
├── src/
│   ├── components/
│   ├── graphql/
│   │   ├── mutations/
│   ├── pages/
│   │   └── RegisterPage.tsx
│   ├── styles/
│   │   └── RegisterPage.css
│   └── App.tsx
