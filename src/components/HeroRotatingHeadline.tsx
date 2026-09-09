import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingCloud, FloatingHeart } from './FloatingDecorations';
import { useLanguage } from '../context/LanguageContext';

export interface SloganItem {
  id: number;
  line1_zh: string;
  line2_zh: string;
  line1_en: string;
  line2_en: string;
  line1ColorClass: string;
}

const SLOGANS: SloganItem[] = [
  {
    id: 0,
    line1_zh: "Agent 接入",
    line2_zh: "大模型统一入口",
    line1_en: "Agent Integration",
    line2_en: "Universal LLM Gateway",
    line1ColorClass: "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent",
  },
  {
    id: 1,
    line1_zh: "毫秒级专线调度",
    line2_zh: "全网顶尖算力直连",
    line1_en: "Ultra-Low Latency Lines",
    line2_en: "Dedicated Model Hub",
    line1ColorClass: "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 bg-clip-text text-transparent",
  },
  {
    id: 2,
    line1_zh: "高可用智能容灾",
    line2_zh: "赋能企业级智能体",
    line1_en: "High-Availability Failover",
    line2_en: "Empowering AI Agents",
    line1ColorClass: "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-700 bg-clip-text text-transparent",
  }
];

export const HeroRotatingHeadline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLOGANS.length);
    }, 5000); // 默认 5s 轮播

    return () => clearInterval(timer);
  }, []);

  const current = SLOGANS[currentIndex];
  const line1 = language === 'zh' ? current.line1_zh : current.line1_en;
  const line2 = language === 'zh' ? current.line2_zh : current.line2_en;

  return (
    <div className="relative inline-flex flex-col items-center justify-center my-1 sm:my-2 px-6 sm:px-12 select-none">
      {/* 3D Glossy Floating Cloud - Anchored at top left */}
      <div className="absolute -top-6 -left-2 sm:-top-7 sm:-left-6 pointer-events-none z-20">
        <FloatingCloud />
      </div>

      {/* Rotating Two-Line Headlines Container */}
      <div className="relative min-h-[110px] sm:min-h-[135px] md:min-h-[150px] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.id}-${language}`}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Line 1: Stylized with purple/indigo tech gradient color */}
            <h1 className="text-[34px] sm:text-[46px] md:text-[54px] font-extrabold tracking-tight leading-[1.15] drop-shadow-sm">
              <span className={current.line1ColorClass}>
                {line1}
              </span>
            </h1>

            {/* Line 2: High contrast solid carbon text + Floating 3D Heart */}
            <div className="relative flex items-center justify-center text-[30px] sm:text-[42px] md:text-[50px] font-extrabold text-[#111317] tracking-tight leading-[1.15] mt-1 sm:mt-2">
              <span>{line2}</span>
              
              {/* 3D Glossy Floating Heart anchored to the right of line 2 */}
              <FloatingHeart />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
