require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admins");

const EMAIL = "anishrajb21@gmail.com";
const PASSWORD = "YourStrongPassword@2025"; // change this

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Admin.deleteMany({});
    const hash = await bcrypt.hash(PASSWORD, 12); // 12 rounds = stronger
    await Admin.create({ email: EMAIL, password: hash });
    console.log("✅ Admin seeded");
    console.log("Email:", EMAIL);
    console.log("Password:", PASSWORD);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });