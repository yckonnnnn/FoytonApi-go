import React from 'react';
import { ArrowLeft, ExternalLink, Sparkles, Shield, Cpu, Zap, Layers } from 'lucide-react';
import { ActiveView } from '../types';

interface ProjectsViewProps {
  onBack: () => void;
  onOpenConsultation: () => void;
}

const PROJECTS_DATA = [
  {
    title: 'Enterprise LLM Multi-Cloud Relay',
    category: 'AI Gateway & High Concurrency',
    summary: '面向大型跨境电商的千万级并发大模型中转平台，实现 Claude 与 OpenAI 动态备灾与 0 丢包路由。',
    tokensHandled: '1.2B Tokens / Month',
    sla: '99.99%',
    latency: '89ms TTFT',
    tags: ['OpenAI', 'Claude 3.7', 'DeepSeek', 'Dynamic Failover'],
  },
  {
    title: 'Financial Agent Private Proxy',
    category: 'FinTech AI Security',
    summary: '银行级敏感数据脱敏中转代理，专线直连推理服务，提供组织层级 Key 额度细粒度管理。',
    tokensHandled: '450M Tokens / Month',
    sla: '99.995%',
    latency: '68ms TTFT',
    tags: ['Zero-Data-Retention', 'Role Auditing', 'Private Enclave'],
  },
  {
    title: 'Multimodal Creative Generation Engine',
    category: 'Generative Media & Design',
    summary: '聚合 Midjourney v6、Flux 与 SDXL 的批量视觉中转流水线，与 drewl. 数字化创意无缝结合。',
    tokensHandled: '300K Generations / Mo',
    sla: '99.95%',
    latency: '1.4s Generation',
    tags: ['Midjourney', 'Flux Pro', 'Async Webhooks'],
  },
];

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onBack,
  onOpenConsultation,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3.5 py-2 rounded-full bg-white border border-neutral-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回原版官网</span>
        </button>

        <button
          onClick={onOpenConsultation}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
        >
          探讨您的项目需求
        </button>
      </div>

      <div className="max-w-2xl mb-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Featured Client Engagements</span>
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Projects & AI 中转架构落地案例
        </h2>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Where we talk the talk and walk the walk. 从数字化体验到下一代企业级大模型高并发中转网关。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((project, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-2">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                {project.title}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                {project.summary}
              </p>
            </div>

            <div>
              <div className="bg-neutral-50 rounded-2xl p-3 mb-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>并发吞吐</span>
                  <span className="font-semibold text-neutral-800">{project.tokensHandled}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>服务可用性</span>
                  <span className="font-semibold text-emerald-600">{project.sla}</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>平均延迟</span>
                  <span className="font-semibold text-neutral-800">{project.latency}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
