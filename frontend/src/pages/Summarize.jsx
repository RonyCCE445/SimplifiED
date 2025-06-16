// src/pages/Summarize.jsx
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
    <div className="summarize-container">
      <h2>Summarize Text</h2>
      <textarea
        className="summarize-textarea"
        placeholder="Paste your academic content here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="summarize-button" onClick={handleSummarize}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p className="summarize-error">{error}</p>}

      {summary && (
        <div className="summarize-result">
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarize;
