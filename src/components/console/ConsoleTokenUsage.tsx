import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Activity, 
  TrendingUp, 
  Layers, 
  Calendar, 
  ArrowUpRight, 
  BarChart3, 
  PieChart,
  Cpu,
  Zap,
  Info
} from 'lucide-react';

export const ConsoleTokenUsage: React.FC = () => {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d' | 'month'>('7d');

  // Chart data for 7-day usage
  const dailyUsageData = [
    { day: '03-03', prompt: 28400, completion: 9200, cost: 4.82 },
    { day: '03-04', prompt: 35100, completion: 12400, cost: 6.15 },
    { day: '03-05', prompt: 42000, completion: 15800, cost: 7.90 },
    { day: '03-06', prompt: 31000, completion: 11000, cost: 5.40 },
    { day: '03-07', prompt: 56000, completion: 19500, cost: 10.25 },
    { day: '03-08', prompt: 62500, completion: 22100, cost: 12.10 },
    { day: '03-09', prompt: 47900, completion: 16800, cost: 8.74 },
  ];

  const maxTotal = Math.max(...dailyUsageData.map(d => d.prompt + d.completion));

  // Models breakdown
  const modelBreakdown = [
    {
      name: 'Claude 3.5 Sonnet',
      modelId: 'claude-3-5-sonnet-20241022',
      tokens: '214.2k',
      percent: 44,
      cost: '¥34.12',
      color: 'bg-purple-600',
    },
    {
      name: 'GPT-4o (Omni)',
      modelId: 'gpt-4o-2024-11-20',
      tokens: '148.5k',
      percent: 31,
      cost: '¥22.45',
      color: 'bg-emerald-600',
    },
    {
      name: 'DeepSeek Chat V3',
      modelId: 'deepseek-chat-v3',
      tokens: '82.4k',
      percent: 17,
      cost: '¥4.10',
      color: 'bg-blue-600',
    },
    {
      name: 'Gemini 1.5 Pro',
      modelId: 'gemini-1.5-pro-002',
      tokens: '40.1k',
      percent: 8,
      cost: '¥4.68',
      color: 'bg-amber-600',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 text-left">
      
      {/* ── Top Filter Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Token 用量深度分析
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            监控所有上游模型的 Prompt 输入与 Completion 输出消耗趋势与费用转化。
          </p>
        </div>

        {/* Time range pills */}
        <div className="flex rounded-xl bg-neutral-100 p-1 text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'today', label: '今日' },
            { id: '7d', label: '近 7 天' },
            { id: '30d', label: '近 30 天' },
            { id: 'month', label: '本月累计' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTimeRange(item.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                timeRange === item.id
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Key Token Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1 */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            总计消耗 Tokens
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-neutral-900 font-mono">485.2</span>
            <span className="text-sm font-bold text-neutral-500 font-mono">k</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 较上周期增长 +18.4%
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Prompt 输入 Tokens
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-blue-600 font-mono">342.1</span>
            <span className="text-sm font-bold text-neutral-500 font-mono">k</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500">
            占总用量 <strong>70.5%</strong> (长提示词/上下文)
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Completion 输出 Tokens
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-purple-600 font-mono">143.1</span>
            <span className="text-sm font-bold text-neutral-500 font-mono">k</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500">
            占总用量 <strong>29.5%</strong> (推理生成内容)
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            对应总支出金额
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-sm font-bold text-neutral-900">¥</span>
            <span className="text-3xl font-extrabold text-neutral-900 font-mono">65.35</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-500">
            均单千 Token 成本: <span className="font-mono text-neutral-900 font-bold">¥0.0135</span>
          </div>
        </div>

      </div>

      {/* ── Daily Usage Stacked Bar Chart ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neutral-700" />
              <span>近 7 天每日 Token 消耗走势</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              蓝紫堆叠柱状图：蓝色为 Prompt 上下文输入，紫色为 Completion 补全输出
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-neutral-600">Prompt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-purple-500" />
              <span className="text-neutral-600">Completion</span>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-2 px-2 border-b border-neutral-100">
          {dailyUsageData.map((d) => {
            const promptHeight = (d.prompt / maxTotal) * 100;
            const completionHeight = (d.completion / maxTotal) * 100;

            return (
              <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                
                {/* Hover Tooltip */}
                <div className="absolute -top-14 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 bg-neutral-900 text-white rounded-xl py-1.5 px-2.5 text-[10px] font-mono whitespace-nowrap shadow-xl z-20 flex flex-col items-center">
                  <span className="font-sans font-bold">{d.day} 消耗</span>
                  <span>总计: {(d.prompt + d.completion).toLocaleString()} Tokens</span>
                  <span className="text-emerald-400">¥{d.cost.toFixed(2)}</span>
                </div>

                {/* Stacked Bars */}
                <div className="w-full max-w-[48px] flex flex-col justify-end h-full gap-0.5">
                  {/* Completion Bar (Purple) */}
                  <div
                    style={{ height: `${completionHeight}%` }}
                    className="w-full bg-purple-500 rounded-t-md transition-all duration-300 group-hover:brightness-110"
                  />
                  {/* Prompt Bar (Blue) */}
                  <div
                    style={{ height: `${promptHeight}%` }}
                    className="w-full bg-blue-500 rounded-b-md transition-all duration-300 group-hover:brightness-110"
                  />
                </div>

                {/* X Axis Label */}
                <span className="text-[11px] font-mono text-neutral-500 mt-3 group-hover:text-neutral-900 font-semibold">
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>0 Token</span>
          <span>峰值: {(maxTotal).toLocaleString()} Tokens/日</span>
        </div>
      </div>

      {/* ── Model Distribution Breakdown ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 sm:p-8">
        <h3 className="text-base font-bold text-neutral-900 mb-2 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-neutral-700" />
          <span>各模型用量分布占比</span>
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          按真实消耗 Token 数及账单金额统计主要上游模型调用权重
        </p>

        <div className="space-y-4">
          {modelBreakdown.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="font-bold text-neutral-900 font-sans">{item.name}</span>
                  <span className="text-neutral-400 font-mono text-[11px]">({item.modelId})</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-neutral-600">{item.tokens} Tokens</span>
                  <span className="text-neutral-900 font-bold">{item.cost}</span>
                  <span className="text-neutral-400 w-10 text-right">{item.percent}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
