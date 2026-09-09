const Category = require("../models/Category");

// Get and display all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const error = req.query.error || null;
    const success = req.query.success || null;
    res.render("categoryList", { categories, error, success });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).send("Error loading categories.");
  }
};

// Create a new category (Admin Only)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
      return res.redirect("/categories?error=" + encodeURIComponent("Category name is required."));
    }

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.redirect("/categories?error=" + encodeURIComponent("Category already exists."));
    }

    await Category.create({
      name: name.trim(),
      description: description ? description.trim() : ""
    });

    res.redirect("/categories?success=" + encodeURIComponent("Category added successfully!"));
  } catch (error) {
    console.error("Create Category Error:", error);
    res.redirect("/categories?error=" + encodeURIComponent("Failed to create category."));
  }
};

// Update an existing category (Admin Only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
      return res.redirect("/categories?error=" + encodeURIComponent("Category name cannot be empty."));
    }

    await Category.findByIdAndUpdate(id, {
      name: name.trim(),
      description: description ? description.trim() : ""
    });

    res.redirect("/categories?success=" + encodeURIComponent("Category updated successfully!"));
  } catch (error) {
    console.error("Update Category Error:", error);
    res.redirect("/categories?error=" + encodeURIComponent("Failed to update category."));
  }
};

// Delete a category (Admin Only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.redirect("/categories?success=" + encodeURIComponent("Category deleted successfully!"));
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.redirect("/categories?error=" + encodeURIComponent("Failed to delete category."));
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
