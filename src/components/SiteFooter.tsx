import React from 'react';
import { FoytonLogo } from './FoytonLogo';
import { useLanguage } from '../context/LanguageContext';
import { ActiveView } from '../types';

interface SiteFooterProps {
  onNavigate: (view: ActiveView) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const scrollToServiceJourney = () => {
    document.getElementById('service-journey-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#fbfaf8] text-neutral-900 pt-16 pb-8 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Split Footer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs bg-white">

          {/* Left Column (4 cols): Sky Clouds Card with fytapi.com Branding */}
          <div className="lg:col-span-4 relative p-8 sm:p-10 flex flex-col justify-between min-h-[360px] overflow-hidden text-white bg-slate-900">

            {/* Real Blue Sky & Clouds Photo Background */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none transform scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1000&q=80')`,
              }}
            />

            {/* Vignette Overlay for Crisp White Text Contrast */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.75) 0%, rgba(30, 58, 138, 0.6) 50%, rgba(15, 23, 42, 0.88) 100%)',
              }}
            />

            {/* Top Logo & Brand */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-8 h-8 p-1 rounded-xl bg-white border border-neutral-200/90 shrink-0">
                <FoytonLogo className="w-full h-full" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                fytapi.com
              </span>
            </div>

            {/* Center Slogan */}
            <div className="relative z-10 my-8">
              <p className="text-base sm:text-lg font-medium text-white/95 leading-snug max-w-xs">
                {t.footer_slogan}
              </p>
            </div>

            {/* Bottom Contact Us & Social Icons */}
            <div className="relative z-10 flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-normal text-white/90">
                <span className="inline-block w-2.5 h-2.5 bg-white/80 rounded-xs" />
                <span>{t.footer_contactUs}</span>
              </div>

              {/* 4 Square Translucent Icon Buttons */}
              <div className="flex items-center gap-2">
                {/* 1. X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white text-xs transition-colors border border-white/20"
                  title="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* 2. Discord */}
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white text-xs transition-colors border border-white/20"
                  title="Discord"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>

                {/* 3. LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white text-xs font-bold transition-colors border border-white/20"
                  title="LinkedIn"
                >
                  in
                </a>

                {/* 4. YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white text-xs transition-colors border border-white/20"
                  title="YouTube"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (8 cols): Light Cream Links & Rubber Stamp Badge */}
          <div className="lg:col-span-8 bg-[#f8f7f2] p-8 sm:p-10 lg:p-12 relative flex flex-col justify-between">

            {/* Top Right: Vintage Rubber Stamp Badge (FYTAPI * 邀请返现) */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 transform rotate-12 pointer-events-none drop-shadow-xs select-none">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-[#8b5cf6]/80 flex flex-col items-center justify-center p-1 bg-[#ede9fe]/40 text-[#7c3aed]">

                {/* Outer Circular Ring */}
                <div className="w-full h-full rounded-full border border-[#8b5cf6]/60 flex flex-col items-center justify-center relative">

                  {/* Top Arc Text */}
                  <span className="text-[9px] sm:text-[10px] font-mono font-black tracking-widest uppercase">
                    ★ FYTAPI.COM ★
                  </span>

                  {/* Center Gift Box Icon */}
                  <div className="my-1 text-[#7c3aed]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                  </div>

                  {/* Bottom Ribbon */}
                  <div className="px-2 py-0.5 rounded-full bg-[#8b5cf6] text-white text-[8px] sm:text-[9px] font-bold tracking-wider">
                    {t.footer_cashbackStamp}
                  </div>

                </div>
              </div>
            </div>

            {/* Links Columns Grid (3 columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 pt-2 pb-12 text-sm">

              {/* Col 1: 产品 */}
              <div>
                <div className="text-xs font-normal text-neutral-400 mb-4 tracking-wide">
                  {t.footer_prodTitle}
                </div>
                <ul className="space-y-3.5 text-neutral-800 font-medium">
                  <li>
                    <button type="button" onClick={() => onNavigate('pricing')} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_pricing}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => onNavigate('models')} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_models}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={scrollToServiceJourney} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_serviceJourney}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => onNavigate('console-wallet')} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_console}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 2: 资源 */}
              <div>
                <div className="text-xs font-normal text-neutral-400 mb-4 tracking-wide">
                  {t.footer_resTitle}
                </div>
                <ul className="space-y-3.5 text-neutral-800 font-medium">
                  <li>
                    <button type="button" onClick={() => onNavigate('docs')} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_agentConnect}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => onNavigate('docs')} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_docs}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => onNavigate('console-wallet')} className="hover:text-neutral-900 transition-colors text-left cursor-pointer">
                      {t.footer_referral}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: 公司 */}
              <div>
                <div className="text-xs font-normal text-neutral-400 mb-4 tracking-wide">
                  {t.footer_compTitle}
                </div>
                <ul className="space-y-3.5 text-neutral-800 font-medium">
                  <li>
                    <span className="hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.footer_about}
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.footer_blog}
                    </span>
                  </li>
                  <li>
                    <span className="hover:text-neutral-900 transition-colors cursor-pointer">
                      {t.footer_solutions}
                    </span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Copyright Line */}
            <div className="pt-6 border-t border-neutral-200/70 text-xs text-neutral-500 font-normal">
              {t.footer_copyright}
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
