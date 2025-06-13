---
theme: seriph
title: E-Commerce Store
transition: slide-left
mdc: true
---

# 🛒 E-Commerce Store

A modern full-stack shopping experience built with GraphQL, TypeScript, and MongoDB.

---

## 💻 Tech Stack

- React + TypeScript (Frontend)
- Node.js + Express (Backend)
- Apollo Server v4 (GraphQL API)
- MongoDB + Mongoose (Database)
- Slidev (for this presentation)

---

## 🧭 Folder Structure

```plaintext
ecommerce-store/
├── client/       # React frontend
├── server/       # Node.js + GraphQL backend
├── slides/       # Project presentation
├── docker/       # DevOps (coming soon)
├── kubernetes/   # Deployment configs (coming soon)

```
---


# 🧩 TypeScript Interfaces

Interfaces define the **structure** of an object. Think of them as **blueprints** that describe what properties an object should have.

## 🧠 Why Use Interfaces?

- ✅ **Type Safety** — Ensures objects follow a defined structure  
- 💡 **Editor IntelliSense** — Get autocompletion and type hints  
- 📘 **Documentation** — Makes code easier to understand  
- 🔁 **Reusability** — Use types across components & functions

---

## 🧪 Example

```ts
interface User {
  username: string;
  email: string;
  password: string;
}

const newUser: User = {
  username: "hector",
  email: "hector@example.com",
  password: "123456"
};

interface Product {
  title: string;
  description?: string; // Optional
}

const item: Product = {
  title: "Fountain"
};
```