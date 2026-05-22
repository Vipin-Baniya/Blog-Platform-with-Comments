const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  db.all(
    `SELECT p.*, u.username FROM posts p 
     JOIN users u ON p.userId = u.id 
     ORDER BY p.createdAt DESC`,
    [],
    (err, posts) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(posts);
    }
  );
});

// Get single post
router.get('/:id', (req, res) => {
  const postId = req.params.id;

  db.get(
    `SELECT p.*, u.username FROM posts p 
     JOIN users u ON p.userId = u.id 
     WHERE p.id = ?`,
    [postId],
    (err, post) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      res.json(post);
    }
  );
});

// Create post
router.post('/', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ error: 'Missing title or content' });
  }

  db.run(
    'INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)',
    [userId, title, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({
        id: this.lastID,
        userId,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  );
});

// Update post
router.put('/:id', authenticateToken, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Missing title or content' });
  }

  // First, check if the post exists and belongs to the user
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.run(
      'UPDATE posts SET title = ?, content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, postId],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({ message: 'Post updated successfully' });
      }
    );
  });
});

// Delete post
router.delete('/:id', authenticateToken, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // First, check if the post exists and belongs to the user
  db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, post) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    db.run('DELETE FROM posts WHERE id = ?', [postId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({ message: 'Post deleted successfully' });
    });
  });
});

module.exports = router;
