const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Profile = require("../models/Profile");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    res.json(await Profile.findOne() || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", upload.fields([{ name: "image" }, { name: "resume" }]), async (req, res) => {
  try {
    const data = {};
    if (req.body.name !== undefined) data.name = req.body.name;
    if (req.body.about !== undefined) data.about = req.body.about;
    if (req.body.siteTitle !== undefined) data.siteTitle = req.body.siteTitle;
    if (req.body.resumeUrl !== undefined) data.resumeUrl = req.body.resumeUrl;
    if (req.body.contacts) data.contacts = JSON.parse(req.body.contacts);
    if (req.body.stats) data.stats = JSON.parse(req.body.stats);
    if (req.files?.image) data.image = `/uploads/${req.files.image[0].filename}`;
    if (req.files?.resume) data.resumeUrl = `/uploads/${req.files.resume[0].filename}`;
    if (req.body.removeImage === "true") data.image = "";

    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, data, { new: true });
    } else {
      profile = await Profile.create(data);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;