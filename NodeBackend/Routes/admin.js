const express = require('express');
const router = express.Router();
const AdminMessage = require('../models/AdminMessage');

// POST /api/admin/send-message
router.post('/send-message', async (req, res) => {
  try {
    const { subject, message, roles } = req.body;

    if (!subject || !message || !roles || !roles.length) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new AdminMessage({
      subject,
      message,
      roles,
      // sentBy: req.user._id, // If using auth middleware
    });

    await newMessage.save();

    res.status(201).json({
      message: 'Message sent & stored successfully',
      data: newMessage,
    });

  } catch (err) {
    console.error('Error saving admin message:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/getMessages', async (req, res) => {
    try {
      const { role } = req.query;
  
      let filter = {};
      if (role) {
        filter = { roles: role };
      }
  
      const messages = await AdminMessage.find(filter)
        .sort({ sentAt: -1 })
        .lean();
  
      const formatted = messages.map(msg => ({
        id: msg._id,
        subject: msg.subject,
        sent_at: msg.sentAt || msg.createdAt,
        content: msg.message,
      }));
  
      return res.status(200).json({ messages: formatted });
  
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ message: 'Server error while fetching messages' });
    }
  });

module.exports = router;
