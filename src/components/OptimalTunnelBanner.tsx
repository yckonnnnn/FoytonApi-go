import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { QrCode } from 'lucide-react';

interface OptimalTunnelBannerProps {
  onOpenConsultation: () => void;
}

interface StarBeam {
  angle: number;
  radius: number;
  speed: number;
  length: number;
  color: string;
  width: number;
  alpha: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

export const OptimalTunnelBanner: React.FC<OptimalTunnelBannerProps> = ({ 
  onOpenConsultation 
}) => {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette matching Image 3 (Cyan, Magenta, Violet, Gold, Electric Blue, Emerald)
    const beamColors = [
      '#38bdf8', // Cyan
      '#a855f7', // Purple
      '#ec4899', // Magenta pink
      '#818cf8', // Indigo
      '#fbbf24', // Warm gold
      '#34d399', // Emerald
      '#f43f5e', // Rose
      '#60a5fa', // Soft blue
      '#c084fc', // Lilac
      '#ffffff', // Crisp white streak
    ];

    const maxRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2) * 1.05;

    // Initialize 240+ dynamic warp beams
    const beamCount = Math.min(280, Math.floor(width / 4));
    const beams: StarBeam[] = [];

    for (let i = 0; i < beamCount; i++) {
      beams.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * maxRadius,
        speed: 1.2 + Math.random() * 3.8,
        length: 12 + Math.random() * 45,
        color: beamColors[Math.floor(Math.random() * beamColors.length)],
        width: 0.6 + Math.random() * 1.6,
        alpha: 0.3 + Math.random() * 0.7,
      });
    }

    // Initialize glowing ambient bokeh orbs (matching Image 3 colored light bubbles)
    const orbColors = [
      'rgba(56, 189, 248, 0.45)',  // Cyan orb
      'rgba(168, 85, 247, 0.4)',   // Purple orb
      'rgba(236, 72, 153, 0.35)',  // Pink orb
      'rgba(59, 130, 246, 0.35)',  // Blue orb
      'rgba(245, 158, 11, 0.3)',   // Amber orb
    ];

    const orbs: BokehOrb[] = [];
    for (let i = 0; i < 36; i++) {
      orbs.push({
        x: (Math.random() - 0.5) * width * 0.9,
        y: (Math.random() - 0.5) * height * 0.85,
        radius: 12 + Math.random() * 32,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        alpha: 0.2 + Math.random() * 0.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Dark futuristic space background matching Image 3 deep navy-black (#04050c)
      ctx.fillStyle = '#04050d';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle background radial gradient flare
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxRadius * 0.8);
      bgGrad.addColorStop(0, 'rgba(30, 27, 75, 0.65)');
      bgGrad.addColorStop(0.35, 'rgba(15, 23, 42, 0.5)');
      bgGrad.addColorStop(1, 'rgba(4, 5, 13, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render glowing floating bokeh orbs with breathing pulse
      orbs.forEach(orb => {
        orb.phase += orb.pulseSpeed;
        const currentAlpha = orb.alpha * (0.6 + 0.4 * Math.sin(orb.phase));
        const ox = cx + orb.x;
        const oy = cy + orb.y;

        const orbGrad = ctx.createRadialGradient(ox, oy, 1, ox, oy, orb.radius);
        orbGrad.addColorStop(0, orb.color.replace(/[\d.]+\)$/, `${currentAlpha})`));
        orbGrad.addColorStop(0.5, orb.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.4})`));
        orbGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Hyperspace Light Streak Beams
      ctx.lineCap = 'round';

      beams.forEach(beam => {
        // Accelerate as they travel further outward
        const speedMultiplier = 1 + (beam.radius / maxRadius) * 2.5;
        beam.radius += beam.speed * speedMultiplier;

        // Reset beam when leaving boundary
        if (beam.radius > maxRadius) {
          beam.radius = 8 + Math.random() * 25;
          beam.angle = Math.random() * Math.PI * 2;
          beam.speed = 1.2 + Math.random() * 3.8;
          beam.length = 15 + Math.random() * 45;
        }

        const headX = cx + Math.cos(beam.angle) * (beam.radius + beam.length);
        const headY = cy + Math.sin(beam.angle) * (beam.radius + beam.length);
        const tailX = cx + Math.cos(beam.angle) * beam.radius;
        const tailY = cy + Math.sin(beam.angle) * beam.radius;

        // Dynamic fade in at center, bright in middle, soft at far edge
        let beamAlpha = beam.alpha;
        if (beam.radius < 50) {
          beamAlpha *= beam.radius / 50;
        }

        ctx.strokeStyle = beam.color;
        ctx.globalAlpha = beamAlpha;
        ctx.lineWidth = beam.width * (1 + (beam.radius / maxRadius) * 0.8);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
      });

      ctx.globalAlpha = 1.0;

      // Subtle Center Pulsing Light Origin Core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      coreGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.4)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      id="optimal-tunnel-banner"
      className="relative w-full mt-12 sm:mt-16 overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-800/80 shadow-[0_12px_48px_rgba(0,0,0,0.4)] select-none bg-[#04050d]"
    >
      {/* ── Top Micro Dot / Grid Line Accent matching Image 3 top edge ── */}
      <div className="absolute top-0 inset-x-0 h-8 pointer-events-none z-20 flex items-center justify-between px-6 opacity-30">
        <div className="flex gap-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-blue-400/60" />
          ))}
        </div>
      </div>

      {/* ── Dynamic HTML5 Hyperspace Light-Speed Beams Canvas ── */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* ── Centered Hero Headline & Pill Tag (Strict Match to Image 3) ── */}
        <div className="relative z-20 text-center px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center pointer-events-none">
          
          {/* Top Pill Tag: Exact Match to Image 3 (White Pill with Black Silhouette Icon + FOYTON API) */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white text-neutral-900 shadow-[0_4px_20px_rgba(255,255,255,0.25)] mb-6 sm:mb-8 transition-transform">
            {/* Black Mascot / Silhouette Icon matching Image 3 */}
            <div className="w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold font-mono tracking-wider text-neutral-950">
              FOYTON API
            </span>
          </div>

          {/* Main Giant Headline: "每一次调用，都穿越最优通道" (Exact Match to Image 3 typography) */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            {language === 'zh' ? '每一次调用，都穿越最优通道' : 'Every Invocation Traverses the Optimal Channel'}
          </h2>

        </div>

        {/* ── Bottom Right: Compact Glass Pill "联系客服" (Exact Match to Image 3 Bottom Right) ── */}
        <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 z-30">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium border border-neutral-700/80 shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-4 h-4 rounded-xs bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <QrCode className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300" />
            </div>
            <span className="tracking-wide">
              {language === 'zh' ? '联系客服' : 'Contact Support'}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
