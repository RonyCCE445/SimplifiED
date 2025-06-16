import React, { useState } from "react";


const Definitions = () => {
  const [inputText, setInputText] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDefine = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setError("");
    setLoading(true);
    setDefinitions([]);

    try {
      const response = await fetch("http://localhost:5000/api/define", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        setDefinitions(data.definitions);
      } else {
        setError(data.message || "Failed to get definitions.");
      }
    } catch (err) {
      setError("Backend not reachable. Is Flask running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="definitions-container">
      <h2 className="definitions-title">Word Definition Finder</h2>
      <textarea
        className="definitions-textarea"
        placeholder="Paste your academic content here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="definitions-button" onClick={handleDefine}>
        {loading ? "Fetching..." : "Get Definitions"}
      </button>

      {error && <p className="definitions-error">{error}</p>}

      {definitions.length > 0 && (
        <div className="definitions-result">
          <h3>Definitions:</h3>
          <ul>
            {definitions.map((def, index) => (
              <li key={index}>
                <strong>{def.word}</strong> ({def.pos}) – {def.definition}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Definitions;
