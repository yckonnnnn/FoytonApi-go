import React from 'react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ModelProviderIcon } from './ModelProviderIcon';
import { BrainCircuit } from './BrainCircuit';
import {
  Terminal,
  Layers,
  ArrowRight,
  ShieldCheck,
  Coins,
  Timer
} from 'lucide-react';

/** 智能路由中枢的 6 个环绕厂商节点（按 60° 均布，中心在 50/50）。 */
const ROUTING_NODES = [
  { key: 'OpenAI', name: 'OpenAI', angle: -90 },
  { key: 'Anthropic', name: 'Anthropic', angle: -30 },
  { key: 'Google', name: 'Google', angle: 30 },
  { key: 'DeepSeek', name: 'DeepSeek', angle: 90 },
  { key: 'Kimi', name: 'Kimi', angle: 150 },
  { key: 'GLM', name: 'GLM', angle: 210 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180;
  const radius = 36;
  return {
    ...n,
    x: 50 + Math.cos(rad) * radius,
    y: 50 + Math.sin(rad) * radius,
  };
});

/** 右侧 2×2 规格卡片的统一外壳。 */
const SpecCard: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-violet-200 p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(99,102,241,0.08)] transition-all duration-200 flex flex-col gap-2.5 text-left">
    <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center transition-colors group-hover:bg-violet-100">
      <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
    </div>
    <div>
      <div className="text-[13px] font-bold text-neutral-900">{label}</div>
      <div className="text-[12.5px] text-neutral-500 leading-relaxed mt-1">{value}</div>
    </div>
  </div>
);

interface CoreAdvantagesProps {
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
  onBuy?: () => void;
}

export const CoreAdvantages: React.FC<CoreAdvantagesProps> = ({
  onNavigate,
  onOpenConsultation,
  onBuy
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
          onClick={() => onNavigate('docs')}
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
                  {language === 'zh' ? '查看接入文档' : 'Integration Docs'}
                </span>
                <span className="text-[10px] font-semibold font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">Docs</span>
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

      {/* ── SECTION 2: PRODUCTION-GRADE LLM ROUTING ARCHITECTURE ── */}
      <div
        id="production-routing-engine"
        className="mt-12 sm:mt-16 text-left"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT: 智能路由中枢 —— 一个 API 接入多个云端（紫/靛蓝主题色） */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-[32px] sm:rounded-[38px] bg-gradient-to-br from-violet-50 via-white to-indigo-50 border border-violet-100/80 shadow-[0_12px_44px_rgba(99,102,241,0.10)] p-8 flex items-center justify-center overflow-hidden select-none">

              {/* 柔和径向光晕 */}
              <div className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500/15 via-purple-500/15 to-indigo-500/15 blur-3xl pointer-events-none" />

              {/* 核心光晕（压在球体之下，补回中心枢纽的强调感） */}
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-violet-500/25 to-indigo-500/25 blur-xl pointer-events-none" />

              {/* 中枢路由核心（白色圆球 + 靛蓝大脑） */}
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border border-violet-100 shadow-[0_10px_30px_rgba(79,70,229,0.16)] flex items-center justify-center">
                <BrainCircuit className="relative w-[68px] h-[68px] sm:w-20 sm:h-20" />
              </div>

              {/* 6 个厂商节点绕大脑公转（节点反向自转，logo 始终正立） */}
              <div className="absolute inset-0 animate-orbit pointer-events-none">
                {ROUTING_NODES.map((n) => (
                  <div
                    key={n.key}
                    className="absolute"
                    style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="animate-orbit-counter">
                      <div
                        className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_8px_24px_rgba(17,19,23,0.08)] flex items-center justify-center transition-transform hover:scale-110 duration-200"
                        title={n.name}
                      >
                        <ModelProviderIcon provider={n.key} className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT: 标题 + 副标题 + 2×2 规格卡片 + CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-violet-600">
              <span className="w-5 h-px bg-violet-400" />
              {language === 'zh' ? '智能路由' : 'Smart Routing'}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-neutral-900 tracking-tight leading-tight mt-3">
              {language === 'zh' ? '生产级 LLM 智能路由架构' : 'Production-Grade LLM Routing Architecture'}
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] text-neutral-600 mt-4 leading-relaxed font-normal max-w-2xl">
              {language === 'zh'
                ? '专为 Agent、代码辅助与高并发系统打造。在保持 100% 原生接口协议兼容的同时，通过多云智能路由、实时健康探测与高频自动竞价，全面降低成本并提升可用性。'
                : 'Built specifically for autonomous agents, code-completion, and high-concurrency systems. Maintains 100% native API compatibility while leveraging multi-cloud smart routing, real-time health probing, and automated dynamic bidding to minimize cost and maximize uptime.'}
            </p>

            {/* 2×2 规格卡片 */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl">
              <SpecCard
                icon={Coins}
                label={language === 'zh' ? '价格' : 'Price'}
                value={language === 'zh' ? '全网高频动态竞价，综合成本低至 1~3 折' : 'Global real-time dynamic bidding, slashing baseline cost down to 70-90% off'}
              />
              <SpecCard
                icon={Timer}
                label={language === 'zh' ? '延迟' : 'Latency'}
                value={language === 'zh' ? '全球优质边缘直连专线，首字延迟 < 380ms' : 'Global premium direct edge-peering, TTFT under 380ms'}
              />
              <SpecCard
                icon={Layers}
                label={language === 'zh' ? '适用' : 'Use Cases'}
                value={language === 'zh' ? '高并发生产环境、Agent 多步调用、长文本高频推理' : 'High-throughput production, multi-step agent reasoning, large-context inference'}
              />
              <SpecCard
                icon={ShieldCheck}
                label={language === 'zh' ? '保障' : 'SLA'}
                value={language === 'zh' ? '99.99% 企业级 SLA，多云热备秒级无感容灾切换' : '99.99% enterprise SLA with sub-second zero-downtime multi-cloud hot-failover'}
              />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
