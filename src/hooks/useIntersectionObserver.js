import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element is in the viewport.
 * @param {object} options - Intersection Observer options (e.g., threshold, rootMargin)
 * @returns {[React.RefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's visible.
 */
export const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible to prevent re-animation
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        ...options, // Allow custom options to be passed
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};