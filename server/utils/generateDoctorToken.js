const jwt = require('jsonwebtoken');

const generateDoctorToken = (id) => {
  return jwt.sign({ id, role: 'doctor' }, process.env.DOCTOR_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateDoctorToken;
