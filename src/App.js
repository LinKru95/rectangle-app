import React, { useEffect, useState } from 'react';
import { fetchRectangle, updateRectangle } from './api/rectangleApi';

function App() {
  const [rectangle, setRectangle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRectangle();
        setRectangle(data);
      } catch (error) {
        console.error('Error fetching rectangle:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!rectangle) return;
    setIsSubmitting(true);
    try {
      await updateRectangle(rectangle);
    } catch (error) {
      console.error('Error updating rectangle:', error);
    }
    setIsSubmitting(false);
  };

  const handleRefresh = async () => {
    try {
      const data = await fetchRectangle();
      setRectangle(data);
    } catch (error) {
      console.error('Error refreshing rectangle:', error);
    }
  };

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
      const newWidth = Math.max(startWidth + deltaX, 10);
      const newHeight = Math.max(startHeight + deltaY, 10);
      const constrainedWidth = Math.min(newWidth, 500);
      const constrainedHeight = Math.min(newHeight, 500);

      setRectangle((prevRect) => ({
        ...prevRect,
        width: constrainedWidth,
        height: constrainedHeight,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  if (!rectangle) {
    return <div>Loading...</div>;
  }

  const { x = 0, y = 0, width, height } = rectangle;

  return (
    <div>
      <svg
        className="svg-container"
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
          onMouseDown={handleMouseDown}
        />
      </svg>

      {/* Container for the buttons and labels */}
      <div className="top-right-container">
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
    </div>
  );
}

export default App;
