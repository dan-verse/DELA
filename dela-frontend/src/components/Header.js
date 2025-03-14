import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import './styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();       // Clear user and tokens from context and storage
    navigate('/');  // Redirect to Home page
  };

  return (
    <nav className="header-container">
      <div className="left-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      {user && (
        <div className="right-links">
          <span className="username">Welcome, {user.username} </span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Header;
