import React, { useState } from 'react';
import { saveProgress } from '../api'; // adjust path if needed

const BrainFitnessSimulator = () => {
  const [health, setHealth] = useState(100);
  const [message, setMessage] = useState('');
  const [actionsTaken, setActionsTaken] = useState(0);
  const [startTime] = useState(Date.now());

  const handleDecision = (decision) => {
    let changeInHealth = 0;
    let fact = '';

    switch (decision) {
      case 'exercise':
        changeInHealth = 10;
        fact = 'Regular exercise increases blood flow to the brain and enhances cognitive function.';
        break;
      case 'unhealthyDiet':
        changeInHealth = -15;
        fact = 'A diet high in sugar can lead to cognitive decline over time.';
        break;
      case 'socialInteraction':
        changeInHealth = 15;
        fact = 'Social interactions can help maintain cognitive function as you age.';
        break;
      case 'mentalExercise':
        changeInHealth = 20;
        fact = 'Engaging in puzzles and games can strengthen neural connections.';
        break;
      default:
        break;
    }

    const newHealth = Math.min(Math.max(health + changeInHealth, 0), 100);
    setHealth(newHealth);
    setMessage(fact);
    setActionsTaken((prev) => prev + 1);
  };

  const handleSaveProgress = () => {
    const endTime = Date.now();
    const timeSpentSec = Math.round((endTime - startTime) / 1000);
    const timeSpent = `${Math.floor(timeSpentSec / 60)}m ${timeSpentSec % 60}s`;

    const progress = {
      gameName: 'Brain Fitness Simulator',
      score: health,
      difficulty: 'Simulation',
      timeSpent,
      dateTime: new Date().toISOString(),
    };

    saveProgress(progress);
    alert("Progress saved successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-8 max-w-lg mx-auto shadow-lg transition-shadow duration-300">
        <h1 className="text-4xl font-bold mb-4 text-center">Brain Fitness Simulator</h1>
        <p className="text-lg mb-2 text-center">Brain Health: {health}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => handleDecision('exercise')}
            className="bg-green-500 hover:bg-green-600 transition duration-300 text-white p-2 rounded-lg shadow-md"
          >
            Exercise
          </button>
          <button
            onClick={() => handleDecision('unhealthyDiet')}
            className="bg-red-500 hover:bg-red-600 transition duration-300 text-white p-2 rounded-lg shadow-md"
          >
            Eat Unhealthy
          </button>
          <button
            onClick={() => handleDecision('socialInteraction')}
            className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white p-2 rounded-lg shadow-md"
          >
            Socialize
          </button>
          <button
            onClick={() => handleDecision('mentalExercise')}
            className="bg-purple-500 hover:bg-purple-600 transition duration-300 text-white p-2 rounded-lg shadow-md"
          >
            Mental Exercise
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center italic text-yellow-300 transition duration-300">{message}</p>
        )}
        {actionsTaken > 0 && (
          <button
            onClick={handleSaveProgress}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Save Progress
          </button>
        )}
      </div>
    </div>
  );
};

export default BrainFitnessSimulator;
