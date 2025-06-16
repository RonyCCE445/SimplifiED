import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const METRIC_DATA = {
  flesch_reading_ease: {
    name: "Flesch Reading Ease",
    description: "Indicates how easy the text is to read (higher is easier).",
    ideal: [60, 80],
    tips: {
      high: "Your text may be too simple. Try richer vocabulary.",
      low: "Your text is too hard. Use shorter sentences and simpler words.",
    },
  },
  flesch_kincaid_grade: {
    name: "Flesch-Kincaid Grade",
    description: "U.S. school grade level needed to understand the text.",
    ideal: [6, 8],
    tips: {
      high: "Too complex. Simplify language and sentence structure.",
      low: "Too basic. Add depth with varied sentence structures.",
    },
  },
  gunning_fog_index: {
    name: "Gunning Fog Index",
    description: "Estimates grade level based on complex word count.",
    ideal: [7, 9],
    tips: {
      high: "Too hard. Reduce use of complex words.",
      low: "Too simple. Add a few challenging concepts.",
    },
  },
  smog_index: {
    name: "SMOG Index",
    description: "Focuses on long words to assess reading difficulty.",
    ideal: [7, 10],
    tips: {
      high: "Text is likely too difficult. Use fewer long words.",
      low: "May lack depth. Include more informative content.",
    },
  },
  automated_readability_index: {
    name: "Automated Readability",
    description: "Estimates grade level based on characters per word.",
    ideal: [6, 9],
    tips: {
      high: "Too advanced. Simplify word choices.",
      low: "Could be more challenging. Add detail.",
    },
  },
  coleman_liau_index: {
    name: "Coleman-Liau Index",
    description: "Calculates readability using characters instead of syllables.",
    ideal: [6, 10],
    tips: {
      high: "Consider shortening sentences.",
      low: "Try expanding explanations with more vocabulary.",
    },
  },
};

const Readability = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tooDifficult, setTooDifficult] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError('');
    setLoading(true);
    setResults(null);
    setTooDifficult(false);

    try {
      const res = await fetch('http://localhost:5000/api/readability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok) {
        setResults(data);

        // Check if any metric is beyond ideal max (too difficult)
        const isDifficult = Object.entries(data).some(([metric, value]) => {
          const info = METRIC_DATA[metric];
          return info && value > info.ideal[1];
        });
        setTooDifficult(isDifficult);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  const getTip = (metric, value) => {
    const info = METRIC_DATA[metric];
    if (!info) return null;

    const [min, max] = info.ideal;
    if (value > max) return info.tips.high;
    if (value < min) return info.tips.low;
    return "Great! This score is within the ideal range.";
  };

  return (
    <div className="home-container fade-in">
      <h2 className="home-title">
        Readability <span className="accent">& Complexity</span> Analyzer
      </h2>

      <textarea
        className="text-area"
        placeholder="Paste your academic content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAnalyze} className="primary-btn">
        {loading ? 'Analyzing...' : 'Analyze Readability'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {results && (
        <>
          <div className="card-grid">
            {Object.entries(results).map(([metric, value]) => {
              const info = METRIC_DATA[metric];
              if (!info) return null;

              const tip = getTip(metric, value);
              return (
                <div key={metric} className="card fade-in">
                  <h4 style={{ marginBottom: '0.3rem' }}>{info.name}</h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
                  <p style={{ fontSize: '0.85rem', margin: '0.5rem 0', color: 'var(--text-light)' }}>
                    {info.description}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      marginTop: '0.3rem',
                      color: value < info.ideal[0] || value > info.ideal[1] ? '#d9534f' : '#5cb85c',
                    }}
                  >
                    <strong>Tip:</strong> {tip}
                  </p>
                </div>
              );
            })}
          </div>

          {tooDifficult && (
            <div className="summary-redirect fade-in">
              <p style={{ marginTop: '2rem', fontSize: '1rem' }}>
                The text seems difficult.{' '}
                <Link to="/summarize" style={{ color: '#007bff', textDecoration: 'underline' }}>
                  Summarize it using our summarizer feature →
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Readability;
