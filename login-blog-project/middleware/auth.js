// Restricted / Authentication Middleware
// Login vagar protected pages access na kari shakay.

function isAuthenticated(req, res, next) {
    // Passport ni built-in function
    // TRUE = user logged in
    // FALSE = user logged in nathi
    if (req.isAuthenticated()) {
        return next();
    }

    // Login page par redirect
    res.redirect("/login");
}

module.exports = isAuthenticated;
