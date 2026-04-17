import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Events = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clubFilter = queryParams.get('club');
  
  const { user } = useContext(AuthContext);
  const [enrolledEventNames, setEnrolledEventNames] = useState([]);

  useEffect(() => {
    if (user && user.role === 'user') {
      const fetchMyEvents = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/forms/my-events`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
          });
          const eventNames = res.data.map(enrollment => enrollment.event);
          setEnrolledEventNames(eventNames);
        } catch (err) {
          console.error('Error fetching enrolled events', err);
        }
      };
      fetchMyEvents();
    }
  }, [user]);

  const allEvents = [
    // Ace Club
    { name: "ML EXPLORE", date: "April 19, 2026", club: "Ace Club", location: "CSE MINI AUDITORIUM", time: "9:00 AM to 12:30 PM" },
    { name: "ALGO DESIGNERS", date: "May 02, 2026", club: "Ace Club", location: "LAB 3", time: "10:00 AM to 2:00 PM" },
    { name: "HACKATHON 2026", date: "July 15, 2026", club: "Ace Club", location: "MAIN AUDITORIUM", time: "48-HOUR EVENT" },
    { name: "DATA SCIENCE SUMMIT", date: "August 10, 2026", club: "Ace Club", location: "SEMINAR HALL", time: "10:00 AM to 5:00 PM" },
    { name: "AI ETHICS PANEL", date: "September 22, 2026", club: "Ace Club", location: "ONLINE", time: "6:00 PM to 8:00 PM" },

    // CSI
    { name: "TECH WORKSHOP", date: "June 05, 2026", club: "CSI", location: "SEMINAR HALL", time: "9:00 AM to 4:00 PM" },
    { name: "CLOUD SEMINAR", date: "June 18, 2026", club: "CSI", location: "CSE DEPT BLOCK", time: "1:00 PM to 3:30 PM" },
    { name: "CYBER SECURITY 101", date: "July 30, 2026", club: "CSI", location: "LAB 2", time: "10:00 AM to 1:00 PM" },
    { name: "BLOCKCHAIN BASICS", date: "September 12, 2026", club: "CSI", location: "MAIN AUDITORIUM", time: "2:00 PM to 5:00 PM" },

    // Coding Club
    { name: "BUG BOUNTY", date: "May 10, 2026", club: "Coding Club", location: "LAB 1", time: "10:00 AM to 1:00 PM" },
    { name: "OPEN SOURCE DAY", date: "August 22, 2026", club: "Coding Club", location: "ONLINE", time: "All Day" },
    { name: "COMPETITIVE PROG", date: "October 05, 2026", club: "Coding Club", location: "LAB 4", time: "5:00 PM to 8:00 PM" },
    { name: "FRONTEND MASTERY", date: "November 14, 2026", club: "Coding Club", location: "NEW WING", time: "9:00 AM to 1:00 PM" },

    // Lolo Band
    { name: "SINGER LIVE", date: "May 20, 2026", club: "Lolo Band", location: "MAIN STAGE", time: "Doors at 6:00 PM" },
    { name: "BATTLE OF BANDS", date: "September 05, 2026", club: "Lolo Band", location: "CAMPUS GROUNDS", time: "5:30 PM to 11:00 PM" },
    { name: "ACOUSTIC NIGHT", date: "October 18, 2026", club: "Lolo Band", location: "CAFE LOUNGE", time: "7:00 PM to 9:30 PM" },
    { name: "WINTER CONCERT", date: "December 01, 2026", club: "Lolo Band", location: "MAIN AUDITORIUM", time: "Doors at 5:00 PM" },

    // ISTE
    { name: "CRUX", date: "April 26, 2026", club: "ISTE", location: "ECE DEPARTMENT", time: "8:00 AM to 1:00 PM" },
    { name: "PAPER PRESENTATION", date: "August 12, 2026", club: "ISTE", location: "MAIN HALL", time: "11:00 AM to 3:00 PM" },
    { name: "ENG SYMPOSIUM", date: "October 25, 2026", club: "ISTE", location: "SEMINAR BLOCK", time: "9:00 AM to 5:00 PM" },
    { name: "TECH EXPO", date: "November 20, 2026", club: "ISTE", location: "SPORTS COMPLEX", time: "10:00 AM to 4:00 PM" },

    // Language Nest
    { name: "DEBATE WARS", date: "May 28, 2026", club: "Language Nest", location: "ENGLISH DEPT HALL", time: "2:00 PM to 5:00 PM" },
    { name: "POETRY SLAM", date: "June 25, 2026", club: "Language Nest", location: "STUDENT LOUNGE", time: "5:00 PM to 7:00 PM" },
    { name: "SPELLING BEE", date: "July 14, 2026", club: "Language Nest", location: "MINI AUDITORIUM", time: "1:00 PM to 4:00 PM" },
    { name: "LITERATURE FEST", date: "September 19, 2026", club: "Language Nest", location: "LIBRARY HALL", time: "All Day" }
  ];

  const displayedEvents = clubFilter ? allEvents.filter(e => e.club.toLowerCase() === clubFilter.toLowerCase()) : allEvents;
  
  const enrolled = displayedEvents.filter(e => enrolledEventNames.includes(e.name));
  const notEnrolled = displayedEvents.filter(e => !enrolledEventNames.includes(e.name));

  return (
    <div style={{ padding: '100px 20px 60px 20px', maxWidth: '1200px', margin: '0 auto', color: 'white', minHeight: '80vh' }}>
      
      {clubFilter && (
        <div className="animate-fade-up delay-100" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontSize: '18px', color: '#ccc' }}>Showing exclusive events for: <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>{clubFilter}</span></p>
        </div>
      )}

      {!clubFilter && <p className="animate-fade-up delay-100" style={{ textAlign: 'center', marginBottom: '40px', color: '#888' }}>Showing all public events</p>}

      {enrolled.length > 0 && (
        <>
          <h2 className="animate-fade-up" style={{ textAlign: 'center', fontSize: '32px', marginBottom: '30px', color: '#00d2ff', fontWeight: 'bold' }}>Your Enrolled Events</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', marginBottom: '60px' }}>
            {enrolled.map((ev, index) => (
              <article key={`enrolled-${index}`} className="event-item animate-fade-up" style={{ width: '320px', background: 'linear-gradient(135deg, rgba(0,210,255,0.05), rgba(0,91,226,0.05))', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(0,210,255,0.3)', animationDelay: `${(index + 2) * 0.1}s` }}>
                <div aria-label={`${ev.name} event`} style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, background: 'rgba(0,210,255,0.15)', border: '1px solid rgba(0,210,255,0.3)', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center', padding: '0 10px', color: '#ffffff' }}>
                  {ev.name}
                </div>
                <div className="event-title-date">
                  <span className="event-date-visible" style={{ color: '#00d2ff', fontWeight: 600 }}>{ev.date}</span>
                  <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{ev.club.toUpperCase()}</p>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '10px 0' }}>{ev.location}</p>
                <p style={{ fontSize: '0.8rem' }}>{ev.time}</p>
                <button className="btn" disabled style={{ width: '100%', marginTop: '20px', background: 'rgba(255, 255, 255, 0.1)', color: '#00d2ff', border: '1px solid #00d2ff', cursor: 'default' }}>ALREADY ENROLLED</button>
              </article>
            ))}
          </div>
        </>
      )}

      <h2 className="animate-fade-up" style={{ textAlign: 'center', fontSize: '36px', marginBottom: '30px', color: '#ff3c57', fontWeight: 'bold' }}>{enrolled.length > 0 ? "More Upcoming Events" : "Upcoming Events"}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {notEnrolled.length === 0 ? (
          <p className="animate-fade-in" style={{ color: '#ccc', marginTop: '40px' }}>No upcoming events right now.</p>
        ) : notEnrolled.map((ev, index) => (
          <article key={`upcoming-${index}`} className="event-item animate-fade-up" style={{ width: '320px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', animationDelay: `${(index + 2) * 0.1}s` }}>
            <div aria-label={`${ev.name} event`} style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, background: 'rgba(255,60,87,0.15)', border: '1px solid rgba(255,60,87,0.3)', borderRadius: '10px', marginBottom: '1.5rem', textAlign: 'center', padding: '0 10px' }}>
              {ev.name}
            </div>
            <div className="event-title-date">
              <span className="event-date-visible" style={{ color: '#ff3c57', fontWeight: 600 }}>{ev.date}</span>
              <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{ev.club.toUpperCase()}</p>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '10px 0' }}>{ev.location}</p>
            <p style={{ fontSize: '0.8rem' }}>{ev.time}</p>
            <Link to={`/enroll?event=${encodeURIComponent(ev.name)}`}><button className="btn btn-buy" style={{ width: '100%', marginTop: '20px' }}>ENROLL NOW</button></Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Events;
