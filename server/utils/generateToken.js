// backend/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generatePatientToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generatePatientToken;
