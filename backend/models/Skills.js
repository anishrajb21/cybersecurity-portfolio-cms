const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model("Skill", SkillSchema);