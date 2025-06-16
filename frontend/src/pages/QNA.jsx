import React, { useState } from 'react';
import '../styles/global.css';

const Quiz = () => {
  const [inputText, setInputText] = useState('');
  const [qaPairs, setQaPairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some academic content.");
      return;
    }

    setError('');
    setLoading(true);
    setQaPairs([]);

    try {
      const res = await fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      if (res.ok) {
        setQaPairs(data.qa_pairs);
      } else {
        setError(data.message || 'Failed to generate questions.');
      }
    } catch (err) {
      setError("Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container fade-in">
      <h2 className="home-title">
        Quiz <span className="accent">Generator</span>
      </h2>

      <textarea
        className="text-area"
        placeholder="Paste your academic content here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button onClick={handleGenerate} className="primary-btn">
        {loading ? 'Generating...' : 'Generate Questions'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      <div className="card-grid">
        {qaPairs.map((pair, idx) => (
          <div key={idx} className="card fade-in">
            <h4 style={{ marginBottom: '0.5rem' }}>
              <span className="accent">Q:</span> {pair.question}
            </h4>
            <p><strong>A:</strong> {pair.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
