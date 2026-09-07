const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

async function seedAdmin() {
  try {
    const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
    const existing = await Admin.findOne({ email });

    if (!existing) {
      const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@123", 10);
      await Admin.create({
        name: process.env.ADMIN_NAME || "Super Admin",
        email,
        password
      });
      console.log(`Seed admin created: ${email}`);
    }
  } catch (error) {
    console.error("Admin seed error:", error.message);
  }
}

module.exports = { seedAdmin };