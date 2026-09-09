const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, checkUser } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/roleMiddleware");

// View categories (Accessible by all, navbar shows logged in user if logged in)
router.get("/categories", checkUser, categoryController.getCategories);

// Admin-only Category actions
router.post("/categories", protect, adminOnly, categoryController.createCategory);
router.post("/categories/edit/:id", protect, adminOnly, categoryController.updateCategory);
router.post("/categories/delete/:id", protect, adminOnly, categoryController.deleteCategory);

module.exports = router;
