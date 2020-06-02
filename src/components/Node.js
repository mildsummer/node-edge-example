import React, { useState } from 'react';
import Hammer from "react-hammerjs";
import './Node.sass';

const options = {
  recognizers: {
    pan: {
      threshold: 1
    }
  }
};

function Node({ position, onChangePosition }) {
  const [[panStartX, panStartY], setPanStartPosition] = useState([]);
  const [x, y] = position;
  const handlePanStart = () => {
    setPanStartPosition([x, y]);
  };
  const handlePan = (e) => {
    onChangePosition([panStartX + e.deltaX, panStartY + e.deltaY]);
  };
  const handlePanEnd = () => {
    setPanStartPosition([0, 0]);
  };
  return (
    <Hammer options={options} onPanStart={handlePanStart} onPan={handlePan} onPanEnd={handlePanEnd}>
      <div
        className="Node"
        style={{
          top: y,
          left: x,
        }}
      />
    </Hammer>
  );
}

export default Node;
