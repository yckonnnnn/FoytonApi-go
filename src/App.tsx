/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ConcentricRings } from './components/ConcentricRings';
import { UfoEcosystemHub } from './components/UfoEcosystemHub';
import { HeroRotatingHeadline } from './components/HeroRotatingHeadline';
import { CoreAdvantages } from './components/CoreAdvantages';
import { ConsultationModal } from './components/ConsultationModal';
import { AiRelayHub } from './components/AiRelayHub';
import { ModelSquareView } from './components/ModelSquareView';
import { DocsView } from './components/DocsView';
import { ProjectsView } from './components/ProjectsView';
import { ModelPricingSection } from './components/ModelPricingSection';
import { ServiceJourneySection } from './components/ServiceJourneySection';
import { ModelProviderSection } from './components/ModelProviderSection';
import { TokenValueBannerSection } from './components/TokenValueBannerSection';
import { SiteFooter } from './components/SiteFooter';
import { LazyThreeWarpTunnel } from './components/LazyThreeWarpTunnel';
import { AuthModal } from './components/AuthModal';
import { LoginView } from './components/LoginView';
import { ConsoleLayout } from './components/console/ConsoleLayout';
import { AdminPanel } from './components/AdminPanel';
import { StatusPage } from './components/StatusPage';
import { ActiveView, ConsoleTab } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainAppContent() {
  const [currentView, setCurrentView] = useState<ActiveView>(() => window.location.pathname === '/status' ? 'status' : window.location.pathname === '/admin' ? 'admin' : 'lost-original');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { t } = useLanguage();
  const { isAuthenticated, loading, user } = useAuth();

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView]);

  // Handle buy button click with login gate — always goes to wallet recharge
  const handleBuyCredits = () => {
    if (!isAuthenticated) {
      setCurrentView('login');
    } else {
      setCurrentView('console-wallet');
    }
  };

  // 独立登录/注册页：无 Navbar / Footer / 隧道，全幅渲染
  if (currentView === 'login') {
    return <LoginView onNavigate={(view) => setCurrentView(view)} />;
  }

  if (currentView === 'status') return <StatusPage onBack={() => setCurrentView('lost-original')} />;
  if (currentView === 'admin') {
    if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] text-sm text-neutral-400">正在加载账户…</div>;
    return user?.role === 'admin' ? <AdminPanel onBack={() => setCurrentView('console-tokens')} /> : <LoginView onNavigate={(view) => setCurrentView(view)} />;
  }

  // If user is inside any console page, render the ConsoleLayout
  if (currentView.startsWith('console')) {
    if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] text-sm text-neutral-400">正在加载账户…</div>;
    if (!isAuthenticated) return <LoginView onNavigate={(view) => setCurrentView(view)} />;
    let initialTab: ConsoleTab = 'tokens';
    if (currentView === 'console-wallet') initialTab = 'wallet';
    else if (currentView === 'console-apikeys') initialTab = 'apikeys';
    else if (currentView === 'console-tokens') initialTab = 'tokens';
    else if (currentView === 'console-billing') initialTab = 'billing';

    return (
      <div className="min-h-screen w-full bg-[#f7f8fa]">
        <ConsoleLayout
          initialTab={initialTab}
          onNavigateHome={() => setCurrentView('lost-original')}
          onNavigateAdmin={() => setCurrentView('admin')}
        />
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fbfbfa] flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif] selection:bg-purple-100 selection:text-purple-900 relative overflow-x-hidden">
      {/* Top Navigation - Full width with centered inner container */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* View Routing */}
      {currentView === 'lost-original' ? (
        /* FULL-BLEED HERO VIEW */
        <main className="relative flex-1 w-full flex flex-col items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6 z-20">
          {/* Concentric Radar / Orbit Rings & Nebula Halo */}
          <ConcentricRings />

          {/* Central Content Stack */}
          <div className="relative z-30 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
            
            {/* 1. Sub-headline: AI Relay & Agent Gateway */}
            <p className="text-[13px] sm:text-[14px] text-neutral-400 font-medium tracking-wide mb-1 sm:mb-1.5">
              {t.hero_tag}
            </p>

            {/* 2. Main Rotating Two-Line Headline (3s interval, color styled, with 3D Cloud & Heart) */}
            <div className="mb-2 sm:mb-3">
              <HeroRotatingHeadline />
            </div>

            {/* 3. Central 3D Flying Saucer UFO & Surrounding AI Ecosystem Hub with accurate icons */}
            <UfoEcosystemHub />

          </div>

          {/* Redesigned Architectural Advantages & Routing Section (Referencing Image 2) */}
          <CoreAdvantages
            onNavigate={(view) => setCurrentView(view)}
            onOpenConsultation={() => setIsConsultationOpen(true)}
            onBuy={handleBuyCredits}
          />
        </main>
      ) : currentView === 'models' ? (
        /* 模型广场 (Model Square) */
        <main className="relative flex-1 w-full py-4 z-20">
          <ModelSquareView
            onNavigate={(view) => setCurrentView(view)}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        </main>
      ) : currentView === 'docs' ? (
        /* 接入文档 (Integration Documentation) */
        <main className="relative flex-1 w-full py-4 z-20">
          <DocsView
            onNavigate={(view) => setCurrentView(view)}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        </main>
      ) : currentView === 'ai-hub' || currentView === 'pricing' ? (
        /* AI 中转站 (AI API GATEWAY & HUB) VIEW */
        <main className="relative flex-1 w-full py-4 z-20">
          <AiRelayHub 
            onBackToOriginal={() => setCurrentView('lost-original')} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        </main>
      ) : (
        /* PROJECTS VIEW */
        <main className="relative flex-1 w-full py-4 z-20">
          <ProjectsView 
            onBack={() => setCurrentView('lost-original')} 
            onOpenConsultation={() => setIsConsultationOpen(true)} 
          />
        </main>
      )}

      {/* 首页专属：模型价格参考 / 从一次调用到一条清晰记录 / 模型生态厂商墙 / 充值转化横幅 */}
      {currentView === 'lost-original' && (
        <div className="relative z-20 w-full">
          <ModelPricingSection onNavigate={(view) => setCurrentView(view)} />
          <ServiceJourneySection onNavigate={(view) => setCurrentView(view)} />
          <ModelProviderSection onNavigate={(view) => setCurrentView(view)} />
          <TokenValueBannerSection onBuyCredits={handleBuyCredits} />
        </div>
      )}

      {/* Modern Multi-Column Site Footer */}
      <SiteFooter onNavigate={(view) => setCurrentView(view)} />

      {/* 首页专属：页脚之下的宇宙隧道收尾（three.js 懒加载） */}
      {currentView === 'lost-original' && (
        <LazyThreeWarpTunnel onOpenConsultation={() => setIsConsultationOpen(true)} />
      )}

      {/* 30-min Call / Contact & AI Onboarding Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Global Auth Modal for Sign In / Registration */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
