const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  db.get('SELECT id, username, email, createdAt FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });
});

// Get current user profile
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.get('SELECT id, username, email, createdAt FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });
});

module.exports = router;
