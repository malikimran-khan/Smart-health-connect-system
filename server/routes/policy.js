const express = require('express');
const router = express.Router();
const PrivacyPolicy = require('../models/PrivacyPolicy');

// GET policy (only the latest one)
router.get('/', async (req, res) => {
  try {
    const existingPolicy = await PrivacyPolicy.findOne().sort({ createdAt: -1 });
    res.json(existingPolicy || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch policy' });
  }
});

// POST (Insert or Replace)
router.post('/', async (req, res) => {
  const { policy } = req.body;
  if (!policy || !policy.trim()) {
    return res.status(400).json({ error: 'Policy text is required.' });
  }

  try {
    await PrivacyPolicy.deleteMany(); // Remove all existing
    const newPolicy = new PrivacyPolicy({ policy });
    await newPolicy.save();
    res.json({ message: 'Policy saved successfully.', policy: newPolicy });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save policy' });
  }
});

module.exports = router;
