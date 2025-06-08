import React, { useState, useEffect } from 'react';
import { saveProgress } from '../api'; // adjust path if needed

const wordList = ['brain', 'memory', 'puzzle', 'logic', 'neuro', 'cognitive', 'focus', 'mind'];

const shuffleWord = (word) => {
  let shuffled = word.split('');
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.join('');
};

const PuzzleWord = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [saveStatus, setSaveStatus] = useState(''); // To show save progress status

  const initializeGame = () => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
    setScrambledWord(shuffleWord(randomWord));
    setUserInput('');
    setMessage('');
    setAttempts(0);
    setSaveStatus('');
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
      setMessage('Correct! Great job!');

      // Prepare progress data
      const progress = {
        gameName: "Word Scramble Challenge",
        score: 100,              // You can customize scoring logic if you want
        difficulty: "Medium",    // Or make dynamic
        timeSpent: "N/A",        // Could be timer-based if you add timer logic
        dateTime: new Date().toISOString(),
      };

      // Save progress and update saveStatus
      try {
        await saveProgress(progress);
        setSaveStatus('Progress saved successfully!');
      } catch (err) {
        setSaveStatus('Failed to save progress.');
      }

    } else {
      setMessage('Incorrect! Try again.');
      setAttempts(prev => prev + 1);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-green-500 text-white">
      <h1 className="text-5xl font-bold text-center mb-8">Word Scramble Challenge</h1>

      <p className="text-lg mb-6 text-center bg-teal-800 bg-opacity-50 px-4 py-2 rounded-lg shadow-lg">
        <strong>How to Play:</strong> Unscramble the word by typing the correct word in the input box. Click "Submit" to check your answer. Good luck!
      </p>

      <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md max-w-md text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Scrambled Word:</h2>
        <p className="text-4xl font-semibold mb-6">{scrambledWord}</p>

        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full text-xl mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Type your answer"
          disabled={message === 'Correct! Great job!'}
        />
        <button
          className="bg-teal-500 text-white py-2 px-6 rounded hover:bg-teal-600 transition-all mb-4 shadow-lg"
          onClick={handleSubmit}
          disabled={message === 'Correct! Great job!'}
        >
          Submit
        </button>

        <div className={`text-lg font-semibold ${message === 'Correct! Great job!' ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </div>

        {message === 'Correct! Great job!' && (
          <>
            <button
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-all mt-6 shadow-lg"
              onClick={resetGame}
            >
              Play Again
            </button>
            <p className="mt-4 text-green-600 font-semibold">{saveStatus}</p>
          </>
        )}
      </div>

      {message !== 'Correct! Great job!' && attempts > 0 && (
        <div className="mt-4 text-lg font-semibold">
          <span className="text-yellow-300">Attempts: {attempts}</span>
        </div>
      )}

      {message !== 'Correct! Great job!' && (
        <div className="flex space-x-4 mt-8">
          <button
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition-all shadow-lg"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default PuzzleWord;
