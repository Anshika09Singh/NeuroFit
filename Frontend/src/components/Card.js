import React from "react";

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div
      className={`w-32 h-32 flex items-center justify-center text-2xl border border-gray-300 rounded-lg cursor-pointer transition-transform transform ${
        isFlipped ? "bg-white" : "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {isFlipped ? card.content : "?"}
    </div>
  );
};

export default Card;
