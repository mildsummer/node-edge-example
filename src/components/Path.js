import React from 'react';
import classNames from "classnames";
import './Path.sass';

const { abs, floor, pow, sqrt } = Math;

function b0(t) { return pow(1 - t, 3); }
function b1(t) { return t * pow(1 - t, 2) * 3; }
function b2(t) { return (1 - t) * pow(t, 2) * 3; }
function b3(t) { return pow(t, 3); }
function getPointOnBezier(points, t){
  const x = points[0][0] * b0(t) + points[1][0] * b1(t) + points[2][0] * b2(t) + points[3][0] * b3(t);
  const y = points[0][1] * b0(t) + points[1][1] * b1(t) + points[2][1] * b2(t) + points[3][1] * b3(t);
  return [x, y];
}
function getPointOnPath(points, t){
  const middle = [(points[1][0] + points[2][0]) / 2, (points[1][1] + points[2][1]) / 2];
  if (t < 0.5) {
    return getPointOnBezier([points[0], points[0], points[1], middle], t * 2);
  } else {
    return getPointOnBezier([middle, points[2], points[3], points[3]], (t - 0.5) * 2);
  }
}
function distance(p1, p2) {
  return sqrt(pow(p1[0] - p2[0], 2) + pow(p1[1] - p2[1], 2));
}

const TEST_NUMBER = 100;

function Path({ position1, position2, handleLength, linear, globalNodes, globalNodeRadius, offset }) {
  const middle = [(position1[0] + position2[0]) / 2, (position1[1] + position2[1]) / 2];
  // if (abs(position1[1] - position2[1]) > 100) {
  //   middle[1] = floor((middle[1] - 50) / 100) * 100 + 50;
  // }
  const handle1 = [middle[0] + handleLength * (position1[0] > position2[0] ? 1 : -1), middle[1]];
  const handle2 = [middle[0] + handleLength, middle[1]];
  const nodes = [];
  const parray = [];
  for (let i = globalNodes.length - 1; i >= 0; i--) {
    for (let j = TEST_NUMBER; j > 0; j--) {
      const t = j / TEST_NUMBER;
      if (t !== 0 && t !== 1) {
        const p = getPointOnPath([position1, handle1, handle2, position2], t);
        parray.push(p);
        if (distance(p, globalNodes[i]) <= globalNodeRadius) {
          nodes.push(globalNodes[i]);
          break;
        }
      }
    }
  }
  return (
    <>
      <path
        className={classNames("Path", {
          "Path--hit": !!nodes.length
        })}
        d={linear ? `M${position1[0] + offset[0]} ${position1[1] + offset[1]}, ${position2[0] + offset[0]} ${position2[1] + offset[1]}`
          : `M${position1[0] + offset[0]} ${position1[1] + offset[1]} Q ${handle1[0] + offset[0]} ${handle1[1] + offset[1]}, ${middle[0] + offset[0]} ${middle[1] + offset[1]} T ${position2[0] + offset[0]} ${position2[1] + offset[1]}`}
        strokeWidth={2}
      />
    </>
  );
}

export default Path;
