const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true
  },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: "" },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);