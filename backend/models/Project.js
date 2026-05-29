const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);