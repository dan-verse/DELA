import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Registration.css';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
        email,
      });
      alert('Registration successful!');
      navigate('/login');  // Redirect to the login page
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="reg-container">
      <form onSubmit={handleSubmit} className='reg-form'>
      <h2>Register</h2>
        <div className="username-container">
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=''
            required
          />
          <label htmlFor="username" className="form-label">Username</label>
        </div>
        <div className="password-container">
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=''
            required
          />
          <label htmlFor="password" className="form-label">Password</label>
        </div>
        <div className="email-container">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=''
            required
          />
          <label htmlFor="email" className="form-label">Email</label>
        </div>
        <button type="submit" className="register-btn">Register</button>
        <p>Already registered?<br /><a href='/login'>Log in</a></p>
      </form>
    </div>
  );
};

export default RegistrationForm;