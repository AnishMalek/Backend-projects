const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect, checkUser } = require("../middleware/authMiddleware");

// Public/General Product routes (checkUser attaches res.locals.user if logged in)
router.get("/products", checkUser, productController.getAllProducts);

// Protected Product routes (Authentication required)
router.get("/products/my", protect, productController.getMyProducts);
router.get("/products/new", protect, productController.renderProductForm);
router.post("/products", protect, productController.createProduct);

router.get("/products/edit/:id", protect, productController.renderEditForm);
router.post("/products/edit/:id", protect, productController.updateProduct);
router.post("/products/delete/:id", protect, productController.deleteProduct);

module.exports = router;
