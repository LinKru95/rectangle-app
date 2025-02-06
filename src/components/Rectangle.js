import React from "react";
import { Rnd } from "react-rnd";

const Rectangle = ({ width, height, onResize }) => {
  return (
    <Rnd
      size={{ width, height }}
      bounds="parent"
      onResizeStop={(e, direction, ref) => {
        onResize(ref.offsetWidth, ref.offsetHeight);
      }}
      style={{ border: "2px solid black", backgroundColor: "lightblue" }}
    />
  );
};

export default Rectangle;
