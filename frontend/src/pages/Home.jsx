import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [lightboxImg, setLightboxImg] = useState(null);

  // Array of images exactly mirroring the old gallery implementation
  const galleryImages = [
    { src: 'g1.jpg', alt: 'ACE Club Event' },
    { src: 'g2.jpg', alt: 'Coding Club Workshop' },
    { src: 'g3.jpg', alt: 'ISTE Conference' },
    { src: 'g4.jpg', alt: 'CSI Networking Event' },
    { src: 'g5.jpg', alt: 'LOLO Leadership Summit' },
    { src: 'g6.jpg', alt: 'Extra Image' },
  ];

  return (
    <>
      {/* Hero Banner strictly mapped back to legacy style */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="animate-fade-up delay-100">Welcome to <span>ClubSpace</span></h1>
          <p className="animate-fade-up delay-200">Your Gateway to Every College Club & Event</p>
          <div className="hero-buttons animate-fade-up delay-300">
            <Link to="/clubs" className="btn">Explore Clubs</Link>
            <Link to="/events" className="btn btn-secondary">View Events</Link>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      <section className="features">
        <h2 className="animate-fade-up">Why Join Our Clubs?</h2>
        <div className="feature-container">
          <div className="feature animate-fade-up delay-100">
            <div className="icon">🎯</div>
            <h3>Skill Development</h3>
            <p>Enhance your skills through hands-on experiences and workshops.</p>
          </div>
          <div className="feature animate-fade-up delay-200">
            <div className="icon">🌐</div>
            <h3>Networking</h3>
            <p>Connect with like-minded individuals and industry professionals.</p>
          </div>
          <div className="feature animate-fade-up delay-300">
            <div className="icon">🎤</div>
            <h3>Workshops & Events</h3>
            <p>Participate in exciting workshops and events throughout the year.</p>
          </div>
          <div className="feature animate-fade-up delay-400">
            <div className="icon">🏆</div>
            <h3>Competitions & Recognition</h3>
            <p>Showcase your talents and earn recognition through competitions.</p>
          </div>
        </div>
      </section>

      <section className="highlighted-event">
        <h2 className="animate-fade-up">Upcoming Highlighted Event</h2>
        <div className="event-box animate-fade-up delay-200">
          <h3 className="event-name">Spurthi 2K26</h3>
          <p className="event-date">Date: March 03, 2026</p>
          <p className="event-club">Hosted by: ACE  </p>
          <Link to="/signin" className="register-btn">Login to Register</Link>
        </div>
      </section>

      <section className="featured-clubs">
        <h2 className="animate-fade-up">Featured Clubs</h2>
        <div className="carousel animate-fade-in delay-200">
          <div className="club-card">
            <img src="/ace.jpg.jpeg" alt="ACE Club" />
            <h3>ACE</h3>
            <p>ACE focuses on organizing coding tech events and non-technical activities to enhance the skills and creativity of computer science engineering students</p>
          </div>
          <div className="club-card">
            <img src="/coding.jpg.jpeg" alt="Coding Club" />
            <h3>Coding Club</h3>
            <p>The Coding Club teaches various programming languages and conducts contests to help students improve their coding skills and collaborate on exciting projects.</p>
          </div>
          <div className="club-card">
            <img src="/iste.jpg.jpeg" alt="ISTE" />
            <h3>ISTE</h3>
            <p>ISTE is dedicated to enhancing English language skills, particularly speaking and communication, through engaging events and workshops that promote effective learning.</p>
          </div>
          <div className="club-card">
            <img src="/csi.jpg.jpeg" alt="CSI" />
            <h3>CSI</h3>
            <p>CSI focuses on teaching core technical skills and coding, organizing both technical and non-technical events that provide students with valuable learning and networking opportunities.</p>
          </div>
          <div className="club-card">
            <img src="/lolo.jpg.jpeg" alt="LOLO" />
            <h3>LOLO</h3>
            <p>LOLO is a singing club that performs at college events, showcasing talent and creativity while fostering a love for music within the college community.</p>
          </div>
        </div>
      </section>

      <section className="gallery">
        <h2 className="animate-fade-up">Gallery</h2>
        <div className="gallery-grid animate-fade-in delay-200">
          {galleryImages.map((img, index) => (
            <div key={index} className="gallery-item show">
              <img 
                src={`/${img.src}`} 
                alt={img.alt} 
                onClick={() => setLightboxImg(`/${img.src}`)} 
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* React Lightbox Implementation maintaining the original JS behavior */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <span 
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              fontSize: '40px',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => setLightboxImg(null)}
          >
            &times;
          </span>
          <img 
            src={lightboxImg} 
            alt="Enlarged" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '10px',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
              animation: 'zoomIn 0.3s ease',
            }} 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};

export default Home;
