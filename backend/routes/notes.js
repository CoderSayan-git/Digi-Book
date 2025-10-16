const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { requireAuth } = require('../middleware/auth');

// All routes require authentication
router.use(requireAuth);

// @route   GET /api/notes
// @desc    Get all notes for logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.session.userId })
      .sort({ updatedAt: -1 })
      .select('-__v');

    res.json(notes);
  } catch (error) {
    console.error('Fetch notes error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Fetch note error:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// @route   POST /api/notes
// @desc    Create new note
// @access  Private
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNote = await Note.create({
      user: req.session.userId,
      title,
      content
    });

    res.status(201).json({
      success: true,
      note: newNote
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update note
// @access  Private
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      {
        title,
        content,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({
      success: true,
      note: updatedNote
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
