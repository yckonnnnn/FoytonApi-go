import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ActiveView } from '../types';
import { 
  Gift
} from 'lucide-react';

interface EnterpriseFooterProps {
  onNavigate: (view: ActiveView) => void;
  onOpenConsultation: () => void;
}

export const EnterpriseFooter: React.FC<EnterpriseFooterProps> = ({
  onNavigate,
  onOpenConsultation
}) => {
  const { language } = useLanguage();

  return (
    <footer 
      id="enterprise-gateway-footer"
      className="w-full mt-10 sm:mt-16 pb-12 sm:pb-16 text-left select-none relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Main Outer Rounded Card (Exact Match to Image 1) ── */}
        <div className="relative bg-white rounded-[28px] sm:rounded-[36px] border border-neutral-200/90 shadow-[0_6px_32px_rgba(0,0,0,0.04)] p-4 sm:p-5 md:p-6 overflow-hidden">
          
          {/* ── Top-Right Purple Stamp Badge (Strict Match to Image 1: FYTAPI.COM 邀请返现) ── */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-10 rotate-[14deg] pointer-events-none opacity-90 select-none z-20">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-[#8b5cf6]/85 p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-[#8b5cf6]/70 bg-purple-50/20 backdrop-blur-2xs flex flex-col items-center justify-center text-[#7c3aed] p-1 shadow-inner relative">
                
                {/* Curved Upper Text: ★ ★ FYTAPI.COM ★ ★ */}
                <div className="text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase tracking-wider text-[#7c3aed] text-center leading-none mt-1">
                  ★ ★ FYTAPI.COM ★ ★
                </div>

                {/* Center Gift Box Icon */}
                <div className="my-1.5 flex items-center justify-center">
                  <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-[#8b5cf6] stroke-[1.8]" />
                </div>

                {/* Lower Pill Badge: 邀请返现 */}
                <div className="px-2.5 py-0.5 rounded-full bg-[#8b5cf6] text-white text-[10px] sm:text-[11px] font-bold tracking-tight shadow-xs">
                  {language === 'zh' ? '邀请返现' : 'Rewards'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            
            {/* ── Left Column: Sky Cloud-Sea Card (Exact Match to Image 1 Left Card) ── */}
            <div 
              className="lg:col-span-5 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-sm flex flex-col justify-between p-6 sm:p-8 relative min-h-[300px] sm:min-h-[340px] text-white bg-[#1e3a68]"
            >
              {/* Cloud-Sea Photographic Aerial Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-luminosity scale-105"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900&q=80")'
                }}
              />

              {/* Deep Blue Sky Gradient Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(23, 56, 107, 0.88) 0%, rgba(18, 43, 84, 0.95) 100%)'
                }}
              />

              {/* Top: Logo & Website Domain (fytapi.com) */}
              <div className="relative z-10 flex items-center gap-3">
                {/* Black Mascot Badge */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md p-1">
                  <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                  </div>
                </div>

                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                  fytapi.com
                </span>
              </div>

              {/* Middle: Headline Typography (Exact Match to Image 1) */}
              <div className="relative z-10 my-auto py-6">
                <h3 className="text-xl sm:text-[22px] md:text-[23px] font-bold text-white leading-snug tracking-tight">
                  {language === 'zh' ? (
                    <>
                      为企业和专业人士打造的 Agentic LLM<br />
                      统一网关
                    </>
                  ) : (
                    <>
                      Unified Agentic LLM Gateway for<br />
                      Enterprises & Practitioners
                    </>
                  )}
                </h3>
              </div>

              {/* Bottom Row: Contact Us + 4 Social Media Buttons */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/15">
                <button 
                  onClick={onOpenConsultation}
                  className="text-xs sm:text-[13px] text-white/90 hover:text-white flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-xs bg-white/90 inline-block" />
                  <span>{language === 'zh' ? '联系我们' : 'Contact Us'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {/* Twitter / X */}
                  <button 
                    onClick={onOpenConsultation}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                    title="X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>

                  {/* Discord */}
                  <button 
                    onClick={onOpenConsultation}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                    title="Discord"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button 
                    onClick={onOpenConsultation}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                    title="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </button>

                  {/* YouTube */}
                  <button 
                    onClick={onOpenConsultation}
                    className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                    title="YouTube"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Right Navigation Columns (Exact Match to Image 1: 产品 / 资源 / 公司) ── */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-4">
              
              <div className="grid grid-cols-3 gap-6 sm:gap-10 pt-2">
                
                {/* Column 1: 产品 */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-400 mb-5">
                    {language === 'zh' ? '产品' : 'Product'}
                  </h4>
                  <ul className="space-y-4 text-[15.5px] font-medium text-neutral-900">
                    <li>
                      <button 
                        onClick={() => onNavigate('pricing')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '定价' : 'Pricing'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('models')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '模型排行榜' : 'Leaderboard'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('ai-hub')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '服务保障' : 'SLA Guarantee'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('console-overview')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '开发者控制台' : 'Developer Console'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('console-apikeys')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? 'API 密钥' : 'API Keys'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('console-wallet')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '钱包与充值' : 'Wallet & Top-up'}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: 资源 */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-400 mb-5">
                    {language === 'zh' ? '资源与用量' : 'Resources & Usage'}
                  </h4>
                  <ul className="space-y-4 text-[15.5px] font-medium text-neutral-900">
                    <li>
                      <button 
                        onClick={() => onNavigate('console-tokens')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? 'Token 用量监控' : 'Token Analytics'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('console-billing')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '消费明细日志' : 'Billing Logs'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => onNavigate('docs')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '接入文档' : 'API Docs'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={onOpenConsultation} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '邀请返现' : 'Referral Rewards'}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 3: 公司 */}
                <div>
                  <h4 className="text-sm font-medium text-neutral-400 mb-5">
                    {language === 'zh' ? '公司' : 'Company'}
                  </h4>
                  <ul className="space-y-4 text-[15.5px] font-medium text-neutral-900">
                    <li>
                      <button 
                        onClick={() => onNavigate('lost-original')} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '关于智能路由' : 'About Router'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={onOpenConsultation} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '博客' : 'Blog'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={onOpenConsultation} 
                        className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                      >
                        {language === 'zh' ? '企业解决方案' : 'Solutions'}
                      </button>
                    </li>
                  </ul>
                </div>

              </div>

              {/* ── Bottom Line & Copyright (Exact Match to Image 1: "保留所有权利。") ── */}
              <div className="mt-8 pt-6 border-t border-neutral-100 text-xs sm:text-[13px] text-neutral-400">
                {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
              </div>

            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};
