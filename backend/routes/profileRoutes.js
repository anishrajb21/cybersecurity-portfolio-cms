const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getProfile, updateProfile } = require("../controllers/profileController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", getProfile);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
