import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          BlogHub
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <span className="user-welcome">Welcome, {user.username}</span>
              <Link to="/" className="nav-link">
                Feed
              </Link>
              <Link to="/create" className="nav-link">
                Create Post
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
