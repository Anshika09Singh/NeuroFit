import React, { useState, useEffect } from 'react';
import Task from './Task';
import { tasks } from '../TaskData';
import Confetti from 'react-confetti';
import { saveProgress } from '../api'; // Adjust path as needed

const TaskJuggler = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const taskDuration = 5000; // 5 seconds
  const [showReward, setShowReward] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex((prevIndex) => prevIndex + 1);
      } else {
        const endTime = Date.now();
        const timeSpentSec = Math.round((endTime - startTime) / 1000);
        const timeSpent = `${Math.floor(timeSpentSec / 60)}m ${timeSpentSec % 60}s`;

        const finalScore = score;
        setIsGameOver(true);

        if (finalScore >= tasks.length * 0.8) {
          setShowReward(true);
        }

        // Save progress on game end
        const progress = {
          gameName: 'Task Juggler',
          score: finalScore,
          difficulty: 'Medium', // Set dynamically if needed
          timeSpent,
          dateTime: new Date().toISOString(),
        };
        saveProgress(progress);
      }
    }, taskDuration);

    return () => clearTimeout(timer);
  }, [currentTaskIndex, score, startTime]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  if (isGameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Game Over!</h1>
          <p className="text-2xl mb-4">Your score: <span className="text-purple-600">{score}</span></p>
          {showReward ? (
            <>
              <p className="text-xl text-green-500 mb-4">🎉 Congratulations! You've earned a reward! 🎉</p>
              <p className="text-md mb-4">You've demonstrated impressive cognitive flexibility.</p>
              <Confetti />
            </>
          ) : (
            <p className="text-lg text-gray-700">Try again to improve your score!</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Task Juggler: Cognitive Flexibility Trainer</h1>
        <Task task={tasks[currentTaskIndex]} onAnswer={handleAnswer} />
        <p className="mt-4 text-lg">Score: <span className="text-indigo-500 font-semibold">{score}</span></p>
        <p className="mt-2 text-sm text-gray-600">Next task in <span className="text-red-500">{taskDuration / 1000}</span> seconds...</p>
      </div>
    </div>
  );
};

export default TaskJuggler;
