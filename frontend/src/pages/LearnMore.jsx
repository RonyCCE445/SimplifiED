import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LearnMore = () => {
  const [searchParams] = useSearchParams();
  const [inputText, setInputText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const topicFromQuery = searchParams.get('topic') || '';
  const entityFromQuery = searchParams.get('entity') || '';
  const typeFromQuery = searchParams.get('type') || '';

  const fetchExplanation = async (textToExplain) => {
    if (!textToExplain.trim()) {
      setError('Please enter a topic or text.');
      return;
    }

    setError('');
    setLoading(true);
    setExplanation('');

    try {
      const response = await fetch('http://localhost:5000/api/learnmore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToExplain }),
      });

      const data = await response.json();
      if (response.ok) {
        setExplanation(data.explanation);
      } else {
        setError(data.message || 'Failed to get explanation.');
      }
    } catch (err) {
      setError('Backend not reachable. Is Flask running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const combinedQuery = topicFromQuery
      ? topicFromQuery
      : entityFromQuery
      ? `${entityFromQuery} (${typeFromQuery || 'Entity'})`
      : '';

    if (combinedQuery) {
      setInputText(combinedQuery);
      fetchExplanation(combinedQuery);
    }
  }, [topicFromQuery, entityFromQuery, typeFromQuery]);

  const handleLearnMore = () => {
    fetchExplanation(inputText);
  };

  return (
    <div className="learnmore-container fade-in">
      <h2 className="home-title">
        Learn More <span className="accent">About the Topic</span>
      </h2>

      <textarea
        className="text-area"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a topic, passage, or entity to learn more..."
      />

      <button className="primary-btn" onClick={handleLearnMore}>
        {loading ? 'Loading...' : 'Learn More'}
      </button>

      {error && <p className="learnmore-error" style={{ color: 'red' }}>{error}</p>}

      {explanation && (
        <div className="learnmore-output">
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Explanation:</h3>
          <p style={{ lineHeight: '1.7', fontFamily: 'Georgia, serif' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default LearnMore;
