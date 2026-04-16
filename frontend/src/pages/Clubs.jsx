import React from 'react';
import { Link } from 'react-router-dom';

const Clubs = () => {
  return (
    <div style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="animate-fade-up" style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>Our Clubs</h1>
      
      <div className="features-container" style={{ marginTop: '50px' }}>
        {/* Sample Club Card */}
        <div className="feature-card animate-fade-up delay-100" style={{ padding: '0', overflow: 'hidden' }}>
          <img src="/assets/ace.jpg.jpeg" alt="ACE CLUB" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: '#ff3c57', fontSize: '1.5rem', fontWeight: 'bold' }}>ACE CLUB</h3>
            <p style={{ color: '#ccc', margin: '10px 0', fontSize: '0.9rem' }}>Association of Computer Engineers</p>
            <Link to="/reg"><button className="btn btn-buy" style={{ width: '100%', padding: '10px' }}>Join Club</button></Link>
          </div>
        </div>

        <div className="feature-card animate-fade-up delay-200" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '200px', background: '#3b0066' }}></div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: '#ff3c57', fontSize: '1.5rem', fontWeight: 'bold' }}>IETE CLUB</h3>
            <p style={{ color: '#ccc', margin: '10px 0', fontSize: '0.9rem' }}>Electronics and Telecommunication Engineers</p>
            <Link to="/reg"><button className="btn btn-buy" style={{ width: '100%', padding: '10px' }}>Join Club</button></Link>
          </div>
        </div>

        <div className="feature-card animate-fade-up delay-300" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '200px', background: '#ff3c57' }}></div>
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: '#ff3c57', fontSize: '1.5rem', fontWeight: 'bold' }}>GDG CLUB</h3>
            <p style={{ color: '#ccc', margin: '10px 0', fontSize: '0.9rem' }}>Google Developer Groups</p>
            <Link to="/reg"><button className="btn btn-buy" style={{ width: '100%', padding: '10px' }}>Join Club</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubs;
