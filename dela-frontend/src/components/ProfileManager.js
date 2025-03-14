import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ProfileManager.css';

const ProfileManager = () => {
  // Initialize state with empty strings to avoid uncontrolled input warnings
  const [user, setUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('Access token missing.');
        alert('Please log in again.');
        return;
      }
  
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        if (error.response && error.response.status === 401) {
          alert('Session expired. Please log in again.');
        }
      }
    };
  
    fetchUserProfile();
  }, []);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting profile:', user);
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/api/user/profile/',
        user,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Server response:', response);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error.response?.data || error);
      alert(`Update failed: ${error.response?.data?.detail || 'Unknown error'}`);
    }
  };
  

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h2>Profile Manager</h2>
      <form onSubmit={handleSubmit}>
        <div className="username-cont">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="email-cont">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fname-cont">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="lname-cont">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="profile-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileManager;
