import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ApiKeyItem } from '../../types';
import { 
  Key, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Terminal,
  Lock,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const ConsoleApiKeys: React.FC = () => {
  const { apiKeys, createApiKey, revokeApiKey } = useAuth();
  const { language } = useLanguage();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyLimit, setNewKeyLimit] = useState<number>(500);
  
  // Show generated raw key modal
  const [createdKeyData, setCreatedKeyData] = useState<ApiKeyItem | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const created = createApiKey(newKeyName.trim(), newKeyLimit);
    setShowCreateModal(false);
    setNewKeyName('');
    setCreatedKeyData(created);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200 text-left">
      
      {/* ── 1. Header & Quick Endpoint Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            API 密钥管理
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            创建、配置和轮换用于调用各模型集群的 Bearer 授权令牌。
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Base URL Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs shadow-2xs font-mono">
            <span className="text-neutral-400">Endpoint:</span>
            <span className="text-neutral-800 font-bold">https://api.fytapi.com/v1</span>
            <button
              onClick={() => handleCopy('https://api.fytapi.com/v1', 'base_url')}
              className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
              title="复制 Base URL"
            >
              {copiedKeyId === 'base_url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-[0_2px_10px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>新建 API Key</span>
          </button>
        </div>
      </div>

      {/* ── 2. Security Notice Ribbon (Light Blue B-End info card, no harsh yellow) ── */}
      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-xs leading-relaxed text-neutral-600">
          <strong className="text-neutral-900 font-semibold">安全规范提示：</strong>
          API Key 具有您账户的全部计费与调度权限。请妥善保存在服务器环境变量中（如 <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono text-[11px] text-blue-900">FYT_API_KEY</code>），切勿直接暴露在网页前端代码或提交至公共 Git 仓库。
        </div>
      </div>

      {/* ── 3. API Keys Table (Clean High-End Table, Light Theme) ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 uppercase font-mono">
                <th className="py-3.5 px-6 font-medium">密钥名称</th>
                <th className="py-3.5 px-4 font-medium">密钥前缀 / 后缀</th>
                <th className="py-3.5 px-4 font-medium">月度限额与已用</th>
                <th className="py-3.5 px-4 font-medium">创建时间</th>
                <th className="py-3.5 px-4 font-medium">最近活跃</th>
                <th className="py-3.5 px-4 font-medium">运行状态</th>
                <th className="py-3.5 px-6 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {apiKeys.map((key) => {
                const isRevoked = key.status === 'revoked';
                const usagePercent = Math.min(100, (key.monthlyUsed / key.monthlyLimit) * 100);

                return (
                  <tr key={key.id} className="hover:bg-neutral-50/60 transition-colors">
                    
                    {/* Name */}
                    <td className="py-4 px-6 font-sans">
                      <div className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-blue-600" />
                        <span>{key.name}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{key.id}</div>
                    </td>

                    {/* Masked Secret Key */}
                    <td className="py-4 px-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg border text-xs ${
                          isRevoked 
                            ? 'bg-neutral-100 text-neutral-400 border-neutral-200 line-through' 
                            : 'bg-neutral-50 text-neutral-800 border-neutral-200/80'
                        }`}>
                          {key.keyMasked}
                        </span>
                        {!isRevoked && (
                          <button
                            type="button"
                            onClick={() => handleCopy(key.rawKey || key.keyMasked, key.id)}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                            title="复制密钥"
                          >
                            {copiedKeyId === key.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Monthly Limit / Usage */}
                    <td className="py-4 px-4">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1 font-sans">
                          <span>已用 ¥{key.monthlyUsed.toFixed(1)}</span>
                          <span className="text-neutral-400">上限 ¥{key.monthlyLimit}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-blue-600 transition-all" 
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Created Time */}
                    <td className="py-4 px-4 text-neutral-500">
                      {key.createdAt}
                    </td>

                    {/* Last Used */}
                    <td className="py-4 px-4 text-neutral-600 font-sans">
                      {key.lastUsedAt}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 font-sans">
                      {isRevoked ? (
                        <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-[11px] font-medium border border-neutral-200">
                          已吊销
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/70 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          已启用
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      {!isRevoked && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`确定要吊销密钥 "${key.name}" 吗？吊销后使用此密钥发起的请求将立即失效。`)) {
                              revokeApiKey(key.id);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 border border-transparent hover:border-rose-200 text-xs font-sans transition-colors cursor-pointer"
                          title="吊销密钥"
                        >
                          吊销
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Create Key Modal (Crisp White Light Theme) ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-neutral-200 shadow-2xl animate-in zoom-in-95 text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Key className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">新建 API Key</h3>
            </div>
            
            <p className="text-xs text-neutral-500 mb-5">
              请为该密钥指定清晰的项目名称或使用场景，以便在消费日志中进行追踪。
            </p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  密钥备注名称
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如: Next.js Production Web, Cursor IDE"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  月度预算限制 (CNY)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 300, 500, 1000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setNewKeyLimit(val)}
                      className={`py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        newKeyLimit === val
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                      }`}
                    >
                      ¥{val}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1.5">
                  超过限额后将自动熔断，防止脚本失控或代码泄露造成资金损失。
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  确认生成密钥
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Created Raw Key Display Modal (One-time Display, Light Theme) ── */}
      {createdKeyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-neutral-200 shadow-2xl animate-in zoom-in-95 text-left">
            <div className="flex items-center gap-2 mb-2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-neutral-900">API Key 已成功生成！</h3>
            </div>
            
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-4 leading-relaxed">
              <strong>重要保密提醒：</strong>完整的密钥明文仅在此处展示一次，关闭后将无法再次查看完整字符。请立即复制并妥善保存到您的密码管理器或服务器环境变量中。
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 font-mono text-xs flex items-center justify-between gap-3">
              <span className="text-neutral-900 select-all font-bold">{createdKeyData.rawKey}</span>
              <button
                type="button"
                onClick={() => handleCopy(createdKeyData.rawKey || '', 'raw_modal')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-sans font-medium transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedKeyId === 'raw_modal' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKeyId === 'raw_modal' ? '已复制' : '复制密钥'}</span>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setCreatedKeyData(null)}
                className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 text-xs font-bold transition-all cursor-pointer"
              >
                我已妥善保存，关闭窗口
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
