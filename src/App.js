import React, { useEffect, useState } from 'react';
import { fetchRectangle, updateRectangle } from './api/rectangleApi';

function App() {
  const [rectangle, setRectangle] = useState(null); // Start with null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  useEffect(() => {
    // Fetch the rectangle data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchRectangle();
        setRectangle(data); // Set the fetched rectangle
      } catch (error) {
        console.error('Error fetching rectangle:', error);
      }
    };
    fetchData();
  }, []); // Empty array to run only on mount

  // Handle Submit button press
  const handleSubmit = async () => {
    if (!rectangle) return; // Don't proceed if no rectangle data
    setIsSubmitting(true);
    try {
      await updateRectangle(rectangle);
    } catch (error) {
      console.error('Error updating rectangle:', error);
    }
    setIsSubmitting(false);
  };

  // Handle Refresh button press
  const handleRefresh = async () => {
    try {
      const data = await fetchRectangle();
      setRectangle(data);
    } catch (error) {
      console.error('Error refreshing rectangle:', error);
    }
  };

  // Mouse events for resizing
  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setStartWidth(rectangle.width);
    setStartHeight(rectangle.height);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newWidth = Math.max(startWidth + deltaX, 10);  // Minimum width: 10
      const newHeight = Math.max(startHeight + deltaY, 10);  // Minimum height: 10

      setRectangle((prevRect) => ({
        ...prevRect,
        width: newWidth,
        height: newHeight,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // If rectangle is not yet fetched, display loading spinner
  if (!rectangle) {
    return <div>Loading...</div>;
  }

  // Set default x and y values if the data is missing
  const { x = 0, y = 0, width, height } = rectangle;

  return (
    <div>
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="blue"
          onMouseDown={handleMouseDown}  // Start resizing
        />
      </svg>

      <div>
        <p>Width: {width}</p>
        <p>Height: {height}</p>
        <p>Perimeter: {2 * (width + height)}</p>
      </div>

      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}

export default App;
