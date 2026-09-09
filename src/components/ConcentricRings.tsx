import React from 'react';

export const ConcentricRings: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Soft Purple Radial Nebula Glow behind UFO */}
      <div 
        className="absolute w-[560px] h-[560px] rounded-full blur-3xl opacity-65 animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(224, 212, 255, 0.75) 0%, rgba(243, 232, 255, 0.45) 45%, rgba(255, 255, 255, 0) 75%)',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Secondary ambient warm lilac blush */}
      <div 
        className="absolute w-[320px] h-[320px] rounded-full blur-2xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.35) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(255, 255, 255, 0) 80%)',
          top: '43%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Concentric Orbit Rings System */}
      <div 
        className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px]"
      >
        {/* Ring 1 - Innermost */}
        <div 
          className="absolute inset-[380px] rounded-full border border-neutral-300/40"
        />

        {/* Ring 2 - with star markers */}
        <div 
          className="absolute inset-[270px] rounded-full border border-neutral-300/50"
        >
          {/* Subtle star/cross markers on the ring perimeter */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[11px] text-neutral-300 font-light select-none">+</span>
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[11px] text-neutral-300 font-light select-none">+</span>
          <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 text-[11px] text-neutral-300 font-light select-none">+</span>
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 text-[11px] text-neutral-300 font-light select-none">+</span>
          <div className="absolute top-[28%] right-[8%] w-1.5 h-1.5 rounded-full bg-neutral-300/70" />
        </div>

        {/* Ring 3 - Intermediate */}
        <div 
          className="absolute inset-[170px] rounded-full border border-neutral-200/80"
        >
          <div className="absolute top-[18%] left-[12%] w-1.5 h-1.5 rounded-full bg-neutral-300/80" />
          <div className="absolute bottom-[22%] right-[14%] w-1.5 h-1.5 rounded-full bg-neutral-300/80" />
          <span className="absolute top-[32%] right-[-6px] text-[12px] text-neutral-300 select-none">✦</span>
        </div>

        {/* Ring 4 - Large outer ring */}
        <div 
          className="absolute inset-[60px] rounded-full border border-neutral-200/60"
        >
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[12px] text-neutral-300/80 font-light select-none">+</span>
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-[12px] text-neutral-300/80 font-light select-none">+</span>
          <div className="absolute top-[68%] left-[6%] w-2 h-2 rounded-full bg-neutral-200" />
        </div>

        {/* Ring 5 - Outermost faint boundary */}
        <div 
          className="absolute inset-0 rounded-full border border-neutral-200/40"
        />
      </div>
    </div>
  );
};
