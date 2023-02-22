const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userGoogleId: String,
  companyName: String,
  position: String
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;