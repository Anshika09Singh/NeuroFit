import React from 'react';

function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-teal-400">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-teal-300">Memory Enhancement</h3>
            <p className="text-gray-300">Games designed to improve your short-term and long-term memory skills.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-teal-300">Focus Training</h3>
            <p className="text-gray-300">Exercises that help improve your attention span and concentration.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-teal-300">Cognitive Growth</h3>
            <p className="text-gray-300">Challenge your brain with puzzles and strategy games for overall cognitive development.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;
