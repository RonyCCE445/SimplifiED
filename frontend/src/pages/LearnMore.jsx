import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LearnMore = () => {
  const [searchParams] = useSearchParams();
  const [inputText, setInputText] = useState('');
  const [entityType, setEntityType] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const entityFromQuery = searchParams.get('entity');
  const typeFromQuery = searchParams.get('type');

  const fetchExplanation = async (entityText, type) => {
    if (!entityText.trim()) {
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
        body: JSON.stringify({ entity: entityText, type }),
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
    if (entityFromQuery) {
      setInputText(entityFromQuery);
      setEntityType(typeFromQuery || '');
      fetchExplanation(entityFromQuery, typeFromQuery || '');
    }
  }, [entityFromQuery, typeFromQuery]);

  const handleLearnMore = () => {
    fetchExplanation(inputText, entityType);
  };

  return (
    <div className="learnmore-container" style={{ animation: 'fadeIn 0.6s ease-in' }}>
      <h2>Learn More About the Topic</h2>

      <textarea
        className="learnmore-textarea"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a topic or passage to learn more..."
      />

      <button className="learnmore-button" onClick={handleLearnMore}>
        {loading ? 'Loading...' : 'Learn More'}
      </button>

      {error && <p className="learnmore-error">{error}</p>}

      {explanation && (
        <div className="learnmore-output">
          <h3>Explanation:</h3>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default LearnMore;
