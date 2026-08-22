const authMiddleware = (req, res, next) => {
    const userId = req.cookies.userId;

    if (!userId) {
        return res.redirect("/signin");
    }

    next();
};

module.exports = authMiddleware;