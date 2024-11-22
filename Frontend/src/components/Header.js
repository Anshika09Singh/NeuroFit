import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, InformationCircleIcon, ChatAlt2Icon } from '@heroicons/react/outline';

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the menu when a link is clicked
    navigate(path); // Navigate to the specified path
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src="/neuro.jpg"
            alt="Logo"
            className="h-20 w-20 mr-2"
          />
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide transition duration-300 ease-in-out hover:text-teal-400">
            NeuroFit
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button
            className="flex items-center space-x-2 hover:text-teal-400 transition duration-300"
            onClick={() => handleLinkClick('/')}
          >
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            className="flex items-center space-x-2 hover:text-teal-400 transition duration-300"
            onClick={() => handleLinkClick('/about')}
          >
            <InformationCircleIcon className="w-5 h-5" />
            <span>About</span>
          </button>
          <button
            className="flex items-center space-x-2 hover:text-teal-400 transition duration-300"
            onClick={() => handleLinkClick('/FeedbackForm')}
          >
            <ChatAlt2Icon className="w-5 h-5" />
            <span>Feedback</span>
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-700 text-white py-4">
          <button
            className="block w-full text-left px-6 py-2 hover:bg-gray-600 transition duration-300"
            onClick={() => handleLinkClick('/')}
          >
            Home
          </button>
          <button
            className="block w-full text-left px-6 py-2 hover:bg-gray-600 transition duration-300"
            onClick={() => handleLinkClick('/about')}
          >
            About
          </button>
          <button
            className="block w-full text-left px-6 py-2 hover:bg-gray-600 transition duration-300"
            onClick={() => handleLinkClick('/FeedbackForm')}
          >
            Feedback
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
