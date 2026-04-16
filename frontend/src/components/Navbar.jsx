import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ width: '100%' }}>
      <nav className="navbar">
        <div className="logo">
          <Link style={{ color: "var(--logo-color, #fff)", textDecoration: "none" }} to="/">ClubSpace</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/clubs">Clubs</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {!user ? (
            <li><Link to="/signin" className="login-btn">Login</Link></li>
          ) : (
            <li>
              <button 
                onClick={handleLogout} 
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Logout ({user.name})
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
