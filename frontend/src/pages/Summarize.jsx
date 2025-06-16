import React, { useState } from 'react';
import '../styles/global.css';

const Summarize = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setError('');
    setLoading(true);
    setSummary('');

    try {
      const response = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setError(data.message || 'Failed to summarize.');
      }
    } catch (err) {
      setError('Backend not reachable. Is Flask running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container fade-in">
      <h2 className="home-title">
        Text <span className="accent">Summarizer</span>
      </h2>

      <textarea
        className="text-area"
        placeholder="Paste your academic content here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button className="primary-btn" onClick={handleSummarize}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {summary && (
        <div className="card fade-in" style={{ marginTop: '1.5rem' }}>
          <h4 className="accent" style={{ marginBottom: '0.5rem' }}>Summary:</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarize;
