import React, { useState, useEffect } from 'react';
import './FixedArrow.css';
import arrow from '../assets/arrow.png';

export const FixedArrow = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = ['desktop1', 'desktop2', 'desktop3', 'desktop4', 'desktop5', 'desktop6'];
  
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const nextSection = currentSection + 1 >= sections.length ? 0 : currentSection + 1;
    
    // Find the next section element
    const nextElement = document.querySelector(`.${sections[nextSection]}`);
    
    if (nextElement) {
      // Scroll to next section with smooth behavior
      nextElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center' // Centers the element in the viewport
      });
      
      setCurrentSection(nextSection);
    }
  };
  
  // Detect the current visible section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = window.scrollY + viewportHeight / 2;
      
      // Find which section is most visible
      let maxVisibleSection = 0;
      let maxVisibleArea = 0;
      
      sections.forEach((section, index) => {
        const element = document.querySelector(`.${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = rect.bottom + window.scrollY;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(top, window.scrollY);
          const visibleBottom = Math.min(bottom, window.scrollY + viewportHeight);
          const visibleArea = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            maxVisibleSection = index;
          }
        }
      });
      
      setCurrentSection(maxVisibleSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to initialize
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fixed-arrow-container" onClick={scrollToNextSection}>
      <img className="fixed-arrow" src={arrow} alt="Navigate to next section" />
    </div>
  );
}; 