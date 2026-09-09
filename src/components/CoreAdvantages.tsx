import React from 'react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Terminal, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { OptimalTunnelBanner } from './OptimalTunnelBanner';

interface CoreAdvantagesProps {
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
}

export const CoreAdvantages: React.FC<CoreAdvantagesProps> = ({ 
  onNavigate, 
  onOpenConsultation 
}) => {
  const { language } = useLanguage();

  // Left Column Data: 为什么选 Foyton API？
  const whyChooseUs = [
    {
      id: 'no-downgrade',
      title: language === 'zh' ? '模型不降级' : 'No Model Downgrading',
      desc: language === 'zh'
        ? '模型请求直达已验证上游，绝不静默替换或降级，支持请求级真伪验证。'
        : 'Requests route directly to verified upstream providers without silent substitution or downgrading. Request-level integrity guaranteed.',
      icon: (
        /* Wireframe Isometric Cube with Grid Texture */
        <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 flex-shrink-0" stroke="currentColor">
          {/* Isometric Cube Outline */}
          <path d="M22 6 L38 15.2 L38 33.6 L22 42.8 L6 33.6 L6 15.2 Z" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M22 6 L22 24.4 M6 15.2 L22 24.4 L38 15.2 M22 24.4 L22 42.8" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Top Face Hatch Grid */}
          <path d="M14 10.6 L30 19.8 M30 10.6 L14 19.8" stroke="#71717a" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Left Face Hatch */}
          <path d="M14 19.8 L14 38.2 M6 24.4 L22 33.6" stroke="#71717a" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Right Face Hatch */}
          <path d="M30 19.8 L30 38.2 M22 33.6 L38 24.4" stroke="#71717a" strokeWidth="1" strokeDasharray="1.5 1.5" />
        </svg>
      ),
    },
    {
      id: 'data-privacy',
      title: language === 'zh' ? '数据隐私' : 'Data Privacy & Security',
      desc: language === 'zh'
        ? 'Prompt 与结果只用于路由、计量、计费与技术支持，绝不训练、绝不出售。'
        : 'Prompts and responses are exclusively used for routing, metering, and technical support. Zero training, zero data selling.',
      icon: (
        /* Wireframe Isometric Security Shield with Grid Pattern */
        <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 flex-shrink-0" stroke="currentColor">
          <path d="M22 5 L36 10.5 V24 C36 32.5 22 40 22 40 C22 40 8 32.5 8 24 V10.5 L22 5 Z" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M22 5 V40" stroke="#71717a" strokeWidth="1.2" strokeDasharray="2 2" />
          {/* Isometric grid lines inside shield */}
          <path d="M13 17 H31 M11 23 H33 M15 29 H29" stroke="#71717a" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Central Security Padlock Vault */}
          <rect x="18" y="18" width="8" height="8" rx="1.5" stroke="#18181b" strokeWidth="1.5" fill="#ffffff" />
          <circle cx="22" cy="22" r="1.2" fill="#18181b" />
        </svg>
      ),
    },
    {
      id: 'consumption-tracking',
      title: language === 'zh' ? '消费可追踪' : 'Traceable Consumption',
      desc: language === 'zh'
        ? '可控制团队预算与路由策略，账单逐条可查，企业客户 1 对 1 服务。'
        : 'Granular team budget limits and routing policies with audit-ready itemized bills and dedicated 1-on-1 enterprise support.',
      icon: (
        /* Wireframe Stacked Layers / Isometric Block Steps */
        <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 flex-shrink-0" stroke="currentColor">
          {/* Top Layer */}
          <path d="M22 6 L36 14 L22 22 L8 14 Z" stroke="#18181b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M15 10 L29 18 M29 10 L15 18" stroke="#71717a" strokeWidth="1" strokeDasharray="1 1" />
          {/* Middle Layer */}
          <path d="M8 18 L22 26 L36 18" stroke="#18181b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 14 V18 M36 14 V18 M22 22 V26" stroke="#18181b" strokeWidth="1.5" />
          {/* Bottom Layer */}
          <path d="M8 26 L22 34 L36 26" stroke="#18181b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 22 V26 M36 22 V26 M22 26 V30" stroke="#18181b" strokeWidth="1.5" />
          {/* Base Layer */}
          <path d="M8 34 L22 42 L36 34" stroke="#18181b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 30 V34 M36 30 V34 M22 34 V38" stroke="#18181b" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  // Right Column Data: 这个价格是怎么做到的？
  const howPricingWorks = [
    {
      id: 'bidding-network',
      title: language === 'zh' ? '供应商竞价网络' : 'Supplier Bidding Network',
      desc: language === 'zh'
        ? '海量模型供应商入驻，平台严苛把关质量，帮您打掉信息差。'
        : 'Extensive ecosystem of verified upstream providers with automated dynamic quality vetting, eliminating middleman markups.',
      icon: (
        /* Wireframe Cluster of Floating Isometric Blocks */
        <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 flex-shrink-0" stroke="currentColor">
          {/* Block 1 (Top Right) */}
          <path d="M28 4 L38 9.5 L38 18 L28 23.5 L18 18 L18 9.5 Z" stroke="#18181b" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M28 4 V14 M18 9.5 L28 14 L38 9.5" stroke="#18181b" strokeWidth="1.4" />
          {/* Block 2 (Bottom Left) */}
          <path d="M14 20 L24 25.5 L24 34 L14 39.5 L4 34 L4 25.5 Z" stroke="#18181b" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M14 20 V30 M4 25.5 L14 30 L24 25.5" stroke="#18181b" strokeWidth="1.4" />
          {/* Block 3 (Bottom Right) */}
          <path d="M33 24 L41 28 L41 35 L33 39 L25 35 L25 28 Z" stroke="#18181b" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M33 24 V31.5 M25 28 L33 31.5 L41 28" stroke="#18181b" strokeWidth="1.4" />
          {/* Connecting dashed links */}
          <path d="M18 18 L14 20 M28 23.5 L33 24" stroke="#71717a" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      id: 'scale-procurement',
      title: language === 'zh' ? '规模化采购' : 'Economies of Scale',
      desc: language === 'zh'
        ? '与已验证的供应商签企业级用量承诺，确保拿到市场最低价。'
        : 'Aggregated enterprise-grade volume commitments signed with certified suppliers, securing institutional-tier bottom pricing.',
      icon: (
        /* Wireframe Connected Lattice Cube */
        <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 flex-shrink-0" stroke="currentColor">
          <path d="M22 5 L38 14.5 L38 33.5 L22 43 L6 33.5 L6 14.5 Z" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M22 5 V24 M6 14.5 L22 24 L38 14.5 M22 24 V43" stroke="#18181b" strokeWidth="1.6" />
          {/* Isometric intersection node points */}
          <circle cx="22" cy="5" r="2.2" fill="#18181b" />
          <circle cx="38" cy="14.5" r="2.2" fill="#18181b" />
          <circle cx="6" cy="14.5" r="2.2" fill="#18181b" />
          <circle cx="22" cy="24" r="2.8" fill="#18181b" />
          <circle cx="6" cy="33.5" r="2.2" fill="#18181b" />
          <circle cx="38" cy="33.5" r="2.2" fill="#18181b" />
          <circle cx="22" cy="43" r="2.2" fill="#18181b" />
          {/* Internal cross connection beams */}
          <line x1="14" y1="9.75" x2="30" y2="28.75" stroke="#71717a" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="30" y1="9.75" x2="14" y2="28.75" stroke="#71717a" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      id: 'platform-subsidy',
      title: language === 'zh' ? 'Foyton 平台补贴' : 'Foyton Platform Subsidies',
      desc: language === 'zh'
        ? '多家头部基金押注，回馈用户，大额补贴进行中。'
        : 'Backed by premier AI innovation funds, continuously returning value to builders with substantial token subsidies.',
      icon: (
        /* Wireframe Subsidy Gift / Vault Box with Tokens */
        <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 flex-shrink-0" stroke="currentColor">
          <path d="M8 16 L22 8 L36 16 L36 32 L22 40 L8 32 Z" stroke="#18181b" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M22 8 V40 M8 16 L22 24 L36 16" stroke="#18181b" strokeWidth="1.6" />
          {/* Ribbon & Medal */}
          <path d="M15 12 L29 20 M29 12 L15 20" stroke="#71717a" strokeWidth="1.4" />
          <circle cx="22" cy="16" r="3.2" stroke="#18181b" strokeWidth="1.5" fill="#ffffff" />
          {/* Floating subsidy star sparks */}
          <path d="M19 4 L22 1 L25 4 L22 7 Z" fill="#18181b" />
          <circle cx="11" cy="7" r="1.8" fill="#18181b" />
          <circle cx="33" cy="7" r="1.8" fill="#18181b" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6 z-30 font-sans" id="architecture-value-section">
      
      {/* ── TOP ACTION BAR: Seamless Fast Access to Console & Model Matrix ── */}
      <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
        <button
          onClick={() => onNavigate('console-overview')}
          id="btn-fast-console"
          className="group w-full sm:w-1/2 flex items-center justify-between px-5 py-3.5 bg-white/95 hover:bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-400 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-200 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white text-neutral-800 flex items-center justify-center transition-all duration-200">
              <Terminal className="w-4 h-4" strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-neutral-900">
                  {language === 'zh' ? '开发者控制台' : 'Developer Console'}
                </span>
                <span className="text-[10px] font-semibold font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">Console</span>
              </div>
              <p className="text-[11.5px] text-neutral-400 mt-0.5">
                {language === 'zh' ? '即插即用 · 零迁移无缝兼容 OpenAI SDK' : 'Plug-and-play · Seamless OpenAI SDK match'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigate('models')}
          id="btn-fast-models"
          className="group w-full sm:w-1/2 flex items-center justify-between px-5 py-3.5 bg-white/95 hover:bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-400 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-200 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white text-neutral-800 flex items-center justify-center transition-all duration-200">
              <Layers className="w-4 h-4" strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-neutral-900">
                  {language === 'zh' ? '模型广场与定价矩阵' : 'Model Square & Pricing'}
                </span>
                <span className="text-[10px] font-semibold font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">Models</span>
              </div>
              <p className="text-[11.5px] text-neutral-400 mt-0.5">
                {language === 'zh' ? 'Claude 3.7 / GPT-4o / DeepSeek 毫秒直连' : 'Claude 3.7 / GPT-4o / DeepSeek Links'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* ── SECTION 1: TWO-COLUMN ARCHITECTURE VALUE (Match Image 2 Top Section) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-left">
        
        {/* LEFT COLUMN: 为什么选 Foyton API？ */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl sm:text-[28px] font-bold text-neutral-900 tracking-tight leading-snug">
              {language === 'zh' ? '为什么选 Foyton API？' : 'Why Choose Foyton API?'}
            </h2>
            <p className="text-[13.5px] sm:text-[14px] text-neutral-500 mt-1.5 leading-relaxed">
              {language === 'zh' 
                ? '可低成本稳定运行 Agent Harness 任务，模型表现与成本控制稳定、可审计。' 
                : 'Run Agent Harness workloads stably at low cost with audited reliability and predictable pricing.'}
            </p>
          </div>

          {/* 3 Cards */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {whyChooseUs.map((card) => (
              <div
                key={card.id}
                id={`card-why-${card.id}`}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-neutral-200/90 hover:border-neutral-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-200 flex items-start gap-4 text-left"
              >
                {/* Wireframe Icon */}
                <div className="pt-0.5">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-neutral-900 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-neutral-500 leading-relaxed font-normal mt-1.5">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: 这个价格是怎么做到的？ */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl sm:text-[28px] font-bold text-neutral-900 tracking-tight leading-snug">
              {language === 'zh' ? '这个价格是怎么做到的？' : 'How Are These Prices Achieved?'}
            </h2>
            <p className="text-[13.5px] sm:text-[14px] text-neutral-500 mt-1.5 leading-relaxed">
              {language === 'zh' 
                ? '一个账户，一张账单。上游供应商由我们逐家验。' 
                : 'One single account, one consolidated bill. Upstream providers rigorously vetted one-by-one.'}
            </p>
          </div>

          {/* 3 Cards */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {howPricingWorks.map((card) => (
              <div
                key={card.id}
                id={`card-pricing-${card.id}`}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-neutral-200/90 hover:border-neutral-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-200 flex items-start gap-4 text-left"
              >
                {/* Wireframe Icon */}
                <div className="pt-0.5">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-neutral-900 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-neutral-500 leading-relaxed font-normal mt-1.5">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── SECTION 2: PRODUCTION-GRADE LLM ROUTING ARCHITECTURE (Strict Reference to Prototype) ── */}
      <div 
        id="production-routing-engine"
        className="mt-12 sm:mt-16 bg-transparent text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT: Light Aesthetic Gradient Dot-Matrix Card with Center Neon Cloud & Lightning Bolt */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-[32px] sm:rounded-[38px] bg-white border border-neutral-200/80 shadow-[0_12px_44px_rgba(0,0,0,0.04)] p-6 sm:p-8 flex items-center justify-center overflow-hidden select-none">
              
              {/* Dot Matrix Pattern (Gradient Dots from Cyan to Warm Peach/Orange matching Prototype) */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none p-4" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Linear Gradient for Matrix Dots */}
                  <linearGradient id="protoDotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#818cf8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0.9" />
                  </linearGradient>
                  
                  <pattern id="protoDotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="1.6" fill="url(#protoDotGrad)" />
                  </pattern>
                </defs>

                <rect width="100%" height="100%" fill="url(#protoDotGrid)" />
              </svg>

              {/* Ambient Soft Halo around the Center Badge */}
              <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-2xl pointer-events-none" />

              {/* Center Cloud + Lightning Bolt Floating Badge (Exact Match to Prototype Image) */}
              <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                
                {/* Scalloped Cloud Silhouette with Smooth Vibrant Gradient & Glow */}
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_12px_28px_rgba(236,72,153,0.35)]">
                  <defs>
                    <linearGradient id="cloudNeonGrad" x1="15%" y1="15%" x2="85%" y2="85%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="45%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>

                  {/* Organic Multi-bubble Cloud Path */}
                  <path 
                    d="M60 16 
                       C72 16 82 23 86 33 
                       C96 34 104 42 104 53 
                       C104 60 100 66 95 70 
                       C98 76 96 84 90 90 
                       C84 96 76 98 70 95 
                       C66 100 60 104 53 104 
                       C42 104 34 96 33 86 
                       C23 82 16 72 16 60 
                       C16 48 23 38 33 34 
                       C34 23 42 16 53 16 
                       Z" 
                    fill="url(#cloudNeonGrad)" 
                  />

                  {/* Central Crisp Sharp Pure-White Lightning Bolt Icon */}
                  <path 
                    d="M63 32 L44 62 L59 62 L55 88 L76 56 L61 56 Z" 
                    fill="#ffffff" 
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                  />
                </svg>

              </div>

            </div>
          </div>

          {/* RIGHT: Architecture Specs & Value Propositions (Strict Match to Prototype Image) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Title: 生产级 LLM 智能路由架构 */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-neutral-900 tracking-tight leading-tight">
              {language === 'zh' ? '生产级 LLM 智能路由架构' : 'Production-Grade LLM Routing Architecture'}
            </h2>

            {/* Subtitle Description */}
            <p className="text-[14.5px] sm:text-[15.5px] text-neutral-600 mt-4 leading-relaxed font-normal max-w-2xl">
              {language === 'zh'
                ? '专为 Agent、代码辅助与高并发系统打造。在保持 100% 原生接口协议兼容的同时，通过多云智能路由、实时健康探测与高频自动竞价，全面降低成本并提升可用性。'
                : 'Built specifically for autonomous agents, code-completion, and high-concurrency systems. Maintains 100% native API compatibility while leveraging multi-cloud smart routing, real-time health probing, and automated dynamic bidding to minimize cost and maximize uptime.'}
            </p>

            {/* Clean Specifications Table (4 Rows with subtle dashed dividers) */}
            <div className="mt-8 space-y-4 max-w-2xl">
              
              {/* Row 1: 价格 */}
              <div className="flex items-baseline pb-4 border-b border-dashed border-neutral-200/90 gap-4 sm:gap-8">
                <span className="w-14 sm:w-16 text-sm text-neutral-400 font-normal shrink-0">
                  {language === 'zh' ? '价格' : 'Price'}
                </span>
                <span className="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-900 tracking-tight">
                  {language === 'zh' 
                    ? '全网高频动态竞价，综合成本低至 1~3 折' 
                    : 'Global real-time dynamic bidding, slashing baseline cost down to 70-90% off'}
                </span>
              </div>

              {/* Row 2: 延迟 */}
              <div className="flex items-baseline pb-4 border-b border-dashed border-neutral-200/90 gap-4 sm:gap-8">
                <span className="w-14 sm:w-16 text-sm text-neutral-400 font-normal shrink-0">
                  {language === 'zh' ? '延迟' : 'Latency'}
                </span>
                <span className="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-900 tracking-tight">
                  {language === 'zh' 
                    ? '全球优质边缘直连专线，首字延迟 < 380ms' 
                    : 'Global premium direct edge-peering, TTFT under 380ms'}
                </span>
              </div>

              {/* Row 3: 适用 */}
              <div className="flex items-baseline pb-4 border-b border-dashed border-neutral-200/90 gap-4 sm:gap-8">
                <span className="w-14 sm:w-16 text-sm text-neutral-400 font-normal shrink-0">
                  {language === 'zh' ? '适用' : 'Use Cases'}
                </span>
                <span className="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-900 tracking-tight">
                  {language === 'zh' 
                    ? '高并发生产环境、Agent 多步调用、长文本高频推理' 
                    : 'High-throughput production, multi-step agent reasoning, large-context inference'}
                </span>
              </div>

              {/* Row 4: 保障 */}
              <div className="flex items-baseline pb-4 border-b border-dashed border-neutral-200/90 gap-4 sm:gap-8">
                <span className="w-14 sm:w-16 text-sm text-neutral-400 font-normal shrink-0">
                  {language === 'zh' ? '保障' : 'SLA'}
                </span>
                <span className="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-900 tracking-tight">
                  {language === 'zh' 
                    ? '99.99% 企业级 SLA，多云热备秒级无感容灾切换' 
                    : '99.99% enterprise SLA with sub-second zero-downtime multi-cloud hot-failover'}
                </span>
              </div>

            </div>

            {/* Action Bar: Test In Console & Dedicated Architect Link */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('ai-hub')}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white text-[13.5px] font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>{language === 'zh' ? '立即在线接入测试' : 'Live Test Bench'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 text-neutral-800 text-[13.5px] font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'zh' ? '预约企业架构师咨询' : 'Book Architect Consultation'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ── SECTION 3: OPTIMAL HIGHWAY WARP TUNNEL BANNER (Reference Image 2) ── */}
      <OptimalTunnelBanner onOpenConsultation={onOpenConsultation} />

    </section>
  );
};
