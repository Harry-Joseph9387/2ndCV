// Desktop3.js
import React from 'react';
import './style3.css';
import arrow from '../assets/arrow.png';
import { useEffect, useRef, useState } from 'react';

export const Desktop3 = () => {
  const lineRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check if screen is small (below 700px)
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 700);
  };

  // Function to force black text on all skill elements - only for small screens
  const forceBlackTextForSmallScreen = () => {
    if (window.innerWidth <= 700) {
      // Force black text on all skill bubbles and their children
      const skillBubbles = document.querySelectorAll(".skill-bubble");
      skillBubbles.forEach(bubble => {
        bubble.style.color = 'black';
        bubble.style.borderColor = 'black';
        
        // Force black text on all spans inside bubbles
        const spans = bubble.querySelectorAll("span");
        spans.forEach(span => {
          span.style.color = 'black';
          
          // Also force black text on any children of spans (like letter-spans)
          const children = span.querySelectorAll("*");
          children.forEach(child => {
            child.style.color = 'black';
          });
        });
      });
      
      // Make sure title is black too
      const title = document.querySelector(".skills-title");
      if (title) {
        title.style.color = 'black';
      }
    }
  };

  // Function to format long skills (for all screen sizes)
  const formatLongSkills = () => {
    // Format OOP skill
    const oopSkill = document.querySelector(".skill-bubble.oop span");
    if (oopSkill && !oopSkill.querySelector('div') && !oopSkill.dataset.processed) {
      try {
        // Mark as processed first to prevent double-processing
        oopSkill.dataset.processed = "true";
        oopSkill.innerHTML = "<div>Object</div><div>Oriented</div><div>Programming</div>";
      } catch (e) {
        console.error("Error formatting OOP skill:", e);
      }
    }
    
    // Format Machine Learning skill
    const mlSkill = document.querySelector(".skill-bubble.machine-learning span");
    if (mlSkill && !mlSkill.querySelector('div') && !mlSkill.dataset.processed) {
      try {
        // Mark as processed first to prevent double-processing
        mlSkill.dataset.processed = "true";
        mlSkill.innerHTML = "<div>Machine</div><div>Learning</div>";
      } catch (e) {
        console.error("Error formatting ML skill:", e);
      }
    }
  };

  useEffect(() => {
    // Initial check
    checkScreenSize();
    
    // Force black text initially if on small screen
    forceBlackTextForSmallScreen();
    
    // Format long skills initially - for all screen sizes
    setTimeout(() => {
      formatLongSkills();
    }, 100);
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('resize', forceBlackTextForSmallScreen);
    
    // Run periodically to ensure black text sticks on small screens
    const intervalId = setInterval(() => {
      forceBlackTextForSmallScreen();
    }, 500);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('resize', forceBlackTextForSmallScreen);
      clearInterval(intervalId);
    };
  }, []);
  
  useEffect(() => {
    const updateBubblePositions = () => {
      // Skip positioning for small screens - let CSS handle it
      if (isSmallScreen) {
        // Remove any absolute positioning that might have been applied
        const bubbles = document.querySelectorAll(".skill-bubble");
        bubbles.forEach(bubble => {
          bubble.style.position = "";
          bubble.style.left = "";
          bubble.style.top = "";
          
          // Force black color on each bubble and its contents
          bubble.style.color = 'black';
          bubble.style.borderColor = 'black';
          
          const spans = bubble.querySelectorAll("span");
          spans.forEach(span => {
            span.style.color = 'black';
            
            // Get all letter spans
            const letterSpans = span.querySelectorAll(".letter-span");
            letterSpans.forEach(letterSpan => {
              letterSpan.style.color = 'black';
            });
          });
        });
        
        // On small screens, ensure the skills container is properly centered
        const skillsSection = document.querySelector(".skills-section");
        const skillsContainer = document.querySelector(".skills");
        const title = document.querySelector(".skills-title");
        
        if (skillsSection && skillsContainer && title) {
          skillsSection.style.display = 'flex';
          skillsSection.style.flexDirection = 'column';
          skillsSection.style.alignItems = 'center';
          skillsSection.style.justifyContent = 'center';
          title.style.color = 'black';
        }
        
        return;
      }
      
      const bubbles = document.querySelectorAll(".skill-bubble");
      const center = document.querySelector(".skills-section");
    
      if (!center || bubbles.length === 0) return;
    
      // Define different radii for X (horizontal) and Y (vertical) to create an ellipse
      const radiusX = center.clientWidth / 3; // Adjust for desired width
      const radiusY = center.clientHeight / 3; // Adjust for desired height
      const centerX = center.clientWidth / 2;
      const centerY = center.clientHeight / 2;
      const totalBubbles = bubbles.length;
      const angleOffset = Math.PI / totalBubbles; // Prevent overlaps
    
      bubbles.forEach((bubble, index) => {
        const angle = (index / totalBubbles) * (2 * Math.PI) + angleOffset;
        const x = centerX + radiusX * Math.cos(angle) - bubble.clientWidth / 2;
        const y = centerY + radiusY * Math.sin(angle) - bubble.clientHeight / 2;
    
        bubble.style.position = "absolute";
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
      });
    };
    
    updateBubblePositions();
    
    // Force black text if small screen
    if (isSmallScreen) {
      forceBlackTextForSmallScreen();
    }
    
    window.addEventListener("resize", updateBubblePositions);
  
    return () => {
      window.removeEventListener("resize", updateBubblePositions);
    };
  }, [isSmallScreen]); // Re-run when screen size changes
  
  return (
    <div className="desktop3">
      <div className="div">
        <div className="skills-section">
          <h1 className="skills-title">SKILLS</h1>
          <div className="skills">
            <div className="skill-bubble oop">
              <span>Object Oriented Programming</span>
            </div>
            
            <div className="skill-bubble python">
              <span>Python</span>
            </div>
            
            <div className="skill-bubble c-language">
              <span>C Language</span>
            </div>
            
            <div className="skill-bubble machine-learning">
              <span>Machine Learning</span>
            </div>
            
            <div className="skill-bubble react">
              <span>React</span>
            </div>
            
            <div className="skill-bubble flask">
              <span>Flask</span>
            </div>
            
            <div className="skill-bubble mongodb">
              <span>MongoDB</span>
            </div>
            
            <div className="skill-bubble mysql">
              <span>Mysql</span>
            </div>
            
            <div className="skill-bubble postgresql">
              <span>PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};