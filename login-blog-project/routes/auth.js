const express = require("express");
const router = express.Router();

const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

// Signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup form submit
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.send("Username already exists. Please choose another username.");
        }

        // Password ne hash karo
        const hashedPassword = await bcrypt.hash(password, 10);

        // New user create karo
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        // Signup pachi login page
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.status(500).send("Signup Error");
    }
});

// Login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Passport Local Authentication
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/blogs",
        failureRedirect: "/login"
    })
);

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        // Session authentication remove thay chhe
        res.redirect("/login");
    });
});

module.exports = router;
