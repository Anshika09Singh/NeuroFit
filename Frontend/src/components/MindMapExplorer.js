import React, { useState } from 'react';
import ReactFlow, { applyNodeChanges, useNodesState } from 'react-flow-renderer';
import { saveProgress } from '../api'; // adjust path as needed

const MindMapExplorer = () => {
  const [centralTheme, setCentralTheme] = useState('');
  const [branchContent, setBranchContent] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [startTime] = useState(Date.now());

  const handleAddBranch = () => {
    if (!branchContent) return;

    const newBranch = {
      id: `${nodes.length + 1}`,
      data: { label: branchContent },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };

    setNodes((prev) => [...prev, newBranch]);
    setBranchContent('');

    // Save progress if there's already a central node and at least 1 branch
    const hasCentral = nodes.find((n) => n.id === 'central');
    if (hasCentral && nodes.length >= 2) {
      const endTime = Date.now();
      const timeSpentSec = Math.round((endTime - startTime) / 1000);
      const timeSpent = `${Math.floor(timeSpentSec / 60)}m ${timeSpentSec % 60}s`;

      const progress = {
        gameName: 'Mind Map Explorer',
        score: nodes.length - 1, // number of branches
        difficulty: 'Creative',
        timeSpent,
        dateTime: new Date().toISOString(),
      };

      saveProgress(progress);
    }
  };

  const handleSubmitTheme = (e) => {
    e.preventDefault();
    if (!centralTheme) return;

    const newCentralNode = {
      id: 'central',
      data: { label: centralTheme },
      position: { x: 250, y: 0 },
    };

    setNodes([newCentralNode]);
    setCentralTheme('');
  };

  const handleRemoveNode = (nodeId) => {
    setNodes((prev) => applyNodeChanges([{ id: nodeId, type: 'remove' }], prev));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center">
      <div className="container mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Mind Map Explorer</h1>

        <form onSubmit={handleSubmitTheme} className="mb-4">
          <input
            type="text"
            value={centralTheme}
            onChange={(e) => setCentralTheme(e.target.value)}
            className="border border-gray-300 p-3 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter central theme"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-700 transition-all"
          >
            Set Central Theme
          </button>
        </form>

        <form className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddBranch(); }}>
          <input
            type="text"
            value={branchContent}
            onChange={(e) => setBranchContent(e.target.value)}
            className="border border-gray-300 p-3 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            placeholder="Enter branch content"
          />
          <button
            type="button"
            className="bg-green-500 text-white p-3 rounded w-full hover:bg-green-700 transition-all"
            onClick={handleAddBranch}
          >
            Add Branch
          </button>
        </form>

        <div className="h-80 w-full">
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            style={{ width: '100%', height: '100%' }}
            onNodeClick={(event, node) => handleRemoveNode(node.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default MindMapExplorer;
