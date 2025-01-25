const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add User
router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({ email });
    await user.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
