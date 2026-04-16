import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <div style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        
        {/* Sample Event Card */}
        <article className="event-item animate-fade-up" style={{ width: '320px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div aria-label="ML EXPLORE event" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, background: 'rgba(255,60,87,0.15)', border: '1px solid rgba(255,60,87,0.3)', borderRadius: '10px', marginBottom: '1.5rem' }}>
            ML EXPLORE
          </div>
          <div className="event-title-date">
            <span className="event-date-visible" style={{ color: '#ff3c57', fontWeight: 600 }}>April 19, 2025</span>
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>ACE CLUB</p>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '10px 0' }}>CSE MINI AUDITORIUM</p>
          <p style={{ fontSize: '0.8rem' }}>Doors 9:00 AM to 12:30 PM</p>
          
          <Link to="/enroll"><button className="btn btn-buy" style={{ width: '100%', marginTop: '20px' }}>ENROLL NOW</button></Link>
        </article>
        
        <article className="event-item animate-fade-up delay-100" style={{ width: '320px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div aria-label="CRUX event" style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, background: 'rgba(255,60,87,0.15)', border: '1px solid rgba(255,60,87,0.3)', borderRadius: '10px', marginBottom: '1.5rem' }}>
            CRUX
          </div>
          <div className="event-title-date">
            <span className="event-date-visible" style={{ color: '#ff3c57', fontWeight: 600 }}>April 26, 2025</span>
            <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>IETE CLUB</p>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '10px 0' }}>ECE DEPARTMENT</p>
          <p style={{ fontSize: '0.8rem' }}>Doors 8:00 AM to 9:00 AM</p>
          
          <Link to="/enroll"><button className="btn btn-buy" style={{ width: '100%', marginTop: '20px' }}>ENROLL NOW</button></Link>
        </article>

      </div>
    </div>
  );
};

export default Events;
