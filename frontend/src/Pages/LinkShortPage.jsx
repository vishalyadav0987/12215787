import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LinkShort.css';

const LinkShortPage = () => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    shortCode: '',
    time: 30
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [allLinks, setAllLinks] = useState([]);
  const [showAllLinks, setShowAllLinks] = useState(false);

  const API_BASE_URL = 'http://localhost:4000/api/v1/links';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/shorturls`, formData,{
        withCredentials: true
      });
      console.log(response);
      
      setResult(response.data);
      setFormData({ originalUrl: '', shortCode: '', time: 30 });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllLinks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shorturls-all`);
      setAllLinks(response.data.data);
      setShowAllLinks(true);
    } catch (err) {
      setError('Failed to fetch links');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="link-shortener-container">
      <div className="header">
        <h1 className="title">🔗 Link Shortener</h1>
        <p className="subtitle">Transform your long URLs into short, shareable links</p>
      </div>

      <div className="main-content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="shortener-form">
            <div className="form-group">
              <label htmlFor="originalUrl">Original URL</label>
              <input
                type="url"
                id="originalUrl"
                name="originalUrl"
                value={formData.originalUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/very-long-url"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="shortCode">Custom Short Code (Optional)</label>
              <input
                type="text"
                id="shortCode"
                name="shortCode"
                value={formData.shortCode}
                onChange={handleInputChange}
                placeholder="my-custom-code"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Validity (Days)</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="form-select"
                color='#333'
              >
                <option value={1}>1 Day</option>
                <option value={7}>7 Days</option>
                <option value={30}>30 Days</option>
                <option value={90}>90 Days</option>
                <option value={365}>1 Year</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Creating...' : 'Shorten URL'}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {result && (
            <div className="result-container">
              <h3>✅ URL Shortened Successfully!</h3>
              <div className="result-item">
                <label>Short URL:</label>
                <div className="url-display">
                  <span className="short-url">{result.data.shortUrl}</span>
                  <button 
                    onClick={() => copyToClipboard(result.data.shortUrl)}
                    className="copy-btn"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
              <div className="result-item">
                <label>Expires in:</label>
                <span className="expiry">{result.data.expires} days</span>
              </div>
            </div>
          )}
        </div>

        <div className="actions-container">
          <button 
            onClick={fetchAllLinks}
            className="secondary-btn"
          >
            📊 View All Links
          </button>
        </div>

        {showAllLinks && (
          <div className="links-container">
            <h3>All Shortened Links</h3>
            {allLinks.length === 0 ? (
              <p className="no-links">No links found</p>
            ) : (
              <div className="links-grid">
                {allLinks.map((link) => (
                  <div key={link._id} className="link-card">
                    <div className="link-info">
                      <div className="original-url">
                        <strong>Original:</strong> 
                        <span>{link.originalUrl}</span>
                      </div>
                      <div className="short-code">
                        <strong>Code:</strong> {link.shortCode}
                      </div>
                      <div className="created-date">
                        <strong>Created:</strong> {new Date(link.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(`http://localhost:4000/${link.shortCode}`)}
                      className="copy-btn-small"
                    >
                      📋
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkShortPage;
