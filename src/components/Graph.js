import React, { useState } from 'react';
import './Graph.sass';
import Node from "./Node";
import Edge from "./Edge";

function Graph() {
  const [nodes, setNodes] = useState([
    [150, 150, 1],
    [450, 250, 3],
    [300, 200],
  ]);
  const edges = [[0, 1]];
  const handleChange = (index, position) => {
    const newNodes = nodes.concat();
    newNodes[index][0] = position[0];
    newNodes[index][1] = position[1];
    setNodes(newNodes);
  };
  return (
    <div className="Graph">
      {nodes.map((node, index) => (
        <Node
          key={index}
          position={node}
          onChangePosition={position => handleChange(index, position)}
        />
      ))}
      {edges.map(([index1, index2]) => (
        <Edge
          key={`${index1}-${index2}`}
          node1={nodes[index1]}
          node2={nodes[index2]}
          globalNodes={nodes}
        />
      ))}
    </div>
  );
}

export default Graph;
