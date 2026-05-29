const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Certificate = require("../models/Certificate");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    res.json(await Certificate.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    res.json(await Certificate.create(data));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    res.json(await Certificate.findByIdAndUpdate(req.params.id, data, { new: true }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;