import React from 'react';
import './styles/Footer.css';

const Footer = () => {
    return (
      <footer className="footer-container">
        <p>Contact: dela@example.com | Phone: +123 456 7890</p>
        <p>&copy; {new Date().getFullYear()} Dela Water Billing. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;