import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Clubs = () => {
  const { user } = useContext(AuthContext);
  const [myStatuses, setMyStatuses] = useState({});

  useEffect(() => {
    if(user && user.role === 'user') {
      const fetchMyClubs = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/forms/my-clubs`, {
            headers: { 'x-auth-token': localStorage.getItem('token') }
          });
          const statusMap = {};
          res.data.forEach(reg => {
            statusMap[reg.clubName] = reg.status; // Ace Club -> Pending / Approved
          });
          setMyStatuses(statusMap);
        } catch(err) {
          console.error(err);
        }
      };
      fetchMyClubs();
    }
  }, [user]);

  const clubs = [
    {
      name: "Ace Club",
      img: "/ace.jpg.jpeg",
      desc: "The Association of Computer Science at SRKR Engineering College enhances students' academic and professional growth..."
    },
    {
      name: "CSI",
      img: "/csi.jpg.jpeg",
      desc: "The Computer Society of India (CSI) plays a key role in enhancing students' technical skills..."
    },
    {
      name: "Coding Club",
      img: "/coding.jpg.jpeg",
      desc: "It offers a collaborative environment where students enhance their problem-solving abilities..."
    },
    {
      name: "Lolo Band",
      img: "/lolo.jpg.jpeg",
      desc: "The Lolo Club provides a creative outlet for students to explore and express their musical talents..."
    },
    {
      name: "ISTE",
      img: "/iste.jpg.jpeg",
      desc: "The society organizes workshops, conferences, and competitions to keep students updated with emerging tech..."
    },
    {
      name: "Language Nest",
      img: "/nest.jpeg",
      desc: "The Language Nest offers students a platform to enhance communication and language skills..."
    }
  ];

  const renderClubAction = (clubName) => {
    const status = myStatuses[clubName];
    if (status === 'Approved') {
      return (
        <Link to={`/events?club=${encodeURIComponent(clubName)}`} style={{ marginTop: 'auto' }}>
          <button className="btn" style={{ width: '100%', background: 'linear-gradient(135deg, #00d2ff, #005be2)' }}>View Events ➜</button>
        </Link>
      );
    } else if (status === 'Pending') {
      return (
        <button className="btn" disabled style={{ marginTop: 'auto', width: '100%', background: 'rgba(255, 255, 255, 0.1)', color: '#ffcc00', border: '1px solid #ffcc00', cursor: 'not-allowed', boxShadow: 'none' }}>
           Pending Approval...
        </button>
      );
    } else if (status === 'Rejected') {
        return (
          <button className="btn" disabled style={{ marginTop: 'auto', width: '100%', background: 'rgba(255, 255, 255, 0.1)', color: '#ff3c57', border: '1px solid #ff3c57', cursor: 'not-allowed', boxShadow: 'none' }}>
             Application Rejected
          </button>
        );
    } else {
      return (
        <Link to="/reg" style={{ marginTop: 'auto' }}>
          <button className="btn" style={{ width: '100%' }}>Register Now</button>
        </Link>
      );
    }
  };

  const registeredClubs = clubs.filter(c => myStatuses[c.name] === 'Approved');
  const unregisteredClubs = clubs.filter(c => myStatuses[c.name] !== 'Approved');

  return (
    <div style={{ padding: '120px 20px 60px 20px', textAlign: 'center' }} id="clubs">
      
      {registeredClubs.length > 0 && (
        <div style={{ marginBottom: '80px' }}>
          <h2 className="animate-fade-up" style={{ fontSize: '36px', color: '#00d2ff', marginBottom: '40px', fontWeight: 'bold' }}>Registered Clubs</h2>
          <div 
            className="club-cards" 
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}
          >
            {registeredClubs.map((club, index) => (
              <div 
                key={`reg-${index}`} 
                className="single-club animate-fade-up" 
                style={{ background: 'linear-gradient(90deg, rgba(0, 210, 255, 0.05), rgba(0, 91, 226, 0.02))', border: '1px solid rgba(0, 210, 255, 0.2)', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '20px 30px', boxShadow: '0 8px 25px rgba(0, 210, 255, 0.1)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '30px', textAlign: 'left' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.2)'; }}
              >
                <div style={{ overflow: 'hidden', borderRadius: '12px', flexShrink: 0, width: '100px', height: '100px' }}>
                  <img src={club.img} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '5px', fontWeight: 'bold' }}>{club.name}</h4>
                  <p style={{ fontSize: '15px', color: '#b0aab3', lineHeight: '1.5', margin: 0 }}>{club.desc}</p>
                </div>
                <div style={{ flexShrink: 0, width: '220px' }}>
                  {renderClubAction(club.name)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="animate-fade-up" style={{ fontSize: '36px', color: '#ffffff', marginBottom: '40px', fontWeight: 'bold' }}>{registeredClubs.length > 0 ? "Unregistered Clubs" : "Our Clubs"}</h2>
      <div 
        className="club-cards" 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1400px', margin: '0 auto' }}
      >
        {unregisteredClubs.map((club, index) => (
          <div 
            key={index} 
            className="single-club animate-fade-up" 
            style={{
              background: 'rgba(42, 1, 44, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.4s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
              animationDelay: `${index * 0.1}s`
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ overflow: 'hidden', borderRadius: '10px', marginBottom: '20px' }}>
              <img 
                src={club.img} 
                alt={club.name} 
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </div>
            <h4 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '10px' }}>{club.name}</h4>
            <p style={{ fontSize: '15px', color: '#b0aab3', marginBottom: '25px', lineHeight: '1.6' }}>{club.desc}</p>
            {renderClubAction(club.name)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
