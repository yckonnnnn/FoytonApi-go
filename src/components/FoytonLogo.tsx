import React from 'react';

interface FoytonLogoProps {
  className?: string;
  size?: number;
}

export const FoytonLogo: React.FC<FoytonLogoProps> = ({ 
  className = "w-9 h-8", 
  size 
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none group cursor-pointer ${className}`}
      style={size ? { width: size, height: (size * 0.88) } : undefined}
    >
      <svg
        viewBox="0 0 100 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
      >
        {/* Three rounded sprouts / ears on top */}
        {/* Left ear */}
        <path
          d="M 52 14 C 50 7, 54 4, 57 8 C 59 11, 57 16, 55 18 Z"
          fill="#111317"
        />
        {/* Center ear (tallest) */}
        <path
          d="M 62 12 C 61 4, 66 3, 67 7 C 69 11, 67 17, 65 19 Z"
          fill="#111317"
        />
        {/* Right ear */}
        <path
          d="M 72 16 C 72 9, 77 7, 79 11 C 80 14, 77 19, 74 20 Z"
          fill="#111317"
        />

        {/* Main Chubby Body of Mascot */}
        <path
          d="M 44 24
             C 32 30, 20 40, 15 54
             C 10 66, 12 76, 26 78
             C 40 80, 68 81, 84 76
             C 94 72, 96 55, 92 40
             C 88 28, 80 18, 68 18
             C 58 18, 50 20, 44 24 Z"
          fill="#111317"
        />

        {/* Upper Left Shoulder Slate Blue Highlight Stroke */}
        <path
          d="M 23 50 C 26 43, 33 38, 38 36"
          stroke="#42658a"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Bottom Paws/Legs Slate Blue Arcs */}
        {/* Left paw curve */}
        <path
          d="M 51 68 C 56 71, 56 77, 52 80"
          stroke="#42658a"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right paw curve */}
        <path
          d="M 74 69 C 78 72, 78 77, 75 80"
          stroke="#42658a"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes: Two white circles */}
        {/* Left Eye */}
        <circle cx="68" cy="34" r="2.8" fill="#ffffff" />
        {/* Right Eye */}
        <circle cx="79" cy="33" r="2.8" fill="#ffffff" />

        {/* Mouth: small white horizontal dash */}
        <path
          d="M 72.8 37.5 L 75.2 37.5"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
