// Middleware to restrict access to admin-only routes
const adminOnly = (req, res, next) => {
  // Ensure user is authenticated and has admin role
  if (req.user && req.user.role === "admin") {
    return next();
  }

  // Render or redirect simple unauthorized message
  return res.status(403).send("Access Denied: Admin privileges required.");
};

module.exports = { adminOnly };
