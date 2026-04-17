import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Reg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  const queryParams = new URLSearchParams(location.search);
  const targetClub = queryParams.get('club') || 'Ace Club';
  
  const [formData, setFormData] = useState({ clubName: targetClub, name: '', email: '', phone: '', yearDepartment: '', whyJoin: '' });
  const [success, setSuccess] = useState(false);
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
            statusMap[reg.clubName] = reg.status;
          });
          setMyStatuses(statusMap);
        } catch(err) {
          console.error(err);
        }
      };
      fetchMyClubs();
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/forms/club-register`, formData, {
        headers: { 'x-auth-token': token }
      });
      setSuccess(true);
      setTimeout(() => navigate('/clubs'), 2000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg);
      } else {
        alert('Error registering. Make sure you are logged in.');
      }
    }
  };

  return (
    <div style={{ padding: '160px 20px 80px 20px', minHeight: 'calc(100vh - 100px)' }}>
      <div className="animate-fade-up" style={{ maxWidth: '450px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '30px' }}>Register for a Club</h1>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontSize: '14px', color: '#ccc', marginLeft: '5px' }}>Registering For:</label>
            <input className="form-control" name="clubName" value={formData.clubName} readOnly style={{ width: '100%', padding: '10px', background: 'rgba(255,60,87,0.1)', color: '#ff3c57', fontWeight: 'bold', cursor: 'not-allowed', marginTop: '5px' }} />
          </div>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required type="email" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required type="tel" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <input className="form-control" name="yearDepartment" value={formData.yearDepartment} onChange={handleChange} placeholder="Year & Department" required type="text" style={{ width: '100%', marginBottom: '20px', padding: '10px' }} />
          <textarea className="form-control" name="whyJoin" value={formData.whyJoin} onChange={handleChange} placeholder="Why do you want to join?" rows="3" style={{ width: '100%', marginBottom: '20px', padding: '10px' }}></textarea>
          
          {myStatuses[formData.clubName] === 'Pending' ? (
            <button type="button" disabled className="btn" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', color: '#ffcc00', border: '1px solid #ffcc00', cursor: 'not-allowed' }}>Waiting for Approval</button>
          ) : myStatuses[formData.clubName] === 'Approved' ? (
            <button type="button" disabled className="btn" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', color: '#00d2ff', border: '1px solid #00d2ff', cursor: 'not-allowed' }}>Already Registered</button>
          ) : (
            <button type="submit" className="btn btn-buy" style={{ width: '100%' }}>Register</button>
          )}
          
          {success && <div style={{ color: '#4caf50', marginTop: '15px' }}>Successfully registered! Redirecting...</div>}
        </form>
      </div>
    </div>
  );
};

export default Reg;
