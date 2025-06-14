const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user with plain password (not secure)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If we get here, user exists and password matches
    // Return user data including role
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Signup route
router.post('/signup', async (req, res) => {

    const { email, password, role } = req.body;
    console.log(email, password, role);
  
    // Basic validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }
  
      // Create new user (password in plain text - not secure)
      const newUser = new User({ email, password, role });
      await newUser.save();
  
      res.status(201).json({ message: 'Signup successful', user: { email, role } });
    } catch (err) {
      console.error('Signup error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
