import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to DELA Water Billing System</h1>
      <p>Please log in or register to manage your account.</p>
      <div>
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default Home;