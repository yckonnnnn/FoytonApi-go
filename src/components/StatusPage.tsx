import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock3, RefreshCw } from 'lucide-react';
import { api } from '../lib/api';
import { FoytonLogo } from './FoytonLogo';

const label: Record<string, string> = { operational: '运行正常', degraded: '服务不稳定', maintenance: '维护中', outage: '服务中断', investigating: '正在调查', resolved: '已恢复' };
const color: Record<string, string> = { operational: 'bg-emerald-500', degraded: 'bg-amber-500', maintenance: 'bg-blue-500', outage: 'bg-red-500' };

export const StatusPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [status, setStatus] = useState<any>(null);
  const [failed, setFailed] = useState(false);
  const load = () => api<any>('/api/status').then((value) => { setStatus(value); setFailed(false); }).catch(() => setFailed(true));
  useEffect(() => { load(); const timer = setInterval(load, 60_000); return () => clearInterval(timer); }, []);
  return <div className="min-h-screen bg-[#f7f8fa] text-neutral-900">
    <header className="border-b border-neutral-200 bg-white"><div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4"><button onClick={onBack} className="flex items-center gap-2"><FoytonLogo className="h-8 w-8"/><b>Foyton 服务状态</b></button><button onClick={load} className="flex items-center gap-2 text-sm text-neutral-500"><RefreshCw className="h-4 w-4"/>刷新</button></div></header>
    <main className="mx-auto max-w-4xl px-5 py-10">
      {failed ? <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"><AlertTriangle className="mb-2 h-6 w-6"/><b>状态数据暂时无法获取</b><p className="mt-1 text-sm">状态服务当前不可访问，请稍后再试。</p></div> : !status ? <div className="text-center text-neutral-400">正在获取最新状态…</div> : <>
        <div className={`rounded-2xl p-6 text-white ${status.overall === 'operational' ? 'bg-emerald-600' : 'bg-amber-600'}`}><div className="flex items-center gap-3">{status.overall === 'operational' ? <CheckCircle2 className="h-8 w-8"/> : <AlertTriangle className="h-8 w-8"/>}<div><h1 className="text-2xl font-bold">{status.overall === 'operational' ? '所有服务运行正常' : '部分服务受到影响'}</h1><p className="mt-1 text-sm text-white/80">更新时间：{new Date(status.updatedAt).toLocaleString()}</p></div></div></div>
        <section className="mt-8"><h2 className="mb-3 text-lg font-bold">服务项目</h2><div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">{[...status.components, ...status.providers.map((provider:any)=>({...provider,name:`${provider.name} 模型线路`,note:provider.avg_latency_ms ? `最近响应 ${provider.avg_latency_ms} 毫秒` : ''}))].map((item:any)=><div key={item.id || item.name} className="flex items-center justify-between border-b border-neutral-100 p-4 last:border-0"><div><b className="text-sm">{item.name}</b>{item.note&&<p className="mt-1 text-xs text-neutral-400">{item.note}</p>}</div><span className="flex items-center gap-2 text-sm"><i className={`h-2.5 w-2.5 rounded-full ${color[item.status] || 'bg-neutral-400'}`}/>{label[item.status] || item.status}</span></div>)}</div></section>
        <section className="mt-8"><h2 className="mb-3 text-lg font-bold">故障与维护记录</h2><div className="space-y-3">{status.incidents.length ? status.incidents.map((incident:any)=><article key={incident.id} className="rounded-2xl border border-neutral-200 bg-white p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-bold">{incident.title}</h3><p className="mt-2 text-sm leading-6 text-neutral-600">{incident.message}</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${incident.status==='resolved'?'bg-emerald-50 text-emerald-700':'bg-amber-50 text-amber-700'}`}>{label[incident.status]||incident.status}</span></div><div className="mt-3 flex items-center gap-2 text-xs text-neutral-400"><Clock3 className="h-3.5 w-3.5"/>{new Date(incident.starts_at).toLocaleString()}{incident.resolved_at&&` — ${new Date(incident.resolved_at).toLocaleString()}`}</div></article>) : <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-400"><CheckCircle2 className="mx-auto mb-2 h-7 w-7 text-emerald-500"/>近期没有故障或维护记录</div>}</div></section>
      </>}
    </main>
  </div>;
};
