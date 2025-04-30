import React, { useEffect, useRef } from 'react';

export const Desk = () => {
  const markersRef = useRef([]);
  const lineRef = useRef(null);
  const pointMarkersRef = useRef([]);
  
  // Initialize markers and setup event listeners
  useEffect(() => {
    // Wait a moment for the DOM to fully render
    setTimeout(() => {
      createMarkers();
      createLine();
      createPointMarkers();
      
      // Set up resize handler
      window.addEventListener('resize', handleResize);
      
      // Set up scroll handler
      window.addEventListener('scroll', updatePositions);
    }, 300);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updatePositions);
      removeMarkers();
      removeLine();
      removePointMarkers();
    };
  }, []);
  
  // Create markers
  const createMarkers = () => {
    // Remove existing markers first
    removeMarkers();
    
    // Get the background element
    const background = document.querySelector('.background-right');
    if (!background) {
      console.error('Background element not found');
      return;
    }
    
    console.log('Creating markers');
    
    // Get the background's position and dimensions
    const rect = background.getBoundingClientRect();
    
    // Create container for markers
    const container = document.querySelector('.app-container');
    if (!container) {
      console.error('Container not found');
      return;
    }
    
    // Create top marker - place it exactly on the left edge
    const topMarker = document.createElement('div');
    topMarker.className = 'marker marker-top';
    topMarker.style.position = 'fixed'; // Use fixed positioning for consistent viewport position
    topMarker.style.left = `${rect.left}px`;
    topMarker.style.top = `${rect.top + 20}px`; // Add a small offset to make sure it's visible
    topMarker.style.width = '15px'; // Make it a bit larger
    topMarker.style.height = '15px';
    topMarker.style.borderRadius = '50%';
    topMarker.style.backgroundColor = 'red';
    topMarker.style.zIndex = '10000'; // Higher z-index to ensure visibility
    topMarker.style.boxShadow = '0 0 5px white'; // Add a white glow to make it stand out
    
    // Create bottom marker - place it exactly on the left edge
    const bottomMarker = document.createElement('div');
    bottomMarker.className = 'marker marker-bottom';
    bottomMarker.style.position = 'fixed'; // Use fixed positioning for consistent viewport position
    bottomMarker.style.left = `${rect.left}px`;
    bottomMarker.style.top = `${rect.bottom - 50}px`; // Up from the bottom to ensure visibility
    bottomMarker.style.width = '15px'; // Make it a bit larger
    bottomMarker.style.height = '15px';
    bottomMarker.style.borderRadius = '50%';
    bottomMarker.style.backgroundColor = 'blue';
    bottomMarker.style.zIndex = '10000'; // Higher z-index to ensure visibility
    bottomMarker.style.boxShadow = '0 0 5px white'; // Add a white glow to make it stand out
    
    // Add markers to container
    document.body.appendChild(topMarker); // Add to body to ensure they're on top
    document.body.appendChild(bottomMarker);
    
    // Store references to markers
    markersRef.current = [topMarker, bottomMarker];
    
    // Log for debugging
    console.log('Markers created:', {
      top: { left: rect.left, top: rect.top },
      bottom: { left: rect.left, bottom: rect.bottom }
    });
    
    // Initial position update
    updateMarkerPositions();
  };
  
  // Remove markers
  const removeMarkers = () => {
    document.querySelectorAll('.marker').forEach(marker => marker.remove());
    markersRef.current = [];
  };
  
  // Update marker positions
  const updateMarkerPositions = () => {
    // Get the background element
    const background = document.querySelector('.background-right');
    if (!background || markersRef.current.length !== 2) return;
    
    // Get the current position of the background
    const rect = background.getBoundingClientRect();
    
    // Log for debugging
    console.log('Background rect:', {
      left: rect.left,
      top: rect.top,
      bottom: rect.bottom
    });
    
    // Update top marker position
    const topMarker = markersRef.current[0];
    topMarker.style.left = `${rect.left+125}px`;
    topMarker.style.top = `${rect.top + 20}px`; // Small offset from top
    
    // Update bottom marker position
    const bottomMarker = markersRef.current[1];
    bottomMarker.style.left = `${rect.left+10}px`;
    bottomMarker.style.top = `${rect.bottom - 50}px`; // Small offset from bottom
  };
  
  // Create line between markers
  const createLine = () => {
    // Remove existing line first
    removeLine();
    
    // Create the line element
    const line = document.createElement('div');
    line.className = 'marker-line';
    line.style.position = 'fixed';
    line.style.width = '2px'; // Line width
    line.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // Semi-transparent white
    line.style.zIndex = '9999'; // Below markers but above other content
    line.style.pointerEvents = 'none'; // Don't interfere with clicks
    
    // Add to document
    document.body.appendChild(line);
    
    // Store reference
    lineRef.current = line;
    
    // Initial position update
    updateLinePosition();
  };
  
  // Remove line
  const removeLine = () => {
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }
  };
  
  // Update line position based on marker positions
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
    const height = bottom - top;
    
    // Fixed angle as specified
    const angle = 0;
    
    // Set line position and rotation
    line.style.top = `${top}px`;
    line.style.left = `${left}px`;
    line.style.height = `${height}px`;
    line.style.transformOrigin = '50% 50%';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.backgroundColor = `yellow`;
  };
  
  // Find points along the line
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
    
    // How many points do you want to plot
    const numberOfPoints = 5; // You can adjust this
    
    // Generate points along the line
    const points = [];
    for (let i = 0; i <= numberOfPoints; i++) {
      // Calculate the fraction of the way from top to bottom
      const fraction = i / numberOfPoints;
      
      // Calculate the actual position using linear interpolation
      // The line is drawn at a fixed angle (190 degrees) instead of connecting the markers directly
      // We need to use the angle to calculate the points
      
      // Get the center point between the markers
      const centerX = (topX + bottomX) / 2;
      const centerY = (topY + bottomY) / 2;
      
      // Calculate the length of the line
      const lineLength = Math.sqrt(Math.pow(bottomY - topY, 2) + Math.pow(bottomX - topX, 2));
      
      // Calculate the offset from the center based on the fraction
      const offsetDistance = lineLength * (fraction - 0.5);
      
      // Calculate the point using the angle (190 degrees)
      const angleRadians = 0 * (Math.PI / 180);
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
  
  // Handle window resize or scroll
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
  };
  
  return (
    <div className="desk-component">
      {/* Component UI */}
    </div>
  );
};

export default Desk;