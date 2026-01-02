const express = require('express');
const router = express.Router();
const SecurityPolicy = require('../models/SecurityPolicy');

// GET the existing security policy
router.get('/', async (req, res) => {
  try {
    const policy = await SecurityPolicy.findOne();
    res.json(policy || {});
  } catch (err) {
    res.status(500).json({ error: 'Error fetching security policy' });
  }
});

// POST (create/update) the security policy
router.post('/', async (req, res) => {
  const { policy } = req.body;
  try {
    let existing = await SecurityPolicy.findOne();
    if (existing) {
      existing.policy = policy;
      await existing.save();
    } else {
      await SecurityPolicy.create({ policy });
    }
    res.status(200).json({ message: 'Policy saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving policy' });
  }
});

module.exports = router;
