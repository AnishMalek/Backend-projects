const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

exports.list = async (req, res) => {
  const subcategories = await Subcategory.find()
    .populate("categoryId")
    .sort({ createdAt: -1 });

  res.render("admin/subcategories/list", {
    title: "Subcategories",
    subcategories
  });
};

exports.showAdd = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.render("admin/subcategories/form", {
    title: "Add Subcategory",
    subcategory: null,
    categories
  });
};

exports.create = async (req, res) => {
  try {
    await Subcategory.create(req.body);
    req.flash("success", "Subcategory created successfully.");
  } catch (error) {
    req.flash("error", "Unable to create subcategory.");
  }
  res.redirect("/admin/subcategories");
};

exports.showEdit = async (req, res) => {
  const [subcategory, categories] = await Promise.all([
    Subcategory.findById(req.params.id),
    Category.find().sort({ name: 1 })
  ]);

  if (!subcategory) return res.redirect("/admin/subcategories");

  res.render("admin/subcategories/form", {
    title: "Edit Subcategory",
    subcategory,
    categories
  });
};

exports.update = async (req, res) => {
  try {
    await Subcategory.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    req.flash("success", "Subcategory updated successfully.");
  } catch (error) {
    req.flash("error", "Unable to update subcategory.");
  }
  res.redirect("/admin/subcategories");
};

exports.delete = async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    req.flash("success", "Subcategory deleted successfully.");
  } catch (error) {
    req.flash("error", "Unable to delete subcategory.");
  }
  res.redirect("/admin/subcategories");
};