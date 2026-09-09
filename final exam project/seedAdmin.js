require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Category = require("./models/Category");

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Check and seed default categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany([
        { name: "Electronics", description: "Gadgets, devices, and accessories" },
        { name: "Clothing", description: "Apparel, footwear, and fashion items" },
        { name: "Books", description: "Printed books, novels, and textbooks" },
        { name: "Home & Kitchen", description: "Appliances, decor, and kitchenware" }
      ]);
      console.log("✅ Default categories (Electronics, Clothing, Books, Home & Kitchen) seeded successfully!");
    } else {
      console.log(`Categories already exist (${categoryCount} found).`);
    }

    const adminEmail = "admin@example.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`Admin user already exists with email: ${adminEmail}`);
      process.exit(0);
    }

    // Create Admin User
    const admin = new User({
      username: "AdminUser",
      email: adminEmail,
      password: "admin123", // Will be hashed automatically by User model pre-save hook
      role: "admin"
    });

    await admin.save();

    console.log("-----------------------------------------");
    console.log("✅ Admin user setup complete!");
    console.log(`Email: ${adminEmail}`);
    console.log("Password: admin123");
    console.log("Role: admin");
    console.log("-----------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user/categories:", error.message);
    process.exit(1);
  }
};

seedAdmin();
