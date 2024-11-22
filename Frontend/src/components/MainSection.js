import React from 'react';

const MainSection = () => {
  return (
    <main className="flex flex-col items-center p-5">
      <h2 className="text-4xl font-bold mb-5">Write eye-catching headline here</h2>
      <p className="text-lg text-center mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros neque, scelerisque id tortor in, dapibus auctor velit. Fusce posuere leo eget metus faucibus volutpat.
      </p>
      <button className="bg-orange-500 text-white py-2 px-4 rounded">Call to action</button>
      <img src="https://via.placeholder.com/600x400" alt="Sample" className="mt-5" />
    </main>
  );
};

export default MainSection;
