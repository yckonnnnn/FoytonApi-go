import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronRight, CircleHelp, Code2, Copy, Search, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ModelProviderIcon } from './ModelProviderIcon';

interface ModelSquareViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
}

type Provider = 'Anthropic' | 'OpenAI' | 'DeepSeek' | 'Google' | 'Alibaba' | 'Kimi' | 'GLM';
type Category = 'reasoning' | 'flagship' | 'vision' | 'fast' | 'code';

interface ModelItem {
  id: string;
  name: string;
  provider: Provider;
  category: Category;
  contextWindow: string;
  inputCost: string;
  outputCost: string;
  latencyMs: number;
  availability: number;
  description: string;
  tags: string[];
  benchmarkScore?: string;
}

const ALL_MODELS: ModelItem[] = [
  {
    id: 'gpt-6-astra', name: 'GPT-6 Astra', provider: 'OpenAI', category: 'flagship',
    contextWindow: '1M', inputCost: '¥0.008 / 1K', outputCost: '¥0.048 / 1K', latencyMs: 108,
    availability: 99.96,
    description: '新一代全模态旗舰模型，面向复杂智能体任务、代码工程与实时协作。',
    tags: ['旗舰通用', '智能体', '全模态'], benchmarkScore: 'Astra',
  },
  {
    id: 'gpt-5.6-sol', name: 'GPT-5.6 Sol', provider: 'OpenAI', category: 'fast',
    contextWindow: '1M', inputCost: '¥0.0034 / 1K', outputCost: '¥0.020 / 1K', latencyMs: 82,
    availability: 99.92,
    description: '兼顾速度、成本与工具调用能力，适合高频日常任务和批量处理。',
    tags: ['快速响应', '工具调用', '高吞吐'],
  },
  {
    id: 'claude-fable-5.1', name: 'Claude Fable 5.1', provider: 'Anthropic', category: 'reasoning',
    contextWindow: '1M', inputCost: '¥0.017 / 1K', outputCost: '¥0.086 / 1K', latencyMs: 136,
    availability: 99.91,
    description: '适合长链路智能体、复杂代码改造、文档分析与严谨写作。',
    tags: ['深度推理', '代码工程', '长上下文'], benchmarkScore: 'Fable 5.1',
  },
  {
    id: 'claude-opus-5', name: 'Claude Opus 5', provider: 'Anthropic', category: 'flagship',
    contextWindow: '1M', inputCost: '¥0.0072 / 1K', outputCost: '¥0.036 / 1K', latencyMs: 154,
    availability: 99.88,
    description: '面向高难度研究、软件架构和多阶段任务规划的旗舰模型。',
    tags: ['复杂规划', '研究分析', '代码架构'], benchmarkScore: 'Opus 5',
  },
  {
    id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', provider: 'DeepSeek', category: 'reasoning',
    contextWindow: '1M', inputCost: '¥0.004 / 1K', outputCost: '¥0.014 / 1K', latencyMs: 112,
    availability: 99.87,
    description: '强化复杂推理、数学分析与代码规划，适合高要求生产任务。',
    tags: ['深度思考', '数学推导', '代码规划'], benchmarkScore: 'V4 Pro',
  },
  {
    id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash', provider: 'DeepSeek', category: 'fast',
    contextWindow: '1M', inputCost: '¥0.002 / 1K', outputCost: '¥0.006 / 1K', latencyMs: 61,
    availability: 99.94,
    description: '低延迟高吞吐版本，适合客服、内容处理与高并发自动化流程。',
    tags: ['极速吞吐', '成本友好', '高并发'], benchmarkScore: 'V4 Flash',
  },
  {
    id: 'qwen-3.8-max', name: 'Qwen 3.8 Max', provider: 'Alibaba', category: 'flagship',
    contextWindow: '1M', inputCost: '¥0.006 / 1K', outputCost: '¥0.024 / 1K', latencyMs: 96,
    availability: 99.86,
    description: '面向中文知识、企业问答、编程与多语言内容生产的旗舰模型。',
    tags: ['中文理解', '企业知识', '多语言'], benchmarkScore: '3.8 Max',
  },
  {
    id: 'kimi-k3', name: 'Kimi K3', provider: 'Kimi', category: 'reasoning',
    contextWindow: '1M', inputCost: '¥0.016 / 1K', outputCost: '¥0.081 / 1K', latencyMs: 128,
    availability: 99.82,
    description: '擅长超长文档、联网研究与复杂任务拆解，适合知识密集型场景。',
    tags: ['超长上下文', '研究分析', '任务规划'], benchmarkScore: 'K3',
  },
  {
    id: 'glm-5.3-flash', name: 'GLM-5.3 Flash', provider: 'GLM', category: 'fast',
    contextWindow: '1M', inputCost: '¥0.0004 / 1K', outputCost: '¥0.0015 / 1K', latencyMs: 58,
    availability: 99.79,
    description: '智谱轻量高速模型，适合工具调用、批量文本任务和实时对话。',
    tags: ['智谱', '低延迟', '工具调用'], benchmarkScore: '5.3 Flash',
  },
  {
    id: 'gemini-3-pro', name: 'Gemini 3 Pro', provider: 'Google', category: 'vision',
    contextWindow: '2M', inputCost: '¥0.009 / 1K', outputCost: '¥0.036 / 1K', latencyMs: 121,
    availability: 99.90,
    description: '超长上下文多模态模型，可处理大型代码库、视频、音频与复杂文档。',
    tags: ['2M 上下文', '多模态', '代码理解'], benchmarkScore: 'Context 2M',
  },
];

const PROVIDERS: Array<{ id: 'all' | Provider; zh: string; en: string }> = [
  { id: 'all', zh: '精选', en: 'Featured' },
  { id: 'OpenAI', zh: 'OpenAI', en: 'OpenAI' },
  { id: 'Anthropic', zh: 'Anthropic', en: 'Anthropic' },
  { id: 'Google', zh: 'Google', en: 'Google' },
  { id: 'DeepSeek', zh: 'DeepSeek', en: 'DeepSeek' },
  { id: 'Alibaba', zh: '通义千问', en: 'Qwen' },
  { id: 'Kimi', zh: 'Kimi', en: 'Kimi' },
  { id: 'GLM', zh: '智谱', en: 'GLM' },
];

const CATEGORIES: Array<{ id: 'all' | Category; zh: string; en: string }> = [
  { id: 'all', zh: '全部类型', en: 'All types' },
  { id: 'reasoning', zh: '深度推理', en: 'Reasoning' },
  { id: 'flagship', zh: '旗舰通用', en: 'Flagship' },
  { id: 'fast', zh: '极速轻量', en: 'Fast & lite' },
  { id: 'vision', zh: '视觉 / 长上下文', en: 'Vision / long context' },
];

const splitPrice = (price: string) => {
  const match = price.match(/^([^/]+)(.*)$/);
  return { value: match?.[1].trim() ?? price, unit: match?.[2].trim() ?? '' };
};

const AvailabilityBars: React.FC<{ value: number }> = ({ value }) => {
  const activeBars = Math.round((value / 100) * 24);
  return (
    <div className="flex h-4 items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <span key={index} className={`h-full w-[3px] rounded-[1px] ${index < activeBars ? 'bg-emerald-500' : 'bg-amber-400'}`} />
      ))}
    </div>
  );
};

const AvailabilityTooltip: React.FC<{ value: number; language: 'zh' | 'en' }> = ({ value, language }) => (
  <div
    role="tooltip"
    className="pointer-events-none invisible absolute right-2 top-[calc(100%-0.25rem)] z-30 w-[min(300px,calc(100vw-3rem))] translate-y-1 border border-neutral-200 bg-white opacity-0 shadow-[0_16px_40px_rgba(35,28,22,0.14)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus:visible group-focus:translate-y-0 group-focus:opacity-100"
  >
    <div className="border-b border-neutral-200 px-4 py-3 text-sm font-bold text-neutral-900">
      {language === 'zh' ? '数值表示近 24 小时请求成功率' : 'Success rate over the last 24 hours'}
    </div>
    <div className="px-4 py-3">
      <p className="mb-3 text-xs text-neutral-500">
        {language === 'zh' ? `色柱为逐时成功率，当前平均 ${value.toFixed(2)}%` : `Each bar is one hour. Current average: ${value.toFixed(2)}%`}
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-600">
        <span className="flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] bg-emerald-500" />{language === 'zh' ? '>95% 正常' : '>95% Normal'}</span>
        <span className="flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] bg-amber-500" />{language === 'zh' ? '90–95% 波动' : '90–95% Fluctuating'}</span>
        <span className="flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] bg-orange-600" />{language === 'zh' ? '70–90% 异常' : '70–90% Abnormal'}</span>
        <span className="flex items-center gap-2"><i className="h-3.5 w-3.5 rounded-[3px] bg-red-600" />{language === 'zh' ? '<70% 受损' : '<70% Degraded'}</span>
      </div>
    </div>
  </div>
);

export const ModelSquareView: React.FC<ModelSquareViewProps> = ({ onNavigate, onOpenConsultation }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProvider, setActiveProvider] = useState<'all' | Provider>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');
  const [copiedModelId, setCopiedModelId] = useState<string | null>(null);

  const filteredModels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ALL_MODELS.filter((model) => {
      const matchesSearch = !query || [model.name, model.id, model.provider, model.description, ...model.tags]
        .some((value) => value.toLowerCase().includes(query));
      const matchesProvider = activeProvider === 'all' || model.provider === activeProvider;
      const matchesCategory = activeCategory === 'all' || model.category === activeCategory;
      return matchesSearch && matchesProvider && matchesCategory;
    });
  }, [activeCategory, activeProvider, searchQuery]);

  const handleCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopiedModelId(id);
    window.setTimeout(() => setCopiedModelId(null), 1800);
  };

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <section className="mb-8 grid gap-6 border-b border-neutral-200 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-orange-700">
            <span className="h-px w-8 bg-orange-500" />
            <span>{language === 'zh' ? 'FOYTON 模型目录' : 'FOYTON MODEL CATALOG'}</span>
          </div>
          <h1 className="text-balance text-3xl font-extrabold tracking-[-0.04em] text-[#171717] sm:text-5xl">
            {language === 'zh' ? '选模型，先看清价格与稳定性' : 'Compare price and reliability at a glance'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            {language === 'zh'
              ? '统一查看主流模型的上下文、输入输出价格和线路可用率。价格透明，模型 ID 可直接复制使用。'
              : 'Compare context, input and output pricing, and route availability. Copy any model ID and start building.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onOpenConsultation} className="inline-flex min-h-10 items-center gap-2 border border-neutral-300 bg-white px-4 text-xs font-semibold text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-50 active:translate-y-px">
            <ShieldCheck className="h-4 w-4" />
            {language === 'zh' ? '咨询线路方案' : 'Route consultation'}
          </button>
          <button type="button" onClick={() => onNavigate('docs')} className="inline-flex min-h-10 items-center gap-2 bg-[#1d1d1f] px-4 text-xs font-semibold text-white transition hover:bg-black active:translate-y-px">
            <Code2 className="h-4 w-4" />
            {language === 'zh' ? '接入文档' : 'Integration docs'}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <section aria-label={language === 'zh' ? '模型筛选' : 'Model filters'} className="mb-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROVIDERS.map((provider) => {
              const active = activeProvider === provider.id;
              return (
                <button type="button" key={provider.id} onClick={() => setActiveProvider(provider.id)} aria-pressed={active} className={`flex h-12 shrink-0 items-center gap-2 border px-4 text-sm font-semibold transition active:translate-y-px ${active ? 'border-[#1d1d1f] bg-[#1d1d1f] text-white [&_svg_path]:fill-white' : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-950'}`}>
                  {provider.id === 'all' ? <Sparkles className="h-4 w-4" /> : <ModelProviderIcon provider={provider.id} className="h-[18px] w-[18px]" />}
                  <span>{language === 'zh' ? provider.zh : provider.en}</span>
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:w-[300px] xl:w-[340px]">
            <span className="sr-only">{language === 'zh' ? '搜索模型' : 'Search models'}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={language === 'zh' ? '搜索模型名称、ID 或能力' : 'Search name, ID, or capability'} className="h-12 w-full border border-neutral-200 bg-white pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10" />
          </label>
        </div>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-xs font-medium text-neutral-400">{language === 'zh' ? '能力' : 'Capability'}</span>
          {CATEGORIES.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button type="button" key={category.id} onClick={() => setActiveCategory(category.id)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? 'bg-orange-100 text-orange-900' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}`}>
                {language === 'zh' ? category.zh : category.en}
              </button>
            );
          })}
          <span className="ml-auto shrink-0 text-xs tabular-nums text-neutral-400">{language === 'zh' ? `${filteredModels.length} 个结果` : `${filteredModels.length} results`}</span>
        </div>
      </section>

      {filteredModels.length > 0 ? (
        <div className="border border-neutral-200 bg-[#fffefa]">
          <div className="hidden grid-cols-[minmax(260px,1.55fr)_110px_minmax(170px,0.8fr)_minmax(170px,0.8fr)_190px_72px] border-b border-neutral-300 bg-[#f8f7f2] text-xs font-semibold text-neutral-500 lg:grid">
            <div className="px-5 py-4">{language === 'zh' ? '模型' : 'Model'}</div>
            <div className="px-4 py-4">{language === 'zh' ? '上下文' : 'Context'}</div>
            <div className="bg-[#ffd8c2] px-5 py-4 text-neutral-900">{language === 'zh' ? '输入价格' : 'Input price'}</div>
            <div className="bg-[#f9d9d2] px-5 py-4 text-neutral-900">{language === 'zh' ? '输出价格' : 'Output price'}</div>
            <div className="px-5 py-4">{language === 'zh' ? '线路可用率' : 'Availability'}</div>
            <div className="px-3 py-4 text-right">{language === 'zh' ? '接入' : 'Use'}</div>
          </div>

          <div className="divide-y divide-dashed divide-neutral-300">
            {filteredModels.map((model) => {
              const input = splitPrice(model.inputCost);
              const output = splitPrice(model.outputCost);
              return (
                <article key={model.id} className="grid transition-colors hover:bg-white lg:grid-cols-[minmax(260px,1.55fr)_110px_minmax(170px,0.8fr)_minmax(170px,0.8fr)_190px_72px]">
                  <div className="min-w-0 px-5 py-5 sm:py-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white">
                        <ModelProviderIcon provider={model.provider} className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h2 className="text-base font-bold tracking-[-0.02em] text-neutral-950 sm:text-lg">{model.name}</h2>
                          {model.benchmarkScore && <span className="bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500">{model.benchmarkScore}</span>}
                        </div>
                        <div className="mt-1 flex min-w-0 items-center gap-1.5">
                          <code className="truncate text-[11px] font-medium text-neutral-400">{model.id}</code>
                          <button type="button" onClick={() => handleCopy(model.id)} title={language === 'zh' ? '复制模型 ID' : 'Copy model ID'} className="shrink-0 rounded p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
                            {copiedModelId === model.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        <p className="mt-2 max-w-xl text-xs leading-5 text-neutral-500">{model.description}</p>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-medium text-neutral-400">{model.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-4 lg:border-t-0 lg:px-4">
                    <span className="text-xs text-neutral-400 lg:hidden">{language === 'zh' ? '上下文' : 'Context'}</span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-neutral-700">{model.contextWindow}</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#fff0e7] px-5 py-4 transition-[background-color,box-shadow] duration-200 hover:bg-[#ffdcc8] hover:shadow-[inset_0_0_0_1px_rgba(234,88,12,0.16)] lg:block lg:py-6">
                    <span className="text-xs font-medium text-orange-900/55 lg:hidden">{language === 'zh' ? '输入价格' : 'Input price'}</span>
                    <div>
                      <strong className="font-mono text-xl font-extrabold tracking-[-0.04em] text-neutral-950">{input.value}</strong>
                      <span className="ml-1 text-[11px] text-neutral-500">{input.unit}</span>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500"><CircleHelp className="h-3 w-3" />{language === 'zh' ? '按实际 Token 计费' : 'Billed by actual tokens'}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#fceae6] px-5 py-4 transition-[background-color,box-shadow] duration-200 hover:bg-[#f7d5ce] hover:shadow-[inset_0_0_0_1px_rgba(225,29,72,0.12)] lg:block lg:py-6">
                    <span className="text-xs font-medium text-rose-900/55 lg:hidden">{language === 'zh' ? '输出价格' : 'Output price'}</span>
                    <div>
                      <strong className="font-mono text-xl font-extrabold tracking-[-0.04em] text-neutral-950">{output.value}</strong>
                      <span className="ml-1 text-[11px] text-neutral-500">{output.unit}</span>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500"><Zap className="h-3 w-3 text-orange-600" />{language === 'zh' ? `典型延迟 ${model.latencyMs}ms` : `Typical latency ${model.latencyMs}ms`}</div>
                    </div>
                  </div>

                  <div tabIndex={0} className="group relative flex cursor-help items-center justify-between px-5 py-5 outline-none transition-colors duration-200 hover:bg-emerald-50/70 focus:bg-emerald-50/70 lg:block lg:py-6">
                    <span className="text-xs text-neutral-400 lg:hidden">{language === 'zh' ? '线路可用率' : 'Availability'}</span>
                    <div>
                      <div className="flex items-center gap-2"><strong className="font-mono text-lg font-bold tabular-nums text-neutral-950">{model.availability.toFixed(2)}%</strong><span className="h-2 w-2 rounded-full bg-emerald-500" title={language === 'zh' ? '运行正常' : 'Operational'} /></div>
                      <div className="mt-2"><AvailabilityBars value={model.availability} /></div>
                    </div>
                    <AvailabilityTooltip value={model.availability} language={language} />
                  </div>

                  <div className="flex items-center justify-end px-5 pb-5 lg:px-3 lg:py-6">
                    <button type="button" onClick={() => onNavigate('docs')} aria-label={language === 'zh' ? `接入 ${model.name}` : `Use ${model.name}`} className="inline-flex h-9 items-center gap-1 border border-neutral-300 px-3 text-xs font-bold text-neutral-800 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 lg:w-9 lg:justify-center lg:px-0">
                      <span className="lg:hidden">{language === 'zh' ? '查看接入方式' : 'View integration'}</span><ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
          <Search className="mx-auto h-6 w-6 text-neutral-300" />
          <p className="mt-3 text-sm font-semibold text-neutral-700">{language === 'zh' ? '没有找到符合条件的模型' : 'No matching models'}</p>
          <button type="button" onClick={() => { setSearchQuery(''); setActiveProvider('all'); setActiveCategory('all'); }} className="mt-3 text-xs font-semibold text-orange-700 underline decoration-orange-300 underline-offset-4">{language === 'zh' ? '清除全部筛选' : 'Clear all filters'}</button>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{language === 'zh' ? '页面价格为当前参考价，实际结算以控制台账单为准。' : 'Displayed prices are current references. Console billing is authoritative.'}</p>
        <button type="button" onClick={() => onNavigate('docs')} className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-orange-700">{language === 'zh' ? '查看计费说明' : 'View billing guide'} <ArrowRight className="h-3 w-3" /></button>
      </div>
    </div>
  );
};
