const mongoose = require('mongoose');

const SecurityPolicySchema = new mongoose.Schema({
  policy: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('SecurityPolicy', SecurityPolicySchema);
