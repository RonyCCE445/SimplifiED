// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <Link to="/" className="nav-logo">
        simplifi<span>ED</span>
      </Link>

      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <div className="nav-item" ref={dropdownRef}>
          <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
            Features
          </span>
          {showDropdown && (
            <div className="dropdown">
              <Link to="/summarize">Summarize</Link>
              <Link to="/define">Definition Finder</Link>
              <Link to="/learnmore">Learn More About Topic</Link>
              <Link to="/readability">Readability</Link>
              <Link to="/keypoints">Key Points</Link>
              <Link to="/qna">Q&A Generator</Link>

            </div>
          )}
        </div>

        <span style={{ color: 'var(--muted)', cursor: 'not-allowed' }}>🌓</span>
      </div>
    </nav>
  );
};

export default Navbar;
