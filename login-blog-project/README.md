# LOGIN SYSTEM WITH BLOG PROJECT

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Passport.js
- Passport-Local
- Express-Session
- bcrypt

## Features
- User Signup
- Password Hashing
- User Login
- Passport Local Authentication
- Express Session
- serializeUser()
- deserializeUser()
- req.user
- req.isAuthenticated()
- Restricted Middleware
- Add Blog
- Edit Blog
- Delete Blog
- Blog Ownership Check
- Logout

## Requirements
1. Node.js installed
2. MongoDB running locally

## Installation

Open terminal inside this project folder:

```bash
npm install
```

## Run

```bash
node app.js
```

Then open:

http://localhost:3000/signup

## Important Flow

Signup
-> MongoDB
-> Login
-> Passport Local Strategy
-> bcrypt password check
-> serializeUser()
-> Express Session
-> deserializeUser()
-> req.user
-> isAuthenticated()
-> Add/Edit/Delete Blog
-> Logout
