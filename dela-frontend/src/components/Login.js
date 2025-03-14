import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import './styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login function from your auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get JWT tokens
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // Fetch user profile (ensure your profile endpoint returns necessary fields, including is_staff or username)
      const profileResponse = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
        headers: { Authorization: `Bearer ${response.data.access}` },
      });

      // Update the auth context with the fetched user profile
      login(profileResponse.data);

      // Redirect based on privileges (example using is_staff)
      if (profileResponse.data.is_staff) {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className='login-form'>
        <h2>Log in</h2>
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
        <button type="submit" className="login-btn">Login</button>
        <p>Don't have an account?<br /><a href='/register'>Sign up</a></p>
      </form>
    </div>
  );
};

export default Login;
