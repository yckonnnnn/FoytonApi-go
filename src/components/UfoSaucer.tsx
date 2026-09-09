import React, { useState } from 'react';

export const UfoSaucer: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-[340px] h-[210px] flex items-center justify-center cursor-pointer select-none group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Sparkles around the UFO */}
      <span className="absolute -top-3 -left-6 text-purple-400 text-xs select-none animate-pulse">✦</span>
      <span className="absolute top-8 -right-8 text-indigo-300 text-sm select-none animate-bounce" style={{ animationDuration: '3s' }}>+</span>
      <span className="absolute bottom-6 -left-10 text-neutral-400 text-[10px] select-none">+</span>
      <span className="absolute -bottom-2 right-6 text-purple-300 text-xs select-none animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
      <span className="absolute top-16 right-16 text-neutral-300 text-[9px] select-none">+</span>

      {/* Dynamic Animated Container */}
      <div
        className="relative w-full h-full flex items-center justify-center animate-float-ufo transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px) rotate(${mouseOffset.x * 0.4}deg)`,
        }}
      >
        {/* Soft Ground Shadow */}
        <div
          className="absolute -bottom-2 w-[180px] h-[22px] rounded-full blur-md opacity-25 group-hover:opacity-35 transition-all duration-500"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(30,27,75,0.7) 0%, rgba(109,40,217,0.3) 40%, transparent 75%)',
            transform: `scale(${1 - mouseOffset.y * 0.02})`,
          }}
        />

        {/* UFO Vector Render */}
        <svg
          viewBox="0 0 320 190"
          className="w-[300px] h-[180px] overflow-visible drop-shadow-[0_15px_25px_rgba(15,23,42,0.22)]"
        >
          <defs>
            {/* Gradients for UFO Hull */}
            <linearGradient id="saucerBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a505b" />
              <stop offset="25%" stopColor="#2c3039" />
              <stop offset="65%" stopColor="#1e2127" />
              <stop offset="100%" stopColor="#0f1115" />
            </linearGradient>

            <linearGradient id="saucerRimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8d95a5" />
              <stop offset="20%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="80%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="saucerLowerHull" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e2229" />
              <stop offset="40%" stopColor="#111317" />
              <stop offset="100%" stopColor="#0a0c0e" />
            </linearGradient>

            <linearGradient id="cockpitDome" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#334155" />
              <stop offset="85%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="domeHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#c084fc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Lightning Gradient */}
            <linearGradient id="lightningGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="40%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Porthole Lights Glow filter */}
            <filter id="portholeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Lightning Aura Glow filter */}
            <filter id="lightningAura" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. NEON LIGHTNING BOLT EMERGING FROM TOP DOME */}
          <g className="animate-lightning" style={{ transformOrigin: '160px 52px' }}>
            {/* Ambient Aura */}
            <path
              d="M 164 12 
                 L 155 38 
                 L 165 37 
                 L 154 62 
                 L 173 34 
                 L 163 35 Z"
              fill="url(#lightningGrad)"
              filter="url(#lightningAura)"
              opacity="0.8"
            />
            {/* Core Crisp Bolt */}
            <path
              d="M 164 14 
                 L 156 38 
                 L 166 37 
                 L 155 60 
                 L 173 34 
                 L 163 35 Z"
              fill="url(#lightningGrad)"
              stroke="#ffffff"
              strokeWidth="0.8"
            />
            {/* Inner Core Hot White Highlight */}
            <path
              d="M 163 20 
                 L 158 37 
                 L 164 36.5 
                 L 158 52 
                 L 169 35 Z"
              fill="#ffffff"
              opacity="0.85"
            />
          </g>

          {/* 2. LOWER SAUCER BASE / UNDERBELLY */}
          <ellipse
            cx="160"
            cy="118"
            rx="116"
            ry="24"
            fill="url(#saucerLowerHull)"
          />

          {/* 3. SAUCER OUTER RIM BEVEL (METALLIC CHROME EDGE) */}
          <ellipse
            cx="160"
            cy="112"
            rx="136"
            ry="22"
            fill="url(#saucerRimGradient)"
          />
          {/* Bevel under-lip line */}
          <path
            d="M 26 112 C 38 128, 282 128, 294 112 C 282 122, 38 122, 26 112 Z"
            fill="#1e2229"
            opacity="0.8"
          />

          {/* 4. UPPER SAUCER HULL */}
          <path
            d="M 28 110 
               C 34 82, 110 68, 160 68 
               C 210 68, 286 82, 292 110 
               C 260 126, 60 126, 28 110 Z"
            fill="url(#saucerBodyGradient)"
          />

          {/* Specular Rim Light on upper edge */}
          <path
            d="M 38 108 
               C 56 86, 120 72, 160 72 
               C 200 72, 264 86, 282 108 
               C 260 112, 60 112, 38 108 Z"
            fill="none"
            stroke="url(#saucerRimGradient)"
            strokeWidth="1.2"
            opacity="0.65"
          />

          {/* 5. COCKPIT GLASS DOME */}
          <ellipse
            cx="160"
            cy="76"
            rx="56"
            ry="30"
            fill="url(#cockpitDome)"
          />

          {/* Dome Specular Glass Highlight */}
          <path
            d="M 124 66 
               C 134 52, 178 50, 194 62 
               C 178 56, 138 58, 124 66 Z"
            fill="url(#domeHighlight)"
            opacity="0.9"
          />

          {/* Subtle reflection curve inside dome */}
          <ellipse
            cx="145"
            cy="68"
            rx="16"
            ry="7"
            fill="#ffffff"
            opacity="0.25"
            transform="rotate(-12 145 68)"
          />

          {/* 6. ILLUMINATED CIRCULAR PORTHOLES (LOWER RIM LIGHTS) */}
          {/* Porthole 1 (Far Left) */}
          <g filter="url(#portholeGlow)">
            <ellipse cx="68" cy="108" rx="8.5" ry="5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <ellipse cx="68" cy="108" rx="6" ry="3.2" fill="#ffffff" />
          </g>

          {/* Porthole 2 (Mid Left) */}
          <g filter="url(#portholeGlow)">
            <ellipse cx="108" cy="114" rx="10.5" ry="6" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <ellipse cx="108" cy="114" rx="7.5" ry="4" fill="#ffffff" />
          </g>

          {/* Porthole 3 (Center) */}
          <g filter="url(#portholeGlow)">
            <ellipse cx="160" cy="117" rx="12" ry="6.5" fill="#f8fafc" stroke="#334155" strokeWidth="1.2" />
            <ellipse cx="160" cy="117" rx="9" ry="4.5" fill="#ffffff" />
          </g>

          {/* Porthole 4 (Mid Right) */}
          <g filter="url(#portholeGlow)">
            <ellipse cx="212" cy="114" rx="10.5" ry="6" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <ellipse cx="212" cy="114" rx="7.5" ry="4" fill="#ffffff" />
          </g>

          {/* Porthole 5 (Far Right) */}
          <g filter="url(#portholeGlow)">
            <ellipse cx="252" cy="108" rx="8.5" ry="5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <ellipse cx="252" cy="108" rx="6" ry="3.2" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
};
