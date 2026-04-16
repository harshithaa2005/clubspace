import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.msg);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center w-full" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <div id="login" className="relative max-w-sm w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden mx-4 animate-fade-up">
        {/* Background shapes logic can be added here or in global css */}
        <div className="relative z-10 p-8">
          <h1 className="text-3xl font-extrabold mb-2 text-[#ff3c57] tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>LOGIN</h1>
          <p className="text-gray-300 mb-6 text-sm">Welcome back! Please enter your credentials to access the club portal.</p>
          
          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="email">Email Address</label>
              <input value={formData.email} onChange={handleChange} className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-[#ff3c57] focus:ring-1 focus:ring-[#ff3c57] text-white px-3 py-2 placeholder-gray-400 transition text-sm outline-none" id="email" name="email" placeholder="you@example.com" type="email" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="password">Password</label>
              <input value={formData.password} onChange={handleChange} className="w-full rounded-lg bg-white/5 border border-white/10 focus:border-[#ff3c57] focus:ring-1 focus:ring-[#ff3c57] text-white px-3 py-2 placeholder-gray-400 transition text-sm outline-none" id="password" name="password" placeholder="Enter your password" type="password" required />
            </div>
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="remember" className="inline-flex items-center text-gray-400">
                <input id="remember" className="form-checkbox h-3 w-3 text-[#ff3c57] bg-white/5 border-white/10 rounded focus:ring-[#ff3c57]" type="checkbox" />
                <span className="ml-2">Remember me</span>
              </label>
              <a className="text-[#ff3c57] hover:text-[#ff8a00] font-semibold transition" href="#">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#ff3c57] to-[#d81b60] hover:shadow-[0_8px_25px_rgba(255,60,87,0.5)] transition-all font-extrabold text-white rounded-lg py-2 text-base tracking-wide flex justify-center items-center hover:-translate-y-1">
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-gray-400 text-xs">
            Don't have an account? <Link className="text-[#ff3c57] font-semibold hover:text-[#ff8a00] transition" to="/signup">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
