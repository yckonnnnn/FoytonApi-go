import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiKeyItem, ConsumptionLog, UserProfile, WalletTransaction } from '../types';
import { api, getToken, setToken } from '../lib/api';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  sendVerificationCode: (email: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, username: string, password: string, verificationCode: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  apiKeys: ApiKeyItem[];
  refreshApiKeys: () => Promise<void>;
  createApiKey: (name: string, monthlyLimit?: number) => Promise<ApiKeyItem>;
  revokeApiKey: (id: string) => Promise<void>;
  transactions: WalletTransaction[];
  recharge: (amount: number, method: 'wechat' | 'alipay' | 'bank' | 'usdt') => void;
  consumptionLogs: ConsumptionLog[];
  refreshUsage: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapUser(value: any): UserProfile {
  return {
    id: value.id, name: value.name, username: value.username, email: value.email, balance: value.balance,
    totalRecharged: 0, totalSpent: value.totalSpent, role: value.role === 'admin' ? 'admin' : 'developer',
    plan: value.role === 'admin' ? 'Enterprise' : 'Free', createdAt: value.createdAt,
    status: value.status, routePolicy: value.routePolicy, preferredProvider: value.preferredProvider,
    blockedModels: value.blockedModels, monthlyBudget: value.monthlyBudget,
    alertThreshold: value.alertThreshold, lowBalanceThreshold: value.lowBalanceThreshold,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [transactions] = useState<WalletTransaction[]>([]);
  const [consumptionLogs, setConsumptionLogs] = useState<ConsumptionLog[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const refreshUser = async () => {
    if (!getToken()) { setUser(null); return; }
    try { const result = await api<any>('/api/me'); setUser(mapUser(result.user)); }
    catch { setToken(null); setUser(null); }
  };

  const refreshApiKeys = async () => {
    if (!getToken()) return;
    const result = await api<any>('/api/keys');
    setApiKeys(result.keys);
  };

  const refreshUsage = async () => {
    if (!getToken()) return;
    const result = await api<any>('/api/usage');
    setConsumptionLogs(result.logs.map((log: any) => ({
      id: log.id, requestId: log.request_id, timestamp: log.created_at, model: log.public_model,
      upstreamModel: log.upstream_model, provider: log.provider, promptTokens: log.prompt_tokens,
      completionTokens: log.completion_tokens, totalTokens: log.prompt_tokens + log.completion_tokens,
      inputPrice: log.input_price, outputPrice: log.output_price, cost: log.amount,
      status: log.status_code, result: log.result, latencyMs: log.latency_ms, errorMessage: log.error_message,
    })));
  };

  useEffect(() => { refreshUser().finally(() => setLoading(false)); }, []);
  useEffect(() => {
    if (user) void Promise.all([refreshApiKeys(), refreshUsage()]);
    else { setApiKeys([]); setConsumptionLogs([]); }
  }, [user?.id]);

  const login = async (identifier: string, password: string) => {
    try {
      const result = await api<any>('/api/auth/login', { method: 'POST', body: JSON.stringify({ identifier, password }) });
      setToken(result.token); setUser(mapUser(result.user)); setIsAuthModalOpen(false);
      return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
  };

  const sendVerificationCode = async (email: string) => {
    try {
      await api('/api/auth/send-code', { method: 'POST', body: JSON.stringify({ email, purpose: 'register' }) });
      return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
  };

  const register = async (email: string, username: string, password: string, verificationCode: string) => {
    try {
      const result = await api<any>('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, username, password, verificationCode }) });
      setToken(result.token); setUser(mapUser(result.user)); setIsAuthModalOpen(false);
      return { success: true };
    } catch (error: any) { return { success: false, error: error.message }; }
  };

  const logout = () => { setToken(null); setUser(null); };
  const createApiKey = async (name: string, monthlyLimit = 0) => {
    const result = await api<any>('/api/keys', { method: 'POST', body: JSON.stringify({ name, monthlyLimit }) });
    await refreshApiKeys();
    return result.key;
  };
  const revokeApiKey = async (keyId: string) => { await api(`/api/keys/${keyId}`, { method: 'DELETE' }); await refreshApiKeys(); };
  const recharge = () => { window.alert('在线充值暂未开放，请联系管理员处理余额。'); };

  return <AuthContext.Provider value={{
    user, isAuthenticated: Boolean(user), loading, isAuthModalOpen, authModalMode,
    openAuthModal: (mode = 'login') => { setAuthModalMode(mode); setIsAuthModalOpen(true); },
    closeAuthModal: () => setIsAuthModalOpen(false), login, sendVerificationCode, register, logout, refreshUser,
    apiKeys, refreshApiKeys, createApiKey, revokeApiKey, transactions, recharge,
    consumptionLogs, refreshUsage,
  }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
