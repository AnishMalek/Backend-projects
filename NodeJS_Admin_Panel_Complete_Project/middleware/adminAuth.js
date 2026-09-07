module.exports = function adminAuth(req, res, next) {
  if (req.session.admin) {
    return next();
  }

  req.flash("error", "Please login as admin first.");
  return res.redirect("/login");
};