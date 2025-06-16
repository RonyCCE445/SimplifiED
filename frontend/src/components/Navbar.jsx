import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    if (prefersDark) {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        simplifi<span>ED</span>
      </Link>

      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <div className="nav-item" ref={dropdownRef}>
          <span onClick={() => setShowDropdown(!showDropdown)}>
            Features ▾
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

        <span className="theme-toggle-icon" onClick={toggleTheme}>
          {darkMode ? '🌞' : '🌙'}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
