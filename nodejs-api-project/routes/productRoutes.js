const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// GET all + CREATE
router.route("/")
  .get(getProducts)
  .post(createProduct);

// GET single + UPDATE + DELETE
router.route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;