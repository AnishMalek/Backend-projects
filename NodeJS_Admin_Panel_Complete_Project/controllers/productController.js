const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

async function getFormData() {
  const [categories, subcategories] = await Promise.all([
    Category.find().sort({ name: 1 }),
    Subcategory.find().populate("categoryId").sort({ name: 1 })
  ]);
  return { categories, subcategories };
}

exports.list = async (req, res) => {
  const products = await Product.find()
    .populate("categoryId")
    .populate("subcategoryId")
    .sort({ createdAt: -1 });

  res.render("admin/products/list", { title: "Products", products });
};

exports.showAdd = async (req, res) => {
  const { categories, subcategories } = await getFormData();
  res.render("admin/products/form", {
    title: "Add Product",
    product: null,
    categories,
    subcategories
  });
};

exports.create = async (req, res) => {
  try {
    await Product.create({
      name: req.body.name,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status
    });

    req.flash("success", "Product created successfully.");
  } catch (error) {
    req.flash("error", "Unable to create product.");
  }
  res.redirect("/admin/products");
};

exports.showEdit = async (req, res) => {
  const [product, formData] = await Promise.all([
    Product.findById(req.params.id),
    getFormData()
  ]);

  if (!product) return res.redirect("/admin/products");

  res.render("admin/products/form", {
    title: "Edit Product",
    product,
    categories: formData.categories,
    subcategories: formData.subcategories
  });
};

exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      price: req.body.price,
      description: req.body.description,
      status: req.body.status
    }, { runValidators: true });

    req.flash("success", "Product updated successfully.");
  } catch (error) {
    req.flash("error", "Unable to update product.");
  }
  res.redirect("/admin/products");
};

exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted successfully.");
  } catch (error) {
    req.flash("error", "Unable to delete product.");
  }
  res.redirect("/admin/products");
};