import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  login: (username, password) =>
    api.post('/auth/login', { username, password }),
};

// User services
export const userService = {
  getCurrentUser: () => api.get('/users'),
  getUserProfile: (id) => api.get(`/users/${id}`),
};

// Post services
export const postService = {
  getAllPosts: () => api.get('/posts'),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (title, content) =>
    api.post('/posts', { title, content }),
  updatePost: (id, title, content) =>
    api.put(`/posts/${id}`, { title, content }),
  deletePost: (id) => api.delete(`/posts/${id}`),
};

// Comment services
export const commentService = {
  getComments: (postId) =>
    api.get(`/comments/post/${postId}`),
  createComment: (postId, content) =>
    api.post(`/comments/post/${postId}`, { content }),
  updateComment: (id, content) =>
    api.put(`/comments/${id}`, { content }),
  deleteComment: (id) => api.delete(`/comments/${id}`),
};

export default api;
