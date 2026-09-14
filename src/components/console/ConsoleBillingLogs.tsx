import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ConsumptionLog } from '../../types';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  Calendar,
  Layers,
  Sparkles,
  Zap,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

export const ConsoleBillingLogs: React.FC = () => {
  const { consumptionLogs } = useAuth();
  const { language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allLogs: ConsumptionLog[] = consumptionLogs;

  const filteredLogs = allLogs.filter((log) => {
    const matchesQuery = 
      log.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModel = selectedModel === 'all' || log.model.includes(selectedModel);
    return matchesQuery && matchesModel;
  });

  const totalFilteredCost = filteredLogs.reduce((acc, curr) => acc + curr.cost, 0);
  const totalFilteredTokens = filteredLogs.reduce((acc, curr) => acc + curr.totalTokens, 0);
  const avgLatency = Math.round(filteredLogs.reduce((acc, curr) => acc + curr.latencyMs, 0) / (filteredLogs.length || 1));

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleExportCsv = () => {
    const headers = ['Request ID', 'Timestamp', 'Model', 'Prompt Tokens', 'Completion Tokens', 'Total Tokens', 'Cost (CNY)', 'Status', 'Latency (ms)'];
    const rows = filteredLogs.map(l => [
      l.requestId,
      l.timestamp,
      l.model,
      l.promptTokens,
      l.completionTokens,
      l.totalTokens,
      l.cost.toFixed(4),
      l.status,
      l.latencyMs
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `foyton_billing_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to color model badge
  const getModelBadge = (model: string) => {
    if (model.includes('claude')) {
      return 'bg-purple-50 text-purple-700 border-purple-200/70';
    }
    if (model.includes('gpt')) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/70';
    }
    if (model.includes('deepseek')) {
      return 'bg-blue-50 text-blue-700 border-blue-200/70';
    }
    return 'bg-amber-50 text-amber-700 border-amber-200/70';
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200 text-left">
      
      {/* ── 1. Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            消费明细与实时计费日志
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            透明追溯每一笔由 API Key 发起的下游模型调用、精确 Token 消耗统计与对应扣款凭据。
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 active:scale-95 text-neutral-800 text-xs font-semibold transition-all border border-neutral-200 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-neutral-500" />
          <span>导出 CSV 报表</span>
        </button>
      </div>

      {/* ── 2. Top Fast KPI Summary Pills ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              当前展示请求
            </span>
            <div className="text-xl font-bold font-mono text-neutral-900 mt-1">
              {filteredLogs.length} <span className="text-xs font-sans text-neutral-400 font-normal">笔</span>
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-400">{filteredLogs.length ? Math.round(filteredLogs.filter((log) => log.status >= 200 && log.status < 300).length / filteredLogs.length * 100) : 0}% 成功</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              筛选消费额合计
            </span>
            <div className="text-xl font-bold font-mono text-neutral-900 mt-1">
              ¥{totalFilteredCost.toFixed(4)}
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-600">已实时结算</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              平均响应时延 (Latency)
            </span>
            <div className="text-xl font-bold font-mono text-emerald-600 mt-1">
              {avgLatency} <span className="text-xs font-mono text-neutral-400 font-normal">ms</span>
            </div>
          </div>
          <span className="text-xs text-neutral-400 font-mono">P95 正常</span>
        </div>
      </div>

      {/* ── 3. Filter Ribbon (Clean Light B-End) ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-5 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search by Request ID */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索 Request ID 或模型名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs outline-none font-mono"
            />
          </div>

          {/* Model Filter Pills (NO heavy black, clean white selection) */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: '全部模型' },
              { id: 'claude', label: 'Claude 3.5' },
              { id: 'gpt-4o', label: 'GPT-4o' },
              { id: 'deepseek', label: 'DeepSeek' },
              { id: 'gemini', label: 'Gemini' },
            ].map((m) => {
              const isSelected = selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedModel(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs'
                      : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100/80 border border-transparent'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Aggregate tokens ribbon */}
        <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>总计处理 Tokens: <strong className="text-neutral-900">{totalFilteredTokens.toLocaleString()}</strong></span>
          </div>
          <div className="text-[11px] text-neutral-400 font-sans">
            金额按本次调用时生效的价格计算，历史账单不会随价格调整而变化
          </div>
        </div>

      </div>

      {/* ── 4. Detailed Table (Financial Audit Quality) ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 uppercase">
                <th className="py-3.5 px-6 font-medium">请求 ID</th>
                <th className="py-3.5 px-4 font-medium">时间</th>
                <th className="py-3.5 px-4 font-medium font-sans">调用模型</th>
                <th className="py-3.5 px-4 font-medium">Prompt</th>
                <th className="py-3.5 px-4 font-medium">Completion</th>
                <th className="py-3.5 px-4 font-medium">首字时延</th>
                <th className="py-3.5 px-4 font-medium">实扣金额</th>
                <th className="py-3.5 px-6 font-medium text-right">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/60 transition-colors">
                  
                  {/* Request ID */}
                  <td className="py-3.5 px-6 text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-neutral-800">{log.requestId}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(log.requestId, log.id)}
                        className="text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                        title="复制 Request ID"
                      >
                        {copiedId === log.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>

                  {/* Model Name */}
                  <td className="py-3.5 px-4 font-sans">
                    <span className={`px-2 py-0.5 rounded-md border text-[11px] font-semibold ${getModelBadge(log.model)}`}>
                      {log.model}
                    </span>
                    <div className="mt-1 text-[10px] text-neutral-400">{log.provider || '-'} · 输入 ¥{Number(log.inputPrice || 0).toFixed(4)} / 输出 ¥{Number(log.outputPrice || 0).toFixed(4)}（每百万）</div>
                  </td>

                  {/* Prompt */}
                  <td className="py-3.5 px-4 text-neutral-600">
                    {log.promptTokens.toLocaleString()}
                  </td>

                  {/* Completion */}
                  <td className="py-3.5 px-4 text-neutral-600">
                    {log.completionTokens.toLocaleString()}
                  </td>

                  {/* Latency */}
                  <td className="py-3.5 px-4 text-neutral-600">
                    {log.latencyMs}ms
                  </td>

                  {/* Cost */}
                  <td className="py-3.5 px-4 font-bold text-neutral-900">
                    ¥{log.cost.toFixed(4)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-6 text-right">
                    <span title={log.errorMessage} className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold border inline-flex items-center gap-1 ${log.status >= 200 && log.status < 300 ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${log.status >= 200 && log.status < 300 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {log.status} {log.result === 'success' ? '成功' : '失败'}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          {!filteredLogs.length && <div className="p-12 text-center text-sm text-neutral-400">暂无真实调用记录</div>}
        </div>
      </div>

    </div>
  );
};
