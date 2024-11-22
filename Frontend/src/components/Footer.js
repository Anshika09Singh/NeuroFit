import React from 'react';

function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-6 shadow-lg">
      <div className="container mx-auto text-center px-2">
        {/* Contact information */}
        <p className="mb-">Contact me at: anshika@1104gmail.com</p>
        <p className="mb-3">Follow me on social media:</p>
        <div className="flex justify-center space-x-4">
          {/* Instagram Link with Image */}
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 flex items-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-8 h-8 md:w-6 md:h-6 transition-transform transform hover:scale-110"
            />
          </a>

          {/* LinkedIn Link with Image */}
          <a
            href="https://www.linkedin.com/in/anshika-singh-031b132a5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 flex items-center"
          >
            <img
              src="https://th.bing.com/th/id/R.a330e248626552a23af35e5c46526234?rik=DZhkgnpER0YViQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2flinkedIn%2flinkedIn_PNG8.png&ehk=4bFzIDABrAypqOis7809R99fdbUW93GC4XfvnNxZfdA%3d&risl=&pid=ImgRaw&r=0"
              alt="LinkedIn"
              className="w-8 h-8 md:w-6 md:h-6 transition-transform transform hover:scale-110"
            />
          </a>

          {/* Twitter Link with Image */}
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 flex items-center"
          >
            <img
              src="https://th.bing.com/th/id/OIP.biG9UdrkNGTbvX1YvOvY4AHaHa?rs=1&pid=ImgDetMain"
              alt="Twitter"
              className="w-8 h-8 md:w-6 md:h-6 transition-transform transform hover:scale-110"
            />
          </a>
        </div>
        <p className="mt-4">
          &copy; 2024 NeuroFit by Anshika Singh.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
