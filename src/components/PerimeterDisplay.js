import React from "react";

const PerimeterDisplay = ({ width, height }) => {
  const perimeter = 2 * (width + height);

  return <p>Perimeter: {perimeter} pixels</p>;
};

export default PerimeterDisplay;
