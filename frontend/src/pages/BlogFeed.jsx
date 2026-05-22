import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import '../styles/BlogFeed.css';

export default function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getAllPosts();
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="auth-required">
        <h2>Please log in to view posts</h2>
        <Link to="/login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-feed">
      <div className="feed-header">
        <h1>Blog Feed</h1>
        <Link to="/create" className="btn btn-primary">
          Create Post
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No posts yet. Be the first to create one!</div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <h2>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </h2>
              <div className="post-meta">
                <span className="author">By {post.username}</span>
                <span className="date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="post-excerpt">{post.content.substring(0, 200)}...</p>
              <Link to={`/post/${post.id}`} className="read-more">
                Read More →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
