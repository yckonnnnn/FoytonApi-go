import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ApiKeyItem, WalletTransaction, ConsumptionLog } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => void;
  register: (email: string, name?: string, inviteCode?: string) => void;
  logout: () => void;
  apiKeys: ApiKeyItem[];
  createApiKey: (name: string, monthlyLimit?: number) => ApiKeyItem;
  revokeApiKey: (id: string) => void;
  transactions: WalletTransaction[];
  recharge: (amount: number, method: 'wechat' | 'alipay' | 'bank' | 'usdt') => void;
  consumptionLogs: ConsumptionLog[];
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_foyton_8819',
  name: 'Alex Chen',
  email: 'alex.chen@innovatech.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  balance: 382.40,
  totalRecharged: 1200.00,
  totalSpent: 817.60,
  role: 'developer',
  plan: 'Pro',
  createdAt: '2025-11-12',
};

const INITIAL_API_KEYS: ApiKeyItem[] = [
  {
    id: 'key_prod_01',
    name: 'Production Agent Gateway',
    keyMasked: 'sk-fyt-9a8b****************************72fe',
    rawKey: 'sk-fyt-9a8bc47e912301f28b49e210aa9172fe',
    createdAt: '2026-02-10 14:20',
    lastUsedAt: '2 分钟前',
    monthlyLimit: 1000,
    monthlyUsed: 234.5,
    status: 'active',
  },
  {
    id: 'key_dev_02',
    name: 'Development & Cursor IDE',
    keyMasked: 'sk-fyt-4d2c****************************89ea',
    rawKey: 'sk-fyt-4d2c771b00918ef83a91bb48209e89ea',
    createdAt: '2026-02-28 09:15',
    lastUsedAt: '1 小时前',
    monthlyLimit: 200,
    monthlyUsed: 42.1,
    status: 'active',
  },
  {
    id: 'key_test_03',
    name: 'CI/CD Automated E2E Bench',
    keyMasked: 'sk-fyt-1b77****************************550a',
    rawKey: 'sk-fyt-1b7722cc99410ea63810ff490123550a',
    createdAt: '2026-01-15 11:30',
    lastUsedAt: '3 天前',
    monthlyLimit: 50,
    monthlyUsed: 12.8,
    status: 'active',
  },
];

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_998124',
    type: 'recharge',
    amount: 500,
    method: 'wechat',
    status: 'success',
    createdAt: '2026-03-01 16:42:10',
    note: '在线快捷充值 (实付 ¥500，赠送 ¥60)',
  },
  {
    id: 'tx_998125',
    type: 'bonus',
    amount: 60,
    method: 'wechat',
    status: 'success',
    createdAt: '2026-03-01 16:42:10',
    note: '企业首充特惠返利金',
  },
  {
    id: 'tx_871239',
    type: 'recharge',
    amount: 300,
    method: 'alipay',
    status: 'success',
    createdAt: '2026-02-15 10:18:22',
    note: '支付宝在线支付',
  },
  {
    id: 'tx_762104',
    type: 'recharge',
    amount: 400,
    method: 'bank',
    status: 'success',
    createdAt: '2026-01-20 14:05:01',
    note: '企业对公转账（带增值税专票）',
  },
];

const INITIAL_LOGS: ConsumptionLog[] = [
  {
    id: 'log_01',
    requestId: 'req_claude35_901a',
    timestamp: '2026-03-09 10:04:12',
    model: 'claude-3-5-sonnet-20241022',
    promptTokens: 2450,
    completionTokens: 890,
    totalTokens: 3340,
    cost: 0.082,
    status: 200,
    latencyMs: 142,
  },
  {
    id: 'log_02',
    requestId: 'req_gpt4o_812b',
    timestamp: '2026-03-09 10:01:45',
    model: 'gpt-4o-2024-11-20',
    promptTokens: 4120,
    completionTokens: 1200,
    totalTokens: 5320,
    cost: 0.115,
    status: 200,
    latencyMs: 198,
  },
  {
    id: 'log_03',
    requestId: 'req_deepseek_773c',
    timestamp: '2026-03-09 09:58:20',
    model: 'deepseek-chat-v3',
    promptTokens: 8600,
    completionTokens: 2100,
    totalTokens: 10700,
    cost: 0.024,
    status: 200,
    latencyMs: 110,
  },
  {
    id: 'log_04',
    requestId: 'req_gemini_551d',
    timestamp: '2026-03-09 09:45:11',
    model: 'gemini-1.5-pro-002',
    promptTokens: 15400,
    completionTokens: 3200,
    totalTokens: 18600,
    cost: 0.098,
    status: 200,
    latencyMs: 230,
  },
  {
    id: 'log_05',
    requestId: 'req_claude35_449e',
    timestamp: '2026-03-09 09:30:05',
    model: 'claude-3-5-sonnet-20241022',
    promptTokens: 1800,
    completionTokens: 640,
    totalTokens: 2440,
    cost: 0.059,
    status: 200,
    latencyMs: 138,
  },
  {
    id: 'log_06',
    requestId: 'req_deepseek_332f',
    timestamp: '2026-03-09 09:15:32',
    model: 'deepseek-reasoner-r1',
    promptTokens: 3200,
    completionTokens: 4500,
    totalTokens: 7700,
    cost: 0.048,
    status: 200,
    latencyMs: 310,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('foyton_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_USER; // Default to signed-in demo user for immediate rich testing
  });

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(() => {
    const saved = localStorage.getItem('foyton_api_keys');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_API_KEYS;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('foyton_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TRANSACTIONS;
  });

  const [consumptionLogs] = useState<ConsumptionLog[]>(INITIAL_LOGS);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('foyton_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foyton_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('foyton_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    localStorage.setItem('foyton_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: name || email.split('@')[0] || 'Foyton Developer',
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      balance: 100.0,
      totalRecharged: 100.0,
      totalSpent: 0.0,
      role: 'developer',
      plan: 'Pro',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    closeAuthModal();
  };

  const register = (email: string, name?: string, inviteCode?: string) => {
    const bonus = inviteCode ? 50 : 20; // 邀请码额外赠送
    const newUser: UserProfile = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: name || email.split('@')[0] || 'New Developer',
      email,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      balance: bonus,
      totalRecharged: 0,
      totalSpent: 0,
      role: 'developer',
      plan: 'Free',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);

    if (bonus > 0) {
      setTransactions(prev => [
        {
          id: `tx_${Date.now()}`,
          type: 'bonus',
          amount: bonus,
          method: 'wechat',
          status: 'success',
          createdAt: new Date().toLocaleString(),
          note: inviteCode ? '使用邀请码注册赠送新手大礼包' : '新用户注册体验金',
        },
        ...prev,
      ]);
    }
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
  };

  const createApiKey = (name: string, monthlyLimit: number = 500): ApiKeyItem => {
    const rawSecret = `sk-fyt-${Math.random().toString(36).substring(2, 14)}${Math.random().toString(36).substring(2, 14)}`;
    const masked = `${rawSecret.substring(0, 10)}****************************${rawSecret.slice(-4)}`;
    
    const newKey: ApiKeyItem = {
      id: `key_${Date.now()}`,
      name: name.trim() || 'Default API Key',
      keyMasked: masked,
      rawKey: rawSecret,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      lastUsedAt: '从未调用',
      monthlyLimit,
      monthlyUsed: 0,
      status: 'active',
    };

    setApiKeys(prev => [newKey, ...prev]);
    return newKey;
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k));
  };

  const recharge = (amount: number, method: 'wechat' | 'alipay' | 'bank' | 'usdt') => {
    let bonus = 0;
    if (amount >= 500) bonus = 60;
    else if (amount >= 300) bonus = 30;

    const totalAdded = amount + bonus;

    if (user) {
      setUser(prev => prev ? {
        ...prev,
        balance: +(prev.balance + totalAdded).toFixed(2),
        totalRecharged: +(prev.totalRecharged + amount).toFixed(2),
      } : null);
    }

    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      type: 'recharge',
      amount,
      method,
      status: 'success',
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      note: bonus > 0 ? `充值成功 (实付 ¥${amount}，附赠 ¥${bonus} 返现)` : '在线充值成功',
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        apiKeys,
        createApiKey,
        revokeApiKey,
        transactions,
        recharge,
        consumptionLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
