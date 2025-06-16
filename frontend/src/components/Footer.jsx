// src/components/Footer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="mailto:koustavchak24@gmail.com">koustavchak24@gmail.com</a>
        <a href="https://github.com/RonyCCE445" target="_blank" rel="noreferrer">
          Developer: Koustav Chakraborty
        </a>
        
      </div>
      <p className="copyright">© 2025 Koustav Chakraborty</p>
    </footer>
  );
};

export default Footer;
