require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const User = require("./models/User");
const Job = require("./models/Job");
const Resume = require("./models/Resume");

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors({
  origin: "*",
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI)
  .then(() => { app.listen(PORT, console.log("Server connected to localhost ", PORT)) })
  .catch(err => console.log(err.message))

app.get('/', (req, res) => {
  res.send("Server running successfully...")
})

// User API Endpoints

app.post('/user/create', async (req, res) => {
  const { name, picture, googleId } = req.body
  try {
    const newUser = await User.create({ name, picture, googleId });
    return res.status(201).json({
      success: true,
      user: newUser,
      message: "Registration Successful"
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
})

app.patch('/user/update', async (req, res) => {
  const data = req.body
  try {
    const updatedUser = await User.findOneAndUpdate({ googleId: data.googleId },
      { $set: { ...data } },
      { new: true })

    return res.status(201).json({
      success: true,
      user: updatedUser,
      message: "User data updated successfully!"
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
})

// Job
app.post('/job/create', async (req, res) => {
  const { userGoogleId, companyName, position } = req.body
  try {
    const newJob = await Job.create({ userGoogleId, companyName, position });
    return res.status(201).json({
      success: true,
      job: newJob,
      message: "Job Added!"
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
})

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({})
    return res.status(201).json({
      success: true,
      jobs,
      message: "All Jobs Listed Successfully!"
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
})

// Resumes
app.post('/resume/add', async (req, res) => {
  const data = req.body
  try {
    const newJob = await Resume.create(data);
    return res.status(201).json({
      success: true,
      job: newJob,
      message: "Resume Sent!"
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
})

app.get('/resumes/:userGoogleId', async (req, res) => {
  const { userGoogleId } = req.params;

  try {
    const jobs = await Job.find({ userGoogleId })
    return res.status(201).json({
      success: true,
      jobs,
      message: "Resumes Found Successfully!"
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      error: err.message
    });
  }
})