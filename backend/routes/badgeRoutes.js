const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Badge = require("../models/Badge");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    ),
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const badges = await Badge.find().sort({
      createdAt: -1,
    });

    res.json(badges);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (req.files?.image) {
        data.image =
          "/uploads/" +
          req.files.image[0].filename;
      }

      if (req.files?.document) {
        data.document =
          "/uploads/" +
          req.files.document[0].filename;
      }

      res.json(
        await Badge.create(data)
      );
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = { ...req.body };

      if (req.files?.image) {
        data.image =
          "/uploads/" +
          req.files.image[0].filename;
      }

      if (req.files?.document) {
        data.document =
          "/uploads/" +
          req.files.document[0].filename;
      }

      res.json(
        await Badge.findByIdAndUpdate(
          req.params.id,
          data,
          { new: true }
        )
      );
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    await Badge.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;