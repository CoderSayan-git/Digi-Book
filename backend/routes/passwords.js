const express = require('express');
const router = express.Router();
const Password = require('../models/Password');
const { requireAuth } = require('../middleware/auth');

// All routes require authentication
router.use(requireAuth);

// @route   GET /api/passwords
// @desc    Get all passwords for logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.session.userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(passwords);
  } catch (error) {
    console.error('Fetch passwords error:', error);
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
});

// @route   GET /api/passwords/:id
// @desc    Get single password by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const password = await Password.findOne({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }

    res.json(password);
  } catch (error) {
    console.error('Fetch password error:', error);
    res.status(500).json({ error: 'Failed to fetch password' });
  }
});

// @route   POST /api/passwords
// @desc    Create new password
// @access  Private
router.post('/', async (req, res) => {
  const { title, password, description } = req.body;

  try {
    // Validation
    if (!title || !password) {
      return res.status(400).json({ error: 'Title and password are required' });
    }

    const newPassword = await Password.create({
      user: req.session.userId,
      title,
      password,
      description: description || ''
    });

    res.status(201).json({
      success: true,
      password: newPassword
    });
  } catch (error) {
    console.error('Create password error:', error);
    res.status(500).json({ error: 'Failed to create password' });
  }
});

// @route   PUT /api/passwords/:id
// @desc    Update password
// @access  Private
router.put('/:id', async (req, res) => {
  const { title, password, description } = req.body;

  try {
    // Validation
    if (!title || !password) {
      return res.status(400).json({ error: 'Title and password are required' });
    }

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      {
        title,
        password,
        description: description || '',
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ error: 'Password not found' });
    }

    res.json({
      success: true,
      password: updatedPassword
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// @route   DELETE /api/passwords/:id
// @desc    Delete password
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const password = await Password.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }

    res.json({
      success: true,
      message: 'Password deleted successfully'
    });
  } catch (error) {
    console.error('Delete password error:', error);
    res.status(500).json({ error: 'Failed to delete password' });
  }
});

module.exports = router;
