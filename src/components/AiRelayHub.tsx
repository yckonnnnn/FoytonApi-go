import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Terminal, 
  Cpu, 
  Activity, 
  Play, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  Zap,
  Layers,
  Clock,
  Server,
  Code2
} from 'lucide-react';
import { AiModelConfig } from '../types';

interface AiRelayHubProps {
  onBackToOriginal: () => void;
  onOpenConsultation: () => void;
}

const INITIAL_MODELS: AiModelConfig[] = [
  {
    id: 'claude-3-7-sonnet-latest',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    contextWindow: '200K',
    inputCost: '$3.00 / 1M',
    outputCost: '$15.00 / 1M',
    latencyMs: 142,
    status: 'operational',
    description: 'Anthropic 最新旗舰，深度推理能力与复杂代码专家',
    badge: 'Trending 🔥',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    provider: 'OpenAI',
    contextWindow: '128K',
    inputCost: '$2.50 / 1M',
    outputCost: '$10.00 / 1M',
    latencyMs: 118,
    status: 'operational',
    description: 'OpenAI 旗舰全模态大模型，超低延迟多模态交互',
    badge: 'Popular',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Reasoner)',
    provider: 'DeepSeek',
    contextWindow: '64K',
    inputCost: '$0.55 / 1M',
    outputCost: '$2.19 / 1M',
    latencyMs: 95,
    status: 'operational',
    description: '开源之光深度强化学习推理模型，性价比天花板',
    badge: 'Best Value 💡',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    contextWindow: '1M - 2M',
    inputCost: '$1.25 / 1M',
    outputCost: '$5.00 / 1M',
    latencyMs: 128,
    status: 'operational',
    description: 'Google 最新长文本多模态大模型，极高分析吞吐',
  },
];

export const AiRelayHub: React.FC<AiRelayHubProps> = ({
  onBackToOriginal,
  onOpenConsultation,
}) => {
  const [apiKey, setApiKey] = useState('sk-foyton-hub-9f8a2bc471d84e91a03e');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'console' | 'models' | 'integration'>('console');
  
  // Playground state
  const [selectedModel, setSelectedModel] = useState('claude-3-7-sonnet-latest');
  const [prompt, setPrompt] = useState('请作为 AI 中转站的系统路由助手，为我规划一个企业级高可用 AI 代理架构。');
  const [loading, setLoading] = useState(false);
  const [responseResult, setResponseResult] = useState<string | null>(null);
  const [testStats, setTestStats] = useState<{ latency: number; tokens: number; cost: string } | null>(null);

  const copyToClipboard = (text: string, isKey: boolean) => {
    navigator.clipboard.writeText(text);
    if (isKey) {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleRunTest = () => {
    setLoading(true);
    setResponseResult(null);

    setTimeout(() => {
      setLoading(false);
      setResponseResult(
        `[Foyton API Gateway 实时路由响应]
- 接入路由: HK-Edge-Route-03 (已匹配最近低延迟专线)
- 转发耗时: 112ms (TTFT 首字延迟)
- 响应内容:
您好！基于 Foyton API 企业级大模型与智能体中转站架构，我们为您提供以下三层高可用保障：
1. 智能容灾调度：毫秒级心跳检测官方 API，遇限流自动无缝转移至备份通道；
2. 聚合计费中台：完美兼容 OpenAI 原生 SDK，仅需替换 base_url 即可零成本接入；
3. 企业合规脱敏：全链路 SSL 加密，提供企业子 Key 配额切分与实时并发熔断。`
      );
      setTestStats({
        latency: 112,
        tokens: 384,
        cost: '$0.00115',
      });
    }, 900);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Return button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToOriginal}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm transition-all hover:shadow"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回官网主视觉</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            中转专线节点运行中 · 99.99% SLA
          </span>
          <button
            onClick={onOpenConsultation}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
          >
            获取企业级专线与更高配额
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] mb-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Foyton API · Next-Gen AI Relay & Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-3">
            下一代企业级 AI 中转聚合网关
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
            统一标准接入 Claude 3.7 Sonnet、GPT-4o、DeepSeek R1/V3 与 Gemini。支持即插即用 OpenAI SDK、智能动态负载均衡、高并发毫秒级降级与企业级配额审计。
          </p>
        </div>

        {/* Quick Connection Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Base URL */}
          <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200/70">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-600 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-neutral-500" />
                API 统一中转地址 (Base URL)
              </span>
              <button
                onClick={() => copyToClipboard('https://fytapi.com/v1', false)}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUrl ? '已复制' : '复制'}</span>
              </button>
            </div>
            <code className="text-xs font-mono font-semibold text-neutral-900 bg-white px-2.5 py-1.5 rounded-lg border border-neutral-200 block truncate">
              https://fytapi.com/v1
            </code>
          </div>

          {/* API Key */}
          <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200/70">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-600 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-neutral-500" />
                测试专用密钥 (API Key)
              </span>
              <button
                onClick={() => copyToClipboard(apiKey, true)}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                {copiedKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey ? '已复制' : '复制'}</span>
              </button>
            </div>
            <code className="text-xs font-mono font-semibold text-neutral-900 bg-white px-2.5 py-1.5 rounded-lg border border-neutral-200 block truncate">
              {apiKey}
            </code>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-200 pb-3">
        <button
          onClick={() => setActiveTab('console')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'console'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'bg-white text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>API 实时测试台</span>
        </button>

        <button
          onClick={() => setActiveTab('models')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'models'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'bg-white text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>支持模型与定价矩阵</span>
        </button>

        <button
          onClick={() => setActiveTab('integration')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'integration'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'bg-white text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>接入代码示例 (SDK)</span>
        </button>
      </div>

      {/* TAB 1: Console / Playground */}
      {activeTab === 'console' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left panel: Controls */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                目标模型选择
              </label>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-900 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                {INITIAL_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider}) - {m.inputCost}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                测试提示词 Prompt
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 leading-relaxed resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                直连 SSL 加密隧道已激活
              </span>
              <button
                onClick={handleRunTest}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all disabled:opacity-50 shadow-sm hover:shadow"
              >
                {loading ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>中转路由响应中...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>发送中转请求</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right panel: Live Stream Result */}
          <div className="lg:col-span-7 bg-[#0f1218] rounded-3xl p-6 text-neutral-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>OUTPUT CONSOLE</span>
                </div>
                {testStats && (
                  <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                    <span className="text-emerald-400">⚡ {testStats.latency}ms</span>
                    <span>{testStats.tokens} Tokens</span>
                    <span className="text-purple-300">费用: {testStats.cost}</span>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-xs text-neutral-400 font-mono">正在经由智能代理网络中转至 {selectedModel}...</p>
                </div>
              ) : responseResult ? (
                <pre className="text-xs font-mono text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {responseResult}
                </pre>
              ) : (
                <div className="py-16 text-center text-neutral-500 text-xs font-mono">
                  点击左侧「发送中转请求」，查看毫秒级聚合代理响应与计费。
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
              <span>协议格式: OpenAI Compatible /v1/chat/completions</span>
              <span className="text-emerald-400">Status: 200 OK</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Model Matrix */}
      {activeTab === 'models' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_MODELS.map(model => (
            <div
              key={model.id}
              className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                      {model.provider}
                    </span>
                    {model.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    正常可用
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 mb-1">
                  {model.name}
                </h3>
                <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                  {model.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-neutral-50 p-2 rounded-xl">
                  <div className="text-[10px] text-neutral-400">上下文</div>
                  <div className="font-bold text-neutral-800">{model.contextWindow}</div>
                </div>
                <div className="bg-neutral-50 p-2 rounded-xl">
                  <div className="text-[10px] text-neutral-400">输入费用</div>
                  <div className="font-bold text-neutral-800">{model.inputCost}</div>
                </div>
                <div className="bg-neutral-50 p-2 rounded-xl">
                  <div className="text-[10px] text-neutral-400">典型延迟</div>
                  <div className="font-bold text-emerald-600">{model.latencyMs}ms</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Integration Code Snippets */}
      {activeTab === 'integration' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-2">
            一键无缝集成：兼容所有现有 OpenAI SDK 客户端
          </h3>
          <p className="text-xs text-neutral-500 mb-6">
            仅需将接口地址更改为 Foyton API Gateway，现有业务无需任何重构即可立刻享受多模型高可用中转。
          </p>

          <div className="space-y-4">
            <div className="bg-[#111317] rounded-2xl p-4 text-xs font-mono text-neutral-200 overflow-x-auto">
              <div className="text-neutral-500 mb-2">// Python (OpenAI Official SDK)</div>
              <code>{`from openai import OpenAI

client = OpenAI(
    base_url="https://fytapi.com/v1",
    api_key="${apiKey}"
)

response = client.chat.completions.create(
    model="claude-3-7-sonnet-latest", # 或者 gpt-4o, deepseek-r1
    messages=[{"role": "user", "content": "你好，请帮我分析这份业务报表"}]
)

print(response.choices[0].message.content)`}</code>
            </div>

            <div className="bg-[#111317] rounded-2xl p-4 text-xs font-mono text-neutral-200 overflow-x-auto">
              <div className="text-neutral-500 mb-2">// cURL 快速测试</div>
              <code>{`curl https://fytapi.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello World!"}]
  }'`}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
