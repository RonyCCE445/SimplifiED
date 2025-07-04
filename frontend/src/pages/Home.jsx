import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const features = [
  { title: "Summarize", path: "/summarize", desc: "Turn lengthy academic content into concise summaries." },
  { title: "Definitions", path: "/define", desc: "Understand complex words instantly with contextual definitions." },
  { title: "Readability", path: "/readability", desc: "Check how easy or hard your text is to read." },
  { title: "Learn More", path: "/learnmore", desc: "Dive deeper into a concept or named topic." },
  { title: "Key Points Generator", path: "/keypoints", desc: "Generate Key Points from a given text." },
  { title: "Q&A Generator", path: "/QNA", desc: "Auto-generate quiz questions from any passage." },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <img src="/public/simplifiED_logo1.png" alt="Logo" style={{ width: '100px', height: '100px' }} />
        <h1 className="home-title" style={{ margin: 0 }}>
          simplifi<span className="accent">ED</span>
        </h1>
      </div>

      <p className="home-subtitle">
        Welcome to SimplifiED — your AI-powered cognitive reading assistant.
        Navigate through complex texts with ease as we break down, summarize, define, and explain content in seconds.
        From key insights to question generation,
        SimplifiED is crafted to enhance comprehension and empower every learner to read smarter, not harder.
      </p>

      <div className="card-grid">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="card feature-card"
            onClick={() => navigate(feature.path)}
          >
            <h3 className="card-title">{feature.title}</h3>
            <p className="card-hover-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
