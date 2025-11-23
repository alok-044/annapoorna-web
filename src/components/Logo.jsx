import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Annapoorna Connect Logo"
    >
      {/* Outer Ring (Connection/Cycle) */}
      <circle cx="50" cy="50" r="45" stroke="#16A34A" strokeWidth="2" strokeDasharray="10 5" className="opacity-50" />
      
      {/* The Bowl (Orange - Food) */}
      <path 
        d="M20 55 C20 75 35 90 50 90 C65 90 80 75 80 55 H20 Z" 
        fill="#EA580C" 
      />
      <path 
        d="M20 55 H80" 
        stroke="#C2410C" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />

      {/* The Steam/Signal (Green - Tech & Freshness) */}
      <path 
        d="M50 45 V25" 
        stroke="#16A34A" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      <path 
        d="M50 25 L35 35" 
        stroke="#16A34A" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      <path 
        d="M50 25 L65 35" 
        stroke="#16A34A" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      
      {/* Connection Nodes (Dots) */}
      <circle cx="50" cy="25" r="5" fill="#16A34A" />
      <circle cx="35" cy="35" r="4" fill="#16A34A" />
      <circle cx="65" cy="35" r="4" fill="#16A34A" />
      
      {/* Center Leaf Detail */}
      <path 
        d="M50 55 Q35 40 50 25 Q65 40 50 55" 
        fill="#86EFAC" 
        fillOpacity="0.5" 
      />
    </svg>
  );
};

export default Logo;