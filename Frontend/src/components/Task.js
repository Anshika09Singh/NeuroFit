// src/components/Task.js
import React from 'react';

const Task = ({ task, onAnswer }) => {
  const handleAnswer = (option) => {
    const isCorrect = option === task.answer;
    onAnswer(isCorrect);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">{task.question}</h2>
      <div className="flex flex-col">
        {task.options.map((option, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white rounded-md p-2 mb-2 hover:bg-blue-700 transition-all"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Task;
