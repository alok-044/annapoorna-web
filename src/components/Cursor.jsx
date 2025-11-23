// src/components/Cursor.jsx
import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Only run on devices with a mouse
    if (window.matchMedia("(pointer: fine)").matches) {
      
      const moveCursor = (e) => {
        const { clientX, clientY } = e;
        
        // Move the main dot instantly
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }

        // Move the follower (CSS transition handles the lag/smoothness)
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
      };

      const handleMouseOver = (e) => {
        // Detect clickable elements to trigger hover state
        if (
          e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || 
          e.target.closest('button') ||
          e.target.classList.contains('cursor-pointer')
        ) {
          cursorRef.current?.classList.add('is-hovering');
          followerRef.current?.classList.add('is-hovering');
        } else {
          cursorRef.current?.classList.remove('is-hovering');
          followerRef.current?.classList.remove('is-hovering');
        }
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, []);

  // Don't render on touch devices to avoid UI issues
  if (typeof navigator !== 'undefined' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default Cursor;