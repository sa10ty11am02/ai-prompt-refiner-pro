import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';

function App() {
  // Ping Service to keep backend awake (every 13 minutes)
  React.useEffect(() => {
    const pingBackend = () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://ai-prompt-refiner-pro.onrender.com';
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
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
// Force deployment trigger
