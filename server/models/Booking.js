const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'  // assuming you have a Doctor model
  },
  doctorName: { type: String, required: true },

  appointmentDate: { type: String, required: true }, // or Date if you prefer
  appointmentTime: { type: String, required: true },

  paymentMethod: { type: String, required: true },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient'  // assuming you have a Patient model
  },
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientImage: { type: String }, // filename or URL

}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
