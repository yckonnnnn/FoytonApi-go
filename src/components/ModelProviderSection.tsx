import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ModelProviderIcon } from './ModelProviderIcon';
import { ActiveView } from '../types';

interface ModelProviderSectionProps {
  onNavigate: (view: ActiveView) => void;
}

/** 支持的模型 / 厂商。key 用于匹配 ModelProviderIcon，name 为展示名。 */
const PROVIDERS: { key: string; name: string; zh: string; en: string }[] = [
  { key: 'OpenAI', name: 'OpenAI', zh: '旗舰前沿模型', en: 'Frontier flagship models' },
  { key: 'Anthropic', name: 'Anthropic', zh: '深度推理与代码', en: 'Deep reasoning & coding' },
  { key: 'Google', name: 'Google', zh: '多模态与长上下文', en: 'Multimodal & long context' },
  { key: 'DeepSeek', name: 'DeepSeek', zh: '极致性价比', en: 'Best cost-performance' },
  { key: 'Kimi', name: 'Kimi', zh: '长文本专家', en: 'Long-context specialist' },
  { key: 'GLM', name: 'GLM', zh: '开源国产生态', en: 'Open-source domestic ecosystem' },
  { key: 'Alibaba', name: 'Qwen', zh: '通义千问系列', en: 'Qwen family' },
];

/** 底部真实能力指标条（与「模型价格参考」区块同源的真实产品能力）。 */
const STATS: { value: string; zh: string; en: string }[] = [
  { value: '100%', zh: '原生协议兼容', en: 'native protocol compatibility' },
  { value: '< 380ms', zh: '首字延迟', en: 'TTFT' },
  { value: '99.99%', zh: '企业级 SLA', en: 'enterprise SLA' },
  { value: '1M', zh: '上下文窗口', en: 'context window' },
];

export const ModelProviderSection: React.FC<ModelProviderSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section id="model-provider-section" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-violet-600">
            <span className="w-5 h-px bg-violet-400" />
            {language === 'zh' ? '模型生态' : 'Model Ecosystem'}
            <span className="w-5 h-px bg-violet-400" />
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {language === 'zh' ? '一个 API，接入主流大模型' : 'One API, every major model'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 leading-relaxed">
            {language === 'zh'
              ? '统一接口协议，无缝切换 OpenAI / Anthropic / Google 与国产头部模型，无需改动任何现有代码。'
              : 'One unified interface across OpenAI, Anthropic, Google and leading domestic models — zero code changes required.'}
          </p>
        </div>

        {/* Provider Grid (7 providers + 1 CTA = 8 cards) */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROVIDERS.map((p) => (
            <div
              key={p.key}
              className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-violet-200 p-5 flex flex-col items-center text-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(99,102,241,0.10)] transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-50 group-hover:bg-violet-50 flex items-center justify-center border border-neutral-100 transition-colors">
                <ModelProviderIcon provider={p.key} className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[15px] font-bold text-neutral-900">{p.name}</div>
                <div className="text-[12.5px] text-neutral-500 mt-0.5 leading-snug">
                  {language === 'zh' ? p.zh : p.en}
                </div>
              </div>
            </div>
          ))}

          {/* 查看全部模型 CTA */}
          <button
            type="button"
            onClick={() => onNavigate('models')}
            className="group bg-neutral-50/60 hover:bg-violet-50/60 rounded-2xl border border-dashed border-neutral-300 hover:border-violet-300 p-5 flex flex-col items-center text-center justify-between gap-3 transition-all duration-200 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center border border-neutral-200 group-hover:border-violet-200 group-hover:text-violet-600 text-neutral-500 transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-neutral-900">
                {language === 'zh' ? '查看全部模型' : 'View all models'}
              </div>
              <div className="text-[12.5px] text-neutral-500 mt-0.5 leading-snug">
                {language === 'zh' ? '进入模型广场' : 'Open the Model Square'}
              </div>
            </div>
          </button>
        </div>

        {/* 真实能力指标条 */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200/70 rounded-2xl overflow-hidden border border-neutral-200">
          {STATS.map((s) => (
            <div key={s.value} className="bg-white px-5 py-5 flex flex-col items-center text-center gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 font-mono tracking-tight">
                {s.value}
              </span>
              <span className="text-[11.5px] text-neutral-500">
                {language === 'zh' ? s.zh : s.en}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
