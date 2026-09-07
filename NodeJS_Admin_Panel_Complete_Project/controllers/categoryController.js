const Category = require("../models/Category");

exports.list = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.render("admin/categories/list", { title: "Categories", categories });
};

exports.showAdd = (req, res) => {
  res.render("admin/categories/form", { title: "Add Category", category: null });
};

exports.create = async (req, res) => {
  try {
    await Category.create(req.body);
    req.flash("success", "Category created successfully.");
  } catch (error) {
    req.flash("error", error.code === 11000 ? "Category already exists." : "Unable to create category.");
  }
  res.redirect("/admin/categories");
};

exports.showEdit = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.redirect("/admin/categories");
  res.render("admin/categories/form", { title: "Edit Category", category });
};

exports.update = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    req.flash("success", "Category updated successfully.");
  } catch (error) {
    req.flash("error", "Unable to update category.");
  }
  res.redirect("/admin/categories");
};

exports.delete = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    req.flash("success", "Category deleted successfully.");
  } catch (error) {
    req.flash("error", "Unable to delete category.");
  }
  res.redirect("/admin/categories");
};