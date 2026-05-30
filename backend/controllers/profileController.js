const Profile = require("../models/Profile");
const path = require("path");
const fs = require("fs");

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    // Text fields
    const fields = ["name", "title", "tagline", "about", "siteTitle"];
    fields.forEach(f => {
      if (req.body[f] !== undefined) profile[f] = req.body[f];
    });

    // JSON fields (contacts, stats) sent as JSON strings from FormData
    if (req.body.contacts) {
      try { profile.contacts = JSON.parse(req.body.contacts); } catch {}
    }
    if (req.body.stats) {
      try { profile.stats = JSON.parse(req.body.stats); } catch {}
    }

    // Resume: uploaded file takes priority over URL
    if (req.files?.resume) {
      profile.resumeUrl = "/uploads/" + req.files.resume[0].filename;
    } else if (req.body.resumeUrl !== undefined) {
      profile.resumeUrl = req.body.resumeUrl;
    }

    // Profile image
    if (req.files?.image) {
      profile.image = "/uploads/" + req.files.image[0].filename;
    } else if (req.body.removeImage === "true") {
      profile.image = "";
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };
