const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: "" },
  password: { type: String, required: true },
  resetOTP: { type: String, default: null },
  resetOTPExpires: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);