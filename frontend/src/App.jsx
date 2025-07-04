import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  // ✅ Use Docker internal network or fallback to localhost
  const apiBase = process.env.REACT_APP_API_URL?.trim() || 'http://localhost:3001';

  useEffect(() => {
    console.log('🔧 API Base:', apiBase);
    document.body.className = theme;
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [theme]);

  const handleShorten = async () => {
    if (!url.trim()) {
      alert('Please enter a URL to shorten.');
      return;
    }

    try {
      const response = await axios.post(`${apiBase}/shorten`, { original: url });

      if (response?.data?.short) {
        // Return full short URL using the same domain as frontend
        setShortUrl(`${apiBase}/${response.data.short}`);
      } else {
        console.error('⚠️ Invalid response:', response.data);
        alert('Unexpected response from backend.');
      }
    } catch (error) {
      console.error('❌ Axios error:', error);
      alert('Failed to connect to the backend. Is it running?');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="spinner"></div>
        <p className="loading-text">Launching DevShort...</p>
      </div>
    );
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="container">
        <h1>🔗 DevShort</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL..."
        />
        <button onClick={handleShorten}>Shorten URL</button>

        {shortUrl && (
          <p className="short-url">
            Short URL:{' '}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default App;
