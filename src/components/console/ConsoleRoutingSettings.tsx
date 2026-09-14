import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle2, Gauge, Route, ShieldBan } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export const ConsoleRoutingSettings: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [providers, setProviders] = useState<any[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [policy, setPolicy] = useState(user?.routePolicy || 'stable');
  const [preferredProvider, setPreferredProvider] = useState(user?.preferredProvider || '');
  const [blockedModels, setBlockedModels] = useState<string[]>(user?.blockedModels || []);
  const [monthlyBudget, setMonthlyBudget] = useState(user?.monthlyBudget || 0);
  const [alertThreshold, setAlertThreshold] = useState(user?.alertThreshold || 80);
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState(user?.lowBalanceThreshold || 10);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api<any>('/api/status').then((value) => setProviders(value.providers));
    api<any>('/api/catalog').then((value) => setModels(value.models)).catch(() => setModels([]));
  }, []);

  const save = async () => {
    await api('/api/me/policy', { method: 'PATCH', body: JSON.stringify({ policy, routePolicy: policy, preferredProvider: preferredProvider || null, blockedModels, monthlyBudget, alertThreshold, lowBalanceThreshold }) });
    await refreshUser();
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return <div className="space-y-6">
    <div><h2 className="text-2xl font-bold text-neutral-900">线路与提醒</h2><p className="mt-1 text-sm text-neutral-500">为当前账户选择调用偏好、禁用模型和消费提醒条件。</p></div>
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h3 className="flex items-center gap-2 font-bold"><Route className="h-4 w-4 text-blue-600" />线路偏好</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          ['stable', '稳定优先', '优先选择成功率高、响应稳定的线路'],
          ['cheapest', '便宜优先', '优先选择成本更低的可用线路'],
          ['provider', '指定供应商', '只使用你选择的上游供应商'],
        ].map(([value, title, desc]) => <button key={value} onClick={() => setPolicy(value as any)} className={`rounded-xl border p-4 text-left ${policy === value ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 hover:border-neutral-300'}`}>
          <div className="font-semibold text-neutral-900">{title}</div><div className="mt-1 text-xs leading-5 text-neutral-500">{desc}</div>
        </button>)}
      </div>
      {policy === 'provider' && <select value={preferredProvider} onChange={(e) => setPreferredProvider(e.target.value)} className="mt-4 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm">
        <option value="">请选择供应商</option>{providers.map((provider) => <option key={provider.id} value={provider.id}>{provider.name}</option>)}
      </select>}
    </section>
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h3 className="flex items-center gap-2 font-bold"><ShieldBan className="h-4 w-4 text-rose-600" />禁止使用的模型</h3>
      <div className="mt-4 flex flex-wrap gap-2">{models.length ? models.map((model) => <button key={model} onClick={() => setBlockedModels((items) => items.includes(model) ? items.filter((item) => item !== model) : [...items, model])} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${blockedModels.includes(model) ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-neutral-200 text-neutral-600'}`}>{model}</button>) : <span className="text-sm text-neutral-400">管理员尚未发布模型</span>}</div>
    </section>
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h3 className="flex items-center gap-2 font-bold"><Bell className="h-4 w-4 text-amber-600" />消费提醒</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="text-sm text-neutral-600">每月预算（¥）<input type="number" min="0" value={monthlyBudget} onChange={(e) => setMonthlyBudget(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2" /></label>
        <label className="text-sm text-neutral-600">预算达到多少时提醒（%）<input type="number" min="1" max="100" value={alertThreshold} onChange={(e) => setAlertThreshold(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2" /></label>
        <label className="text-sm text-neutral-600">余额低于多少时提醒（¥）<input type="number" min="0" value={lowBalanceThreshold} onChange={(e) => setLowBalanceThreshold(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2" /></label>
      </div>
    </section>
    <button onClick={save} className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white">{saved ? <CheckCircle2 className="h-4 w-4" /> : <Gauge className="h-4 w-4" />}{saved ? '已保存' : '保存设置'}</button>
  </div>;
};

export const ConsoleAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const load = () => api<any>('/api/alerts').then((value) => setAlerts(value.alerts));
  useEffect(load, []);
  const markRead = async (alertId: string) => { await api(`/api/alerts/${alertId}/read`, { method: 'POST' }); await load(); };
  return <div className="space-y-5">
    <div><h2 className="text-2xl font-bold text-neutral-900">通知中心</h2><p className="mt-1 text-sm text-neutral-500">余额、预算和异常调用提醒会同时出现在这里。</p></div>
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {alerts.length ? alerts.map((alert) => <button key={alert.id} onClick={() => alert.status === 'unread' && markRead(alert.id)} className="flex w-full items-start gap-4 border-b border-neutral-100 p-5 text-left last:border-0 hover:bg-neutral-50">
        <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${alert.status === 'unread' ? 'bg-orange-500' : 'bg-neutral-300'}`} />
        <span className="flex-1"><span className="block font-semibold text-neutral-900">{alert.title}</span><span className="mt-1 block text-sm text-neutral-600">{alert.message}</span><span className="mt-2 block text-xs text-neutral-400">{new Date(alert.created_at).toLocaleString()}</span></span>
      </button>) : <div className="p-12 text-center text-sm text-neutral-400"><CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-emerald-500" />暂时没有提醒</div>}
    </div>
  </div>;
};
