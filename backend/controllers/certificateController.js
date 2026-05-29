const Certificate = require("../models/Certificate");

const addCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();

    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);

    res.json({
      message: "Certificate deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCertificate,
  getCertificates,
  deleteCertificate,
};