# Node.js Blog Management System

## Features

- Separate Header and Footer
- EJS Layout/Partials
- Static CSS and JavaScript
- Signup
- Sign In
- Cookie-based authentication
- Protected Dashboard
- Protected Blog List
- Add Blog
- Edit Blog
- Delete Blog
- Logout
- JSON file storage

## Setup

1. Open terminal in this project folder.
2. Run:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open:

http://localhost:3000/signup

## Flow

Signup -> Sign In -> Cookie -> Dashboard -> Blog CRUD -> Logout

## Important

This is a learning project. Passwords are stored as plain text in JSON for simplicity. In a production application, use password hashing such as bcrypt and a proper session/authentication system.
