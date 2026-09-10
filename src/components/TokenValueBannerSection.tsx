import React from 'react';
import { ArrowRight, Coins } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TokenValueBannerSectionProps {
  onBuyCredits: () => void;
}

export const TokenValueBannerSection: React.FC<TokenValueBannerSectionProps> = ({ onBuyCredits }) => {
  const { t } = useLanguage();

  return (
    <section id="token-value-section" className="relative w-full bg-white overflow-hidden py-8 sm:py-12">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1680px] mx-auto">

        {/* 紫/靛蓝主题大卡片 */}
        <div className="relative w-full rounded-[32px] overflow-hidden border border-violet-100/80 shadow-[0_12px_44px_rgba(99,102,241,0.10)]">

          {/* 背景渐变 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 40%, #eef2ff 70%, #f5f3ff 100%)',
            }}
          />

          {/* 柔和光晕 */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/12 to-violet-400/12 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-violet-400/10 to-indigo-400/10 blur-3xl pointer-events-none" />

          {/* 靛蓝/紫 色调点阵纹理 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* 内容区 */}
          <div className="relative z-10 py-20 sm:py-24 md:py-28 px-4 sm:px-8 text-center flex flex-col items-center justify-center">

            {/* Token 徽章图标 */}
            <div className="mb-6 sm:mb-8 relative flex items-center justify-center">
              {/* 环境光晕 */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/25 to-violet-500/25 blur-2xl pointer-events-none" />

              {/* 圆形徽章 */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_8px_24px_rgba(99,102,241,0.3)]">
                <Coins className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            {/* 主标题 */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              <span>{t.tokenBanner_titlePart1}</span>
              <span className="text-indigo-600 font-black ml-1">{t.tokenBanner_titlePart2}</span>
            </h2>

            {/* 副标题 */}
            <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-500 leading-relaxed font-normal">
              {t.tokenBanner_subtitle}
            </p>

            {/* CTA 按钮 */}
            <button
              type="button"
              id="token-value-buy-btn"
              onClick={onBuyCredits}
              className="mt-8 sm:mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm sm:text-base font-semibold shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_24px_rgba(99,102,241,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>{t.tokenBanner_buyBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* 底部标签 */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[t.tokenBanner_tag1, t.tokenBanner_tag2, t.tokenBanner_tag3, t.tokenBanner_tag4].map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-indigo-50 border border-indigo-100 px-3.5 py-1 text-xs sm:text-sm text-indigo-700 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
