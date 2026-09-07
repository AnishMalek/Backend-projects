# Node.js Admin Panel Training Project

## Features
- Admin login/logout
- Protected admin routes
- Dashboard statistics
- Profile update
- Change password with bcrypt
- Flash messages
- Forgot password with OTP
- Nodemailer email sending
- OTP verification and expiry
- Reset password
- Category CRUD
- Subcategory CRUD
- Two-document populate: Subcategory -> Category
- Product CRUD
- Product populate: Product -> Category + Subcategory

## Requirements
- Node.js
- MongoDB local server or MongoDB Atlas
- Gmail App Password if you want real OTP email

## Setup
1. Open terminal in this folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Update `.env`.
5. Start MongoDB.
6. Run `npm start`.
7. Open `http://localhost:3000/login`.

## Default seeded admin
The values come from `.env`:
- Email: admin@example.com
- Password: Admin@123

Change these before real use.

## OTP development mode
If MAIL_USER and MAIL_PASS are empty, the OTP is printed in the terminal. This is only for classroom/demo use.

## Important
This is a teaching project. For production, add CSRF protection, stronger validation, rate limiting, secure cookies, HTTPS, proper authorization roles, safe delete methods, and robust error handling.
