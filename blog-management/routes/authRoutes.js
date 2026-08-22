const express = require("express");
const router = express.Router();

const {
    signupPage,
    signup,
    signinPage,
    signin,
    logout
} = require("../controllers/authController");

router.get("/signup", signupPage);
router.post("/signup", signup);

router.get("/signin", signinPage);
router.post("/signin", signin);

router.get("/logout", logout);

module.exports = router;