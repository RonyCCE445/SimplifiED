import React, { useState } from 'react';
import '../styles/global.css';

const Readability = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError('');
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch('http://localhost:5000/api/readability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container fade-in">
      <h2>Readability & Complexity Analyzer</h2>
      <textarea
        className="text-area"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAnalyze} className="primary-btn">
        {loading ? 'Analyzing...' : 'Analyze Readability'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results && (
        <div className="card-grid">
          {Object.entries(results).map(([metric, value]) => (
            <div key={metric} className="card fade-in">
              <h4>{metric.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
              <p>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Readability;
