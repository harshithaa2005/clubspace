import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-content animate-fade-up">
          <h1 className="logo-the">The</h1>
          <h1 className="logo-clubspace">ClubSpace</h1>
          <p>Your one-stop destination to discover, join, and engage with college clubs and events.</p>
          <div className="cta-container">
            <Link to="/clubs" className="btn btn-buy">Explore Clubs</Link>
          </div>
        </div>
        <div className="hero-decor decor-1"></div>
        <div className="hero-decor decor-2"></div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-card animate-fade-up delay-100">
            <h3>Discover</h3>
            <p>Find clubs that match your interests. Browse through technical, cultural, and sports communities.</p>
          </div>
          <div className="feature-card animate-fade-up delay-200">
            <h3>Connect</h3>
            <p>Meet like-minded peers, interact with seniors, and build your college network.</p>
          </div>
          <div className="feature-card animate-fade-up delay-300">
            <h3>Grow</h3>
            <p>Participate in events, develop new skills, and enhance your leadership abilities.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
