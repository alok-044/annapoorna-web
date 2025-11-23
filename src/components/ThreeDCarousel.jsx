import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ThreeDCarousel = ({ images, autoplay = true, interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotation logic
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, images.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const getStyles = (index) => {
    // Calculate distance from active index, handling wraparound
    const total = images.length;
    let distance = (index - activeIndex + total) % total;
    
    // Adjust distance for centering (e.g., if distance is 4 in a list of 5, it should be -1)
    if (distance > total / 2) distance -= total;

    // Define styles based on distance
    const styles = {
      transition: 'all 0.5s ease-in-out',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    };

    if (distance === 0) {
      // Center Item
      return {
        ...styles,
        zIndex: 20,
        opacity: 1,
        transform: 'translateX(0) scale(1)',
        filter: 'brightness(1)',
      };
    } else if (distance === -1) {
      // Left Item
      return {
        ...styles,
        zIndex: 10,
        opacity: 0.7,
        transform: 'translateX(-60%) scale(0.8) perspective(1000px) rotateY(15deg)',
        filter: 'brightness(0.7) blur(1px)',
        cursor: 'pointer',
      };
    } else if (distance === 1) {
      // Right Item
      return {
        ...styles,
        zIndex: 10,
        opacity: 0.7,
        transform: 'translateX(60%) scale(0.8) perspective(1000px) rotateY(-15deg)',
        filter: 'brightness(0.7) blur(1px)',
        cursor: 'pointer',
      };
    } else if (distance === -2 || distance < -2) {
      // Far Left (Hidden/Background)
      return {
        ...styles,
        zIndex: 5,
        opacity: 0,
        transform: 'translateX(-120%) scale(0.6)',
      };
    } else if (distance === 2 || distance > 2) {
      // Far Right (Hidden/Background)
      return {
        ...styles,
        zIndex: 5,
        opacity: 0,
        transform: 'translateX(120%) scale(0.6)',
      };
    }
    return styles;
  };

  return (
    <div className="relative w-full h-64 md:h-72 flex items-center justify-center perspective-1000">
      <div className="relative w-48 h-64 md:w-56 md:h-72 flex items-center justify-center">
        {images.map((img, index) => (
          <div
            key={index}
            style={getStyles(index)}
            onClick={() => {
                // Allow clicking side images to navigate
                const total = images.length;
                let distance = (index - activeIndex + total) % total;
                if (distance > total / 2) distance -= total;
                
                if (distance === -1) handlePrev();
                if (distance === 1) handleNext();
            }}
          >
            <img 
                src={img} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-cover rounded-2xl"
            />
            {/* Optional Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx ? 'bg-brand-green w-6' : 'bg-gray-300 hover:bg-brand-green/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeDCarousel;