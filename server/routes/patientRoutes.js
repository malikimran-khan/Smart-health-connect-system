const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const generatePatientToken = require('../utils/generateToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const UPLOADS_DIR = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// @route   POST /api/patients/register
router.post('/register', upload.single('profileImage'), async (req, res) => {
  const { firstName, lastName, email, password, phone, countryCode } = req.body;

  try {
    const patientExists = await Patient.findOne({ email });
    if (patientExists) return res.status(400).json({ message: 'Patient already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      countryCode,
      profileImage: req.file?.filename || ''
    });

    const token = generatePatientToken(patient._id);

    res.status(201).json({
      message: 'Patient registered successfully',
      patientId: patient._id,
      patientToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (!existingPatient)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingPatient.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = generatePatientToken(existingPatient._id); // use your existing util

    res.json({
      message: "Login successful",
      token,
      userId: existingPatient._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/all', async (req, res) => {
  try {
    const patients = await Patient.find().select('-password');
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get patient by ID
router.get('/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId).select('-password'); // exclude password field

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
const mongoose = require('mongoose');

router.get('/patients/:id', async (req, res) => {
  console.log('API hit');
  console.log('Requested ID:', req.params.id);
  try {
    const objectId = new mongoose.Types.ObjectId(req.params.id); // force ObjectId
    const patient = await Patient.findOne({ _id: objectId }).select('-password');
    if (!patient) {
      console.log('Patient not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Patient not found' });
    }
    console.log('Patient found:', patient._id);
    // Return only what frontend needs
    res.json({
      patientId: patient._id,
      patientName: `${patient.firstName} ${patient.lastName}`,
       profileImage: patient.profileImage || null
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
