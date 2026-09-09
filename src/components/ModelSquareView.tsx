import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  Cpu, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ModelSquareViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
}

interface ModelItem {
  id: string;
  name: string;
  provider: 'Anthropic' | 'OpenAI' | 'DeepSeek' | 'Google' | 'Meta' | 'Alibaba';
  category: 'reasoning' | 'flagship' | 'vision' | 'fast' | 'code';
  contextWindow: string;
  inputCost: string;
  outputCost: string;
  latencyMs: number;
  status: 'operational' | 'congested';
  description: string;
  tags: string[];
  recommendedFor: string;
  benchmarkScore?: string;
}

const ALL_MODELS: ModelItem[] = [
  {
    id: 'claude-3-7-sonnet-latest',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    category: 'reasoning',
    contextWindow: '200K',
    inputCost: '¥0.021 / 1K',
    outputCost: '¥0.105 / 1K',
    latencyMs: 142,
    status: 'operational',
    description: 'Anthropic 全球最新旗舰，支持标准响应与深度思考双模式，代码构建与复杂长文推理天花板。',
    tags: ['深度推理', '长上下文', '代码架构', 'Thinking Mode'],
    recommendedFor: '架构设计、自动化全栈代码生成、深度文献审计',
    benchmarkScore: 'SWE-bench 70.3%'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Reasoner)',
    provider: 'DeepSeek',
    category: 'reasoning',
    contextWindow: '64K',
    inputCost: '¥0.004 / 1K',
    outputCost: '¥0.016 / 1K',
    latencyMs: 95,
    status: 'operational',
    description: '国产开源之光深度强化学习推理模型，复杂数学、算法竞赛与严谨逻辑推理表现优异，性价比极高。',
    tags: ['深度思考', '极致性价', '数学推导', '算法逻辑'],
    recommendedFor: '复杂数理逻辑、复杂链式 CoT 推理、低成本大批次计算',
    benchmarkScore: 'AIME 79.8%'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    provider: 'OpenAI',
    category: 'flagship',
    contextWindow: '128K',
    inputCost: '¥0.018 / 1K',
    outputCost: '¥0.072 / 1K',
    latencyMs: 118,
    status: 'operational',
    description: 'OpenAI 旗舰全模态大模型，具备极速首字延迟与丰富多模态理解能力，企业多任务通用核心。',
    tags: ['全模态', '高并发', '视觉解析', '低延迟'],
    recommendedFor: '企业核心业务 Agent、交互式多轮对话、实时数据清洗',
    benchmarkScore: 'MMLU 88.7%'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    category: 'fast',
    contextWindow: '64K',
    inputCost: '¥0.002 / 1K',
    outputCost: '¥0.008 / 1K',
    latencyMs: 88,
    status: 'operational',
    description: '671B MoE 架构通用大模型，推理吞吐量行业领先，日常文本处理与多语言交互的高性价比首选。',
    tags: ['MoE 架构', '超低单价', '极速吞吐'],
    recommendedFor: '海量日志总结、大批量文本分类、客服机器人',
    benchmarkScore: 'MoE 671B'
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    category: 'vision',
    contextWindow: '1M - 2M',
    inputCost: '¥0.009 / 1K',
    outputCost: '¥0.036 / 1K',
    latencyMs: 126,
    status: 'operational',
    description: 'Google 最新百万级超长上下文多模态大模型，支持同时解析数十本长书、数小时音频与完整代码库。',
    tags: ['2M 上下文', '音视频解析', '跨模态'],
    recommendedFor: '全库代码排查、整部视频音频解析、超长财报审计',
    benchmarkScore: 'Context 2M'
  },
  {
    id: 'qwen-2.5-max',
    name: 'Qwen 2.5 Max',
    provider: 'Alibaba',
    category: 'flagship',
    contextWindow: '128K',
    inputCost: '¥0.012 / 1K',
    outputCost: '¥0.048 / 1K',
    latencyMs: 104,
    status: 'operational',
    description: '阿里通义千问最新超大规模旗舰，中文理解、知识问答、编程和角色扮演全面跃升。',
    tags: ['中文最强', '行业知识', '长文本'],
    recommendedFor: '中文本土化垂直业务、企业知识库问答、本地合规应用',
    benchmarkScore: 'Arena Top 5'
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    category: 'fast',
    contextWindow: '200K',
    inputCost: '¥0.006 / 1K',
    outputCost: '¥0.030 / 1K',
    latencyMs: 82,
    status: 'operational',
    description: 'Anthropic 极速轻量模型，拥有超越原 GPT-4 的智商，同时拥有近乎实时的毫秒级返回速度。',
    tags: ['毫秒延迟', '轻量高智', '成本友好'],
    recommendedFor: '流式自动补全、实时对话质检、高频微服务工具调用'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    category: 'fast',
    contextWindow: '128K',
    inputCost: '¥0.001 / 1K',
    outputCost: '¥0.004 / 1K',
    latencyMs: 76,
    status: 'operational',
    description: 'OpenAI 极致轻量模型，性价比天花板，支持多模态视觉，极速响应，适合高吞吐日常场景。',
    tags: ['极速响应', '超低费用', '轻量视觉'],
    recommendedFor: '基础语义提取、海量用户轻量问答、微小工作流'
  }
];

export const ModelSquareView: React.FC<ModelSquareViewProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedModelId, setCopiedModelId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: language === 'zh' ? '全部模型' : 'All Models' },
    { id: 'reasoning', label: language === 'zh' ? '深度推理 (Reasoning)' : 'Reasoning' },
    { id: 'flagship', label: language === 'zh' ? '旗舰通用 (Flagship)' : 'Flagship' },
    { id: 'fast', label: language === 'zh' ? '极速轻量 (Fast & Lite)' : 'Fast & Lite' },
    { id: 'vision', label: language === 'zh' ? '超长上下文 / 视觉' : 'Vision & 1M+' },
  ];

  const filteredModels = ALL_MODELS.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      activeCategory === 'all' || m.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedModelId(id);
    setTimeout(() => setCopiedModelId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-[0_4px_32px_rgba(0,0,0,0.03)] mb-8 overflow-hidden">
        {/* Soft background aura */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Foyton API · 全网大模型聚合矩阵</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3 font-sans">
            {language === 'zh' ? '模型广场' : 'Model Square'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
            {language === 'zh'
              ? '聚合全球前沿顶尖大模型。统一通过标准 OpenAI Compatible 协议调度，毫秒级多线路热备容灾，绝无降级与掺杂，支持按 Token 真实消耗透明计费。'
              : 'Unified access to world-leading AI models. Fully compatible with OpenAI SDKs, with sub-100ms multi-node failover and transparent token pricing.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('docs')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              <span>{language === 'zh' ? '查看接入文档' : 'View Docs'}</span>
            </button>
            <button
              onClick={() => onNavigate('console-apikeys')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-all border border-neutral-200 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>{language === 'zh' ? '创建 API 密钥' : 'Generate API Key'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-200 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'zh' ? '搜索模型名称、ID 或提供商...' : 'Search model by name, ID...'}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-neutral-900 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredModels.map(model => (
          <div
            key={model.id}
            className="group bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-purple-200 transition-all duration-200 flex flex-col justify-between relative"
          >
            <div>
              {/* Header row: Provider + Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.8 rounded-md bg-neutral-100 text-neutral-700">
                    {model.provider}
                  </span>
                  {model.benchmarkScore && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/50">
                      {model.benchmarkScore}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.8 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'zh' ? '实时可用' : 'Operational'}</span>
                </div>
              </div>

              {/* Title & Model ID with 1-click copy */}
              <div className="mb-2">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-purple-900 transition-colors">
                  {model.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-xs font-mono font-semibold text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-200/70 select-all">
                    {model.id}
                  </code>
                  <button
                    onClick={() => handleCopy(model.id)}
                    className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer p-1"
                    title={language === 'zh' ? '复制模型标识' : 'Copy Model ID'}
                  >
                    {copiedModelId === model.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                {model.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {model.tags.map((tag, i) => (
                  <span key={i} className="text-[10.5px] px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-600 border border-neutral-200/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Stats Matrix */}
            <div>
              <div className="grid grid-cols-3 gap-2 p-2.5 bg-neutral-50 rounded-2xl border border-neutral-100 mb-4 text-center">
                <div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    {language === 'zh' ? '上下文窗口' : 'Context'}
                  </div>
                  <div className="text-xs font-bold text-neutral-800 font-mono mt-0.5">
                    {model.contextWindow}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    {language === 'zh' ? '输入价格' : 'Input Price'}
                  </div>
                  <div className="text-xs font-bold text-neutral-800 font-mono mt-0.5">
                    {model.inputCost}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    {language === 'zh' ? '输出价格' : 'Output Price'}
                  </div>
                  <div className="text-xs font-bold text-neutral-800 font-mono mt-0.5">
                    {model.outputCost}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>典型延迟 {model.latencyMs}ms</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('docs')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-purple-600 transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-neutral-50"
                  >
                    <span>{language === 'zh' ? '接入代码' : 'SDK Code'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 text-neutral-400">
          <p className="text-sm">{language === 'zh' ? '未找到相关模型，请尝试更换关键词。' : 'No matching models found.'}</p>
        </div>
      )}
    </div>
  );
};
