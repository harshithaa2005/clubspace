import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reg = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ clubName: 'ACE CLUB', name: '', email: '', phone: '', yearDepartment: '', whyJoin: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/forms/club-register', formData, {
        headers: { 'x-auth-token': token }
      });
      setSuccess(true);
      setTimeout(() => navigate('/clubs'), 2000);
    } catch (err) {
      console.error(err);
      alert('Error registering. Make sure you are logged in.');
    }
  };

  return (
    <div style={{ padding: '160px 20px 80px 20px', minHeight: 'calc(100vh - 100px)' }}>
      <div className="animate-fade-up" style={{ maxWidth: '450px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '30px' }}>Register for a Club</h1>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <select className="form-control" name="clubName" value={formData.clubName} onChange={handleChange} required style={{ width: '100%', marginBottom: '20px', padding: '10px', background: '#3b0066', color: 'white' }}>
              <option value="ACE CLUB">ACE CLUB</option>
              <option value="IETE CLUB">IETE CLUB</option>
              <option value="GDG CLUB">GDG CLUB</option>
          </select>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required type="email" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required type="tel" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="yearDepartment" value={formData.yearDepartment} onChange={handleChange} placeholder="Year & Department" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <textarea className="form-control" name="whyJoin" value={formData.whyJoin} onChange={handleChange} placeholder="Why do you want to join?" rows="3" style={{ width: '100%', marginBottom: '20px', padding: '10px' }}></textarea>
          
          <button type="submit" className="btn btn-buy" style={{ width: '100%' }}>Register</button>
          
          {success && <div style={{ color: '#4caf50', marginTop: '15px' }}>Successfully registered! Redirecting...</div>}
        </form>
      </div>
    </div>
  );
};

export default Reg;
