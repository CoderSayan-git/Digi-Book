const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Password strength validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase) {
      return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
    }
    if (!hasLowercase) {
      return res.status(400).json({ error: 'Password must contain at least one lowercase letter' });
    }
    if (!hasDigit) {
      return res.status(400).json({ error: 'Password must contain at least one digit' });
    }
    if (!hasSymbol) {
      return res.status(400).json({ error: 'Password must contain at least one symbol (!@#$%^&*...)' });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.status(201).json({
      success: true,
      username: user.username,
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide username and password' });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set session
    req.session.userId = user._id;
    req.session.username = user.username;
    
    // Save session before responding
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Login failed - Session error' });
      }
      
      res.json({
        success: true,
        username: user.username,
        userId: user._id,
        sessionId: req.session.id
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// @route   GET /api/auth/status
// @desc    Check authentication status
// @access  Public
router.get('/status', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      authenticated: true,
      username: req.session.username,
      userId: req.session.userId
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
