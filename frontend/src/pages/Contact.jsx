import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/forms/contact`, formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="contact-area" style={{ padding: '160px 0 80px 0' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '1200px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-fade-up">
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#fff' }}>Contact Us</h1>
          <p style={{ color: '#b0aab3' }}>We'd love to hear from you!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="animate-fade-up delay-200" style={{ maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required type="email" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <select className="form-control" name="subject" value={formData.subject} onChange={handleChange} required style={{ width: '100%', marginBottom: '20px', padding: '10px', background: '#3b0066', color: 'white' }}>
            <option value="">Select Subject</option>
            <option value="general">General Inquiry</option>
            <option value="event">Event Question</option>
          </select>
          <textarea className="form-control" name="message" value={formData.message} onChange={handleChange} placeholder="Message" required rows="4" style={{ width: '100%', marginBottom: '20px', padding: '10px' }}></textarea>
          
          <button className="btn btn-buy" type="submit" style={{ width: '100%' }}>Send Message</button>
          
          {success && <div style={{ color: '#4caf50', marginTop: '15px', textAlign: 'center' }}>Message sent successfully!</div>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
