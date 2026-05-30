const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    issuer: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    credentialId: {
      type: String,
      default: "",
    },

    verifyUrl: {
      type: String,
      default: "",
    },

    issueDate: {
      type: Date,
    },

    document: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Certificate",
  CertificateSchema
);