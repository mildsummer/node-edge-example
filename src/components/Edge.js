import React from 'react';
import './Edge.sass';
import Path from "./Path";

const { abs, min, max } = Math;

const PADDING = 100;
const NODE_SIZE = 100;

function Edge({ node1, node2, globalNodes }) {
  const edgePosition = (node, positionIndex = null) => {
    const pIndex = typeof positionIndex === "number" ? positionIndex : node[2];
    if (pIndex === 0) {
      return [node[0], node[1] - NODE_SIZE / 2];
    } else if (pIndex === 1) {
      return [node[0] + NODE_SIZE / 2, node[1]];
    } else if (pIndex === 2) {
      return [node[0], node[1] + NODE_SIZE / 2];
    } else if (pIndex === 3) {
      return [node[0] - NODE_SIZE / 2, node[1]];
    }
  };
  const position1 = edgePosition(node1);
  let position2 = edgePosition(node2);
  if (position1[0] > position2[0]) {
    position2 = edgePosition(node2, 1);
  }
  const linear = abs(position1[0] - position2[0]) < 100;
  const leftTop = [min(position1[0], position2[0]), min(position1[1], position2[1])];
  const rightBottom = [max(position1[0], position2[0]), max(position1[1], position2[1])];
  const width = rightBottom[0] - leftTop[0];
  const height = rightBottom[1] - leftTop[1];
  return (
    <div
      className="Edge"
      style={{
        width: width + PADDING * 2,
        height: height + PADDING * 2,
        top: leftTop[1] - PADDING,
        left: leftTop[0] - PADDING,
        padding: PADDING,
        boxSizing: "border-box"
      }}
    >
      <div
        className="Edge-point"
        style={{
          top: position1[1] - leftTop[1] + PADDING,
          left: position1[0] - leftTop[0] + PADDING
        }}
      />
      <div
        className="Edge-point"
        style={{
          top: position2[1] - leftTop[1] + PADDING,
          left: position2[0] - leftTop[0] + PADDING
        }}
      />
      <svg
        className="Edge-svg"
        width={width + PADDING * 2}
        height={height + PADDING * 2}
      >
        <Path
          position1={position1}
          position2={position2}
          handleLength={width * 0.5}
          offset={[-leftTop[0] + PADDING, -leftTop[1] + PADDING]}
          linear={linear}
          globalNodes={globalNodes.filter(node => (node !== node1 && node !== node2))}
          globalNodeRadius={NODE_SIZE / 2}
        />
      </svg>
    </div>
  );
}

export default Edge;
