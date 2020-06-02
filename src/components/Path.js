import React from 'react';
import './Path.sass';

const { floor } = Math;

function Path({ position1, position2, handleLength, linear }) {
  const middle = [(position1[0] + position2[0]) / 2, (position1[1] + position2[1]) / 2];
  middle[1] = floor((middle[1] - 50) / 100) * 100 + 50;
  const handle1 = [middle[0] + handleLength * (position1[0] > position2[0] ? 1 : -1), middle[1]];
  // const handle2 = [middle[0] + handleLength, middle[1]];
  return (
    <path
      d={linear ? `M${position1[0]} ${position1[1]}, ${position2[0]} ${position2[1]}`
        : `M${position1[0]} ${position1[1]} Q ${handle1[0]} ${handle1[1]}, ${middle[0]} ${middle[1]} T ${position2[0]} ${position2[1]}`}
      stroke="#000"
      strokeWidth={2}
      fill="none"
    />
  );
}

export default Path;
