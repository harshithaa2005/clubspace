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
          <Link style={{ color: "var(--logo-color, #fff)", textDecoration: "none" }} to={user?.role === 'admin' ? '/admin' : '/'}>ClubSpace</Link>
        </div>
        <ul className="nav-links">
          {user?.role === 'admin' ? (
            <>
              <li><Link to="/admin" style={{ color: '#00d2ff', fontWeight: 'bold' }}>Dashboard</Link></li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  display: 'flex', alignItems: 'center', background: 'rgba(0, 210, 255, 0.1)', 
                  border: '1px solid rgba(0, 210, 255, 0.3)', padding: '5px 15px', borderRadius: '20px', 
                  marginRight: '20px', gap: '8px'
                }}>
                  <i className="fas fa-shield-alt" style={{ color: '#00d2ff', fontSize: '16px' }}></i>
                  <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Admin</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  title="Logout"
                  style={{ background: 'none', border: 'none', color: '#00d2ff', cursor: 'pointer', fontSize: '20px', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/clubs">Clubs</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {!user ? (
                <li><Link to="/signin" className="login-btn">Login</Link></li>
              ) : (
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: 'rgba(255, 60, 87, 0.1)', 
                    border: '1px solid rgba(255, 60, 87, 0.3)', 
                    padding: '5px 15px', 
                    borderRadius: '20px', 
                    marginRight: '20px',
                    gap: '8px'
                  }}>
                    <i className="fas fa-user-circle" style={{ color: '#ff3c57', fontSize: '16px' }}></i>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold', textTransform: 'capitalize' }}>{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    title="Logout"
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px', transition: 'transform 0.3s, color 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.color = '#ff3c57'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.color = 'white'; }}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
