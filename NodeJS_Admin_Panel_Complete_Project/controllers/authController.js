const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const { sendOTP } = require("../utils/mailer");

exports.showLogin = (req, res) => {
  res.render("auth/login", { title: "Admin Login" });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }

    req.session.admin = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email
    };

    req.flash("success", "Login successful.");
    res.redirect("/admin/dashboard");
  } catch (error) {
    req.flash("error", "Login failed.");
    res.redirect("/login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
};

exports.showForgotPassword = (req, res) => {
  res.render("auth/forgot-password", { title: "Forgot Password" });
};

exports.sendOTP = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const admin = await Admin.findOne({ email });

    // Do not reveal whether an email exists in a production application.
    if (!admin) {
      req.flash("error", "If the email is registered, an OTP has been sent.");
      return res.redirect("/forgot-password");
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    admin.resetOTP = otp;
    admin.resetOTPExpires = new Date(Date.now() + 5 * 60 * 1000);
    await admin.save();

    await sendOTP(email, otp);

    req.session.resetEmail = email;
    req.flash("success", "OTP sent. It is valid for 5 minutes.");
    res.redirect("/verify-otp");
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to send OTP. Check mail configuration.");
    res.redirect("/forgot-password");
  }
};

exports.showVerifyOTP = (req, res) => {
  if (!req.session.resetEmail) return res.redirect("/forgot-password");
  res.render("auth/verify-otp", { title: "Verify OTP" });
};

exports.verifyOTP = async (req, res) => {
  try {
    const email = req.session.resetEmail;
    const { otp } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.resetOTP !== otp || !admin.resetOTPExpires || admin.resetOTPExpires < new Date()) {
      req.flash("error", "Invalid or expired OTP.");
      return res.redirect("/verify-otp");
    }

    req.session.otpVerified = true;
    req.flash("success", "OTP verified. Create your new password.");
    res.redirect("/reset-password");
  } catch (error) {
    req.flash("error", "OTP verification failed.");
    res.redirect("/verify-otp");
  }
};

exports.showResetPassword = (req, res) => {
  if (!req.session.resetEmail || !req.session.otpVerified) {
    return res.redirect("/forgot-password");
  }
  res.render("auth/reset-password", { title: "Reset Password" });
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password.length < 6) {
      req.flash("error", "Password must contain at least 6 characters.");
      return res.redirect("/reset-password");
    }

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match.");
      return res.redirect("/reset-password");
    }

    const admin = await Admin.findOne({ email: req.session.resetEmail });
    if (!admin) return res.redirect("/forgot-password");

    admin.password = await bcrypt.hash(password, 10);
    admin.resetOTP = null;
    admin.resetOTPExpires = null;
    await admin.save();

    delete req.session.resetEmail;
    delete req.session.otpVerified;

    req.flash("success", "Password reset successfully. Please login.");
    res.redirect("/login");
  } catch (error) {
    req.flash("error", "Unable to reset password.");
    res.redirect("/reset-password");
  }
};