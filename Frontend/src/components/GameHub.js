import React, { useState } from 'react';  // Only this line should be present for React import
import { useNavigate } from 'react-router-dom';

const gamesData = [
  { id: 1, name: 'Memory Match', category: 'Memory', difficulty: 'Easy', cognitiveSkill: 'Memory', path: '/games/memory' },
  { id: 2, name: 'Puzzle Word', category: 'Puzzles', difficulty: 'Medium', cognitiveSkill: 'Problem Solving', path: '/games/puzzle' },
  { id: 3, name: 'Story Flip', category: 'Story', difficulty: 'Medium', cognitiveSkill: 'Problem Solving', path: '/games/story' },
  { id: 4, name: 'Task Juggler', category: 'Juggler', difficulty: 'Medium', cognitiveSkill: 'Problem Solving', path: '/games/juggler' },
  { id: 5, name: 'MindMap Explorer', category: 'Map', difficulty: 'Hard', cognitiveSkill: 'Problem Solving', path: '/games/map' },
  { id: 6, name: 'Brain Fitness Simulator', category: 'Fitness', difficulty: 'Easy', cognitiveSkill: 'Problem Solving', path: '/games/fitness' },
];

const GameHub = () => {
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [filter, setFilter] = useState({ category: '', difficulty: '', cognitiveSkill: '' });
  const navigate = useNavigate();

  const handleFilterChange = (type, value) => {
    setFilter({ ...filter, [type]: value });
    let filtered = gamesData;

    if (value !== '') {
      filtered = filtered.filter(game => game[type] === value);
    }

    if (!filter.category && !filter.difficulty && !filter.cognitiveSkill) {
      filtered = gamesData;
    }

    setFilteredGames(filtered);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Game Hub</h1>

        <div className="flex justify-center mb-8">
          <select 
            className="border border-gray-300 rounded-lg p-2 mr-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Memory">Memory</option>
            <option value="Puzzles">Puzzles</option>
            <option value="Story">Story</option>
            <option value="Juggler">Juggler</option>
            <option value="Map">Map</option>
            <option value="Fitness">Fitness</option>
          </select>

          <select 
            className="border border-gray-300 rounded-lg p-2 mr-4 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <div 
              key={game.id} 
              className="bg-gray-700 rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => navigate(game.path)}
            >
              <h2 className="text-lg font-semibold text-white">{game.name}</h2>
              <p className="text-gray-300">Category: {game.category}</p>
              <p className="text-gray-300">Difficulty: {game.difficulty}</p>
              <button 
                className="mt-2 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 w-full"
                onClick={(e) => { e.stopPropagation(); navigate(game.path); }}
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHub;
