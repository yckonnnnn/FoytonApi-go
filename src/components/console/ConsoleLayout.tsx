import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ConsoleTab } from '../../types';
import { FoytonLogo } from '../FoytonLogo';
import { ConsoleWallet } from './ConsoleWallet';
import { ConsoleApiKeys } from './ConsoleApiKeys';
import { ConsoleTokenUsage } from './ConsoleTokenUsage';
import { ConsoleBillingLogs } from './ConsoleBillingLogs';
import { ConsoleAlerts, ConsoleRoutingSettings } from './ConsoleRoutingSettings';
import {
  Wallet,
  Key,
  Activity,
  Receipt,
  ArrowLeft,
  LogOut,
  Globe,
  ChevronRight,
  Settings,
  Bell
} from 'lucide-react';

interface ConsoleLayoutProps {
  initialTab?: ConsoleTab;
  onNavigateHome: () => void;
  onNavigateAdmin?: () => void;
}

export const ConsoleLayout: React.FC<ConsoleLayoutProps> = ({
  initialTab = 'tokens',
  onNavigateHome,
  onNavigateAdmin,
}) => {
  const { user, logout, openAuthModal } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<ConsoleTab>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const navGroups: {
    groupTitle: string;
    items: { id: ConsoleTab; label: string; icon: React.ReactNode; badge?: string }[];
  }[] = [
    {
      groupTitle: language === 'zh' ? '用量与监控' : 'USAGE & MONITORING',
      items: [
        {
          id: 'tokens',
          label: language === 'zh' ? 'Token 用量' : 'Token Usage',
          icon: <Activity className="w-4 h-4" />
        },
      ]
    },
    {
      groupTitle: language === 'zh' ? '开发与接入' : 'DEVELOPMENT',
      items: [
        {
          id: 'apikeys',
          label: language === 'zh' ? 'API 密钥管理' : 'API Keys',
          icon: <Key className="w-4 h-4" />
        },
        { id: 'routing', label: language === 'zh' ? '线路与提醒设置' : 'Routing & Alerts', icon: <Settings className="w-4 h-4" /> },
        { id: 'alerts', label: language === 'zh' ? '通知中心' : 'Notifications', icon: <Bell className="w-4 h-4" /> },
      ]
    },
    {
      groupTitle: language === 'zh' ? '财务与计费' : 'BILLING',
      items: [
        {
          id: 'wallet',
          label: language === 'zh' ? '钱包充值' : 'Wallet & Top-up',
          icon: <Wallet className="w-4 h-4" />,
          badge: language === 'zh' ? '返 15%' : '+15%'
        },
        {
          id: 'billing',
          label: language === 'zh' ? '消费明细' : 'Billing Logs',
          icon: <Receipt className="w-4 h-4" />
        },
      ]
    }
  ];

  const currentTabTitle = (() => {
    for (const group of navGroups) {
      const found = group.items.find(item => item.id === activeTab);
      if (found) return found.label;
    }
    return language === 'zh' ? '控制台' : 'Console';
  })();

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-neutral-900 flex flex-col md:flex-row font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-100 selection:text-blue-900">
      
      {/* ── B-End High-End Left Sidebar (Pure Light, Clean, Structured) ── */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200/75 flex flex-col justify-between shrink-0 z-30 shadow-[1px_0_12px_rgba(0,0,0,0.015)]">
        <div>
          {/* Brand Logo & Back to Home */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
            <div 
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="返回官网首页"
            >
              <FoytonLogo className="w-7 h-7 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[17px] tracking-tight text-neutral-900">
                    Foyton
                  </span>
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 border border-blue-200/70">
                    Console
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-sans tracking-wide">
                  企业级智能中转网关
                </span>
              </div>
            </div>

            <button
              onClick={onNavigateHome}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
              title="返回官网首页"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Nav List with Grouping */}
          <div className="p-3 space-y-4">
            {navGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                  {group.groupTitle}
                </div>

                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-blue-600 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] border border-neutral-200/90'
                          : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-blue-600' : 'text-neutral-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* User Card at Sidebar Bottom */}
        <div className="p-3 border-t border-neutral-100">
          {user?.role === 'admin' && <button onClick={onNavigateAdmin} className="mb-2 flex w-full items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-xs font-semibold text-white"><Settings className="h-4 w-4"/>进入管理后台</button>}
          <div className="p-2.5 rounded-2xl bg-neutral-50/70 border border-neutral-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-xl object-cover shrink-0 border border-neutral-200 shadow-2xs"
              />
              <div className="overflow-hidden text-left">
                <div className="text-xs font-bold text-neutral-900 truncate">
                  {user?.name || '开发者'}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono truncate">
                  {user?.email || 'dev@foyton.com'}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                openAuthModal('login');
              }}
              className="p-1.5 rounded-lg hover:bg-neutral-200/60 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
              title="退出当前登录"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Workspace Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Crisp Clean Topbar (High contrast, refined light theme) */}
        <header className="h-14 bg-white border-b border-neutral-200/75 px-6 sm:px-8 flex items-center justify-between z-20 sticky top-0 shadow-[0_1px_6px_rgba(0,0,0,0.015)]">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onNavigateHome}
              className="text-neutral-400 hover:text-neutral-700 transition-colors font-medium cursor-pointer"
            >
              Foyton Cloud
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-400 font-medium">Console</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="font-bold text-neutral-900 bg-neutral-100/80 px-2 py-0.5 rounded-md text-[11px]">
              {currentTabTitle}
            </span>
          </div>

          {/* Right Topbar Actions */}
          <div className="flex items-center gap-3">
            
            {/* Quick Balance Pill with Light Theme */}
            <button
              type="button"
              onClick={() => setActiveTab('wallet')}
              className="px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 text-xs text-neutral-800 flex items-center gap-2 transition-all shadow-2xs cursor-pointer group"
              title="点击查看钱包并充值"
            >
              <Wallet className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-neutral-500 hidden sm:inline text-[11px]">账户余额:</span>
              <span className="font-mono font-bold text-neutral-900">
                ¥{user?.balance.toFixed(2) || '0.00'}
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200/60 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                充值
              </span>
            </button>

            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 cursor-pointer"
              title="切换语言"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>{language === 'zh' ? '中' : 'EN'}</span>
            </button>

            {/* Back to Home Button (Refined light style, no heavy black) */}
            <button
              onClick={onNavigateHome}
              className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 text-neutral-800 text-xs font-semibold transition-all border border-neutral-200/70 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">返回官网</span>
            </button>

          </div>
        </header>

        {/* Content Box */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'wallet' && (
            <ConsoleWallet />
          )}
          {activeTab === 'apikeys' && (
            <ConsoleApiKeys />
          )}
          {activeTab === 'tokens' && (
            <ConsoleTokenUsage />
          )}
          {activeTab === 'billing' && (
            <ConsoleBillingLogs />
          )}
          {activeTab === 'routing' && <ConsoleRoutingSettings />}
          {activeTab === 'alerts' && <ConsoleAlerts />}
        </main>

      </div>

    </div>
  );
};
