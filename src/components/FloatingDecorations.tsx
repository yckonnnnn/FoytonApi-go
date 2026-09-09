import React from 'react';

export const FloatingCloud: React.FC = () => {
  return (
    <div className="absolute -top-7 -left-7 sm:-top-8 sm:-left-9 pointer-events-none select-none animate-float-cloud z-10">
      <svg
        width="68"
        height="48"
        viewBox="0 0 76 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_8px_16px_rgba(168,85,247,0.28)]"
      >
        <defs>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="30%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          <linearGradient id="cloudHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          <radialGradient id="cloudShine" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base 3D Cloud Pillows */}
        <path
          d="M 22 46 
             L 54 46 
             A 16 16 0 0 0 68 32 
             A 14 14 0 0 0 57 18 
             A 20 20 0 0 0 24 16 
             A 16 16 0 0 0 8 32 
             A 14 14 0 0 0 22 46 Z"
          fill="url(#cloudGradient)"
        />

        {/* Soft 3D Lighting Bubble Highlights */}
        <ellipse cx="28" cy="22" rx="10" ry="7" fill="url(#cloudShine)" />
        <ellipse cx="48" cy="24" rx="8" ry="5.5" fill="url(#cloudShine)" />

        {/* Specular Edge Top Reflection */}
        <path
          d="M 18 24 C 22 14, 40 12, 48 18"
          stroke="url(#cloudHighlight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export const FloatingHeart: React.FC = () => {
  return (
    <div className="inline-block relative -top-1 ml-2 sm:ml-3 pointer-events-none select-none align-middle animate-float-heart z-10">
      <svg
        width="38"
        height="36"
        viewBox="0 0 44 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_8px_16px_rgba(217,70,239,0.35)]"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="45%" stopColor="#c084fc" />
            <stop offset="85%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>

          <radialGradient id="heartShine" cx="32%" cy="28%" r="45%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#f472b6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 3D Glossy Heart Body */}
        <path
          d="M 22 36 
             C 20 34, 4 23, 4 13 
             A 9 9 0 0 1 20 9 
             L 22 11 
             L 24 9 
             A 9 9 0 0 1 40 13 
             C 40 23, 24 34, 22 36 Z"
          fill="url(#heartGradient)"
        />

        {/* Top Left Specular Reflection */}
        <ellipse cx="14" cy="13" rx="4.5" ry="3" fill="url(#heartShine)" transform="rotate(-20 14 13)" />
        {/* Soft edge gloss */}
        <path
          d="M 9 13 A 6 6 0 0 1 17 8"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
