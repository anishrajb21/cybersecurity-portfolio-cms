const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: "" },

  title: {
    type: String,
    default: "",
  },

  tagline: {
    type: String,
    default:
      "",
  },

  about: { type: String, default: "" },

  image: { type: String, default: "" },

  resumeUrl: { type: String, default: "" },

  siteTitle: {
    type: String,
    default: "AR",
  },

  contacts: [
    {
      type: { type: String },
      value: { type: String },
    },
  ],

  stats: [
    {
      label: { type: String },
      value: { type: String },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);