// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';


const features = [
  { title: "Summarize", path: "/summarize", desc: "Condense complex text into simpler summaries." },
  { title: "Definitions", path: "/define", desc: "Get meanings for difficult words." },
  { title: "Readability", path: "/readability", desc: "Analyze the text difficulty level." },
  { title: "Learn More", path: "/learnmore", desc: "Search a topic and get more information." },
  { title: "Named Entities", path: "/entities", desc: "Highlight people, places, and organizations." },
  { title: "Q&A Generator", path: "/QNA", desc: "Auto-generate quiz questions from content." },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container fade-in">
      <h1 className="home-title">
        simplifi<span className="accent">ED</span>
      </h1>
      <p className="home-subtitle">
        Your cognitive reading assistant for better understanding, summarization, and insight.
      </p>

      <div className="card-grid">
        {features.map((feature) => (
          <div key={feature.title} className="card" onClick={() => navigate(feature.path)}>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
