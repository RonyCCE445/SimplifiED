// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Summarize from './pages/Summarize';
import Definitions from './pages/Definitions';
import LearnMore from './pages/LearnMore';
import Footer from './components/Footer';
import QNA from './pages/QNA'; 
import Readability from './pages/Readability';
import KeyPoints from './pages/KeyPoints';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/global.css'; // Ensure global styles are imported
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/define" element={<Definitions />} />
        <Route path="/learnmore" element={<LearnMore />} />
         <Route path="/qna" element={<QNA />} />
         <Route path="/readability" element={<Readability />} />
         <Route path="/keypoints" element={<KeyPoints />} />
         <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        {/* Add more routes later: */}
       
      </Routes>
      <Footer />
    </>
  );
};

export default App;
