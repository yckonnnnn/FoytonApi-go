import React, { useEffect, useState } from 'react';
import { Activity, Ban, Check, CircleDollarSign, Database, Gauge, Layers3, Plus, RefreshCw, Server, Users, Wrench } from 'lucide-react';
import { api } from '../lib/api';
import { FoytonLogo } from './FoytonLogo';

type Tab = 'users' | 'orders' | 'providers' | 'models' | 'usage' | 'status';

export const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tab, setTab] = useState<Tab>('users');
  const [data, setData] = useState<any>({ users: [], orders: [], providers: [], routes: [], logs: [], incidents: [], components: [] });
  const [overview, setOverview] = useState<any>({});
  const [error, setError] = useState('');
  const [providerForm, setProviderForm] = useState({ name: '', baseUrl: '', apiKey: '', protocol: 'openai', status: 'disabled' });
  const [routeForm, setRouteForm] = useState({ publicModel: '', providerId: '', upstreamModel: '', inputPrice: '', outputPrice: '', inputCost: '', outputCost: '' });
  const [incidentForm, setIncidentForm] = useState({ title: '', message: '', severity: 'minor' });

  const load = async () => {
    setError('');
    try {
      const [stats, users, orders, providers, routes, usage, incidents, components] = await Promise.all([
        api<any>('/api/admin/overview'), api<any>('/api/admin/users'), api<any>('/api/admin/orders'),
        api<any>('/api/admin/providers'), api<any>('/api/admin/model-routes'), api<any>('/api/admin/usage'),
        api<any>('/api/admin/incidents'), api<any>('/api/admin/components'),
      ]);
      setOverview(stats);
      setData({ users: users.users, orders: orders.orders, providers: providers.providers, routes: routes.routes, logs: usage.logs, incidents: incidents.incidents, components: components.components });
    } catch (e: any) { setError(e.message); }
  };
  useEffect(() => { void load(); }, []);

  const adjustUser = async (user: any, change: number) => {
    const note = window.prompt(change >= 0 ? '请输入补偿原因' : '请输入扣减原因');
    if (note === null) return;
    await api(`/api/admin/users/${user.id}`, { method: 'PATCH', body: JSON.stringify({ balance: Math.max(0, user.balance + change), note }) });
    await load();
  };
  const toggleBan = async (user: any) => {
    await api(`/api/admin/users/${user.id}`, { method: 'PATCH', body: JSON.stringify({ status: user.status === 'active' ? 'banned' : 'active' }) });
    await load();
  };
  const createProvider = async (e: React.FormEvent) => {
    e.preventDefault(); await api('/api/admin/providers', { method: 'POST', body: JSON.stringify(providerForm) });
    setProviderForm({ name: '', baseUrl: '', apiKey: '', protocol: 'openai', status: 'disabled' }); await load();
  };
  const patchProvider = async (provider: any, values: any) => { await api(`/api/admin/providers/${provider.id}`, { method: 'PATCH', body: JSON.stringify(values) }); await load(); };
  const checkProvider = async (provider: any) => { await api(`/api/admin/providers/${provider.id}/check`, { method: 'POST' }); await load(); };
  const createRoute = async (e: React.FormEvent) => {
    e.preventDefault(); await api('/api/admin/model-routes', { method: 'POST', body: JSON.stringify(routeForm) });
    setRouteForm({ publicModel: '', providerId: '', upstreamModel: '', inputPrice: '', outputPrice: '', inputCost: '', outputCost: '' }); await load();
  };
  const toggleRoute = async (route: any) => { await api(`/api/admin/model-routes/${route.id}`, { method: 'PATCH', body: JSON.stringify({ enabled: !route.enabled }) }); await load(); };
  const editRoutePrices = async (route: any) => {
    const inputPrice = window.prompt('输入售价（每百万）', String(route.input_price));
    if (inputPrice === null) return;
    const outputPrice = window.prompt('输出售价（每百万）', String(route.output_price));
    if (outputPrice === null) return;
    await api(`/api/admin/model-routes/${route.id}`, { method: 'PATCH', body: JSON.stringify({ inputPrice: Number(inputPrice), outputPrice: Number(outputPrice) }) });
    await load();
  };
  const editProvider = async (provider: any) => {
    const baseUrl = window.prompt('新的服务地址', provider.base_url);
    if (baseUrl === null) return;
    const apiKey = window.prompt('如需更换密钥请填写；不更换请留空', '');
    if (apiKey === null) return;
    await patchProvider(provider, { baseUrl, ...(apiKey ? { apiKey } : {}) });
  };
  const createIncident = async (e: React.FormEvent) => { e.preventDefault(); await api('/api/admin/incidents', { method: 'POST', body: JSON.stringify(incidentForm) }); setIncidentForm({ title: '', message: '', severity: 'minor' }); await load(); };
  const resolveIncident = async (incident: any) => { await api(`/api/admin/incidents/${incident.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'resolved' }) }); await load(); };
  const updateComponent = async (component: any, status: string) => { await api(`/api/admin/components/${component.id}`, { method: 'PATCH', body: JSON.stringify({ status }) }); await load(); };

  const tabs: [Tab, string, React.ReactNode][] = [
    ['users', '用户与余额', <Users className="h-4 w-4" />], ['orders', '订单与资金记录', <CircleDollarSign className="h-4 w-4" />],
    ['providers', '上游管理', <Server className="h-4 w-4" />], ['models', '模型与价格', <Layers3 className="h-4 w-4" />],
    ['usage', '调用明细', <Activity className="h-4 w-4" />], ['status', '故障与维护', <Wrench className="h-4 w-4" />],
  ];
  const input = 'rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500';

  return <div className="min-h-screen bg-[#f6f7f9] text-neutral-900">
    <header className="border-b border-neutral-200 bg-white"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4"><button onClick={onBack} className="flex items-center gap-2"><FoytonLogo className="h-8 w-8" /><span className="text-lg font-extrabold">Foyton 管理后台</span></button><button onClick={() => load()} className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm"><RefreshCw className="h-4 w-4" />刷新数据</button></div></header>
    <main className="mx-auto max-w-[1500px] p-6">
      {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-3 sm:grid-cols-4">{[['用户', overview.users || 0], ['启用上游', overview.activeProviders || 0], ['总调用', overview.requests || 0], ['总收入', `¥${Number(overview.revenue || 0).toFixed(4)}`]].map(([label, value]) => <div key={label} className="rounded-xl border border-neutral-200 bg-white p-4"><div className="text-xs text-neutral-500">{label}</div><div className="mt-1 text-2xl font-bold">{value}</div></div>)}</div>
      <div className="mt-6 flex gap-2 overflow-x-auto">{tabs.map(([value, label, icon]) => <button key={value} onClick={() => setTab(value)} className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === value ? 'bg-neutral-900 text-white' : 'border border-neutral-200 bg-white text-neutral-600'}`}>{icon}{label}</button>)}</div>

      {tab === 'users' && <section className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-neutral-50 text-neutral-500"><tr><th className="p-4">用户</th><th>余额</th><th>累计消费</th><th>线路策略</th><th>状态</th><th>操作</th></tr></thead><tbody>{data.users.map((user: any) => <tr key={user.id} className="border-t border-neutral-100"><td className="p-4"><b>{user.name}</b><div className="text-xs text-neutral-400">{user.email}</div></td><td>¥{user.balance.toFixed(4)}</td><td>¥{user.total_spent.toFixed(4)}</td><td>{user.route_policy}</td><td><span className={user.status === 'active' ? 'text-emerald-600' : 'text-red-600'}>{user.status === 'active' ? '正常' : '已封禁'}</span></td><td className="space-x-2"><button onClick={() => adjustUser(user, Number(window.prompt('补偿金额') || 0))} className="rounded border px-2 py-1">补偿</button><button onClick={() => toggleBan(user)} className="rounded border px-2 py-1">{user.status === 'active' ? '封禁' : '解封'}</button></td></tr>)}</tbody></table></section>}

      {tab === 'orders' && <DataTable rows={data.orders} columns={[['id','记录号'],['email','用户'],['type','类型'],['amount','金额'],['balance_after','操作后余额'],['note','说明'],['created_at','时间']]} />}

      {tab === 'providers' && <div className="mt-4 space-y-4"><form onSubmit={createProvider} className="grid gap-3 rounded-xl border border-neutral-200 bg-white p-4 md:grid-cols-6"><input required placeholder="供应商名称" className={input} value={providerForm.name} onChange={(e) => setProviderForm({...providerForm,name:e.target.value})}/><input required placeholder="服务地址" className={`${input} md:col-span-2`} value={providerForm.baseUrl} onChange={(e) => setProviderForm({...providerForm,baseUrl:e.target.value})}/><input required type="password" placeholder="上游密钥" className={input} value={providerForm.apiKey} onChange={(e) => setProviderForm({...providerForm,apiKey:e.target.value})}/><select className={input} value={providerForm.protocol} onChange={(e) => setProviderForm({...providerForm,protocol:e.target.value})}><option value="openai">通用格式</option><option value="anthropic">Anthropic 格式</option></select><button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"><Plus className="mr-1 inline h-4 w-4"/>添加</button></form>
        <div className="grid gap-3">{data.providers.map((provider:any)=><div key={provider.id} className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 md:flex-row md:items-center"><div className="flex-1"><b>{provider.name}</b><div className="text-xs text-neutral-400">{provider.base_url}</div></div><span className="text-xs">{provider.has_key ? '密钥已保存' : '缺少密钥'}</span><select value={provider.status} onChange={(e)=>patchProvider(provider,{status:e.target.value})} className={input}><option value="disabled">停用</option><option value="operational">正常</option><option value="degraded">不稳定</option><option value="maintenance">维护</option></select><button onClick={()=>editProvider(provider)} className="rounded-lg border px-3 py-2 text-sm">修改</button><button onClick={()=>checkProvider(provider)} className="rounded-lg border px-3 py-2 text-sm">检查连接</button></div>)}</div></div>}

      {tab === 'models' && <div className="mt-4 space-y-4"><form onSubmit={createRoute} className="grid gap-3 rounded-xl border border-neutral-200 bg-white p-4 md:grid-cols-4"><input required placeholder="对外模型名称" className={input} value={routeForm.publicModel} onChange={(e)=>setRouteForm({...routeForm,publicModel:e.target.value})}/><select required className={input} value={routeForm.providerId} onChange={(e)=>setRouteForm({...routeForm,providerId:e.target.value})}><option value="">选择供应商</option>{data.providers.map((p:any)=><option key={p.id} value={p.id}>{p.name}</option>)}</select><input required placeholder="上游真实模型名称" className={input} value={routeForm.upstreamModel} onChange={(e)=>setRouteForm({...routeForm,upstreamModel:e.target.value})}/><button className="rounded-lg bg-neutral-900 text-sm font-semibold text-white">添加模型线路</button>{[['inputPrice','输入售价 / 百万'],['outputPrice','输出售价 / 百万'],['inputCost','输入成本 / 百万'],['outputCost','输出成本 / 百万']].map(([key,label])=><input key={key} required type="number" min="0" step="0.000001" placeholder={label} className={input} value={(routeForm as any)[key]} onChange={(e)=>setRouteForm({...routeForm,[key]:e.target.value})}/>)}</form>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-neutral-50"><tr><th className="p-3">对外名称</th><th>供应商</th><th>上游名称</th><th>输入售价</th><th>输出售价</th><th>操作</th></tr></thead><tbody>{data.routes.map((route:any)=><tr key={route.id} className="border-t"><td className="p-3 font-semibold">{route.public_model}</td><td>{route.provider_name}</td><td>{route.upstream_model}</td><td>¥{route.input_price}</td><td>¥{route.output_price}</td><td className="space-x-2"><button onClick={()=>editRoutePrices(route)} className="rounded border px-2 py-1 text-xs">改价格</button><button onClick={()=>toggleRoute(route)} className={`rounded px-2 py-1 text-xs ${route.enabled ? 'bg-emerald-50 text-emerald-700':'bg-neutral-100'}`}>{route.enabled?'已启用':'已停用'}</button></td></tr>)}</tbody></table></div></div>}

      {tab === 'usage' && <DataTable rows={data.logs} columns={[['request_id','请求号'],['email','用户'],['public_model','对外模型'],['upstream_model','上游模型'],['provider','供应商'],['prompt_tokens','输入量'],['completion_tokens','输出量'],['amount','金额'],['result','结果'],['created_at','时间']]} />}

      {tab === 'status' && <div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="space-y-3"><h3 className="font-bold">服务项目</h3>{data.components.map((component:any)=><div key={component.id} className="flex items-center justify-between rounded-xl border bg-white p-4"><span><b>{component.name}</b><small className="ml-2 text-neutral-400">{component.note}</small></span><select value={component.status} onChange={(e)=>updateComponent(component,e.target.value)} className={input}><option value="operational">正常</option><option value="degraded">不稳定</option><option value="maintenance">维护</option><option value="outage">故障</option></select></div>)}</div><div><h3 className="font-bold">发布故障或维护说明</h3><form onSubmit={createIncident} className="mt-3 space-y-3 rounded-xl border bg-white p-4"><input required placeholder="标题" className={`${input} w-full`} value={incidentForm.title} onChange={(e)=>setIncidentForm({...incidentForm,title:e.target.value})}/><textarea required placeholder="对用户说明当前影响和进展" className={`${input} min-h-24 w-full`} value={incidentForm.message} onChange={(e)=>setIncidentForm({...incidentForm,message:e.target.value})}/><select className={`${input} w-full`} value={incidentForm.severity} onChange={(e)=>setIncidentForm({...incidentForm,severity:e.target.value})}><option value="minor">轻微</option><option value="major">严重</option><option value="critical">完全故障</option></select><button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white">发布通知</button></form><div className="mt-3 space-y-2">{data.incidents.map((incident:any)=><div key={incident.id} className="rounded-xl border bg-white p-4"><div className="flex justify-between"><b>{incident.title}</b><span className="text-xs">{incident.status}</span></div><p className="mt-2 text-sm text-neutral-600">{incident.message}</p>{incident.status!=='resolved'&&<button onClick={()=>resolveIncident(incident)} className="mt-3 rounded border px-2 py-1 text-xs">标记已恢复</button>}</div>)}</div></div></div>}
    </main>
  </div>;
};

const DataTable: React.FC<{ rows: any[]; columns: [string,string][] }> = ({ rows, columns }) => <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200 bg-white"><table className="w-full whitespace-nowrap text-left text-xs"><thead className="bg-neutral-50 text-neutral-500"><tr>{columns.map(([,label])=><th key={label} className="p-3">{label}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={row.id || index} className="border-t border-neutral-100">{columns.map(([key])=><td key={key} className="max-w-64 truncate p-3">{typeof row[key]==='number' ? Number(row[key]).toFixed(key.includes('token') ? 0 : 6) : row[key] ?? '-'}</td>)}</tr>)}</tbody></table>{!rows.length&&<div className="p-10 text-center text-sm text-neutral-400">暂无记录</div>}</div>;
