import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { QrCode } from 'lucide-react';
import { FoytonLogo } from './FoytonLogo';
import { useLanguage } from '../context/LanguageContext';

interface ThreeWarpTunnelProps {
  onOpenConsultation: () => void;
}

export const ThreeWarpTunnel: React.FC<ThreeWarpTunnelProps> = ({ onOpenConsultation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 560;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060713, 0.0012);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 3000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x060713, 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Chromatic Hyperspace Color Palette (iridescent spectrum)
    const chromaticColors = [
      new THREE.Color('#ec4899'), // Pink/Magenta
      new THREE.Color('#8b5cf6'), // Purple/Violet
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#3b82f6'), // Electric Blue
      new THREE.Color('#f59e0b'), // Amber Gold
      new THREE.Color('#10b981'), // Emerald Green
      new THREE.Color('#f43f5e'), // Rose Neon
      new THREE.Color('#ffffff'), // Pure White Laser
      new THREE.Color('#a855f7'), // Deep Violet
    ];

    // 1. Hyperspace Laser Streaks (radiant lines converging into dark core)
    const lineGroup = new THREE.Group();
    const streakCount = 380;
    const streakLines: { line: THREE.Line; speed: number; startRadius: number; angle: number; length: number; zOffset: number }[] = [];

    for (let i = 0; i < streakCount; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.pow(Math.random(), 1.5) * 550;
      const length = 200 + Math.random() * 800;
      const zOffset = (Math.random() - 0.5) * 2000;

      const x1 = Math.cos(angle) * (radius * 0.15);
      const y1 = Math.sin(angle) * (radius * 0.15);
      const x2 = Math.cos(angle) * radius;
      const y2 = Math.sin(angle) * radius;

      const points = [
        new THREE.Vector3(x1, y1, -length),
        new THREE.Vector3(x2, y2, length),
      ];
      lineGeo.setFromPoints(points);

      const color = chromaticColors[Math.floor(Math.random() * chromaticColors.length)];
      const lineMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.55,
        blending: THREE.AdditiveBlending,
        linewidth: Math.random() > 0.8 ? 2 : 1,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      line.position.z = zOffset;
      lineGroup.add(line);

      streakLines.push({
        line,
        speed: 8 + Math.random() * 18,
        startRadius: radius,
        angle,
        length,
        zOffset,
      });
    }
    scene.add(lineGroup);

    // 2. Glowing Particle Streaks & Stardust (chromatic glowing particles)
    const particleCount = 4200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 30 + Math.pow(Math.random(), 1.3) * 600;
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2500;

      const chosenColor = chromaticColors[Math.floor(Math.random() * chromaticColors.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      speeds[i] = 4 + Math.random() * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for glowing stardust beads
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(236, 72, 153, 0.9)');
      grad.addColorStop(0.6, 'rgba(6, 182, 212, 0.5)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 6.0,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Mouse tracking & parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetX = x * 150;
      targetY = -y * 150;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width || window.innerWidth;
        height = entry.contentRect.height || 560;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.35;
      camera.position.y = mouseY * 0.35;
      camera.lookAt(0, 0, 0);

      // Rotate streaks & particles gently
      lineGroup.rotation.z += 0.0012;
      particles.rotation.z -= 0.0008;

      // Animate lines forward
      for (let i = 0; i < streakLines.length; i++) {
        const item = streakLines[i];
        item.line.position.z += item.speed * 0.8;
        if (item.line.position.z > 1200) {
          item.line.position.z = -1200;
        }
      }

      // Animate particles forward
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 2] += speeds[i] * 1.5;

        // Wrap around when passing camera
        if (posArray[i * 3 + 2] > 1100) {
          posArray[i * 3 + 2] = -1200;
          const radius = 30 + Math.pow(Math.random(), 1.3) * 600;
          const angle = Math.random() * Math.PI * 2;
          posArray[i * 3] = Math.cos(angle) * radius;
          posArray[i * 3 + 1] = Math.sin(angle) * radius;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <section className="relative w-full bg-[#060713] overflow-hidden">

      {/* Top Dotted Transition Strip from White Footer into Cosmic Space */}
      <div
        className="w-full h-14 sm:h-20 relative pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #fbfaf8 0%, #ede9fe 25%, #1e1b4b 70%, #060713 100%)',
        }}
      >
        {/* Halftone Dot Texture Mesh */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px',
            backgroundPosition: '8px 8px',
          }}
        />
      </div>

      {/* Main Cosmic Hyperspace 3D Canvas Container */}
      <div className="relative w-full min-h-[480px] sm:min-h-[560px] md:min-h-[640px] flex items-center justify-center">

        {/* Three.js Canvas */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Ambient Chromatic Core Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-fuchsia-600/25 via-cyan-500/20 to-purple-600/25 rounded-full blur-[100px] pointer-events-none" />

        {/* Center Void Vignette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-black/60 blur-xl pointer-events-none" />

        {/* Overlay Typography & Pill Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pointer-events-none py-16">

          {/* Foyton API Logo Badge with white background for visibility on dark space background */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/25 bg-white/90 backdrop-blur-md mb-5 sm:mb-7 shadow-lg">
            <FoytonLogo className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.1em] text-neutral-900 uppercase">
              Foyton API
            </span>
          </div>

          {/* Bold White Headline: 每一次调用，都穿越最优通道 */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            {language === 'zh' ? '每一次调用，都穿越最优通道' : 'Every Invocation Traverses the Optimal Channel'}
          </h2>

        </div>

        {/* Bottom Right: Compact Glass Pill "联系客服" */}
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
    </section>
  );
};
