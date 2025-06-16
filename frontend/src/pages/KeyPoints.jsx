import React, { useState } from "react";
import "../styles/global.css";

const KeyPoints = () => {
  const [text, setText] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError("");
    setLoading(true);
    setKeyPoints([]);

    try {
      const response = await fetch("http://localhost:5000/api/keypoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setKeyPoints(data.keypoints || []);
      } else {
        setError(data.message || "Failed to generate key points.");
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
        Key <span className="accent">Points Generator</span>
      </h2>

      <textarea
        className="text-area"
        placeholder="Paste your academic text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="primary-btn" onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Key Points"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {keyPoints.length > 0 && (
        <div className="card fade-in" style={{ marginTop: "1.5rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "var(--primary)" }}>
            🔑 Key Points:
          </h3>
          <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.7" }}>
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KeyPoints;
