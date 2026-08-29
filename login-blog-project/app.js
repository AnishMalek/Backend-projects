const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const app = express();

// Set EJS as template engine
app.set("view engine", "ejs");

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static("public"));

// Connect MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/login_blog")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Create Express session
app.use(
    session({
        secret: "mySecretKey",
        resave: false,
        saveUninitialized: false
    })
);

// Initialize Passport
app.use(passport.initialize());

// Connect Passport with Express Session
app.use(passport.session());

// Load Passport Local Strategy configuration
require("./config/passport");

// Routes
app.use("/", authRoutes);
app.use("/", blogRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
