import React, { useEffect } from 'react';

export const DeskFinal = () => {
  // Create line when component mounts
  useEffect(() => {
    // Check and apply styling immediately
    if (!shouldApplyColorEffect()) {
      // For small screens, ensure all text is black right away
      ensureAllTextIsBlack();
      
      // Make sure the long skills have proper formatting
      ensureLongSkillsFormatting();
    } else {
      // For larger screens, set up the letter differentiation
      setTimeout(() => {
        processLettersRelativeToLine();
      }, 500);
    }
    
    // Set up periodic checks for small screen text color
    let intervalId;
    if (typeof window !== 'undefined') {
      intervalId = setInterval(() => {
        if (!shouldApplyColorEffect()) {
          ensureAllTextIsBlack();
          ensureLongSkillsFormatting();
        }
      }, 300);
    }
    
    // Re-apply the differentiation on resize and scroll events
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updatePositions);
    
    // Clean up when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updatePositions);
      
      // Restore original content if needed
      const spans = document.querySelectorAll('.letter-span');
      if (spans.length > 0) {
        restoreOriginalContent();
      }
      
      // Clear the interval
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Function to ensure long skills are formatted with word breaks
  const ensureLongSkillsFormatting = () => {
    if (!shouldApplyColorEffect()) {
      // Only apply to small screens
      
      // Format OOP skill
      const oopSkill = document.querySelector(".skill-bubble.oop span");
      if (oopSkill && !oopSkill.querySelector('div')) {
        oopSkill.innerHTML = "<div>Object</div><div>Oriented</div><div>Programming</div>";
      }
      
      // Format Machine Learning skill
      const mlSkill = document.querySelector(".skill-bubble.machine-learning span");
      if (mlSkill && !mlSkill.querySelector('div')) {
        mlSkill.innerHTML = "<div>Machine</div><div>Learning</div>";
      }
      
      // Make sure all text inside these divs is black
      const skillDivs = document.querySelectorAll(".skill-bubble.oop span div, .skill-bubble.machine-learning span div");
      skillDivs.forEach(div => {
        div.style.color = 'black';
      });
    }
  };

  // Function to check if we should apply the color effect
  const shouldApplyColorEffect = () => {
    return window.innerWidth > 750;
  };

  // Force all text to black for small screens
  const ensureAllTextIsBlack = () => {
    if (!shouldApplyColorEffect()) {
      // Only apply to small screens
      
      // Reset existing letter spans to black
      const letterSpans = document.querySelectorAll('.letter-span');
      letterSpans.forEach(letter => {
        letter.style.color = 'black';
      });
      
      // Also ensure skill bubbles have black border and text
      const skillBubbles = document.querySelectorAll('.skill-bubble');
      skillBubbles.forEach(bubble => {
        bubble.style.borderColor = 'black';
        bubble.style.color = 'black';
        
        // For small screens, ensure all spans inside bubbles are black too
        const spans = bubble.querySelectorAll('span');
        spans.forEach(span => {
          span.style.color = 'black';
          
          // Also target any children elements
          const children = span.querySelectorAll('*');
          children.forEach(child => {
            child.style.color = 'black';
          });
        });
      });
      
      // Make sure the skills title is also black
      const skillsTitle = document.querySelector('.skills-title');
      if (skillsTitle) {
        skillsTitle.style.color = 'black';
      }
    }
  };

  // Function to calculate line points based on the background edge
  const calculateLinePoints = () => {
    const background = document.querySelector('.background-right');
    if (!background) {
      console.error('Background element not found');
      return [];
    }
    
    const rect = background.getBoundingClientRect();
    
    // Define the top and bottom points of the line using the same offsets as original
    const topX = rect.left + 125;
    const topY = rect.top + 20;
    const bottomX = rect.left + 10;
    const bottomY = rect.bottom - 50;
    
    // Get the center point between the points
    const centerX = (topX + bottomX) / 2;
    const centerY = (topY + bottomY) / 2;
    
    // Calculate the length of the line
    const lineLength = Math.sqrt(Math.pow(bottomY - topY, 2) + Math.pow(bottomX - topX, 2));
    
    // Generate points along the line using the fixed angle approach
    const numberOfPoints = 5;
    const points = [];
    
    for (let i = 0; i <= numberOfPoints; i++) {
      // Calculate the fraction of the way from top to bottom
      const fraction = i / numberOfPoints;
      
      // Calculate the offset from the center based on the fraction
      const offsetDistance = lineLength * (fraction - 0.5);
      
      // Use fixed angle of 190 degrees to match the background edge
      const angleRadians = 170 * (Math.PI / 180);
      const pointX = centerX + offsetDistance * Math.sin(angleRadians);
      const pointY = centerY + offsetDistance * Math.cos(angleRadians);
      
      points.push({ x: pointX, y: pointY });
    }
    
    return points;
  };

  // Split text into individual letters and wrap them in spans
  const wrapTextInLetterSpans = () => {
    // Don't wrap text for small screens
    if (!shouldApplyColorEffect()) return;
    
    // Check if we've already stored the original contents - if so, don't rewrap
    if (window.originalElementContents && Object.keys(window.originalElementContents).length > 0) {
      return;
    }
    
    // Save original HTML content for restoration
    const originalContents = {};
    
    // Get all span elements in skill bubbles
    const spanElements = document.querySelectorAll('.skill-bubble span');
    
    spanElements.forEach((element, index) => {
      // Save original content before modification
      originalContents[`span-${index}`] = element.innerHTML;
      
      // Special handling for C Language skill bubble
      if (element.parentElement && element.parentElement.classList.contains('c-language')) {
        // For C Language, use a direct approach
        element.innerHTML = '<span class="letter-span" style="display:inline-block;">C</span>' +
                           '<span class="letter-span space-span" style="display:inline-block;">&nbsp;</span>' +
                           '<span class="letter-span" style="display:inline-block;">L</span>' +
                           '<span class="letter-span" style="display:inline-block;">a</span>' +
                           '<span class="letter-span" style="display:inline-block;">n</span>' +
                           '<span class="letter-span" style="display:inline-block;">g</span>' +
                           '<span class="letter-span" style="display:inline-block;">u</span>' +
                           '<span class="letter-span" style="display:inline-block;">a</span>' +
                           '<span class="letter-span" style="display:inline-block;">g</span>' +
                           '<span class="letter-span" style="display:inline-block;">e</span>';
        return;
      }
      
      const html = element.innerHTML;
      
      // Don't process if it contains div elements (for our formatted long skills)
      if (html.indexOf('<div>') !== -1) {
        return;
      }
      
      // Use a regex approach to handle HTML tags properly
      // This regex preserves HTML tags and treats each character outside tags separately
      const processedHtml = html.replace(/(<[^>]*>)|([^<]*)/g, (match, tag, text) => {
        if (tag) {
          // If it's an HTML tag, keep it as is
          return tag;
        } else if (text) {
          // If it's text content, process each character
          let processed = '';
          for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ' || text[i] === '\n' || text[i] === '\r') {
              // For spaces and line breaks, use a non-breaking space in a span
              // to ensure it has layout properties but preserves whitespace
              processed += '<span class="letter-span space-span" style="display:inline-block;">&nbsp;</span>';
            } else {
              // For other characters, wrap in a span
              processed += `<span class="letter-span" style="display:inline-block;">${text[i]}</span>`;
            }
          }
          return processed;
        }
        return match;
      });
      
      // Set the new HTML
      element.innerHTML = processedHtml;
    });
    
    // NOW HANDLE THE SKILLS TITLE
    const skillsTitle = document.querySelector('.skills-title');
    if (skillsTitle) {
      // Save original content
      originalContents['skills-title'] = skillsTitle.innerHTML;
      
      const titleText = skillsTitle.textContent;
      if (titleText) {
        let newTitleHTML = '';
        
        // Process each character in the title
        for (let i = 0; i < titleText.length; i++) {
          const char = titleText[i];
          
          // Handle spaces with non-breaking space in a span
          if (char === ' ') {
            newTitleHTML += '<span class="letter-span space-span" style="display:inline-block;">&nbsp;</span>';
          } else {
            newTitleHTML += `<span class="letter-span title-letter-span" style="display:inline-block;">${char}</span>`;
          }
        }
        
        // Update the title HTML
        skillsTitle.innerHTML = newTitleHTML;
      }
    }
    
    // Store original contents for potential restoration
    window.originalElementContents = originalContents;
  };

  // Complete function to categorize and style letters
  const processLettersRelativeToLine = () => {
    // For screens below 700px, only ensure all text is black
    // and skip the character wrapping and positioning logic
    if (!shouldApplyColorEffect()) {
      ensureAllTextIsBlack();
      ensureLongSkillsFormatting();
      return;
    }
    
    // For larger screens, do the full processing
    wrapTextInLetterSpans();
    const linePoints = calculateLinePoints();
    applyStylesToLetters(linePoints);
    applyBorderColors(linePoints);
  };

  // Handler for window resize
  const handleResize = () => {
    // Use requestAnimationFrame to ensure calculations happen after layout
    requestAnimationFrame(() => {
      const isSmallScreen = !shouldApplyColorEffect();
      const hasLetterSpans = document.querySelectorAll('.letter-span').length > 0;
      
      // If we're switching from large to small screen
      if (isSmallScreen && hasLetterSpans) {
        // Restore original content first to prevent "&amp;" issue
        restoreOriginalContent();
        // Then make everything black
        ensureAllTextIsBlack();
        // Format long skills
        ensureLongSkillsFormatting();
      } 
      // If we're switching from small to large screen
      else if (!isSmallScreen && !hasLetterSpans) {
        // Apply the full large screen processing
        processLettersRelativeToLine();
      }
      // Otherwise just update the current mode
      else {
        updatePositions();
      }
    });
  };

  // Update all positions and styling
  const updatePositions = () => {
    processLettersRelativeToLine();
  };

  // Function to get the position of a DOM element
  const getElementPosition = (element) => {
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    return { x: centerX, y: centerY };
  };

  // Function to determine if a point is to the left or right of a line
  const getPointSideOfLine = (point, linePoints) => {
    if (linePoints.length < 2) return 'unknown';
    
    // Get two points from the line
    const point1 = linePoints[0];
    const point2 = linePoints[linePoints.length - 1];
    
    // Formula to determine which side of a line a point is on
    // (x - x1)(y2 - y1) - (y - y1)(x2 - x1)
    // If result > 0, point is on the left, if < 0, point is on the right
    const value = (point.x - point1.x) * (point2.y - point1.y) - 
                  (point.y - point1.y) * (point2.x - point1.x);
    
    return value > 0 ? 'left' : (value < 0 ? 'right' : 'on the line');
  };

  // Apply styling to letters based on their side
  const applyStylesToLetters = (linePoints) => {
    // If screen is small, set all letters to black
    if (!shouldApplyColorEffect()) {
      ensureAllTextIsBlack();
      return;
    }
    
    const letterSpans = document.querySelectorAll('.letter-span');
    
    letterSpans.forEach(letter => {
      const position = getElementPosition(letter);
      if (!position) return;
      
      const side = getPointSideOfLine(position, linePoints);
      
      // Reset styles
      letter.style.color = '';
      letter.dataset.side = '';
      
      // Apply styles based on side
      if (side === 'left') {
        letter.style.color = 'black';
        letter.dataset.side = 'left';
      } else if (side === 'right') {
        letter.style.color = 'white';
        letter.dataset.side = 'right';
      }
      
      // Add some additional styling for title letters if needed
      if (letter.classList.contains('title-letter-span')) {
        letter.style.fontWeight = 'normal';
        // You could add other special styling for title letters here
      }
    });
  };

  // Determine which side of the line a bubble is predominantly on
  const determineBubbleSide = (bubble, linePoints) => {
    if (!bubble || linePoints.length < 2) return 'unknown';
    
    const bubbleRect = bubble.getBoundingClientRect();
    const samplePoints = [];
    const sampleSize = 9; // 3x3 grid of sample points
    
    // Create a grid of sample points throughout the bubble
    for (let i = 0; i < sampleSize; i++) {
      const x = bubbleRect.left + (bubbleRect.width * (i % 3 + 0.5)) / 3;
      const y = bubbleRect.top + (bubbleRect.height * (Math.floor(i / 3) + 0.5)) / 3;
      samplePoints.push({ x, y });
    }
    
    // Count how many points are on each side
    let leftCount = 0;
    let rightCount = 0;
    
    samplePoints.forEach(point => {
      const side = getPointSideOfLine(point, linePoints);
      if (side === 'left') leftCount++;
      else if (side === 'right') rightCount++;
    });
    
    // Determine predominant side (more than 50%)
    if (leftCount > rightCount) return 'left';
    if (rightCount > leftCount) return 'right';
    return 'mixed'; // Equal distribution
  };

  // Apply border color to skill bubbles
  const applyBorderColors = (linePoints) => {
    // If screen is small, set all bubble borders to black
    if (!shouldApplyColorEffect()) {
      ensureAllTextIsBlack();
      return;
    }
    
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    
    skillBubbles.forEach(bubble => {
      const side = determineBubbleSide(bubble, linePoints);
      
      // Apply border color based on predominant side
      if (side === 'left') {
        bubble.style.borderColor = 'black';
      } else if (side === 'right') {
        bubble.style.borderColor = 'white';
      } else {
        // For mixed cases, keep original border or set a neutral color
        bubble.style.borderColor = 'gray';
      }
    });
  };

  // Restore original content if needed - fixed to prevent "&amp;" issue
  const restoreOriginalContent = () => {
    if (window.originalElementContents) {
      // Restore each saved content
      Object.entries(window.originalElementContents).forEach(([selector, content]) => {
        if (selector === 'skills-title') {
          const element = document.querySelector('.skills-title');
          if (element) element.innerHTML = content;
        } else if (selector.startsWith('span-')) {
          const index = parseInt(selector.split('-')[1]);
          const spans = document.querySelectorAll('.skill-bubble span');
          if (spans[index]) {
            // Set the inner HTML directly, this should prevent the "&amp;" issue
            spans[index].innerHTML = content;
          }
        }
      });
      
      // After restoring, clear the stored content to prevent multiple restorations
      window.originalElementContents = {};
    }
  };

  return (
    <div>
      {/* Empty component - all work is done via DOM manipulation */}
    </div>
  );
};