import React, { useState, useEffect } from 'react';

const MemoryMatch = () => {
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

  const [cards, setCards] = useState([]);
  const [firstFlippedCard, setFirstFlippedCard] = useState(null);
  const [secondFlippedCard, setSecondFlippedCard] = useState(null);
  const [canFlip, setCanFlip] = useState(true);
  const [score, setScore] = useState(0); // Score tracking
  const [gameOver, setGameOver] = useState(false); // Game over state

  // Shuffle the cards when the game starts
  useEffect(() => {
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setScore(0); // Reset score
    setGameOver(false); // Reset game over state
  }, []);

  // Handle card click
  const handleCardClick = (index) => {
    if (!canFlip || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true; // Flip the clicked card
    setCards(newCards);

    if (!firstFlippedCard) {
      // If no card is flipped, store this card
      setFirstFlippedCard({ ...newCards[index], index });
    } else {
      // If a card is already flipped, store this card and disable flipping
      setSecondFlippedCard({ ...newCards[index], index });
      setCanFlip(false);
    }
  };

  // Check for match between flipped cards
  useEffect(() => {
    if (firstFlippedCard && secondFlippedCard) {
      if (firstFlippedCard.name === secondFlippedCard.name) {
        // If cards match
        const newCards = [...cards];
        newCards[firstFlippedCard.index].isMatched = true; // Mark cards as matched
        newCards[secondFlippedCard.index].isMatched = true;
        setCards(newCards);
        setScore(prevScore => prevScore + 10); // Increase score for a match
        resetTurn(); // Reset the turn
      } else {
        // If cards don't match, flip them back after a delay
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstFlippedCard.index].isFlipped = false; // Flip cards back
          newCards[secondFlippedCard.index].isFlipped = false;
          setCards(newCards);
          setScore(prevScore => prevScore - 2); // Decrease score for a mismatch
          resetTurn(); // Reset the turn
        }, 1000);
      }
    }
  }, [firstFlippedCard, secondFlippedCard, cards]);

  // Reset the turn
  const resetTurn = () => {
    setFirstFlippedCard(null);
    setSecondFlippedCard(null);
    setCanFlip(true); // Allow flipping again

    // Check for game over
    if (cards.every(card => card.isMatched)) {
      setGameOver(true); // Set game over state
    }
  };

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
            onClick={() => handleCardClick(index)} // Handle card click
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
        <div className="mt-8 text-2xl font-semibold">
          <p>Congratulations! You've matched all the cards!</p>
          <p>Your final score is: {score}</p>
          <p className="text-green-400">Reward: 🎉 You're a Memory Master! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;
