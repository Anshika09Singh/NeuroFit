import React from 'react';
import { useNavigate } from 'react-router-dom';
// Removed PlayIcon import because it's unused

function HeroSection() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <section
      className="relative text-white py-20 bg-cover bg-center"
      style={{ backgroundImage: `url('https://miro.medium.com/v2/resize:fit:1200/1*-DAj8QPi-tgAM52wKozk1A.jpeg')` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative container mx-auto text-center p-10 rounded-lg">
        {/* Title with transition effect */}
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 transition duration-500 ease-in-out transform hover:scale-110">
          Boost Your <span className="text-teal-400">Brain</span> Power with <span className="text-teal-400">NeuroFit</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl mb-6">
          Discover scientifically proven brain games to improve your focus, memory, and cognitive skills.
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => handleLinkClick('/games')}
          className="justify-center space-x-2 bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition duration-300 shadow-md transform hover:scale-105"
        >
          <div>Get Started</div>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
