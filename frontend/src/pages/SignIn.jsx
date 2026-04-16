import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (isAdmin) => {
    setIsAdminLogin(isAdmin);
    setFormData({ email: '', password: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    
    if (res.success) {
      if(isAdminLogin || formData.email === 'admin@clubspace.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(res.msg);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center w-full" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <div id="login" className="relative max-w-sm w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden mx-4 animate-fade-up">
        <div className="relative z-10 p-8">
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
            <button 
              onClick={() => handleToggle(false)}
              style={{ flex: 1, padding: '10px', borderRadius: '10px', background: !isAdminLogin ? '#ff3c57' : 'transparent', color: 'white', fontWeight: 'bold', transition: 'background 0.3s' }}
            >User</button>
            <button 
              onClick={() => handleToggle(true)}
              style={{ flex: 1, padding: '10px', borderRadius: '10px', background: isAdminLogin ? '#00d2ff' : 'transparent', color: 'white', fontWeight: 'bold', transition: 'background 0.3s' }}
            >Admin</button>
          </div>

          <h1 className="text-3xl font-extrabold mb-2 tracking-wide" style={{ fontFamily: "'Outfit', sans-serif", color: isAdminLogin ? '#00d2ff' : '#ff3c57' }}>
            {isAdminLogin ? 'ADMIN LOGIN' : 'LOGIN'}
          </h1>
          <p className="text-gray-300 mb-6 text-sm">Welcome back! Please enter your credentials.</p>
          
          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="email">
                {isAdminLogin ? 'Admin ID' : 'Email Address'}
              </label>
              <input value={formData.email} onChange={handleChange} className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-[#ff3c57] focus:ring-1 focus:ring-[#ff3c57] text-white px-3 py-2 placeholder-gray-400 transition text-sm outline-none" id="email" name="email" placeholder={isAdminLogin ? "admin" : "you@example.com"} type={isAdminLogin ? "text" : "email"} required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="password">Password</label>
              <input value={formData.password} onChange={handleChange} className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-[#ff3c57] focus:ring-1 focus:ring-[#ff3c57] text-white px-3 py-2 placeholder-gray-400 transition text-sm outline-none" id="password" name="password" placeholder="Enter your password" type="password" required />
            </div>
            <button type="submit" className="w-full text-white rounded-lg py-2 text-base tracking-wide flex justify-center items-center hover:-translate-y-1 transition-all font-extrabold" style={{ background: isAdminLogin ? 'linear-gradient(135deg, #00d2ff, #005be2)' : 'linear-gradient(135deg, #ff3c57, #d81b60)', boxShadow: isAdminLogin ? '0 8px 25px rgba(0, 210, 255, 0.4)' : '0 8px 25px rgba(255, 60, 87, 0.4)', border: 'none' }}>
              Sign In
            </button>
          </form>
          {!isAdminLogin && (
            <p className="mt-6 text-center text-gray-400 text-xs">
              Don't have an account? <Link className="text-[#ff3c57] font-semibold hover:text-[#ff8a00] transition" to="/signup">Register now</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
