const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,

      description: req.body.description,

      github: req.body.github,

      image: req.file
        ? `http://localhost:5000/uploads/${req.file.filename}`
        : "",
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProjects,
  addProject,
  deleteProject,
};