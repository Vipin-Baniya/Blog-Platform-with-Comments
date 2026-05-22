import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import '../styles/CreatePost.css';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPost();
  }, [id, user, navigate]);

  const fetchPost = async () => {
    try {
      const response = await postService.getPost(id);
      if (response.data.userId !== user.id) {
        setError('You do not have permission to edit this post');
        return;
      }
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);

    try {
      await postService.updatePost(id, title, content);
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading post...</div>;

  return (
    <div className="create-post">
      <h1>Edit Post</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows="10"
            required
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/post/${id}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
