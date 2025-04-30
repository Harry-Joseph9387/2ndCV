import React from 'react';
import './Navbar.css';
import { FaBriefcase, FaLaptopCode, FaEnvelope } from 'react-icons/fa';

export const Navbar = () => {
  // Function to scroll to a specific section
  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="nav-item" onClick={() => scrollToSection('desktop3')}>
          <FaBriefcase className="nav-icon" />
          <span className="nav-label">Skills & Experience</span>
        </div>
        
        <div className="nav-item" onClick={() => scrollToSection('desktop4')}>
          <FaLaptopCode className="nav-icon" />
          <span className="nav-label">Projects</span>
        </div>
        
        <div className="nav-item" onClick={() => scrollToSection('desktop1')}>
          <FaEnvelope className="nav-icon" />
          <span className="nav-label">Contact</span>
        </div>
      </div>
    </div>
  );
}; 