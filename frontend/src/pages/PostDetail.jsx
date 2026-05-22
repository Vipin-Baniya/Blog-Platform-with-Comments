import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService, commentService } from '../services/api';
import '../styles/PostDetail.css';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postService.getPost(id);
      setPost(response.data);
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentService.getComments(id);
      setComments(response.data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setSubmittingComment(true);
      await commentService.createComment(id, commentContent);
      setCommentContent('');
      fetchComments();
    } catch (err) {
      alert('Failed to add comment');
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.deleteComment(commentId);
        fetchComments();
      } catch (err) {
        alert('Failed to delete comment');
        console.error(err);
      }
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await commentService.updateComment(commentId, editContent);
      setEditingCommentId(null);
      setEditContent('');
      fetchComments();
    } catch (err) {
      alert('Failed to update comment');
      console.error(err);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div className="error-message">Post not found</div>;

  const isAuthor = user && user.id === post.userId;

  return (
    <div className="post-detail">
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">By {post.username}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        {isAuthor && (
          <div className="post-actions">
            <Link to={`/edit/${id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={handleDeletePost} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}

        <div className="post-body">{post.content}</div>
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              required
            ></textarea>
            <button type="submit" disabled={submittingComment}>
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Login</Link> to comment
          </p>
        )}

        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <strong>{comment.username}</strong>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {editingCommentId === comment.id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateComment(comment.id);
                    }}
                    className="edit-comment-form"
                  >
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                    <div className="edit-actions">
                      <button type="submit" className="btn btn-secondary">
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="comment-content">{comment.content}</p>
                )}

                {user && user.id === comment.userId && editingCommentId !== comment.id && (
                  <div className="comment-actions">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditContent(comment.content);
                      }}
                      className="btn btn-small"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="btn btn-small btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
