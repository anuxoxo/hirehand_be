const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  jobId: String,
  resumeLink: String,
  name: String,
  position: String,
  picture: String
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;