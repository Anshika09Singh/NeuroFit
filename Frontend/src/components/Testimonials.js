// src/components/Testimonials.js
import React from 'react';

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-8 rounded shadow-lg">
            <p className="text-lg mb-4">
              "NeuroFit helped me improve my focus and mental agility in just a few weeks!"
            </p>
            <h3 className="font-bold">- John Doe</h3>
          </div>
          <div className="bg-gray-100 p-8 rounded shadow-lg">
            <p className="text-lg mb-4">
              "The brain games are super engaging and I can already feel the difference!"
            </p>
            <h3 className="font-bold">- Jane Smith</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
