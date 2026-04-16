import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ width: '100%' }}>
      <div className="footer-container">
        <div className="footer-address">
          <h3>Contact Us</h3>
          <p>SRKREC <br/>China Amiram, Bhimavaram,<br/>Andhra Pradesh, India.<br/>Email: principal@srkrec.ac.in<br/>Phone: 08816-223332(Office).</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/clubs">Clubs</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook"/></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter"/></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram"/></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn"/></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SRKREC. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
