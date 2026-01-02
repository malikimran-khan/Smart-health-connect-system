const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Send message
router.post('/send', async (req, res) => {
  const { senderId, senderModel, receiverId, receiverModel, message } = req.body;

  try {
    const newMsg = new Message({
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      message
    });
    await newMsg.save();
    res.json(newMsg);
  } catch (err) {
    res.status(500).json({ message: 'Message send failed', error: err.message });
  }
});

// Get messages between two users
router.get('/conversation/:user1Id/:user2Id', async (req, res) => {
  const { user1Id, user2Id } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});
router.get('/received/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    const messages = await Message.find({
      receiverId: doctorId,
      receiverModel: 'Doctor',
      senderModel: 'Patient'
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});

module.exports = router;