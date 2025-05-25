import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

const App = () => {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('profiles');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home profiles={profiles} />} />
          <Route path="/admin" element={<AdminDashboard profiles={profiles} setProfiles={setProfiles} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
