import React from "react";

function AboutCreator() {
  return (
    <section
      id="about-creator"
      className="bg-white text-gray-900 py-12 px-6 md:py-16 md:px-12"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-8 md:space-x-12">
        {/* Image of the creator in a circular shape */}
        <div className="relative group">
          <div className="w-40 h-40 md:w-60 md:h-60 rounded-full  overflow-hidden shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
            <img
              src="/profile_image.jpg" // Replace with the actual path to the image
              alt="Anshika Singh's Portrait"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Decorative circle around the image */}
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
        </div>

        {/* Information about the creator */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 transition duration-300 ease-in-out hover:text-teal-500">
            About the Creator
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            <strong>Anshika Singh</strong> is a skilled full-stack developer with a passion for cognitive science and technology. Anshika has a
            strong background in web development, machine learning, and user experience design. She developed NeuroFit to combine these fields into a fun, engaging brain-training platform.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            With a <strong>Bachelor's degree in Artificial Intelligence and Machine Learning</strong> and experience in modern technologies such as React, Tailwind CSS, and Express.js, Anshika strives to create meaningful user experiences through intelligent design and advanced technology.
          </p>
          {/* Call-to-action button */}
          <div className="mt-6">
            <a
              href="https://www.linkedin.com/in/anshika-singh-031b132a5/" // Replace with your LinkedIn or portfolio link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-white bg-teal-500 rounded-md shadow hover:bg-teal-600 transition duration-300"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCreator;
