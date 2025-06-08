import React, { useState, useEffect, useCallback } from 'react';

const initialCards = [
  { id: 1, name: 'A', isFlipped: false, isMatched: false },
  { id: 2, name: 'A', isFlipped: false, isMatched: false },
  { id: 3, name: 'B', isFlipped: false, isMatched: false },
  { id: 4, name: 'B', isFlipped: false, isMatched: false },
  { id: 5, name: 'C', isFlipped: false, isMatched: false },
  { id: 6, name: 'C', isFlipped: false, isMatched: false },
  { id: 7, name: 'D', isFlipped: false, isMatched: false },
  { id: 8, name: 'D', isFlipped: false, isMatched: false },
];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [firstFlippedCard, setFirstFlippedCard] = useState(null);
  const [secondFlippedCard, setSecondFlippedCard] = useState(null);
  const [canFlip, setCanFlip] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Reset the turn
  const resetTurn = useCallback(() => {
    setFirstFlippedCard(null);
    setSecondFlippedCard(null);
    setCanFlip(true);

    // Check for game over
    if (cards.every((card) => card.isMatched)) {
      setGameOver(true);
    }
  }, [cards]);

  // Shuffle cards at start
  useEffect(() => {
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setScore(0);
    setGameOver(false);
  }, []);

  // Handle card click
  const handleCardClick = (index) => {
    if (!canFlip || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (!firstFlippedCard) {
      setFirstFlippedCard({ ...newCards[index], index });
    } else {
      setSecondFlippedCard({ ...newCards[index], index });
      setCanFlip(false);
    }
  };

  // Handle matching logic
  useEffect(() => {
    if (firstFlippedCard && secondFlippedCard) {
      if (firstFlippedCard.name === secondFlippedCard.name) {
        const newCards = [...cards];
        newCards[firstFlippedCard.index].isMatched = true;
        newCards[secondFlippedCard.index].isMatched = true;
        setCards(newCards);
        setScore((prevScore) => prevScore + 10);
        resetTurn();
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstFlippedCard.index].isFlipped = false;
          newCards[secondFlippedCard.index].isFlipped = false;
          setCards(newCards);
          setScore((prevScore) => prevScore - 2);
          resetTurn();
        }, 1000);
      }
    }
  }, [firstFlippedCard, secondFlippedCard, cards, resetTurn]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Memory Match Game</h1>
      <p className="text-xl mb-4">Score: {score}</p>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative w-24 h-24 border-2 border-white rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 
                        ${card.isFlipped ? 'bg-blue-600' : 'bg-gray-800'}`}
            onClick={() => handleCardClick(index)}
          >
            <div className={`absolute w-full h-full flex items-center justify-center text-3xl font-bold transition-transform duration-300 
                            ${card.isFlipped || card.isMatched ? 'text-white' : 'text-transparent'}`}>
              {card.isFlipped || card.isMatched ? card.name : ''}
            </div>
            <div className={`absolute w-full h-full flex items-center justify-center text-3xl font-bold transition-transform duration-300 
                            ${!(card.isFlipped || card.isMatched) ? 'text-white' : 'hidden'}`}>
              ?
            </div>
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="mt-8 text-2xl font-semibold text-center">
          <p>🎉 Congratulations! You've matched all the cards! 🎉</p>
          <p>Your final score is: <span className="text-yellow-300">{score}</span></p>
          <p className="text-green-400">Reward: 🧠 You're a Memory Master!</p>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;
