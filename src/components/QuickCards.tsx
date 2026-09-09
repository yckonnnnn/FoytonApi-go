import React from 'react';
import { ChevronRight, Eye, Terminal } from 'lucide-react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface QuickCardsProps {
  onNavigate: (view: ActiveView) => void;
}

export const QuickCards: React.FC<QuickCardsProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div className="w-full max-w-[370px] sm:max-w-[420px] flex flex-col gap-3 z-30">
      {/* Card 1: AI Console */}
      <button
        id="card-home-page"
        onClick={() => onNavigate('ai-hub')}
        className="group w-full flex items-center justify-between p-3.5 sm:p-4 bg-white/95 hover:bg-white rounded-2xl border border-neutral-200/70 hover:border-neutral-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200 text-left hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          {/* Rounded Icon Box */}
          <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-neutral-200/80 flex items-center justify-center transition-colors">
            <Terminal className="w-[18px] h-[18px] text-neutral-800" strokeWidth={2.2} />
          </div>

          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-neutral-900 leading-snug tracking-tight flex items-center gap-2">
              <span>{language === 'zh' ? 'API 中转控制台' : 'API Relay Console'}</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Console</span>
            </span>
            <span className="text-[12px] text-neutral-400 font-normal">
              {language === 'zh' ? '即插即用 · 零迁移无缝兼容 OpenAI SDK' : 'Plug-and-play · Seamless OpenAI SDK compatibility'}
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all" />
      </button>

      {/* Card 2: Models & SLA */}
      <button
        id="card-projects"
        onClick={() => onNavigate('projects')}
        className="group w-full flex items-center justify-between p-3.5 sm:p-4 bg-white/95 hover:bg-white rounded-2xl border border-neutral-200/70 hover:border-neutral-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200 text-left hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          {/* Rounded Icon Box */}
          <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-neutral-200/80 flex items-center justify-center transition-colors">
            {/* Eye / Target glyph matching screenshot */}
            <div className="relative flex items-center justify-center">
              <Eye className="w-[18px] h-[18px] text-neutral-800" strokeWidth={2.2} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-neutral-900" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-neutral-900 leading-snug tracking-tight">
              {language === 'zh' ? '模型矩阵与落地案例' : 'Model Matrix & Use Cases'}
            </span>
            <span className="text-[12px] text-neutral-400 font-normal">
              {language === 'zh' ? 'Claude 3.7 / GPT-4o / DeepSeek 毫秒直连' : 'Claude 3.7 / GPT-4o / DeepSeek Dedicated Links'}
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all" />
      </button>
    </div>
  );
};
