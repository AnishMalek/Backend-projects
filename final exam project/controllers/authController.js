const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Render Registration Page
const getRegister = (req, res) => {
  const error = req.query.error || null;
  res.render("register", { error });
};

// Handle User Registration
const postRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Basic Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.render("register", { error: "Please fill in all fields." });
    }

    if (password !== confirmPassword) {
      return res.render("register", { error: "Passwords do not match." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.render("register", { error: "Email is already registered." });
    }

    // Create new user (password is hashed automatically in User model pre-save hook)
    await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role: "user"
    });

    res.redirect("/login?success=" + encodeURIComponent("Registration successful! Please login."));
  } catch (error) {
    console.error("Register Error:", error);
    res.render("register", { error: "Something went wrong. Please try again." });
  }
};

// Render Login Page
const getLogin = (req, res) => {
  const error = req.query.error || null;
  const success = req.query.success || null;
  res.render("login", { error, success });
};

// Handle User Login
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", { error: "Please provide email and password.", success: null });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.render("login", { error: "Invalid email or password.", success: null });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password.", success: null });
    }

    // Create JWT token containing user details
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.redirect("/products");
  } catch (error) {
    console.error("Login Error:", error);
    res.render("login", { error: "Login failed. Please try again.", success: null });
  }
};

// Handle User Logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout
}; 
