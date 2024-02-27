import React, { useState, useEffect } from 'react';
import './HeroSection.css'; // Import CSS file for styling

const images = [
  'https://th.bing.com/th/id/R.cd97ff80a8fe2395a42afefcda1b0272?rik=G6FtD0FUA5rnQA&pid=ImgRaw&r=0',
  'https://wallpapercave.com/wp/wp2548295.jpg',
  'https://i.ytimg.com/vi/Z6HaZGphPwM/maxresdefault.jpg',
  // Add more image paths as needed
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative h-96 lg:h-screen overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
        />
      ))}
      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white py-2 px-3 rounded-full"
        onClick={goToPreviousSlide}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white py-2 px-3 rounded-full"
        onClick={goToNextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default HeroSection;
