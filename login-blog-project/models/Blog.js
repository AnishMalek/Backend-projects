const mongoose = require("mongoose");

// Blog Schema
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        // Aa blog kaya user e create karyo te store thay chhe
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

// Blog Model
module.exports = mongoose.model("Blog", blogSchema);
