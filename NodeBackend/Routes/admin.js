const express = require('express');
const router = express.Router();
const AdminMessage = require('../models/AdminMessage');
const User = require('../models/User');

// GET /api/admin/users-by-role
router.get('/users-by-role', async (req, res) => {
  try {
    const { role } = req.query;
    
    if (!role) {
      return res.status(400).json({ message: 'Role parameter is required' });
    }

    const users = await User.find({ role })
      .select('email roleId role createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const formattedUsers = users.map(user => ({
      id: user._id,
      email: user.email,
      roleId: user.roleId,
      role: user.role,
      createdAt: user.createdAt
    }));

    res.status(200).json({
      users: formattedUsers,
      count: formattedUsers.length
    });

  } catch (err) {
    console.error('Error fetching users by role:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/send-message
router.post('/send-message', async (req, res) => {
  try {
    const { subject, message, roles, targetUsers } = req.body;

    if (!subject || !message || !roles || !roles.length) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new AdminMessage({
      subject,
      message,
      roles,
      targetUsers: targetUsers || [], // If no specific users, message goes to all in roles
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
      const { role, userId } = req.query;
      console.log('Role from query:', role);
      console.log('User ID from query:', userId);

      let filter = {};
      if (role) {
        filter = { roles: role };
      }
      
      // If userId is provided, also check if this user is in targetUsers
      if (userId) {
        filter.$or = [
          { targetUsers: { $size: 0 } }, // Messages sent to all users in role
          { targetUsers: userId } // Messages specifically sent to this user
        ];
      }
      
      console.log('MongoDB filter:', filter);

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
