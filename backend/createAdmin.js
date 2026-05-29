require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admins");

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio")
  .then(async () => {
    console.log("Connected to MongoDB");
    await Admin.deleteMany({});
    const hash = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@portfolio.com", password: hash });
    console.log("✅ Admin created successfully");
    console.log("Email: admin@portfolio.com");
    console.log("Password: admin123");
    process.exit();
  })
  .catch(err => {
    console.log("MongoDB error:", err);
    process.exit();
  });