const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEND OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    // Generate 6 digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetToken = otp;
    user.resetExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset OTP",
      html: `
        <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:30px;background:#0f172a;color:white;border-radius:16px;">
          <h2 style="color:#4ade80;">Password Reset OTP</h2>
          <p style="color:#94a3b8;">Use this OTP to reset your admin password.</p>
          <div style="font-size:48px;font-weight:900;color:#4ade80;letter-spacing:12px;text-align:center;padding:20px 0;">
            ${otp}
          </div>
          <p style="color:#94a3b8;font-size:12px;">Expires in 10 minutes. Do not share this with anyone.</p>
        </div>
      `,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// VERIFY OTP + RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      email,
      resetToken: otp,
      resetExpiry: { $gt: new Date() },
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetExpiry = undefined;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;