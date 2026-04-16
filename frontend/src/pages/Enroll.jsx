import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Enroll = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ event: 'Event 2025', name: '', email: '', phone: '', department: '', comments: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/forms/enroll', formData, {
        headers: { 'x-auth-token': token }
      });
      setSuccess(true);
      setTimeout(() => navigate('/events'), 2000);
    } catch (err) {
      console.error(err);
      alert('Error enrolling. Make sure you are logged in.');
    }
  };

  return (
    <div style={{ padding: '160px 20px 80px 20px', minHeight: 'calc(100vh - 100px)' }}>
      <div className="animate-fade-up" style={{ maxWidth: '450px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '30px' }}>Enroll in Event</h1>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required type="email" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required type="tel" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="department" value={formData.department} onChange={handleChange} placeholder="Department" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <textarea className="form-control" name="comments" value={formData.comments} onChange={handleChange} placeholder="Comments" rows="3" style={{ width: '100%', marginBottom: '20px', padding: '10px' }}></textarea>
          
          <button type="submit" className="btn btn-buy" style={{ width: '100%' }}>Join the Event!</button>
          
          {success && <div style={{ color: '#4caf50', marginTop: '15px' }}>Successfully enrolled! Redirecting...</div>}
        </form>
      </div>
    </div>
  );
};

export default Enroll;
