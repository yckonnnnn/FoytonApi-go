export type ActiveView =
  | 'lost-original'
  | 'models'
  | 'docs'
  | 'ai-hub'
  | 'projects'
  | 'pricing'
  | 'login'
  | 'console-wallet'
  | 'console-apikeys'
  | 'console-tokens'
  | 'console-billing';

export type ConsoleTab = 'wallet' | 'apikeys' | 'tokens' | 'billing';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  balance: number;
  totalRecharged: number;
  totalSpent: number;
  role: 'developer' | 'enterprise';
  plan: 'Pro' | 'Enterprise' | 'Free';
  createdAt: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  rawKey?: string;
  createdAt: string;
  lastUsedAt: string;
  monthlyLimit: number;
  monthlyUsed: number;
  status: 'active' | 'revoked';
}

export interface WalletTransaction {
  id: string;
  type: 'recharge' | 'bonus' | 'refund';
  amount: number;
  method: 'wechat' | 'alipay' | 'bank' | 'usdt';
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
  note?: string;
}

export interface ConsumptionLog {
  id: string;
  requestId: string;
  timestamp: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  status: number;
  latencyMs: number;
}

export interface AiModelConfig {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Midjourney';
  contextWindow: string;
  inputCost: string;
  outputCost: string;
  latencyMs: number;
  status: 'operational' | 'congested' | 'maintenance';
  description: string;
  badge?: string;
}

export interface ConsultationForm {
  name: string;
  email: string;
  company: string;
  estimatedTokens: string;
  selectedModels: string[];
  notes: string;
}
