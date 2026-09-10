import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ApiKeyItem } from '../../types';
import {
  Plus,
  Copy,
  Check,
  CheckCircle2,
  Trash2,
  X,
  Shield,
  KeyRound,
} from 'lucide-react';

export const ConsoleApiKeys: React.FC = () => {
  const { apiKeys, createApiKey, revokeApiKey } = useAuth();
  const { language } = useLanguage();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Show generated raw key modal
  const [createdKeyData, setCreatedKeyData] = useState<ApiKeyItem | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const created = createApiKey(newKeyName.trim());
    setShowCreateModal(false);
    setNewKeyName('');
    setCreatedKeyData(created);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const t = {
    title: language === 'zh' ? 'API Keys' : 'API Keys',
    badge: language === 'zh' ? '折扣上限' : 'Discount Limit',
    desc: language === 'zh'
      ? 'API 密钥是您访问 Foyton API 接口的凭证，具有该账户的完整权限，请您妥善保管'
      : 'API keys are your credentials for accessing the Foyton API. They have full account permissions, please keep them safe.',
    listTitle: language === 'zh' ? '密钥列表' : 'Key List',
    createBtn: language === 'zh' ? '创建 Key' : 'Create Key',
    createTitle: language === 'zh' ? '创建 API Key' : 'Create API Key',
    createDesc: language === 'zh' ? '为您的应用生成专属密钥' : 'Generate a unique key for your app',
    keyName: language === 'zh' ? '密钥名称' : 'Key Name',
    keyNamePlaceholder: language === 'zh' ? '例如：Production, Cursor IDE' : 'e.g., Production, Cursor IDE',
    cancel: language === 'zh' ? '取消' : 'Cancel',
    confirmCreate: language === 'zh' ? '创建密钥' : 'Create Key',
    createdTitle: language === 'zh' ? 'API Key 创建成功' : 'API Key Created',
    createdWarning: language === 'zh'
      ? '完整密钥仅显示一次，请立即复制保存。'
      : 'The full key is shown only once. Please copy and save it now.',
    copy: language === 'zh' ? '复制' : 'Copy',
    copied: language === 'zh' ? '已复制' : 'Copied',
    delete: language === 'zh' ? '删除' : 'Delete',
    deleteConfirm: (name: string) => language === 'zh' ? `确定要删除密钥 "${name}" 吗？` : `Delete key "${name}"?`,
    statusActive: language === 'zh' ? '启用' : 'Active',
    statusRevoked: language === 'zh' ? '已吊销' : 'Revoked',
    colKey: 'Key',
    colStatus: language === 'zh' ? '状态' : 'Status',
    colCreated: language === 'zh' ? '创建时间' : 'Created',
    colRequests: language === 'zh' ? '请求数' : 'Requests',
    colActions: language === 'zh' ? '操作' : 'Actions',
    gotIt: language === 'zh' ? '我知道了' : 'Got it',
  };

  return (
    <div className="animate-in fade-in duration-200">

      {/* ── Main Container ── */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8">

        {/* Header Section */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-neutral-900">{t.title}</h2>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-50 text-orange-700 text-xs font-medium border border-orange-200">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            {t.badge}
          </span>
        </div>
        <p className="text-[13px] text-neutral-500 mb-6">{t.desc}</p>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[15px] font-semibold text-neutral-800">{t.listTitle}</span>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t.createBtn}
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dashed border-neutral-200">
              <th className="pb-3 pr-4 text-[13px] font-normal text-neutral-400" style={{ width: '40%' }}>{t.colKey}</th>
              <th className="pb-3 pr-4 text-[13px] font-normal text-neutral-400" style={{ width: '15%' }}>{t.colStatus}</th>
              <th className="pb-3 pr-4 text-[13px] font-normal text-neutral-400" style={{ width: '25%' }}>{t.colCreated}</th>
              <th className="pb-3 pr-4 text-[13px] font-normal text-neutral-400" style={{ width: '10%' }}>{t.colRequests}</th>
              <th className="pb-3 text-[13px] font-normal text-neutral-400 text-right" style={{ width: '10%' }}>{t.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => {
              const isRevoked = key.status === 'revoked';
              return (
                <tr key={key.id} className="border-b border-dashed border-neutral-100 last:border-0">
                  <td className="py-4 pr-4 align-middle">
                    <div className="font-semibold text-[13px] text-neutral-900 mb-1">{key.name}</div>
                    <div className="text-[12px] text-neutral-400 font-mono">{key.keyMasked}</div>
                  </td>
                  <td className="py-4 pr-4 align-middle">
                    {isRevoked ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                        {t.statusRevoked}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-50 text-orange-700 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {t.statusActive}
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-4 align-middle text-[13px] text-neutral-500">{key.createdAt}</td>
                  <td className="py-4 pr-4 align-middle text-[13px] text-neutral-500 font-medium">{key.monthlyUsed.toFixed(0)}</td>
                  <td className="py-4 align-middle text-right">
                    {!isRevoked && (
                      <button
                        onClick={() => {
                          if (confirm(t.deleteConfirm(key.name))) {
                            revokeApiKey(key.id);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-neutral-200 hover:border-red-300 hover:bg-red-50 text-neutral-500 hover:text-red-500 text-xs transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        {t.delete}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ─ Create Key Modal ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full border border-neutral-200 shadow-xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">{t.createTitle}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{t.createDesc}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  {t.keyName}
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder={t.keyNamePlaceholder}
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm outline-none focus:border-neutral-400 bg-neutral-50/50 focus:bg-white placeholder:text-neutral-400 transition-all"
                />
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 mb-5">
                <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700 leading-relaxed">
                  {language === 'zh'
                    ? '创建后请立即复制保存完整密钥，页面关闭后将无法再次查看。'
                    : 'Copy and save your key immediately — it will not be shown again after this dialog closes.'}
                </p>
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 text-sm cursor-pointer transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium cursor-pointer transition-colors"
                >
                  {t.confirmCreate}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Created Key Display Modal ── */}
      {createdKeyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setCreatedKeyData(null)}
          />
          <div className="relative bg-white rounded-xl p-6 max-w-lg w-full border border-neutral-200 shadow-xl animate-in zoom-in-95">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">{t.createdTitle}</h3>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 mb-4 text-xs text-amber-700 flex items-start gap-2">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{t.createdWarning}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 font-mono text-sm flex items-center justify-between gap-3">
              <span className="text-neutral-800 select-all break-all">{createdKeyData.rawKey}</span>
              <button
                onClick={() => handleCopy(createdKeyData.rawKey || '', 'raw_modal')}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedKeyId === 'raw_modal' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKeyId === 'raw_modal' ? t.copied : t.copy}
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setCreatedKeyData(null)}
                className="px-5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium cursor-pointer transition-colors"
              >
                {t.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
