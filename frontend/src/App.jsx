import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Enroll from './pages/Enroll';
import Reg from './pages/Reg';
import AdminDashboard from './pages/AdminDashboard'; // ADDED

// Protected Route Component for standard users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/signin" replace />;
};

// Admin Route Component strictly for Admins
const AdminRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return (user && user.role === 'admin') ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/enroll" element={
              <ProtectedRoute>
                <Enroll />
              </ProtectedRoute>
            } />
            <Route path="/reg" element={
              <ProtectedRoute>
                <Reg />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
