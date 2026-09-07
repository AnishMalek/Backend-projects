const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.get("/login", auth.showLogin);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/forgot-password", auth.showForgotPassword);
router.post("/forgot-password", auth.sendOTP);

router.get("/verify-otp", auth.showVerifyOTP);
router.post("/verify-otp", auth.verifyOTP);

router.get("/reset-password", auth.showResetPassword);
router.post("/reset-password", auth.resetPassword);

module.exports = router;