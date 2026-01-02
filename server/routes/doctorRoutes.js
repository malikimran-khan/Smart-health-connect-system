// backend/routes/doctorRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const UPLOADS_DIR = path.resolve(__dirname, "../uploads/doctors");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// Route: POST /api/doctors/register
router.post(
  "/register",
  upload.fields([
     { name: "profileImage", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "licenseDocument", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let {
        email,
        firstName,
        lastName,
        phone,
        password,
        specialty,
        licenseNumber,
        yearsOfExperience,
        hospitalAffiliation,
        bio,
      } = req.body;
           

// If phone is an array, take the first element
if (Array.isArray(phone)) {
  phone = phone[0];
}
      // Check if doctor already exists
      const existing = await Doctor.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new doctor record
      const newDoctor = new Doctor({
        email,
        firstName,
        lastName,
        phone,
        password: hashedPassword,
        specialty,
        licenseNumber,
        yearsOfExperience,
        hospitalAffiliation,
        bio,
        profileImage: req.files["profileImage"] ? req.files["profileImage"][0].filename : "",

        documents: {
          degreeCertificate: req.files["degreeCertificate"]
            ? req.files["degreeCertificate"][0].filename
            : "",
          licenseDocument: req.files["licenseDocument"]
            ? req.files["licenseDocument"][0].filename
            : "",
          idProof: req.files["idProof"] ? req.files["idProof"][0].filename : "",
        },
      });

      await newDoctor.save();

      // Generate JWT token
      const token = jwt.sign({ id: newDoctor._id }, "your_jwt_secret", {
        expiresIn: "7d",
      });

      res.status(201).json({
        message: "Doctor registered successfully",
        token,
        doctorId: newDoctor._id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ message: 'Doctor not found' });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id }, 'your_jwt_secret', { expiresIn: '7d' });

    res.json({ 
      message: 'Login successful',
      token,
      doctorId: doctor._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get("/all-doctor", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
});
module.exports = router;
