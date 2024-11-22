import React, { useState, useEffect } from "react";
import Card from "./Card";

const initialCards = [
  { id: 1, content: "A", shortStory: "Once upon a time, in a mystical forest, there lived a wise old owl...", fullStoryLink: "/story/1" },
  { id: 2, content: "A", shortStory: "Once upon a time, in a mystical forest, there lived a wise old owl...", fullStoryLink: "/story/1" },
  { id: 3, content: "B", shortStory: "In a faraway kingdom, a young prince embarked on a quest...", fullStoryLink: "/story/2" },
  { id: 4, content: "B", shortStory: "In a faraway kingdom, a young prince embarked on a quest...", fullStoryLink: "/story/2" },
  { id: 5, content: "C", shortStory: "A brave knight ventured into the dark caves to rescue...", fullStoryLink: "/story/3" },
  { id: 6, content: "C", shortStory: "A brave knight ventured into the dark caves to rescue...", fullStoryLink: "/story/3" },
];

const StoryFlip = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [canFlip, setCanFlip] = useState(true);
  const [story, setStory] = useState("");
  const [fullStoryLink, setFullStoryLink] = useState("");

  useEffect(() => {
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index) => {
    if (!canFlip || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (!firstCard) {
      setFirstCard({ ...newCards[index], index });
    } else {
      setSecondCard({ ...newCards[index], index });
      setCanFlip(false);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.content === secondCard.content) {
        // Cards match
        const newCards = [...cards];
        newCards[firstCard.index].isMatched = true;
        newCards[secondCard.index].isMatched = true;
        setCards(newCards);
        setStory(firstCard.shortStory); // Reveal short story
        setFullStoryLink(firstCard.fullStoryLink); // Set full story link
        resetTurn();
      } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstCard.index].isFlipped = false;
          newCards[secondCard.index].isFlipped = false;
          setCards(newCards);
          resetTurn();
        }, 1000);
      }
    }
  }, [firstCard, secondCard, cards]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setCanFlip(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
      <div className="container mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-purple-800 mb-8 sm:mb-12">
          Interactive Story Memory Game
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 mb-6 sm:mb-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onClick={() => handleCardClick(index)}
              isFlipped={card.isFlipped || card.isMatched}
            />
          ))}
        </div>
        {story && (
          <div className="mt-6 sm:mt-8 p-6 sm:p-8 bg-yellow-100 text-gray-900 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Story Unlocked</h2>
            <p className="text-md sm:text-lg font-medium">{story}</p>
            <a href={fullStoryLink} className="text-blue-600 underline">
              Read Full Story
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryFlip;
