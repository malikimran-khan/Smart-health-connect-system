// backend/models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    countryCode: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String }, // store image path or URL
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
