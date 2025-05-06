import React from 'react';
import './style3.css';
import arrow from '../assets/arrow.png';
import { useEffect, useRef, useState } from 'react';

export const Desktop3 = () => {
  const lineRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check if screen is small (below 750px)
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 750);
  };

  // Function to force black text on all skill elements - only for small screens
  const forceBlackTextForSmallScreen = () => {
    if (window.innerWidth <= 750) {
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
    
    // Format Artificial Neural Network skill (small screens only)
    if (window.innerWidth <= 750) {
      const annSkill = document.querySelector(".skill-bubble.neural-network span");
      if (annSkill && !annSkill.querySelector('div') && !annSkill.dataset.processed) {
        try {
          annSkill.dataset.processed = "true";
          annSkill.innerHTML = "<div>Artificial</div><div>Neural</div><div>Network</div>";
        } catch (e) {
          console.error("Error formatting ANN skill:", e);
        }
      }
      
      // Format Data Structures skill to not be on same line
      const dataStructuresSkill = document.querySelector(".skill-bubble.data-structures span");
      if (dataStructuresSkill && !dataStructuresSkill.querySelector('div') && !dataStructuresSkill.dataset.processed) {
        try {
          dataStructuresSkill.dataset.processed = "true";
          dataStructuresSkill.innerHTML = "<div>Data</div><div>Structures</div>";
        } catch (e) {
          console.error("Error formatting Data Structures skill:", e);
        }
      }
      
      // Format C Language skill to not be on same line
      const cLanguageSkill = document.querySelector(".skill-bubble.c-language span");
      if (cLanguageSkill && !cLanguageSkill.querySelector('div') && !cLanguageSkill.dataset.processed) {
        try {
          cLanguageSkill.dataset.processed = "true";
          cLanguageSkill.innerHTML = "<div>C</div><div>Language</div>";
        } catch (e) {
          console.error("Error formatting C Language skill:", e);
        }
      }
    }
  };

  // Function to handle mobile-only skills
  const manageMobileSkills = () => {
    if (window.innerWidth <= 750) {
      // Check if mobile skills container already exists
      let mobileSkillsContainer = document.querySelector('.mobile-only-skills');
      
      if (!mobileSkillsContainer) {
        // Create the additional skills for mobile
        const skillsContainer = document.querySelector('.skills');
        
        if (skillsContainer) {
          // Create additional skill bubbles
          const additionalSkills = [
            { class: 'neural-network', text: 'Artificial Neural Network' },
            { class: 'database', text: 'Database Management' },
            { class: 'data-structures', text: 'Data Structures' }
          ];
          
          additionalSkills.forEach(skill => {
            const bubbleExists = document.querySelector(`.skill-bubble.${skill.class}`);
            
            if (!bubbleExists) {
              const skillBubble = document.createElement('div');
              skillBubble.className = `skill-bubble ${skill.class}`;
              skillBubble.dataset.mobileOnly = 'true';
              
              const skillText = document.createElement('span');
              skillText.textContent = skill.text;
              
              skillBubble.appendChild(skillText);
              skillsContainer.appendChild(skillBubble);
            }
          });
        }
      }
    } else {
      // Remove mobile-only skills when screen size is larger
      const mobileSkills = document.querySelectorAll('.skill-bubble[data-mobile-only="true"]');
      mobileSkills.forEach(skill => {
        skill.remove();
      });
    }
    
    // Format all skills after adding/removing
    setTimeout(() => {
      formatLongSkills();
    }, 100);
  };

  // New function to arrange bubbles around the title
  const arrangeScatteredBubbles = () => {
    if (window.innerWidth <= 750) {
      const container = document.querySelector(".skills");
      const bubbles = document.querySelectorAll(".skill-bubble");
      const title = document.querySelector(".skills-title");
      
      if (!container || bubbles.length === 0 || !title) return;
      
      // First, remove any existing animation classes and reset animation styles
      bubbles.forEach(bubble => {
        // Reset animation-related inline styles but keep the CSS animations
        bubble.style.transform = "";
        
        // Make sure bubble has the proper small screen styling
        bubble.style.color = "black";
        bubble.style.borderColor = "rgba(0, 0, 0, 0.6)";
        bubble.style.borderWidth = "1px";
        bubble.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        bubble.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.8)";
        bubble.style.backdropFilter = "blur(5px)";
        bubble.style.transition = "all 0.3s ease";
        bubble.style.minWidth = "auto"; // Ensure min-width is auto for all bubbles
        
        // Set proper size for mobile
        if (window.innerWidth <= 400) {
          bubble.style.fontSize = "11px";
          bubble.style.padding = "8px 12px";
          bubble.style.maxWidth = "85px";
          bubble.style.minWidth = "auto"; // Ensure min-width is auto
          bubble.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.8)";
        } else {
          bubble.style.fontSize = "13px";
          bubble.style.padding = "8px 12px";
          bubble.style.maxWidth = "110px";
          bubble.style.minWidth = "auto"; // Ensure min-width is auto
        }
        
        // Special case for multi-word skills
        if (bubble.classList.contains('oop') || 
            bubble.classList.contains('machine-learning') ||
            bubble.classList.contains('neural-network') || 
            bubble.classList.contains('database') || 
            bubble.classList.contains('data-structures')) {
          
          if (window.innerWidth <= 400) {
            bubble.style.fontSize = "10px";
            bubble.style.padding = "8px 12px"; // Consistent padding
            bubble.style.maxWidth = window.innerWidth <= 400 ? "75px" : "90px";
          } else {
            bubble.style.fontSize = "11px";
            bubble.style.padding = "8px 12px"; // Consistent padding
            bubble.style.maxWidth = "90px";
          }
          
          // Special gradient for multi-word skills
          bubble.style.background = "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.9) 100%)";
        }
      });
      
      // Ensure the container has the right dimensions
      container.style.position = "relative";
      let containerHeight = 500;
      if (window.innerWidth <= 400) {
        containerHeight = 450;
      } else if (window.innerWidth <= 500) {
        containerHeight = 480;
      }
      container.style.height = `${containerHeight}px`;
      container.style.width = "90%";
      container.style.margin = "0 auto";
      
      // Style and position the title in the center
      title.style.position = "absolute";
      title.style.top = "50%";
      title.style.left = "50%";
      title.style.transform = "translate(-50%, -50%)";
      title.style.margin = "0";
      title.style.zIndex = "10";
      title.style.fontSize = "30px";
      title.style.fontWeight = "bold";
      title.style.color = "black";
      
      // Get title dimensions for positioning bubbles around it
      const titleRect = title.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const titleX = titleRect.left - containerRect.left;
      const titleY = titleRect.top - containerRect.top;
      const titleWidth = titleRect.width;
      const titleHeight = titleRect.height;
      
      // Define safe zone around title (where bubbles shouldn't be placed)
      const titleBuffer = 20;
      const titleSafeZone = {
        left: titleX - titleBuffer,
        right: titleX + titleWidth + titleBuffer,
        top: titleY - titleBuffer,
        bottom: titleY + titleHeight + titleBuffer,
        centerX: titleX + titleWidth/2,
        centerY: titleY + titleHeight/2
      };
      
      // Reset bubbles first to get natural dimensions
      bubbles.forEach(bubble => {
        bubble.style.position = "";
        bubble.style.left = "";
        bubble.style.top = "";
        bubble.style.margin = "";
      });
      
      // Wait for bubbles to reflow to get accurate dimensions
      setTimeout(() => {
        const containerWidth = container.clientWidth;
        const edgeMargin = window.innerWidth <= 400 ? 10 : 15;
        const bubbleBuffer = window.innerWidth <= 400 ? 15 : 20; // Space between bubbles
        
        // Categorize bubbles by length (single-word vs multi-word)
        const singleWordBubbles = [];
        const multiWordBubbles = [];
        
        bubbles.forEach(bubble => {
          const text = bubble.innerText.trim();
          const words = text.split(/\s+/);
          
          if (words.length === 1) {
            singleWordBubbles.push(bubble);
          } else {
            multiWordBubbles.push(bubble);
          }
          
          // Set basic styles for all bubbles
          bubble.style.position = "absolute";
          bubble.style.margin = "0";
          bubble.style.color = "black";
          bubble.style.borderColor = "black";
          bubble.style.zIndex = "1";
        });
        
        // Track placed bubbles for collision detection
        const placedBubbles = [];
        
        // Helper function to check if a position collides with existing bubbles
        const checkCollision = (x, y, width, height) => {
          // Check collision with title safe zone
          const collidesWithTitle = (
            x + width > titleSafeZone.left &&
            x < titleSafeZone.right &&
            y + height > titleSafeZone.top &&
            y < titleSafeZone.bottom
          );
          
          if (collidesWithTitle) return true;
          
          // Check collision with other bubbles
          return placedBubbles.some(placed => {
            return !(
              x + width + bubbleBuffer < placed.left ||
              x > placed.right + bubbleBuffer ||
              y + height + bubbleBuffer < placed.top ||
              y > placed.bottom + bubbleBuffer
            );
          });
        };
        
        // Place single-word bubbles on the sides of the title
        singleWordBubbles.forEach((bubble, index) => {
          const width = bubble.offsetWidth;
          const height = bubble.offsetHeight;
          
          // Try to find a valid position on the sides
          let validPosition = false;
          let attempts = 0;
          let x, y;
          
          while (!validPosition && attempts < 50) {
            // Decide which side of the title to place the bubble (left or right)
            const side = Math.random() > 0.5 ? 'left' : 'right';
            
            if (side === 'left') {
              // Position on left side of title
              const minX = edgeMargin;
              const maxX = titleSafeZone.left - width - bubbleBuffer;
              const areaWidth = maxX - minX;
              
              if (areaWidth > width) { // Make sure we have enough space
                x = minX + Math.random() * areaWidth;
                // Vary Y position but keep somewhat close to title's Y level
                const yVariation = containerHeight * 0.4; // How far up/down from title center
                y = titleSafeZone.centerY - height/2 + (Math.random() * 2 - 1) * yVariation;
              } else {
                // Not enough space on left, try right side
                const minX = titleSafeZone.right + bubbleBuffer;
                const maxX = containerWidth - width - edgeMargin;
                x = minX + Math.random() * (maxX - minX);
                const yVariation = containerHeight * 0.4;
                y = titleSafeZone.centerY - height/2 + (Math.random() * 2 - 1) * yVariation;
              }
            } else {
              // Position on right side of title
              const minX = titleSafeZone.right + bubbleBuffer;
              const maxX = containerWidth - width - edgeMargin;
              const areaWidth = maxX - minX;
              
              if (areaWidth > width) { // Make sure we have enough space
                x = minX + Math.random() * areaWidth;
                const yVariation = containerHeight * 0.4;
                y = titleSafeZone.centerY - height/2 + (Math.random() * 2 - 1) * yVariation;
              } else {
                // Not enough space on right, try left side
                const minX = edgeMargin;
                const maxX = titleSafeZone.left - width - bubbleBuffer;
                x = minX + Math.random() * (maxX - minX);
                const yVariation = containerHeight * 0.4;
                y = titleSafeZone.centerY - height/2 + (Math.random() * 2 - 1) * yVariation;
              }
            }
            
            // Ensure bubble stays within container bounds
            x = Math.max(edgeMargin, Math.min(containerWidth - width - edgeMargin, x));
            y = Math.max(edgeMargin, Math.min(containerHeight - height - edgeMargin, y));
            
            // Check for collisions
            validPosition = !checkCollision(x, y, width, height);
            attempts++;
          }
          
          // If we couldn't find a valid position, try a completely random one
          if (!validPosition) {
            attempts = 0;
            while (!validPosition && attempts < 50) {
              x = Math.random() * (containerWidth - width - 2 * edgeMargin) + edgeMargin;
              y = Math.random() * (containerHeight - height - 2 * edgeMargin) + edgeMargin;
              
              validPosition = !checkCollision(x, y, width, height);
              attempts++;
            }
          }
          
          // Apply position
          bubble.style.left = `${x}px`;
          bubble.style.top = `${y}px`;
          
          // Track position
          placedBubbles.push({
            left: x,
            right: x + width,
            top: y,
            bottom: y + height
          });
        });
        
        // Place multi-word bubbles above and below the title, alternating
        let placeAbove = true;
        
        multiWordBubbles.forEach((bubble, index) => {
          const width = bubble.offsetWidth;
          const height = bubble.offsetHeight;
          
          let validPosition = false;
          let attempts = 0;
          let x, y;
          
          while (!validPosition && attempts < 50) {
            // Position X randomly but centered around the title's X
            const xVariation = containerWidth * 0.5; // How far left/right from title center
            x = titleSafeZone.centerX - width/2 + (Math.random() * 2 - 1) * xVariation;
            
            // Position above or below the title, alternating
            if (placeAbove) {
              const minY = edgeMargin;
              const maxY = titleSafeZone.top - height - bubbleBuffer;
              if (maxY > minY) {
                y = minY + Math.random() * (maxY - minY);
              } else {
                // Not enough space above, try below
                const minY = titleSafeZone.bottom + bubbleBuffer;
                const maxY = containerHeight - height - edgeMargin;
                y = minY + Math.random() * (maxY - minY);
              }
            } else {
              const minY = titleSafeZone.bottom + bubbleBuffer;
              const maxY = containerHeight - height - edgeMargin;
              if (maxY > minY) {
                y = minY + Math.random() * (maxY - minY);
              } else {
                // Not enough space below, try above
                const minY = edgeMargin;
                const maxY = titleSafeZone.top - height - bubbleBuffer;
                y = minY + Math.random() * (maxY - minY);
              }
            }
            
            // Ensure bubble stays within container bounds
            x = Math.max(edgeMargin, Math.min(containerWidth - width - edgeMargin, x));
            y = Math.max(edgeMargin, Math.min(containerHeight - height - edgeMargin, y));
            
            // Check for collisions
            validPosition = !checkCollision(x, y, width, height);
            attempts++;
          }
          
          // If we couldn't find a valid position, try a completely random one
          if (!validPosition) {
            attempts = 0;
            while (!validPosition && attempts < 50) {
              x = Math.random() * (containerWidth - width - 2 * edgeMargin) + edgeMargin;
              y = Math.random() * (containerHeight - height - 2 * edgeMargin) + edgeMargin;
              
              validPosition = !checkCollision(x, y, width, height);
              attempts++;
            }
          }
          
          // Apply position
          bubble.style.left = `${x}px`;
          bubble.style.top = `${y}px`;
          
          // Track position
          placedBubbles.push({
            left: x,
            right: x + width,
            top: y,
            bottom: y + height
          });
          
          // Alternate above/below for next bubble
          placeAbove = !placeAbove;
        });
      }, 100);
    }
  };

  useEffect(() => {
    // Initial check
    checkScreenSize();
    
    // Manage mobile-only skills
    manageMobileSkills();
    
    // Force black text initially if on small screen
    forceBlackTextForSmallScreen();
    
    // Format long skills initially - for all screen sizes
    setTimeout(() => {
      formatLongSkills();
    }, 100);
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('resize', manageMobileSkills);
    window.addEventListener('resize', forceBlackTextForSmallScreen);
    
    // Run periodically to ensure black text sticks on small screens
    const intervalId = setInterval(() => {
      forceBlackTextForSmallScreen();
    }, 500);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('resize', manageMobileSkills);
      window.removeEventListener('resize', forceBlackTextForSmallScreen);
      clearInterval(intervalId);
    };
  }, []);
  
  useEffect(() => {
    const updateBubblePositions = () => {
      // For small screens: scattered bubble layout
      if (isSmallScreen) {
        // Apply the scattered layout
        setTimeout(() => {
          arrangeScatteredBubbles();
          
          // Ensure text colors are correct
          forceBlackTextForSmallScreen();
          
          // Make sure small screen styles are applied
          const bubbles = document.querySelectorAll(".skill-bubble");
          bubbles.forEach(bubble => {
            // Set specific small screen styles
            bubble.style.fontSize = window.innerWidth <= 400 ? "11px" : "13px";
            bubble.style.padding = window.innerWidth <= 400 ? "8px 12px" : "8px 12px";
            bubble.style.maxHeight = "35px";
            bubble.style.borderWidth = "1px";
            
            // Special case for multi-word skills
            if (bubble.classList.contains('oop') || 
                bubble.classList.contains('machine-learning') ||
                bubble.classList.contains('neural-network') || 
                bubble.classList.contains('database') || 
                bubble.classList.contains('data-structures')) {
              
              if (window.innerWidth <= 400) {
                bubble.style.fontSize = "10px";
                bubble.style.padding = "8px 12px"; // Consistent padding
                bubble.style.maxWidth = window.innerWidth <= 400 ? "75px" : "90px";
              } else {
                bubble.style.fontSize = "11px";
                bubble.style.padding = "8px 12px"; // Consistent padding
                bubble.style.maxWidth = "90px";
              }
            } else {
              bubble.style.maxWidth = window.innerWidth <= 400 ? "85px" : "110px";
            }
          });
        }, 200);
        
        return;
      }
      
      // For larger screens: circular layout
      const bubbles = document.querySelectorAll(".skill-bubble");
      const center = document.querySelector(".skills-section");
      const container = document.querySelector(".skills");
    
      if (!center || bubbles.length === 0) return;
    
      // Remove any animation classes that might be applied
      bubbles.forEach(bubble => {
        bubble.classList.remove('floating');
        bubble.classList.remove('floating-horizontal');
        bubble.classList.remove('floating-rotate');
      });
      
      // Reset container styles when going back to large screen
      if (container) {
        container.style = ""; // Clear all inline styles
        container.style.position = "relative";
        container.style.width = "100%";
        container.style.height = "100%";
      }
      
      // Reset the skills section styles
      if (center) {
        center.style = ""; // Clear all inline styles
        center.style.height = "100%";
        center.style.width = "100%";
        center.style.display = "flex";
        center.style.justifyContent = "center";
        center.style.alignItems = "center";
      }
      
      // Reset title styles
      const title = document.querySelector(".skills-title");
      if (title) {
        title.style = ""; // Clear all inline styles
        title.style.position = "absolute";
        title.style.top = "50%";
        title.style.left = "50%";
        title.style.transform = "translate(-50%, -50%)";
        
        // Set font size based on viewport width
        if (window.innerWidth <= 800) {
          title.style.fontSize = "75px";
        } else if (window.innerWidth <= 900) {
          title.style.fontSize = "80px";
        } else if (window.innerWidth <= 1000) {
          title.style.fontSize = "85px";
        } else {
          title.style.fontSize = "96px";
        }
      }
    
      // Define different radii for X (horizontal) and Y (vertical) to create an ellipse
      const radiusX = center.clientWidth / 3; // Adjust for desired width
      const radiusY = center.clientHeight / 3; // Adjust for desired height
      const centerX = center.clientWidth / 2;
      const centerY = center.clientHeight / 2;
      const totalBubbles = bubbles.length;
      const angleOffset = Math.PI / totalBubbles; // Prevent overlaps
    
      bubbles.forEach((bubble, index) => {
        // Clear all inline styles first
        bubble.style = "";
        
        // Set basic styles for large screens
        bubble.style.position = "absolute";
        bubble.style.color = "white";
        bubble.style.borderColor = "black";
        bubble.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        bubble.style.background = "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)";
        bubble.style.backdropFilter = "blur(2px)";
        bubble.style.transition = "all 0.3s ease";
        
        // Set position based on circular layout
        const angle = (index / totalBubbles) * (2 * Math.PI) + angleOffset;
        const x = centerX + radiusX * Math.cos(angle) - bubble.clientWidth / 2;
        const y = centerY + radiusY * Math.sin(angle) - bubble.clientHeight / 2;
        
        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;
        
        // Set size based on screen width
        if (window.innerWidth <= 800) {
          bubble.style.fontSize = "18px";
          bubble.style.minWidth = "100px";
          // bubble.style.padding = "36px 22px";
        } else if (window.innerWidth <= 900) {
          bubble.style.fontSize = "20px";
          bubble.style.minWidth = "110px";
          // bubble.style.padding = "35px 22px";
        } else if (window.innerWidth <= 1000) {
          bubble.style.fontSize = "22px";
          bubble.style.minWidth = "110px";
          bubble.style.padding = "40px 25px";
        } else {
          bubble.style.fontSize = "25px";
          bubble.style.minWidth = "120px";
          // bubble.style.padding = "40px 30px";
        }
      });
    };
    
    // Initial update
    updateBubblePositions();
    
    // Format long skills
    formatLongSkills();
    
    // Update on resize
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
            
            {/* The mobile-only skills will be added dynamically by JS */}
          </div>
        </div>
      </div>
    </div>
  );
};