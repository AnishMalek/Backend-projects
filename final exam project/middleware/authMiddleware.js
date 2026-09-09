const jwt = require("jsonwebtoken");

// Middleware to protect routes that require authentication
const protect = (req, res, next) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.redirect("/login?error=" + encodeURIComponent("Please log in first."));
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded; // Make user available in all EJS templates
    next();
  } catch (error) {
    // Clear invalid token cookie and redirect to login
    res.clearCookie("token");
    return res.redirect("/login?error=" + encodeURIComponent("Session expired. Please log in again."));
  }
};

// Middleware to check logged in user for public routes (doesn't block request)
const checkUser = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      res.locals.user = decoded;
    } catch (error) {
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};

module.exports = { protect, checkUser };
