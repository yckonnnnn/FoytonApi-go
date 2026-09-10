import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ConsoleTab } from '../../types';
import { 
  Wallet, 
  Key, 
  Activity, 
  Zap, 
  Copy, 
  Check, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal,
  Cpu,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Server,
  Layers
} from 'lucide-react';

interface ConsoleOverviewProps {
  onSelectTab: (tab: ConsoleTab) => void;
}

export const ConsoleOverview: React.FC<ConsoleOverviewProps> = ({ onSelectTab }) => {
  const { user, apiKeys } = useAuth();
  const { language } = useLanguage();
  
  const [copiedKey, setCopiedKey] = useState(false);
  const [codeTab, setCodeTab] = useState<'python' | 'curl' | 'node'>('python');

  const activeKey = apiKeys.find(k => k.status === 'active') || apiKeys[0];

  const handleCopyBaseUrl = () => {
    navigator.clipboard.writeText('https://fytapi.com/v1');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const pythonSnippet = `from openai import OpenAI

# 只需要配置两行，即可无缝兼容任意 OpenAI 生态客户端
client = OpenAI(
    api_key="${activeKey?.rawKey || 'sk-fyt-xxxxxxxxxxxxxxxx'}",
    base_url="https://fytapi.com/v1"
)

response = client.chat.completions.create(
    model="claude-3-5-sonnet-20241022",  # 也支持 gpt-4o, deepseek-chat 等
    messages=[
        {"role": "user", "content": "你好！请帮我分析智能网关的优势"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)`;

  const curlSnippet = `curl https://fytapi.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${activeKey?.rawKey || 'sk-fyt-xxxxxxxxxxxxxxxx'}" \\
  -d '{
    "model": "deepseek-chat-v3",
    "messages": [{"role": "user", "content": "Hello Foyton!"}],
    "stream": true
  }'`;

  const nodeSnippet = `import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "${activeKey?.rawKey || 'sk-fyt-xxxxxxxxxxxxxxxx'}",
  baseURL: "https://fytapi.com/v1",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Hello world" }],
    model: "gpt-4o-2024-11-20",
  });

  console.log(completion.choices[0]);
}

main();`;

  const currentCode = codeTab === 'python' ? pythonSnippet : codeTab === 'curl' ? curlSnippet : nodeSnippet;

  const [copiedCode, setCopiedCode] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200 text-left">
      
      {/* ── 1. High-End B-End Welcome Banner (Refined White Card with Subtle Gradient Glow, NO heavy black) ── */}
      <div className="relative bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Subtle decorative background light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/70 via-purple-50/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-32 bg-emerald-50/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          <div className="space-y-2">
            {/* SLA & Status Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                全球专线集群：运行正常 (99.99% SLA)
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60">
                Pro 开发者工作空间
              </span>
            </div>

            {/* Title */}
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-sans">
                欢迎回来，{user?.name || 'Alex Chen'}
              </h1>
            </div>

            <p className="text-xs sm:text-[13px] text-neutral-500 max-w-2xl leading-relaxed">
              您当前连接至 Foyton 边缘动态专线路由，上游直连 OpenAI、Anthropic、DeepSeek 与 Google，已享受最低 1 折企业分流通路。
            </p>
          </div>

          {/* Action Buttons (High-End White & Blue B-End controls, no black blocks) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSelectTab('wallet')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-[0_2px_10px_rgba(37,99,235,0.2)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>快速充值余额</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('apikeys')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 text-xs font-semibold border border-neutral-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-neutral-500" />
              <span>管理 API 密钥</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── 2. Metric Stat Cards (Modern Light Cards, High Visual Hierarchy) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Balance */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:border-neutral-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              钱包可用余额
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          
          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-sm font-semibold text-neutral-900">¥</span>
            <span className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
              {user?.balance.toFixed(2) || '382.40'}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-400">已累计充值 ¥1,200</span>
            <button
              onClick={() => onSelectTab('wallet')}
              className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>去充值</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 2: Tokens */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:border-neutral-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              今日消耗 Tokens
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
              47.9
            </span>
            <span className="text-sm font-bold text-neutral-400 font-mono">k</span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% 较昨日
            </span>
            <button
              onClick={() => onSelectTab('tokens')}
              className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>图表分析</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: Calls */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:border-neutral-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              今日调用总次数
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
              1,286
            </span>
            <span className="text-xs text-neutral-400 ml-1">次</span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-500">调用成功率 100.0%</span>
            <button
              onClick={() => onSelectTab('billing')}
              className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>调用流水</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 4: Latency */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] hover:border-neutral-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              平均首字延迟 (TTFT)
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-emerald-600 font-mono tracking-tight">
              85
            </span>
            <span className="text-xs text-neutral-500 font-mono ml-1">ms</span>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-400">全球 26 个边缘节点</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 text-[10px]">
              极速专线
            </span>
          </div>
        </div>

      </div>

      {/* ── 3. Quick Integration Section (Clean B-End Layout, NOT a muddy black blob) ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-7">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <h3 className="text-base font-bold text-neutral-900">
                30 秒极速接入 Foyton API
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              原生兼容标准 OpenAI SDK，无需重写现有业务逻辑，仅需配置 Base URL 即可即时切换多模型调度。
            </p>
          </div>

          {/* Base URL Pill with Copy */}
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-[11px] text-neutral-400 font-mono font-medium">Base URL:</span>
            <code className="text-xs font-mono font-bold text-neutral-800">
              https://fytapi.com/v1
            </code>
            <button
              type="button"
              onClick={handleCopyBaseUrl}
              className="p-1.5 rounded-lg hover:bg-neutral-200/70 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              title="复制 Base URL"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Snippet Box (High-End Dark Navy B-End codeblock, elegant syntax contrast) */}
        <div className="mt-5 rounded-2xl overflow-hidden border border-neutral-200 bg-[#0d1117] text-neutral-100 shadow-sm">
          
          {/* Code Tab Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-neutral-800">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'python', label: 'Python (OpenAI)' },
                { id: 'curl', label: 'cURL 终端测试' },
                { id: 'node', label: 'Node.js / TS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCodeTab(tab.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    codeTab === tab.id
                      ? 'bg-neutral-800 text-white font-bold'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-sans text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>复制代码</span>
                </>
              )}
            </button>
          </div>

          {/* Code display */}
          <pre className="p-4 sm:p-5 text-xs font-mono overflow-x-auto leading-relaxed text-neutral-200">
            <code>{currentCode}</code>
          </pre>
        </div>

      </div>

      {/* ── 4. Two Column Status & Health Cards (Real B-End Infrastructure Feel) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Real-time Upstream Health */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-neutral-900">主流模型上游专线健康状态</h4>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">实时探测</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Claude 3.5 Sonnet', provider: 'Anthropic Direct', latency: '120ms', status: '正常', rate: '99.98%' },
              { name: 'GPT-4o (Omni)', provider: 'OpenAI Enterprise', latency: '95ms', status: '正常', rate: '99.99%' },
              { name: 'DeepSeek Chat V3', provider: 'DeepSeek Cluster', latency: '65ms', status: '极速', rate: '100.0%' },
              { name: 'Gemini 1.5 Pro', provider: 'Google Cloud Asia', latency: '110ms', status: '正常', rate: '99.95%' },
            ].map((model) => (
              <div key={model.name} className="p-3 rounded-xl bg-neutral-50/70 border border-neutral-200/60 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-neutral-900">{model.name}</div>
                  <div className="text-[11px] text-neutral-400 font-mono">{model.provider}</div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono">
                  <div>
                    <div className="text-neutral-700 font-bold">{model.latency}</div>
                    <div className="text-[10px] text-neutral-400">SLA {model.rate}</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Security & Quick Actions */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-neutral-900">API 凭据与安全风控</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                双因子保护开启
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-neutral-700 text-xs leading-relaxed space-y-2">
              <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                当前生效主密钥：
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-blue-200/60 font-mono text-[11px]">
                <span className="text-neutral-800">{activeKey?.keyMasked || 'sk-fyt-9a8b...72fe'}</span>
                <span className="text-neutral-400">{activeKey?.name || '生产环境主密钥'}</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                该密钥支持所有模型一键调用。为保证生产安全，建议在不同服务中按需为子项目创建独立 Key 并设置月度额度限制。
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-mono">已配置 1 个活动密钥</span>
            <button
              onClick={() => onSelectTab('apikeys')}
              className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>进入 API 密钥中心</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
