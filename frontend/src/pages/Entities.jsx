import React, { useState } from 'react';
import '../styles/global.css';
import { useNavigate } from 'react-router-dom';

const labelMap = {
  PERSON: "Person",
  ORG: "Organization",
  GPE: "Geopolitical Entity",
  LOC: "Location",
  NORP: "Nationality / Religious / Political Group",
  DATE: "Date",
  TIME: "Time",
  MONEY: "Monetary Value",
  PERCENT: "Percentage",
  FAC: "Facility",
  PRODUCT: "Product",
  EVENT: "Event",
  WORK_OF_ART: "Work of Art",
  LAW: "Law",
  LANGUAGE: "Language",
  QUANTITY: "Quantity",
  ORDINAL: "Ordinal Number",
  CARDINAL: "Cardinal Number"
};

const Entities = () => {
  const [text, setText] = useState('');
  const [entities, setEntities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    if (!text.trim()) {
      setError('Please enter some text.');
      return;
    }

    setLoading(true);
    setEntities([]);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/ner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok) {
        setEntities(data.entities);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container fade-in">
      <h2>Named Entity Recognition</h2>
      <textarea
        className="text-area"
        placeholder="Paste your text to identify named entities..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleExtract} className="primary-btn">
        {loading ? 'Extracting...' : 'Extract Entities'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {entities.length > 0 && (
        <div className="card-grid" style={{ marginTop: '2rem' }}>
          {entities.map((ent, idx) => (
            <div key={idx} className="card fade-in">
              <h4>{ent.text}</h4>
              <p><strong>Type:</strong> {labelMap[ent.label] || ent.label}</p>
              <a
                href={`/learnmore?entity=${encodeURIComponent(ent.text)}&type=${encodeURIComponent(ent.label)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn"
                style={{ display: 'inline-block', marginTop: '0.5rem' }}
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Entities;
