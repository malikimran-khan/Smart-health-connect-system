const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  hospitalAffiliation: { type: String },
  bio: { type: String, required: true },
    profileImage: { type: String },  // <-- new field here

  documents: {
    degreeCertificate: { type: String, required: true },
    licenseDocument: { type: String, required: true },
    idProof: { type: String, required: true }
  }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
