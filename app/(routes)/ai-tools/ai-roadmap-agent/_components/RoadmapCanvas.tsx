import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TurboNode from "./TurboNode";

const nodeTypes = {
    turbo: TurboNode
}

function RoadmapCanvas({initialEdges, initialNodes}:any) {


//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);

//   const onNodesChange = useCallback(
//     (changes: any) =>
//       setNodes((nodesSnapshot :any) => applyNodeChanges(changes, nodesSnapshot)),
//     []
//   );
//   const onEdgesChange = useCallback(
//     (changes: any) =>
//       setEdges((edgesSnapshot : any) => applyEdgeChanges(changes, edgesSnapshot)),
//     []
//   );
//   const onConnect = useCallback(
//     (params: any) =>
//       setEdges((edgesSnapshot : any) => addEdge(params, edgesSnapshot)),
//     []
//   );
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={initialNodes}
        edges={initialEdges}
        fitView
      >
        <Controls />
        <MiniMap />
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default RoadmapCanvas;
