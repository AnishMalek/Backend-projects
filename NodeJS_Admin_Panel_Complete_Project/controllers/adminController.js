const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/Product");

exports.dashboard = async (req, res) => {
  const [categories, subcategories, products] = await Promise.all([
    Category.countDocuments(),
    Subcategory.countDocuments(),
    Product.countDocuments()
  ]);

  res.render("admin/dashboard", {
    title: "Dashboard",
    stats: { categories, subcategories, products }
  });
};

exports.profile = async (req, res) => {
  const admin = await Admin.findById(req.session.admin.id).select("-password -resetOTP -resetOTPExpires");
  res.render("admin/profile", { title: "My Profile", profile: admin });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const emailLower = email.toLowerCase();

    const duplicate = await Admin.findOne({
      email: emailLower,
      _id: { $ne: req.session.admin.id }
    });

    if (duplicate) {
      req.flash("error", "Email is already in use.");
      return res.redirect("/admin/profile");
    }

    const admin = await Admin.findByIdAndUpdate(
      req.session.admin.id,
      { name, email: emailLower, phone },
      { new: true, runValidators: true }
    );

    req.session.admin.name = admin.name;
    req.session.admin.email = admin.email;

    req.flash("success", "Profile updated successfully.");
    res.redirect("/admin/profile");
  } catch (error) {
    req.flash("error", "Unable to update profile.");
    res.redirect("/admin/profile");
  }
};

exports.showChangePassword = (req, res) => {
  res.render("admin/change-password", { title: "Change Password" });
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const admin = await Admin.findById(req.session.admin.id);

    if (!(await bcrypt.compare(oldPassword, admin.password))) {
      req.flash("error", "Old password is incorrect.");
      return res.redirect("/admin/change-password");
    }

    if (newPassword.length < 6) {
      req.flash("error", "New password must contain at least 6 characters.");
      return res.redirect("/admin/change-password");
    }

    if (newPassword !== confirmPassword) {
      req.flash("error", "New passwords do not match.");
      return res.redirect("/admin/change-password");
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    req.flash("success", "Password changed successfully.");
    res.redirect("/admin/profile");
  } catch (error) {
    req.flash("error", "Unable to change password.");
    res.redirect("/admin/change-password");
  }
};