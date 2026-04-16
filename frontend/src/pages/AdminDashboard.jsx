import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('clubs');
  const [registrations, setRegistrations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if(user && user.role === 'admin') {
      fetchRegistrations();
      fetchContacts();
      fetchEnrollments();
    }
  }, [user]);

  const config = {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  };

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/registrations', config);
      setRegistrations(res.data);
    } catch(err) { console.error(err); }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/contacts', config);
      setContacts(res.data);
    } catch(err) { console.error(err); }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/enrollments', config);
      setEnrollments(res.data);
    } catch(err) { console.error(err); }
  };

  const approveRegistration = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-registration/${id}`, {}, config);
      fetchRegistrations(); // refresh
    } catch(err) { console.error(err); }
  };

  const rejectRegistration = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject-registration/${id}`, {}, config);
      fetchRegistrations(); // refresh
    } catch(err) { console.error(err); }
  };

  if(!loading && (!user || user.role !== 'admin')) {
    return <Navigate to="/signin" />;
  }

  return (
    <div style={{ paddingTop: '100px', maxWidth: '1200px', margin: '0 auto', color: 'white', paddingBottom: '60px' }}>
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'Outfit' }}>Admin Dashboard</h1>
        <p style={{ color: '#ccc' }}>Welcome, {user?.name}</p>
      </div>

      <div className="animate-fade-up delay-100" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        <button onClick={() => setActiveTab('clubs')} className={`btn ${activeTab === 'clubs' ? '' : 'btn-secondary'}`} style={{ background: activeTab === 'clubs' ? 'linear-gradient(135deg, #00d2ff, #005be2)' : 'rgba(255,255,255,0.1)', border: 'none', boxShadow: activeTab === 'clubs' ? '0 4px 15px rgba(0, 210, 255, 0.4)' : 'none' }}>Club Requests</button>
        <button onClick={() => setActiveTab('events')} className={`btn ${activeTab === 'events' ? '' : 'btn-secondary'}`} style={{ background: activeTab === 'events' ? 'linear-gradient(135deg, #00d2ff, #005be2)' : 'rgba(255,255,255,0.1)', border: 'none', boxShadow: activeTab === 'events' ? '0 4px 15px rgba(0, 210, 255, 0.4)' : 'none' }}>Event Enrollments</button>
        <button onClick={() => setActiveTab('contacts')} className={`btn ${activeTab === 'contacts' ? '' : 'btn-secondary'}`} style={{ background: activeTab === 'contacts' ? 'linear-gradient(135deg, #00d2ff, #005be2)' : 'rgba(255,255,255,0.1)', border: 'none', boxShadow: activeTab === 'contacts' ? '0 4px 15px rgba(0, 210, 255, 0.4)' : 'none' }}>Inbox</button>
      </div>

      <div className="animate-fade-up delay-200" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', padding: '30px' }}>
        
        {activeTab === 'clubs' && (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#00d2ff' }}>Pending Club Registrations</h2>
            {registrations.length === 0 ? <p>No registrations found.</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                    <th style={{ padding: '10px' }}>Name</th>
                    <th style={{ padding: '10px' }}>Club</th>
                    <th style={{ padding: '10px' }}>Dept</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map(reg => (
                    <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '10px' }}>{reg.name}</td>
                      <td style={{ padding: '10px' }}>{reg.clubName}</td>
                      <td style={{ padding: '10px' }}>{reg.yearDepartment}</td>
                      <td style={{ padding: '10px', color: reg.status === 'Approved' ? '#00d2ff' : (reg.status === 'Rejected' ? '#ff3c57' : '#ffa500') }}>{reg.status}</td>
                      <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                        {reg.status === 'Pending' && (
                          <>
                            <button onClick={() => approveRegistration(reg._id)} style={{ background: '#00d2ff', color: '#15001A', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Approve</button>
                            <button onClick={() => rejectRegistration(reg._id)} style={{ background: 'rgba(255, 60, 87, 0.2)', color: '#ff3c57', border: '1px solid #ff3c57', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Reject</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#00d2ff' }}>Event Enrollments</h2>
            {enrollments.length === 0 ? <p>No enrollments found.</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                    <th style={{ padding: '10px' }}>Name</th>
                    <th style={{ padding: '10px' }}>Event</th>
                    <th style={{ padding: '10px' }}>Dept</th>
                    <th style={{ padding: '10px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(enr => (
                    <tr key={enr._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <td style={{ padding: '10px' }}>{enr.name}</td>
                      <td style={{ padding: '10px' }}>{enr.event}</td>
                      <td style={{ padding: '10px' }}>{enr.department}</td>
                      <td style={{ padding: '10px' }}>{new Date(enr.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
             <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#00d2ff' }}>Inbox</h2>
             <div style={{ display: 'grid', gap: '20px' }}>
               {contacts.length === 0 ? <p>No messages found.</p> : contacts.map(c => (
                 <div key={c._id} style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #00d2ff' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                     <h3 style={{ fontWeight: 'bold' }}>{c.subject}</h3>
                     <span style={{ fontSize: '12px', color: '#aaa' }}>{new Date(c.date).toLocaleDateString()}</span>
                   </div>
                   <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>From:</strong> {c.name} ({c.email})</p>
                   <p style={{ fontSize: '14px', color: '#ddd' }}>{c.message}</p>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
