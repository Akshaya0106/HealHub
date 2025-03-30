const express = require('express');
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Import authentication middleware
const { login,register } = require('../controllers/authController');

const router = express.Router();

// 🟢 Register User
router.post('/register', register);

// 🟢 Login User
router.post('/login', login);

// 🟢 Get Profile (Protected Route)
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Profile Fetch Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get("/:userId/chats", async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("chats");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user.chats);
    } catch (error) {
      console.error("Error fetching user chats:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
