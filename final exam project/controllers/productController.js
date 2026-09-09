const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

// Display all products with optional category filter
const getAllProducts = async (req, res) => {
  try {
    const selectedCategory = req.query.category || "";
    let filter = {};

    if (selectedCategory) {
      filter.category = selectedCategory;
    }

    // Populate createdBy and category references
    const products = await Product.find(filter)
      .populate("createdBy", "username email")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    const categories = await Category.find().sort({ name: 1 });

    res.render("productList", {
      products,
      categories,
      selectedCategory
    });
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).send("Error loading products.");
  }
};

// Display products created by logged-in user
const getMyProducts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const products = await Product.find({ createdBy: userId })
      .populate("category", "name")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 });

    res.render("myProducts", { products });
  } catch (error) {
    console.error("Get My Products Error:", error);
    res.status(500).send("Error loading your products.");
  }
};

// Render form to add a new product
const renderProductForm = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.render("productForm", {
      product: null,
      categories,
      error: null
    });
  } catch (error) {
    console.error("Render Product Form Error:", error);
    res.status(500).send("Error loading product form.");
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const userId = req.user.userId;

    if (!name || !price || !category) {
      const categories = await Category.find().sort({ name: 1 });
      return res.render("productForm", {
        product: null,
        categories,
        error: "Please fill in all required fields (Name, Price, Category)."
      });
    }

    // Create the product
    const product = await Product.create({
      name,
      description: description || "",
      price: Number(price),
      category,
      createdBy: userId
    });

    // Add reference to User's products array
    await User.findByIdAndUpdate(userId, {
      $push: { products: product._id }
    });

    res.redirect("/products/my");
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).send("Error creating product.");
  }
};

// Render form to edit an existing product
const renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // Check ownership or admin status
    const isOwner = product.createdBy.toString() === req.user.userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).send("Unauthorized: You can only edit your own products.");
    }

    const categories = await Category.find().sort({ name: 1 });

    res.render("productForm", {
      product,
      categories,
      error: null
    });
  } catch (error) {
    console.error("Render Edit Form Error:", error);
    res.status(500).send("Error loading edit form.");
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // Check ownership or admin status
    const isOwner = product.createdBy.toString() === req.user.userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).send("Unauthorized: You can only edit your own products.");
    }

    product.name = name;
    product.description = description || "";
    product.price = Number(price);
    product.category = category;

    await product.save();

    res.redirect("/products/my");
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).send("Error updating product.");
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // Check ownership or admin status
    const isOwner = product.createdBy.toString() === req.user.userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).send("Unauthorized: You can only delete your own products.");
    }

    // Delete product from database
    await Product.findByIdAndDelete(id);

    // Remove reference from User's products array
    await User.findByIdAndUpdate(product.createdBy, {
      $pull: { products: id }
    });

    res.redirect("/products/my");
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).send("Error deleting product.");
  }
};

module.exports = {
  getAllProducts,
  getMyProducts,
  renderProductForm,
  createProduct,
  renderEditForm,
  updateProduct,
  deleteProduct
};
