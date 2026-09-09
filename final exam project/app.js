require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const { checkUser } = require("./middleware/authMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// View Engine Setup (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Global user check for all templates
app.use(checkUser);

// Register Routes
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", categoryRoutes);

// Root route redirect to products
app.get("/", (req, res) => {
  res.redirect("/products");
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
