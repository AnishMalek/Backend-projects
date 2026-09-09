# ShopEasy - Simple E-Commerce Platform (MVC Architecture)

A beginner-friendly, clean, and complete **E-Commerce Web Application** built using **Node.js, Express, MongoDB, EJS, JWT, and MVC Architecture**.

---

## 📌 1. Project Description

ShopEasy is a simple E-commerce web application that allows users to register, log in, create and manage their own products, view all products listed by the community, and filter products by category. The platform includes **Role-Based Access Control (RBAC)** to differentiate between regular users and administrators. Admins can manage categories and oversee products.

---

## ✨ 2. Features

- **User Authentication**: Secure Registration, Login, and Logout using JWT stored in HTTP-only cookies.
- **Password Hashing**: Passwords are automatically hashed using `bcrypt` before saving to MongoDB.
- **Product Management**:
  - View all community products on the home page (`/products`).
  - View logged-in user's own products (`/products/my`).
  - Add new products (`/products/new`).
  - Edit and Delete owned products (Ownership protection).
- **Category Filtering**: Filter product listings by selecting specific categories.
- **Admin Privileges**:
  - Add, Edit, and Delete categories.
  - Delete or edit any product as an administrator.
- **Responsive UI**: Styled using vanilla CSS with a clean navigation bar, product cards, status badges, and forms.

---

## 🛠️ 3. Technologies Used

- **Node.js**: JavaScript Runtime
- **Express.js**: Web Application Framework
- **MongoDB & Mongoose**: Database & Object Data Modeling (ODM)
- **EJS**: Server-side Templating Engine
- **JSON Web Tokens (JWT)**: Authentication Mechanism
- **cookie-parser**: Middleware to parse cookies
- **bcrypt**: Password Hashing Library
- **dotenv**: Environment Variable Management

---

## 📂 4. Folder Structure

```text
ecommerce/
│
├── app.js                   # Application entry point
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables
├── seedAdmin.js             # Admin user seed script
├── .gitignore               # Ignored files
├── README.md                # Project documentation
│
├── config/
│   └── db.js                # MongoDB connection configuration
│
├── models/
│   ├── User.js              # User schema with bcrypt password hashing
│   ├── Product.js           # Product schema with User and Category references
│   └── Category.js          # Category schema
│
├── controllers/
│   ├── authController.js    # Register, login, logout logic
│   ├── productController.js # Product CRUD and category filtering logic
│   └── categoryController.js# Category management logic
│
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   ├── productRoutes.js     # Product endpoints
│   └── categoryRoutes.js    # Category endpoints
│
├── middleware/
│   ├── authMiddleware.js    # JWT authentication middleware
│   └── roleMiddleware.js    # Admin role check middleware
│
├── views/
│   ├── partials/
│   │   └── navbar.ejs       # Dynamic navigation bar
│   │
│   ├── login.ejs            # Login page
│   ├── register.ejs         # User registration page
│   ├── productList.ejs      # All products catalog with filter
│   ├── myProducts.ejs       # Logged-in user products page
│   ├── productForm.ejs      # Unified add/edit product form
│   ├── productItem.ejs      # Reusable product card component
│   └── categoryList.ejs     # Category list and admin management
│
└── public/
    └── style.css            # Custom Vanilla CSS styling
```

---

## ⚙️ 5. Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd "final exam project"
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

---

## 🔑 6. Environment Variables

Create a `.env` file in the root directory (or use the provided `.env`):

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
JWT_SECRET=my_super_secret_jwt_key_12345
```

---

## 🍃 7. MongoDB Setup

Ensure MongoDB is installed and running locally on your computer:
- Default local connection: `mongodb://127.0.0.1:27017/ecommerce_db`
- Alternatively, you can use a MongoDB Atlas connection string by replacing `MONGO_URI` in `.env`.

---

## 👑 8. How to Create an Admin User

Run the included admin seeding script to create an initial admin account:

```bash
npm run seed
```

This will create an Admin account with the following credentials:
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: `admin`

---

## 🚀 9. How to Run the Project

Start the application server:

```bash
npm start
```

Open your browser and navigate to:
```text
http://localhost:3000
```

---

## 🛣️ 10. Available Routes

### Authentication Routes
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/register` | Public | Render registration form |
| POST | `/register` | Public | Register a new user |
| GET | `/login` | Public | Render login form |
| POST | `/login` | Public | Authenticate user & set JWT cookie |
| GET | `/logout` | Authenticated | Clear cookie & log out |

### Product Routes
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/products` | Public | View all products (Supports `?category=ID` filter) |
| GET | `/products/my` | Authenticated | View logged-in user's own products |
| GET | `/products/new` | Authenticated | Render product creation form |
| POST | `/products` | Authenticated | Create a new product |
| GET | `/products/edit/:id` | Owner / Admin | Render edit form for a product |
| POST | `/products/edit/:id` | Owner / Admin | Update product details |
| POST | `/products/delete/:id` | Owner / Admin | Delete a product |

### Category Routes
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/categories` | Public | View list of all categories |
| POST | `/categories` | Admin Only | Add a new category |
| POST | `/categories/edit/:id` | Admin Only | Edit category details |
| POST | `/categories/delete/:id` | Admin Only | Delete a category |

---

## 🔐 11. Explanation of Authentication

1. When a user submits credentials via `POST /login`, `authController` checks the email against the database.
2. `bcrypt.compare()` checks if the submitted password matches the hashed password stored in the database.
3. Upon success, a JWT is signed containing `{ userId, username, role }`.
4. The JWT is saved in an **HTTP-only cookie** named `token` (`res.cookie('token', token, { httpOnly: true })`).
5. On protected routes, `authMiddleware.protect` checks for `req.cookies.token`, verifies it using `process.env.JWT_SECRET`, and attaches the decoded user data to `req.user` and `res.locals.user`.

---

## 🛡️ 12. Explanation of Role-Based Access Control (RBAC)

1. The `User` model defines a `role` field with values `"user"` (default) or `"admin"`.
2. Admin routes are guarded by `roleMiddleware.adminOnly`.
3. If `req.user.role` is not `"admin"`, access is denied (HTTP 403 status).
4. The navbar dynamically shows an **Admin** badge and Category management forms for admin accounts.

---

## 🔗 13. Explanation of Mongoose `populate()`

In MongoDB, documents store ObjectIds referencing other collections. `populate()` converts these ObjectIds into full document details:

```javascript
const products = await Product.find()
  .populate("createdBy", "username email")
  .populate("category", "name");
```

- `createdBy` replaces the user ObjectId with the user's `username` and `email`.
- `category` replaces the category ObjectId with the category's `name`.

---

## 👥 14. Explanation of Multiuser Support

- Each product has a `createdBy` reference pointing to the user who created it.
- In `productController.js`, `/products/my` queries products matching `createdBy: req.user.userId`.
- When an edit or delete request is submitted (`/products/edit/:id` or `/products/delete/:id`), the controller verifies:
  ```javascript
  const isOwner = product.createdBy.toString() === req.user.userId;
  const isAdmin = req.user.role === "admin";
  ```
- Normal users can only modify their own products; admins can manage any product.
