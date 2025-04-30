import React, { useEffect, useRef } from 'react';

export const Deskkk = () => {
  // Use useRef to maintain references across renders
  const markersRef = useRef([]);
  const lineRef = useRef(null);
  const pointMarkersRef = useRef([]);
  
  // Create line markers when component mounts
  useEffect(() => {
    // Create and add markers to the DOM after a short delay to ensure DOM is ready
    setTimeout(() => {
      createLineMarkers();
      createLine();
      createPointMarkers();
      processLettersRelativeToLine();
    }, 500);
    
    // Set up event listeners for resize and scroll
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updatePositions);
    
    // Clean up function to remove markers and event listeners when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updatePositions);
      
      // Remove markers
      markersRef.current.forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
      
      // Remove the line
      if (lineRef.current && lineRef.current.parentNode) {
        lineRef.current.parentNode.removeChild(lineRef.current);
      }
      
      // Remove point markers
      removePointMarkers();
    };
  }, []);

  // Function to create initial markers that align with the background edge
  const createLineMarkers = () => {
    // Get the background element
    const background = document.querySelector('.background-right');
    if (!background) {
      console.error('Background element not found');
      return;
    }
    
    // Get the background's position and dimensions
    const rect = background.getBoundingClientRect();
    
    // Create top marker - place it exactly on the left edge with offset
    const topMarker = document.createElement('div');
    topMarker.className = 'marker marker-top';
    topMarker.style.position = 'fixed';
    topMarker.style.left = `${rect.left + 125}px`; // Follow edge with offset from Desk.jsx
    topMarker.style.top = `${rect.top + 20}px`;
    topMarker.style.width = '15px';
    topMarker.style.height = '15px';
    topMarker.style.borderRadius = '50%';
    topMarker.style.backgroundColor = 'red';
    topMarker.style.cursor = 'move';
    topMarker.style.zIndex = '10000';
    topMarker.style.boxShadow = '0 0 5px white';
    
    // Create bottom marker - place it exactly on the left edge with offset
    const bottomMarker = document.createElement('div');
    bottomMarker.className = 'marker marker-bottom';
    bottomMarker.style.position = 'fixed';
    bottomMarker.style.left = `${rect.left + 10}px`; // Follow edge with offset from Desk.jsx
    bottomMarker.style.top = `${rect.bottom - 50}px`;
    bottomMarker.style.width = '15px';
    bottomMarker.style.height = '15px';
    bottomMarker.style.borderRadius = '50%';
    bottomMarker.style.backgroundColor = 'blue';
    bottomMarker.style.cursor = 'move';
    bottomMarker.style.zIndex = '10000';
    bottomMarker.style.boxShadow = '0 0 5px white';
    
    // Add markers to document
    document.body.appendChild(topMarker);
    document.body.appendChild(bottomMarker);
    
    // Store markers in our reference
    markersRef.current = [topMarker, bottomMarker];
    
    // Make markers draggable
    makeElementDraggable(topMarker);
    makeElementDraggable(bottomMarker);
    
    return markersRef.current;
  };

  // Update marker positions when background moves
  const updateMarkerPositions = () => {
    // Get the background element
    const background = document.querySelector('.background-right');
    if (!background || markersRef.current.length !== 2) return;
    
    // Get the current position of the background
    const rect = background.getBoundingClientRect();
    
    // Update top marker position
    const topMarker = markersRef.current[0];
    topMarker.style.left = `${rect.left + 125}px`;
    topMarker.style.top = `${rect.top + 20}px`;
    
    // Update bottom marker position
    const bottomMarker = markersRef.current[1];
    bottomMarker.style.left = `${rect.left + 10}px`;
    bottomMarker.style.top = `${rect.bottom - 50}px`;
  };

  // Create the line element between markers
  const createLine = () => {
    // Create the line element
    const line = document.createElement('div');
    line.className = 'marker-line';
    line.style.position = 'fixed';
    line.style.width = '2px';
    line.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    line.style.zIndex = '9999';
    line.style.pointerEvents = 'none';
    
    // Add to document
    document.body.appendChild(line);
    
    // Store reference
    lineRef.current = line;
    
    // Initial position update
    updateLinePosition();
  };

  // Update the line position based on marker positions
  const updateLinePosition = () => {
    const line = lineRef.current;
    const markers = markersRef.current;
    
    if (!line || markers.length !== 2) return;
    
    const topMarker = markers[0];
    const bottomMarker = markers[1];
    
    // Get marker positions
    const markerTopRect = topMarker.getBoundingClientRect();
    const markerBottomRect = bottomMarker.getBoundingClientRect();
    
    // Calculate line position
    const top = markerTopRect.top + markerTopRect.height / 2;
    const bottom = markerBottomRect.top + markerBottomRect.height / 2;
    const left = (markerTopRect.left + markerBottomRect.left) / 2 + markerTopRect.width / 2;
    const height = Math.sqrt(
      Math.pow(bottom - top, 2) + 
      Math.pow(markerBottomRect.left - markerTopRect.left, 2)
    );
    
    // Fixed angle to match the tilted background edge
    const angle = 190;
    
    // Set line position and rotation
    line.style.top = `${top}px`;
    line.style.left = `${left}px`;
    line.style.height = `${height}px`;
    line.style.transformOrigin = 'top';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.backgroundColor = 'yellow';
  };

  // Function to make an element draggable with recalculation on drag end
  const makeElementDraggable = (element) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the initial mouse cursor position
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      
      // Update line position as the marker is being dragged
      updateLinePosition();
      updatePointMarkers();
    }
    
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;
      
      // Recalculate positions when done dragging
      updatePositions();
    }
  };

  // Function to find points on a line
  const findPointsOnLine = () => {
    const markers = markersRef.current;
    if (markers.length !== 2) return [];
    
    const topMarker = markers[0];
    const bottomMarker = markers[1];
    
    // Get marker positions
    const markerTopRect = topMarker.getBoundingClientRect();
    const markerBottomRect = bottomMarker.getBoundingClientRect();
    
    const topX = markerTopRect.left + markerTopRect.width / 2;
    const topY = markerTopRect.top + markerTopRect.height / 2;
    const bottomX = markerBottomRect.left + markerBottomRect.width / 2;
    const bottomY = markerBottomRect.top + markerBottomRect.height / 2;
    
    // How many points to plot
    const numberOfPoints = 5;
    
    // Generate points along the line using the fixed angle approach
    const points = [];
    
    // Get the center point between the markers
    const centerX = (topX + bottomX) / 2;
    const centerY = (topY + bottomY) / 2;
    
    // Calculate the length of the line
    const lineLength = Math.sqrt(Math.pow(bottomY - topY, 2) + Math.pow(bottomX - topX, 2));
    
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

  // Create markers at the calculated points
  const createPointMarkers = () => {
    // Remove existing point markers
    removePointMarkers();
    
    // Calculate points on the line
    const points = findPointsOnLine();
    
    // Create a marker at each point
    const pointMarkers = points.map((point, index) => {
      const marker = document.createElement('div');
      marker.className = 'point-marker';
      marker.style.position = 'fixed';
      marker.style.left = `${point.x - 3}px`; // Center the marker
      marker.style.top = `${point.y - 3}px`; // Center the marker
      marker.style.width = '6px';
      marker.style.height = '6px';
      marker.style.borderRadius = '50%';
      marker.style.backgroundColor = 'green';
      marker.style.zIndex = '10001';
      marker.style.boxShadow = '0 0 3px white';
      
      document.body.appendChild(marker);
      return marker;
    });
    
    // Store references to the markers
    pointMarkersRef.current = pointMarkers;
  };

  // Remove point markers
  const removePointMarkers = () => {
    document.querySelectorAll('.point-marker').forEach(marker => marker.remove());
    pointMarkersRef.current = [];
  };

  // Update point markers when the line moves
  const updatePointMarkers = () => {
    // Remove and recreate point markers
    createPointMarkers();
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

  // Split text into individual letters and wrap them in spans
  const wrapTextInLetterSpans = () => {
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

  // Apply styling to letters based on their side
  const applyStylesToLetters = (linePoints) => {
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

  // Complete function to categorize and style letters
  const processLettersRelativeToLine = () => {
    wrapTextInLetterSpans();
    const linePoints = findPointsOnLine();
    applyStylesToLetters(linePoints);
    applyBorderColors(linePoints);
  };

  // Handle window resize
  const handleResize = () => {
    // Use requestAnimationFrame to ensure calculations happen after layout
    requestAnimationFrame(() => {
      updatePositions();
    });
  };

  // Update all positions
  const updatePositions = () => {
    updateMarkerPositions();
    updateLinePosition();
    updatePointMarkers();
    processLettersRelativeToLine();
  };

  return (
    <div>
      {/* <div>Desk Component</div> */}
      {/* Optional button to manually recalculate positions */}
      {/* <button onClick={() => updatePositions()}>
        Recalculate Positions
      </button> */}
    </div>
  );
};