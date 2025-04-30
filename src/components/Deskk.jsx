import React, { useEffect, useRef } from 'react';

export const Deskk = () => {
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
      console.log(processElementsRelativeToLine());
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
      
      // Remove all position markers
      document.querySelectorAll('.t10').forEach(marker => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
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

  // Function to plot the position of any DOM element
  const plotElementPosition = (element) => {
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    return { x: centerX, y: centerY };
  };

  // Function to create a marker at a specific position
  const createPositionMarker = (position, color = 'yellow') => {
    const marker = document.createElement('div');
    marker.style.position = 'fixed';
    marker.style.width = '10px';
    marker.style.height = '10px';
    marker.style.borderRadius = '50%';
    marker.style.backgroundColor = color;
    marker.style.left = `${position.x - 5}px`;
    marker.style.top = `${position.y - 5}px`;
    marker.style.zIndex = '1000';
    marker.classList.add('t10');
    
    document.body.appendChild(marker);
    
    return marker;
  };

  // Function to determine if a point is to the left or right of a line
  const getElementSideOfLine = (elementPosition, linePoints) => {
    if (linePoints.length < 2) return 'unknown';
    
    // Get two points from the line
    const point1 = linePoints[0];
    const point2 = linePoints[linePoints.length - 1];
    
    // Formula to determine which side of a line a point is on
    // (x - x1)(y2 - y1) - (y - y1)(x2 - x1)
    // If result > 0, point is on the left, if < 0, point is on the right
    const value = (elementPosition.x - point1.x) * (point2.y - point1.y) - 
                  (elementPosition.y - point1.y) * (point2.x - point1.x);
    
    return value > 0 ? 'left' : (value < 0 ? 'right' : 'on the line');
  };

  // Function to clear existing markers before recalculating
  const clearPositionMarkers = () => {
    document.querySelectorAll('.t10').forEach(marker => {
      if (marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    });
  };

  // Main function to process all elements and categorize them
  const categorizeElementsByLinePosition = (selector = 'span') => {
    // Clear existing markers
    clearPositionMarkers();
    
    // Get the line points
    const linePoints = findPointsOnLine();
    if (linePoints.length < 2) {
      console.error('Could not establish a valid line');
      return { left: [], right: [], linePoints };
    }
    
    // Find all elements matching the selector
    const elements = document.querySelectorAll(selector);
    const leftElements = [];
    const rightElements = [];
    const elementPositions = [];
    
    // Process each element
    elements.forEach((element, index) => {
      const position = plotElementPosition(element);
      elementPositions.push(position);
      
      // Create a marker for this element's position
      const markerColor = `hsl(${(index * 30) % 360}, 70%, 50%)`;
      const marker = createPositionMarker(position, markerColor);
      
      // Determine which side of the line the element is on
      const side = getElementSideOfLine(position, linePoints);
      
      // Store the element with its position, side information, and inner HTML
      const elementInfo = { 
        element, 
        position, 
        side, 
        index,
        marker,
        innerHtml: element.innerHTML // Add inner HTML to each element's info
      };
      
      // Add to appropriate array
      if (side === 'left') {
        leftElements.push(elementInfo);
      } else if (side === 'right') {
        rightElements.push(elementInfo);
      }
    });
    
    // Visualize the line itself
    linePoints.forEach((point, index) => {
      createPositionMarker(point, index === 0 || index === linePoints.length - 1 ? 'red' : 'green');
    });
    
    return {
      left: leftElements,
      right: rightElements,
      linePoints,
      elementPositions
    };
  };    

  // Apply styling to elements based on their side
  const applyStylesToElements = (results) => {
    // First, reset styles on all spans (or whatever element type we're targeting)
    document.querySelectorAll('span').forEach(el => {
      el.style.borderLeft = '';
      el.style.borderRight = '';
      el.dataset.side = '';
    });
    
    // Apply left styling
    results.left.forEach(({ element }) => {
      element.style.borderLeft = '3px solid blue';
      element.dataset.side = 'left';
    });
    
    // Apply right styling
    results.right.forEach(({ element }) => {
      element.style.borderRight = '3px solid red';
      element.dataset.side = 'right';
    });
    
    return results;
  };

  // Complete function to find, categorize, and style elements
  const processElementsRelativeToLine = (selector = 'span') => {
    const results = categorizeElementsByLinePosition(selector);
    return applyStylesToElements(results);
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
    processElementsRelativeToLine();
  };

  return (
    <div>
      <div>Desk Component</div>
      {/* Optional button to manually recalculate positions */}
      <button onClick={() => updatePositions()}>
        Recalculate Positions
      </button>
    </div>
  );
};