# 🚗 Celatire - MERN eCommerce Platform

Celatire is a full-stack MERN eCommerce application designed for selling tyres online. It provides customers with a smooth shopping experience through secure authentication, advanced product filtering, online payments, and order management. The platform also includes a powerful admin dashboard to manage products, users, inventory, and orders.

---

## ✨ Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Secure Password Hashing (bcrypt)
- Browse Products
- Search Products
- Filter by Category, Brand & Price
- Product Sorting
- Pagination
- Product Details
- Shopping Cart
- Wishlist
- Checkout
- Razorpay Payment Integration
- Order History
- User Profile Management

### 🛠️ Admin Features
- Admin Dashboard
- Add/Edit/Delete Products
- Manage Categories
- Manage Users
- Manage Orders
- Product Image Upload
- Sales Monitoring

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Other Tools
- Cloudinary (Image Upload)
- Multer
- paypal Payment Gateway

---

## 📁 Project Structure

```
Celatire/
│
├── frotnend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/harman077/celatire.git
```

### Navigate to project

```bash
cd celatire
```

### Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

CLIENT_URL=http://localhost:5173
```

---

## ▶️ Run the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd fronrend
npm run dev
```

---



## 🚀 Future Improvements

- Email Verification
- Forgot Password
- Product Reviews
- Coupon System
- Notifications
- Invoice Generation
- Multi-vendor Support
- AI-based Product Recommendations

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourusername

---
⭐ If you like this project, don't forget to star the repository!