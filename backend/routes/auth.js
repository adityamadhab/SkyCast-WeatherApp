const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const auth = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update user profile
router.patch('/profile', auth, async (req, res) => {
  try {
    const user = await authService.updateUserProfile(req.userId, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;