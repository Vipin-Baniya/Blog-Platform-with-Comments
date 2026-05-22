const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', (req, res) => {
  const postId = req.params.postId;

  db.all(
    `SELECT c.*, u.username FROM comments c 
     JOIN users u ON c.userId = u.id 
     WHERE c.postId = ? 
     ORDER BY c.createdAt DESC`,
    [postId],
    (err, comments) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(comments);
    }
  );
});

// Create comment
router.post('/post/:postId', authenticateToken, (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  // Check if post exists
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    db.run(
      'INSERT INTO comments (postId, userId, content) VALUES (?, ?, ?)',
      [postId, userId, content],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
          id: this.lastID,
          postId,
          userId,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    );
  });
});

// Update comment
router.put('/:id', authenticateToken, (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Comment content is required' });
  }

  // Check if comment exists and belongs to the user
  db.get('SELECT * FROM comments WHERE id = ?', [commentId], (err, comment) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.run(
      'UPDATE comments SET content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [content, commentId],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Comment updated successfully' });
      }
    );
  });
});

// Delete comment
router.delete('/:id', authenticateToken, (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;

  // Check if comment exists and belongs to the user
  db.get('SELECT * FROM comments WHERE id = ?', [commentId], (err, comment) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.run('DELETE FROM comments WHERE id = ?', [commentId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({ message: 'Comment deleted successfully' });
    });
  });
});

module.exports = router;
