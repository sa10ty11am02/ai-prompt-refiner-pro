import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  // Ping Service to keep backend awake (every 13 minutes)
  React.useEffect(() => {
    const pingBackend = () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-prompt-refiner-pro-4376a.onrender.com';
      fetch(`${apiUrl}/api/ping`).catch(err => console.log("Ping failed", err));
    };

    // Initial ping
    pingBackend();

    // Interval (13 minutes = 780000 ms)
    const interval = setInterval(pingBackend, 780000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;
