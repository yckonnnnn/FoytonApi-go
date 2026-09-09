import React, { useState } from 'react';
import { ChevronRight, Globe, LayoutDashboard, User, Menu, X } from 'lucide-react';
import { FoytonLogo } from './FoytonLogo';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenConsultation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { user, openAuthModal } = useAuth();

  const isHome = currentView === 'lost-original';
  const isModels = currentView === 'models';
  const isConsole = currentView.startsWith('console');
  const isDocs = currentView === 'docs';

  return (
    <header className="w-full pt-7 pb-4 px-6 md:px-12 lg:px-16 relative z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo: Foyton Mascot + Foyton API */}
        <div 
          id="nav-brand-logo"
          onClick={() => onNavigate('lost-original')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Foyton API - 企业级大模型与智能体中转平台"
        >
          {/* Company Mascot Logo */}
          <FoytonLogo className="w-9 h-8 group-hover:-translate-y-0.5 transition-transform" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-[22px] tracking-tight text-neutral-900 font-sans">
              Foyton
            </span>
            <span className="font-bold text-[13px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-neutral-900 text-white leading-none">
              API
            </span>
          </div>
        </div>

        {/* Center Nav Links: 严格仅保留 主页、模型广场、控制台、接入文档 */}
        <nav className="hidden md:flex items-center space-x-9 text-[15px] text-neutral-600 font-medium">
          {/* 1. 主页 */}
          <button
            id="nav-link-home"
            onClick={() => onNavigate('lost-original')}
            className={`transition-colors hover:text-neutral-900 cursor-pointer ${
              isHome ? 'text-neutral-950 font-bold' : ''
            }`}
          >
            {language === 'zh' ? '主页' : 'Home'}
          </button>

          {/* 2. 模型广场 */}
          <button
            id="nav-link-models"
            onClick={() => onNavigate('models')}
            className={`transition-colors hover:text-neutral-900 cursor-pointer ${
              isModels ? 'text-neutral-950 font-bold' : ''
            }`}
          >
            {language === 'zh' ? '模型广场' : 'Model Square'}
          </button>

          {/* 3. 控制台 */}
          <button
            id="nav-link-console"
            onClick={() => onNavigate('console-overview')}
            className={`flex items-center gap-1.5 transition-colors hover:text-neutral-900 cursor-pointer ${
              isConsole ? 'text-neutral-950 font-bold' : ''
            }`}
          >
            <span>{language === 'zh' ? '控制台' : 'Console'}</span>
          </button>

          {/* 4. 接入文档 */}
          <button
            id="nav-link-docs"
            onClick={() => onNavigate('docs')}
            className={`transition-colors hover:text-neutral-900 cursor-pointer ${
              isDocs ? 'text-neutral-950 font-bold' : ''
            }`}
          >
            {language === 'zh' ? '接入文档' : 'Documentation'}
          </button>
        </nav>

        {/* Right CTA Button & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch Button */}
          <button
            id="btn-language-toggle"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-semibold bg-white hover:bg-neutral-50 text-neutral-800 transition-all border border-neutral-200/90 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
            title={language === 'zh' ? '切换为 English' : 'Switch to 中文'}
          >
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span className="flex items-center gap-1 tracking-tight">
              <span className={language === 'zh' ? 'text-neutral-950 font-bold' : 'text-neutral-400 font-normal'}>中</span>
              <span className="text-neutral-300">/</span>
              <span className={language === 'en' ? 'text-neutral-950 font-bold' : 'text-neutral-400 font-normal'}>EN</span>
            </span>
          </button>

          {/* User Auth / Console Balance Entrance */}
          {user ? (
            <button
              id="btn-nav-console-user"
              onClick={() => onNavigate('console-overview')}
              className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-xs font-semibold transition-all border border-neutral-200/80 cursor-pointer"
              title="前往控制台工作台"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover border border-neutral-300"
              />
              <span className="hidden sm:inline font-mono font-bold text-neutral-900">
                ¥{user.balance.toFixed(2)}
              </span>
              <span className="text-[11px] text-neutral-500 font-sans hidden md:inline">控制台</span>
            </button>
          ) : (
            <button
              id="btn-nav-login"
              onClick={() => openAuthModal('login')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-all border border-neutral-200 shadow-2xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-neutral-500" />
              <span>{language === 'zh' ? '登录 / 注册' : 'Sign In'}</span>
            </button>
          )}

          {/* "Get in Touch" Button */}
          <button
            id="btn-get-in-touch"
            onClick={onOpenConsultation}
            className="group relative inline-flex items-center gap-2 sm:gap-2.5 bg-[#111317] hover:bg-neutral-800 text-white rounded-full pl-2 pr-3.5 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-[13.5px] font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-200 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span>{t.nav_get_in_touch}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (仅 4 个要求项) */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-lg space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => {
              onNavigate('lost-original');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isHome ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {language === 'zh' ? '主页' : 'Home'}
          </button>
          <button
            onClick={() => {
              onNavigate('models');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isModels ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {language === 'zh' ? '模型广场' : 'Model Square'}
          </button>
          <button
            onClick={() => {
              onNavigate('console-overview');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isConsole ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {language === 'zh' ? '控制台' : 'Console'}
          </button>
          <button
            onClick={() => {
              onNavigate('docs');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isDocs ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            {language === 'zh' ? '接入文档' : 'Documentation'}
          </button>
        </div>
      )}
    </header>
  );
};
