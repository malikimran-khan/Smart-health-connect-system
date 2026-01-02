const mongoose = require('mongoose');

const PrivacyPolicySchema = new mongoose.Schema({
  policy: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('PrivacyPolicy', PrivacyPolicySchema);
