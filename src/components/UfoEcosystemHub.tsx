import React, { useState } from 'react';
import { UfoSaucer } from './UfoSaucer';
import { FoytonLogo } from './FoytonLogo';
import { useLanguage } from '../context/LanguageContext';

// 1. Precise Official Brand & Tool Vector Icons (Faithful to Real Brand Identity & Design Reference in Image 3)

/**
 * Official Anthropic Claude Asterisk Icon
 */
export const ClaudeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
      fill="#D97757"
    />
  </svg>
);

/**
 * Official OpenAI Logo (Geometric Rosette)
 */
export const GptIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      fill="#111317"
    />
  </svg>
);

/**
 * Official Google Gemini Sparkle Star
 */
export const GeminiIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="geminiOfficialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1B72E8" />
        <stop offset="35%" stopColor="#4285F4" />
        <stop offset="70%" stopColor="#8E24AA" />
        <stop offset="100%" stopColor="#E879F9" />
      </linearGradient>
    </defs>
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
      fill="url(#geminiOfficialGrad)"
    />
  </svg>
);

/**
 * 1. Official Claude Code IC Chip Mascot Icon
 * Faithful to Image 3: Terracotta/brown horizontal pixel IC chip with 2 top pins, 3 bottom pins,
 * side connectors, and 2 white square windows/eyes.
 */
export const ClaudeCodeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* 2 Top Pins */}
    <rect x="5.5" y="3" width="3.2" height="3" rx="0.5" fill="#BF5636" />
    <rect x="15.3" y="3" width="3.2" height="3" rx="0.5" fill="#BF5636" />
    {/* Left & Right Connector Pins */}
    <rect x="1.2" y="9.8" width="2.5" height="3.4" rx="0.5" fill="#BF5636" />
    <rect x="20.3" y="9.8" width="2.5" height="3.4" rx="0.5" fill="#BF5636" />
    {/* 3 Bottom Pins */}
    <rect x="4.5" y="17.2" width="3" height="3.2" rx="0.5" fill="#BF5636" />
    <rect x="10.5" y="17.2" width="3" height="3.2" rx="0.5" fill="#BF5636" />
    <rect x="16.5" y="17.2" width="3" height="3.2" rx="0.5" fill="#BF5636" />
    {/* Main Chip Rectangular Body */}
    <rect x="3" y="5.8" width="18" height="11.8" rx="1.2" fill="#BF5636" />
    {/* 2 Crisp White Square Windows / Eyes */}
    <rect x="5.8" y="8.2" width="4.2" height="4.4" rx="0.4" fill="#FFFFFF" />
    <rect x="14" y="8.2" width="4.2" height="4.4" rx="0.4" fill="#FFFFFF" />
  </svg>
);

/**
 * 2. Official Codex Icon
 * Faithful to Image 3: Royal blue cloud squircle with white terminal prompt `>_`.
 */
export const CodexIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Royal Blue Cloud Squircle Body */}
    <path
      d="M12 2.6C15.2 2.6 18.2 4 19.6 6.3C21.8 8.1 22.4 11.2 21.4 13.9C21.3 17 18.9 19.8 15.8 21 C13.3 21.8 10.6 21.8 8.2 21 C5 19.8 2.6 17 2.6 13.9 C1.6 11.2 2.2 8.1 4.4 6.3 C5.8 4 8.8 2.6 12 2.6 Z"
      fill="#2F68F6"
    />
    {/* White Terminal Prompt: '>' and '_' */}
    <path
      d="M7.8 9.5L10.9 12L7.8 14.5"
      stroke="#FFFFFF"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="13"
      y1="14.5"
      x2="16.8"
      y2="14.5"
      stroke="#FFFFFF"
      strokeWidth="2.3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 3. Official CC Switch Icon
 * Faithful to Image 3: Chunky 8-ray rounded capsule starburst with specific ray colors (terracotta, amber, teal).
 */
export const CcSwitchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* 8 Thick Radiating Rounded Capsule Rays */}
    {/* 12 o'clock - Terracotta / coral orange */}
    <line x1="12" y1="9" x2="12" y2="3.5" stroke="#D97757" strokeWidth="2.9" strokeLinecap="round" />
    {/* 1:30 - Warm golden amber */}
    <line x1="14.2" y1="9.8" x2="18.2" y2="5.8" stroke="#EA8C33" strokeWidth="2.9" strokeLinecap="round" />
    {/* 3 o'clock - Warm gold */}
    <line x1="15" y1="12" x2="20.5" y2="12" stroke="#E5A62D" strokeWidth="2.9" strokeLinecap="round" />
    {/* 4:30 - Golden amber */}
    <line x1="14.2" y1="14.2" x2="18.2" y2="18.2" stroke="#E5A62D" strokeWidth="2.9" strokeLinecap="round" />
    {/* 6 o'clock - Teal */}
    <line x1="12" y1="15" x2="12" y2="20.5" stroke="#14B8A6" strokeWidth="2.9" strokeLinecap="round" />
    {/* 7:30 - Teal / Cyan */}
    <line x1="9.8" y1="14.2" x2="5.8" y2="18.2" stroke="#0D9488" strokeWidth="2.9" strokeLinecap="round" />
    {/* 9 o'clock - Deep teal */}
    <line x1="9" y1="12" x2="3.5" y2="12" stroke="#0D9488" strokeWidth="2.9" strokeLinecap="round" />
    {/* 10:30 - Mint cyan */}
    <line x1="9.8" y1="9.8" x2="5.8" y2="5.8" stroke="#2DD4BF" strokeWidth="2.9" strokeLinecap="round" />
  </svg>
);

/**
 * 4. Official OpenClaw Mascot Icon
 * Faithful to Image 3: 3D red round beetle/crab with cyan-pupil eyes, little antennas, arms, and feet.
 */
export const OpenClawIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="openClawRedSphereExact" cx="35%" cy="30%" r="68%">
        <stop offset="0%" stopColor="#FF6666" />
        <stop offset="45%" stopColor="#EF3838" />
        <stop offset="85%" stopColor="#C51818" />
        <stop offset="100%" stopColor="#9B0E0E" />
      </radialGradient>
    </defs>
    {/* 2 Tiny curved top antennas */}
    <path d="M10 5.6C9.2 3.8 7.8 3.2 6.8 3.6" stroke="#D32F2F" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14 5.6C14.8 3.8 16.2 3.2 17.2 3.6" stroke="#D32F2F" strokeWidth="1.6" strokeLinecap="round" />
    {/* 2 Little side arms/flippers */}
    <ellipse cx="4.3" cy="12.6" rx="2.2" ry="1.5" fill="#D32F2F" transform="rotate(-18 4.3 12.6)" />
    <ellipse cx="19.7" cy="12.6" rx="2.2" ry="1.5" fill="#D32F2F" transform="rotate(18 19.7 12.6)" />
    {/* 2 Stubby little feet */}
    <rect x="9.2" y="17.6" width="2" height="2.5" rx="0.5" fill="#B71C1C" />
    <rect x="12.8" y="17.6" width="2" height="2.5" rx="0.5" fill="#B71C1C" />
    {/* 3D Round Red Body Sphere */}
    <circle cx="12" cy="12.2" r="7.2" fill="url(#openClawRedSphereExact)" />
    {/* 2 Black Eyes with Bright Cyan Center Pupils */}
    <ellipse cx="9.6" cy="11.2" rx="1.2" ry="1.4" fill="#111827" />
    <circle cx="9.6" cy="11.2" r="0.65" fill="#00F2FE" />
    <ellipse cx="14.4" cy="11.2" rx="1.2" ry="1.4" fill="#111827" />
    <circle cx="14.4" cy="11.2" r="0.65" fill="#00F2FE" />
  </svg>
);

export const UfoEcosystemHub: React.FC = () => {
  const { t } = useLanguage();
  const [activeModel, setActiveModel] = useState<string>('GPT');
  const [activeAgent, setActiveAgent] = useState<string>('Codex');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Left model bezier paths docking cleanly into the UFO's left wing port (x: 345, y: 142)
  const pathClaude = "M 210 68 C 265 68, 305 136, 345 142";
  const pathGpt = "M 210 140 C 260 140, 300 142, 345 142";
  const pathGemini = "M 210 212 C 265 212, 305 148, 345 142";

  // Right agent bezier paths dispatching outward from the UFO's right wing port (x: 615, y: 142)
  const pathClaudeCode = "M 615 142 C 655 136, 695 48, 750 48";
  const pathCodex = "M 615 142 C 655 142, 695 114, 750 114";
  const pathCcSwitch = "M 615 142 C 655 144, 695 180, 750 180";
  const pathOpenClaw = "M 615 142 C 655 148, 695 246, 750 246";

  const isModelActive = (name: string) => activeModel === name || hoveredNode === name;
  const isAgentActive = (name: string) => activeAgent === name || hoveredNode === name;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-2 sm:my-4 select-none" id="ufo-ai-ecosystem-hub">
      
      {/* ----------------- DESKTOP / TABLET PRESENTATION (>= 768px) ----------------- */}
      <div className="hidden md:block">
        {/* Top Section Category Badges */}
        <div className="w-full flex items-center justify-between px-6 lg:px-16 mb-2">
          {/* Left Badge: 全球模型直连 */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-neutral-200/90 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[11.5px] font-semibold text-neutral-700 tracking-tight">
              {t.hub_badge_models}
            </span>
          </div>

          {/* Right Badge: AGENT 客户端 */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-neutral-200/90 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[11.5px] font-semibold text-neutral-700 tracking-tight">
              {t.hub_badge_agents}
            </span>
          </div>
        </div>

        {/* Main Stage: Left Models, Center UFO, Right Agents */}
        <div className="relative w-full min-h-[310px] flex items-center justify-between px-4 lg:px-12">
          
          {/* Ambient Warm Golden Glow behind the UFO Center */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] lg:w-[600px] h-[280px] rounded-full pointer-events-none opacity-45 -z-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251,146,60,0.3) 0%, rgba(192,132,252,0.18) 45%, rgba(255,255,255,0) 75%)',
            }}
          />

          {/* Dynamic Connected SVG Harness Overlay - Positioned cleanly behind & into flank docking nodes */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            viewBox="0 0 960 300"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <style>{`
                @keyframes flowInwardFast {
                  from { stroke-dashoffset: 28; }
                  to { stroke-dashoffset: 0; }
                }
                @keyframes flowOutwardFast {
                  from { stroke-dashoffset: 0; }
                  to { stroke-dashoffset: -28; }
                }
                .flow-in-active {
                  animation: flowInwardFast 1s linear infinite;
                }
                .flow-out-active {
                  animation: flowOutwardFast 1s linear infinite;
                }
              `}</style>

              {/* Enhanced Glow Filter for Active Beams and Traveling Photons */}
              <filter id="harnessGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Gradients for Left Streams */}
              <linearGradient id="streamGradClaude" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D97757" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="streamGradGpt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#18181B" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#4F46E5" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="streamGradGemini" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
              </linearGradient>

              {/* Gradients for Right Streams */}
              <linearGradient id="streamGradClaudeCode" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D97757" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="streamGradCodex" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="streamGradCcSwitch" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="streamGradOpenClaw" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Subtle internal data bus under the saucer connecting left dock to right dock */}
            <line 
              x1="345" 
              y1="142" 
              x2="615" 
              y2="142" 
              stroke="#E2E8F0" 
              strokeWidth="1.2" 
              strokeDasharray="2 3" 
              opacity="0.6" 
            />

            {/* ================= LEFT STREAM 1: Claude -> Left Flank ================= */}
            <path
              d={pathClaude}
              stroke="#D97757"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isModelActive('Claude') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathClaude}
              stroke="url(#streamGradClaude)"
              strokeWidth={isModelActive('Claude') ? "2.8" : "1.8"}
              strokeDasharray={isModelActive('Claude') ? "8 5" : "6 6"}
              strokeLinecap="round"
              filter={isModelActive('Claude') ? "url(#harnessGlow)" : undefined}
              className={isModelActive('Claude') ? "flow-in-active opacity-100" : "flow-in opacity-75"}
            />
            <circle r={isModelActive('Claude') ? "3.8" : "2.6"} fill="#EA580C" filter="url(#harnessGlow)">
              <animateMotion path={pathClaude} dur={isModelActive('Claude') ? "1.0s" : "2.0s"} repeatCount="indefinite" />
            </circle>

            {/* ================= LEFT STREAM 2: GPT -> Left Flank ================= */}
            <path
              d={pathGpt}
              stroke="#18181B"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isModelActive('GPT') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathGpt}
              stroke="url(#streamGradGpt)"
              strokeWidth={isModelActive('GPT') ? "3.0" : "2.0"}
              strokeDasharray={isModelActive('GPT') ? "8 5" : "6 6"}
              strokeLinecap="round"
              filter={isModelActive('GPT') ? "url(#harnessGlow)" : undefined}
              className={isModelActive('GPT') ? "flow-in-active opacity-100" : "flow-in opacity-85"}
            />
            <circle r={isModelActive('GPT') ? "4.0" : "2.8"} fill="#8B5CF6" filter="url(#harnessGlow)">
              <animateMotion path={pathGpt} dur={isModelActive('GPT') ? "1.0s" : "1.9s"} repeatCount="indefinite" />
            </circle>

            {/* ================= LEFT STREAM 3: Gemini -> Left Flank ================= */}
            <path
              d={pathGemini}
              stroke="#2563EB"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isModelActive('Gemini') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathGemini}
              stroke="url(#streamGradGemini)"
              strokeWidth={isModelActive('Gemini') ? "2.8" : "1.8"}
              strokeDasharray={isModelActive('Gemini') ? "8 5" : "6 6"}
              strokeLinecap="round"
              filter={isModelActive('Gemini') ? "url(#harnessGlow)" : undefined}
              className={isModelActive('Gemini') ? "flow-in-active opacity-100" : "flow-in opacity-75"}
            />
            <circle r={isModelActive('Gemini') ? "3.8" : "2.6"} fill="#3B82F6" filter="url(#harnessGlow)">
              <animateMotion path={pathGemini} dur={isModelActive('Gemini') ? "1.0s" : "2.1s"} repeatCount="indefinite" />
            </circle>

            {/* ================= RIGHT STREAM 1: Right Flank -> Claude Code ================= */}
            <path
              d={pathClaudeCode}
              stroke="#D97757"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isAgentActive('Claude Code') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathClaudeCode}
              stroke="url(#streamGradClaudeCode)"
              strokeWidth={isAgentActive('Claude Code') ? "2.8" : "1.8"}
              strokeDasharray={isAgentActive('Claude Code') ? "8 5" : "6 6"}
              strokeLinecap="round"
              filter={isAgentActive('Claude Code') ? "url(#harnessGlow)" : undefined}
              className={isAgentActive('Claude Code') ? "flow-out-active opacity-100" : "flow-out opacity-75"}
            />
            <circle r={isAgentActive('Claude Code') ? "3.8" : "2.6"} fill="#D97757" filter="url(#harnessGlow)">
              <animateMotion path={pathClaudeCode} dur={isAgentActive('Claude Code') ? "1.0s" : "2.0s"} repeatCount="indefinite" />
            </circle>

            {/* ================= RIGHT STREAM 2: Right Flank -> Codex (Active Blue Beam) ================= */}
            <path
              d={pathCodex}
              stroke="#2563EB"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isAgentActive('Codex') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathCodex}
              stroke="url(#streamGradCodex)"
              strokeWidth={isAgentActive('Codex') ? "3.0" : "2.0"}
              strokeDasharray={isAgentActive('Codex') ? "9 5" : "6 6"}
              strokeLinecap="round"
              filter={isAgentActive('Codex') ? "url(#harnessGlow)" : undefined}
              className={isAgentActive('Codex') ? "flow-out-active opacity-100" : "flow-out opacity-85"}
            />
            <circle r={isAgentActive('Codex') ? "4.0" : "2.8"} fill="#3B82F6" filter="url(#harnessGlow)">
              <animateMotion path={pathCodex} dur={isAgentActive('Codex') ? "1.0s" : "1.8s"} repeatCount="indefinite" />
            </circle>

            {/* ================= RIGHT STREAM 3: Right Flank -> CC Switch ================= */}
            <path
              d={pathCcSwitch}
              stroke="#10B981"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isAgentActive('CC Switch') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathCcSwitch}
              stroke="url(#streamGradCcSwitch)"
              strokeWidth={isAgentActive('CC Switch') ? "2.8" : "1.8"}
              strokeDasharray={isAgentActive('CC Switch') ? "8 5" : "6 6"}
              strokeLinecap="round"
              filter={isAgentActive('CC Switch') ? "url(#harnessGlow)" : undefined}
              className={isAgentActive('CC Switch') ? "flow-out-active opacity-100" : "flow-out opacity-75"}
            />
            <circle r={isAgentActive('CC Switch') ? "3.8" : "2.6"} fill="#10B981" filter="url(#harnessGlow)">
              <animateMotion path={pathCcSwitch} dur={isAgentActive('CC Switch') ? "1.0s" : "2.2s"} repeatCount="indefinite" />
            </circle>

            {/* ================= RIGHT STREAM 4: Right Flank -> OpenClaw ================= */}
            <path
              d={pathOpenClaw}
              stroke="#EF4444"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              className={isAgentActive('OpenClaw') ? "opacity-50" : "opacity-30"}
            />
            <path
              d={pathOpenClaw}
              stroke="url(#streamGradOpenClaw)"
              strokeWidth={isAgentActive('OpenClaw') ? "2.8" : "1.8"}
              strokeDasharray={isAgentActive('OpenClaw') ? "8 5" : "6 6"}
              strokeLinecap="round"
              filter={isAgentActive('OpenClaw') ? "url(#harnessGlow)" : undefined}
              className={isAgentActive('OpenClaw') ? "flow-out-active opacity-100" : "flow-out opacity-75"}
            />
            <circle r={isAgentActive('OpenClaw') ? "3.8" : "2.6"} fill="#EF4444" filter="url(#harnessGlow)">
              <animateMotion path={pathOpenClaw} dur={isAgentActive('OpenClaw') ? "1.0s" : "2.1s"} repeatCount="indefinite" />
            </circle>

            {/* ================= LATERAL DOCKING RECEIVER NODES (ON UFO FLANKS) ================= */}
            {/* Left Inlet Port (x: 345, y: 142) */}
            <g className="transition-all duration-300">
              <circle cx="345" cy="142" r="5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
              <circle cx="345" cy="142" r="2.2" fill="#8B5CF6" className="animate-pulse" />
              <circle cx="345" cy="142" r="9" fill="none" stroke="#A855F7" strokeWidth="1" strokeDasharray="2 2" className="opacity-40 animate-spin" style={{ animationDuration: '8s' }} />
            </g>

            {/* Right Dispatch Port (x: 615, y: 142) */}
            <g className="transition-all duration-300">
              <circle cx="615" cy="142" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.5" />
              <circle cx="615" cy="142" r="2.2" fill="#3B82F6" className="animate-pulse" />
              <circle cx="615" cy="142" r="9" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2 2" className="opacity-40 animate-spin" style={{ animationDuration: '8s' }} />
            </g>

            {/* Connection Node Rings at Cards Endpoints */}
            <circle cx="210" cy="68" r="2.5" fill="#D97757" className={isModelActive('Claude') ? "opacity-90" : "opacity-30"} />
            <circle cx="210" cy="140" r="2.8" fill="#8B5CF6" className={isModelActive('GPT') ? "opacity-90" : "opacity-30"} />
            <circle cx="210" cy="212" r="2.5" fill="#2563EB" className={isModelActive('Gemini') ? "opacity-90" : "opacity-30"} />

            <circle cx="750" cy="48" r="2.5" fill="#D97757" className={isAgentActive('Claude Code') ? "opacity-90" : "opacity-30"} />
            <circle cx="750" cy="114" r="3" fill="#2563EB" className={isAgentActive('Codex') ? "opacity-100" : "opacity-40"} />
            <circle cx="750" cy="180" r="2.5" fill="#10B981" className={isAgentActive('CC Switch') ? "opacity-90" : "opacity-30"} />
            <circle cx="750" cy="246" r="2.5" fill="#EF4444" className={isAgentActive('OpenClaw') ? "opacity-90" : "opacity-30"} />
          </svg>

          {/* LEFT COLUMN: GLOBAL AI MODELS (Claude, GPT, Gemini) */}
          <div className="flex flex-col gap-3.5 z-30 w-44 lg:w-48 shrink-0">
            {/* Claude Card */}
            <button
              id="model-card-claude"
              onClick={() => setActiveModel('Claude')}
              onMouseEnter={() => setHoveredNode('Claude')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-3 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isModelActive('Claude')
                  ? 'border-[2px] border-amber-600 shadow-[0_8px_24px_rgba(217,119,87,0.22)] scale-[1.03]'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-orange-50/80 flex items-center justify-center shrink-0">
                <ClaudeIcon className="w-5 h-5" />
              </div>
              <span className="text-[14px] font-bold text-neutral-900 tracking-tight">
                Claude
              </span>
            </button>

            {/* GPT Card */}
            <button
              id="model-card-gpt"
              onClick={() => setActiveModel('GPT')}
              onMouseEnter={() => setHoveredNode('GPT')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-3 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isModelActive('GPT')
                  ? 'border-[2px] border-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.18)] scale-[1.03]'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-neutral-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                <GptIcon className="w-5 h-5 text-neutral-900" />
              </div>
              <span className="text-[14px] font-bold text-neutral-900 tracking-tight">
                GPT
              </span>
            </button>

            {/* Gemini Card */}
            <button
              id="model-card-gemini"
              onClick={() => setActiveModel('Gemini')}
              onMouseEnter={() => setHoveredNode('Gemini')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-3 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isModelActive('Gemini')
                  ? 'border-[2px] border-purple-500 shadow-[0_8px_24px_rgba(168,85,247,0.22)] scale-[1.03]'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-purple-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-purple-50/80 flex items-center justify-center shrink-0">
                <GeminiIcon className="w-5 h-5" />
              </div>
              <span className="text-[14px] font-bold text-neutral-900 tracking-tight">
                Gemini
              </span>
            </button>
          </div>

          {/* CENTER: UFO + Intelligent Dispatch Nexus */}
          <div className="relative flex flex-col items-center justify-center -my-2 sm:my-0 scale-95 sm:scale-100 lg:scale-105 z-20">
            {/* 3D UFO Flying Saucer */}
            <UfoSaucer />

            {/* Intelligent Dispatch Core Pill Badge */}
            <div 
              id="hub-dispatch-center-badge"
              className="mt-1 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-neutral-200/90 shadow-sm backdrop-blur-sm cursor-default hover:shadow-md transition-shadow z-30"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <FoytonLogo className="w-4 h-3.5" />
              <span className="text-[11.5px] font-bold text-neutral-800 tracking-tight">
                {t.hub_dispatch_core}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: AGENT CLIENTS & TOOLS (Faithfully matched with Image 3) */}
          <div className="flex flex-col gap-2.5 z-30 w-44 lg:w-48 shrink-0">
            {/* 1. Claude Code */}
            <button
              id="agent-card-claude-code"
              onClick={() => setActiveAgent('Claude Code')}
              onMouseEnter={() => setHoveredNode('Claude Code')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isAgentActive('Claude Code')
                  ? 'border-[1.8px] border-amber-600 shadow-[0_6px_20px_rgba(217,119,87,0.2)] scale-[1.03]'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <ClaudeCodeIcon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-900 tracking-tight">
                Claude Code
              </span>
            </button>

            {/* 2. Codex (Active Blue Pill) */}
            <button
              id="agent-card-codex"
              onClick={() => setActiveAgent('Codex')}
              onMouseEnter={() => setHoveredNode('Codex')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isAgentActive('Codex')
                  ? 'border-[2px] border-blue-500 shadow-[0_8px_24px_rgba(59,130,246,0.25)] scale-[1.04] ring-2 ring-blue-100'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <CodexIcon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-900 tracking-tight">
                Codex
              </span>
            </button>

            {/* 3. CC Switch */}
            <button
              id="agent-card-cc-switch"
              onClick={() => setActiveAgent('CC Switch')}
              onMouseEnter={() => setHoveredNode('CC Switch')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isAgentActive('CC Switch')
                  ? 'border-[1.8px] border-emerald-500 shadow-[0_6px_20px_rgba(16,185,129,0.2)] scale-[1.03]'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <CcSwitchIcon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-900 tracking-tight">
                CC Switch
              </span>
            </button>

            {/* 4. OpenClaw */}
            <button
              id="agent-card-openclaw"
              onClick={() => setActiveAgent('OpenClaw')}
              onMouseEnter={() => setHoveredNode('OpenClaw')}
              onMouseLeave={() => setHoveredNode(null)}
              className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md transition-all duration-200 text-left cursor-pointer ${
                isAgentActive('OpenClaw')
                  ? 'border-[1.8px] border-rose-500 shadow-[0_6px_20px_rgba(244,63,94,0.2)] scale-[1.03]'
                  : 'border border-neutral-200/90 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <OpenClawIcon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[13px] font-bold text-neutral-900 tracking-tight">
                OpenClaw
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* ----------------- MOBILE PRESENTATION (< 768px) ----------------- */}
      <div className="block md:hidden w-full px-2">
        {/* Top: Global Models */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-200/90 shadow-sm backdrop-blur-sm mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10.5px] font-semibold text-neutral-700">{t.hub_badge_models}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveModel('Claude')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-left ${
                activeModel === 'Claude' ? 'border-[1.5px] border-amber-600 shadow-sm' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <ClaudeIcon className="w-4 h-4" />
              <span className="text-[12px] font-bold text-neutral-900">Claude</span>
            </button>
            <button
              onClick={() => setActiveModel('GPT')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-left ${
                activeModel === 'GPT' ? 'border-[1.5px] border-neutral-900 shadow-sm' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <GptIcon className="w-4 h-4 text-neutral-900" />
              <span className="text-[12px] font-bold text-neutral-900">GPT</span>
            </button>
            <button
              onClick={() => setActiveModel('Gemini')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-left ${
                activeModel === 'Gemini' ? 'border-[1.5px] border-purple-600 shadow-sm' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <GeminiIcon className="w-4 h-4" />
              <span className="text-[12px] font-bold text-neutral-900">Gemini</span>
            </button>
          </div>
        </div>

        {/* Center: UFO + 智能调度 */}
        <div className="flex flex-col items-center justify-center my-1">
          <div className="scale-85 sm:scale-95 origin-center">
            <UfoSaucer />
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-200/80 shadow-xs backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <FoytonLogo className="w-3.5 h-3" />
            <span className="text-[10.5px] font-bold text-neutral-800">{t.hub_dispatch_core}</span>
          </div>
        </div>

        {/* Bottom: Agent Clients */}
        <div className="mt-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-neutral-200/90 shadow-sm backdrop-blur-sm mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10.5px] font-semibold text-neutral-700">{t.hub_badge_agents}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveAgent('Claude Code')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white ${
                activeAgent === 'Claude Code' ? 'border-[1.5px] border-amber-600 shadow-sm' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <ClaudeCodeIcon className="w-4 h-4" />
              <span className="text-[11.5px] font-bold text-neutral-900">Claude Code</span>
            </button>
            <button
              onClick={() => setActiveAgent('Codex')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white ${
                activeAgent === 'Codex' ? 'border-[1.5px] border-blue-500 shadow-sm bg-blue-50/20' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <CodexIcon className="w-4 h-4" />
              <span className="text-[11.5px] font-bold text-neutral-900">Codex</span>
            </button>
            <button
              onClick={() => setActiveAgent('CC Switch')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white ${
                activeAgent === 'CC Switch' ? 'border-[1.5px] border-emerald-500 shadow-sm' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <CcSwitchIcon className="w-4 h-4" />
              <span className="text-[11.5px] font-bold text-neutral-900">CC Switch</span>
            </button>
            <button
              onClick={() => setActiveAgent('OpenClaw')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white ${
                activeAgent === 'OpenClaw' ? 'border-[1.5px] border-rose-500 shadow-sm' : 'border border-neutral-200 shadow-xs'
              }`}
            >
              <OpenClawIcon className="w-4 h-4" />
              <span className="text-[11.5px] font-bold text-neutral-900">OpenClaw</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle / Tagline */}
      <div className="mt-3 text-center">
        <p className="text-[12px] sm:text-[13px] font-medium text-neutral-400 tracking-wide">
          {t.hub_footer_text}
        </p>
      </div>

    </div>
  );
};
