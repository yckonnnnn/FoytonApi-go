import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'zh' | 'en';

export interface Translations {
  // Navigation
  nav_about: string;
  nav_services: string;
  nav_projects: string;
  nav_blog: string;
  nav_get_in_touch: string;
  nav_experience_hub: string;
  nav_back_home: string;
  nav_services_dropdown_tag: string;
  nav_hub_title: string;
  nav_hub_sub: string;
  nav_routing_title: string;
  nav_routing_sub: string;
  nav_billing_title: string;
  nav_billing_sub: string;

  // Hero Section
  hero_tag: string;
  hero_slide1_line1: string;
  hero_slide1_line2: string;
  hero_slide1_sub: string;
  hero_slide2_line1: string;
  hero_slide2_line2: string;
  hero_slide2_sub: string;
  hero_slide3_line1: string;
  hero_slide3_line2: string;
  hero_slide3_sub: string;

  // Ecosystem Hub
  hub_badge_models: string;
  hub_badge_agents: string;
  hub_dispatch_core: string;
  hub_footer_text: string;

  // Core Advantages
  adv_eyebrow: string;
  adv_heading: string;
  adv_desc: string;
  adv1_tag: string;
  adv1_title: string;
  adv1_desc: string;
  adv1_metric1_val: string;
  adv1_metric1_lbl: string;
  adv1_metric2_val: string;
  adv1_metric2_lbl: string;
  adv2_tag: string;
  adv2_title: string;
  adv2_desc: string;
  adv2_metric1_val: string;
  adv2_metric1_lbl: string;
  adv2_metric2_val: string;
  adv2_metric2_lbl: string;
  adv3_tag: string;
  adv3_title: string;
  adv3_desc: string;
  adv3_metric1_val: string;
  adv3_metric1_lbl: string;
  adv3_metric2_val: string;
  adv3_metric2_lbl: string;

  // Quick Cards
  quick_hub_title: string;
  quick_hub_desc: string;
  quick_models_title: string;
  quick_models_desc: string;
  quick_pricing_title: string;
  quick_pricing_desc: string;

  // Footer & Modal
  footer_copy: string;
  footer_home: string;
  footer_console: string;
  footer_contact: string;
  modal_title: string;
  modal_desc: string;
  modal_name: string;
  modal_email: string;
  modal_company: string;
  modal_concurrency: string;
  modal_notes: string;
  modal_submit: string;
  modal_success: string;
}

const translations: Record<Language, Translations> = {
  zh: {
    nav_about: '关于我们',
    nav_services: '服务矩阵',
    nav_projects: '项目案例',
    nav_blog: '技术博客',
    nav_get_in_touch: '联系我们',
    nav_experience_hub: '体验 AI 中转站平台',
    nav_back_home: '返回原版官网',
    nav_services_dropdown_tag: 'AI 中转站与技术业务',
    nav_hub_title: 'AI 中转网关 (API Hub)',
    nav_hub_sub: 'OpenAI / Claude / Gemini 一键直连中转',
    nav_routing_title: '大模型聚合路由矩阵',
    nav_routing_sub: '零丢包智能调度与高可用负载均衡',
    nav_billing_title: 'Token 计费与组织密钥',
    nav_billing_sub: '企业级多租户与额度分配管控',

    hero_tag: 'AI Agent 智能体路由 · 高可用中转网关',
    hero_slide1_line1: 'Agent 接入',
    hero_slide1_line2: '大模型统一入口',
    hero_slide1_sub: '支持 OpenAI、Claude、Gemini 等全系模型，企业级低延迟高并发路由',
    hero_slide2_line1: '极速专线中转',
    hero_slide2_line2: '零丢包容灾架构',
    hero_slide2_sub: '多节点智能探活与负载均衡，保障业务 99.99% 高可用持续在线',
    hero_slide3_line1: 'OpenAI 兼容协议',
    hero_slide3_line2: '一行代码无缝迁移',
    hero_slide3_sub: '无须修改现有业务逻辑，一键切换 Endpoint 即可享受超高性价比',

    hub_badge_models: '全球模型直连',
    hub_badge_agents: 'AGENT 客户端',
    hub_dispatch_core: '智能调度中枢',
    hub_footer_text: '—— 已支持 10+ Agent / 客户端与开发者工具生态 ——',

    adv_eyebrow: 'WHY CHOOSE FOYTON API',
    adv_heading: '企业级 AI 中转核心技术优势',
    adv_desc: '针对高频生产环境量身打造，解决接口限流、网络阻断、跨洋延迟与多账号协同痛点',
    adv1_tag: '高可用保障',
    adv1_title: '企业级高并发',
    adv1_desc: '分布式多区域集群部署，单集群支持 100,000+ QPS 峰值并发。智能动态扩缩容，杜绝高峰期限流与请求阻塞。',
    adv1_metric1_val: '100k+',
    adv1_metric1_lbl: '峰值并发承载',
    adv1_metric2_val: '99.99%',
    adv1_metric2_lbl: 'SLA 可用率承诺',
    adv2_tag: '极速通道',
    adv2_title: '极低延迟专线',
    adv2_desc: '全节点接入 BGP Anycast 与跨境金融级专线网络，平均 TTFT（首字响应时间）降低 60%，带来极致流畅体验。',
    adv2_metric1_val: '<30ms',
    adv2_metric1_lbl: '平均首字响应',
    adv2_metric2_val: '24+',
    adv2_metric2_lbl: '全球专线节点',
    adv3_tag: '极简接入',
    adv3_title: '统一 OpenAI 标准',
    adv3_desc: '100% 完美兼容 OpenAI API 规范。无论 Claude、Gemini 还是开源大模型，均可通过标准 SDK 一键平滑无感接入。',
    adv3_metric1_val: '100%',
    adv3_metric1_lbl: 'SDK 协议兼容',
    adv3_metric2_val: '0 行',
    adv3_metric2_lbl: '业务逻辑改造',

    quick_hub_title: 'AI 中转控制台',
    quick_hub_desc: '即刻测试多模型响应',
    quick_models_title: '支持模型清单',
    quick_models_desc: 'Claude 3.7 / GPT-4o / Gemini',
    quick_pricing_title: '企业专线接入',
    quick_pricing_desc: '高并发低延迟定制通道',

    footer_copy: 'Foyton API · 企业级大模型与智能体中转平台 © 2025',
    footer_home: '官网首页',
    footer_console: 'AI 中转控制台',
    footer_contact: '商务合作与 API Key 申请',
    modal_title: '预约企业级中转专线咨询',
    modal_desc: '填写您的业务诉求与预期并发量，专属解决方案架构师将在 15 分钟内与您联系',
    modal_name: '您的姓名',
    modal_email: '企业或业务邮箱',
    modal_company: '公司或团队名称',
    modal_concurrency: '预估月度 Token 消耗或 QPS 并发',
    modal_notes: '您的具体业务场景与技术需求',
    modal_submit: '立即提交接入申请',
    modal_success: '提交成功！我们的架构师将尽快联系您。',
  },
  en: {
    nav_about: 'About Us',
    nav_services: 'Services',
    nav_projects: 'Projects',
    nav_blog: 'Blog',
    nav_get_in_touch: 'Get in Touch',
    nav_experience_hub: 'Experience AI Hub',
    nav_back_home: 'Back to Home',
    nav_services_dropdown_tag: 'AI Relay & Enterprise Services',
    nav_hub_title: 'AI Gateway (API Hub)',
    nav_hub_sub: 'One-click relay for OpenAI / Claude / Gemini',
    nav_routing_title: 'Model Routing Matrix',
    nav_routing_sub: 'Zero-loss smart dispatch & load balancing',
    nav_billing_title: 'Token Billing & Keys',
    nav_billing_sub: 'Enterprise multi-tenant quota management',

    hero_tag: 'AI Agent Routing · High Availability Gateway',
    hero_slide1_line1: 'Agent Integration',
    hero_slide1_line2: 'Universal LLM Gateway',
    hero_slide1_sub: 'Supporting Claude, GPT, Gemini and full model lineup with low-latency routing',
    hero_slide2_line1: 'Dedicated High-Speed Relay',
    hero_slide2_line2: 'Zero-Loss Failover System',
    hero_slide2_sub: 'Multi-node active probing & balancing ensuring 99.99% uptime availability',
    hero_slide3_line1: 'OpenAI Compatible Protocol',
    hero_slide3_line2: 'Seamless One-Line Migration',
    hero_slide3_sub: 'No business logic changes needed — simply update your endpoint URL',

    hub_badge_models: 'Global Models',
    hub_badge_agents: 'AGENT Clients',
    hub_dispatch_core: 'Smart Dispatch Core',
    hub_footer_text: '—— Supporting 10+ Agent Clients & Developer Ecosystems ——',

    adv_eyebrow: 'WHY CHOOSE FOYTON API',
    adv_heading: 'Enterprise AI Gateway Core Advantages',
    adv_desc: 'Engineered for high-throughput production workloads, eliminating rate limits and cross-border latency',
    adv1_tag: 'High Availability',
    adv1_title: 'Enterprise Concurrency',
    adv1_desc: 'Distributed multi-region clusters supporting 100,000+ QPS peak concurrency with dynamic auto-scaling.',
    adv1_metric1_val: '100k+',
    adv1_metric1_lbl: 'Peak Concurrency',
    adv1_metric2_val: '99.99%',
    adv1_metric2_lbl: 'Uptime SLA Commitment',
    adv2_tag: 'Ultra-Low Latency',
    adv2_title: 'Dedicated Fast Lines',
    adv2_desc: 'BGP Anycast routing with enterprise cross-border dedicated lines reducing TTFT by over 60%.',
    adv2_metric1_val: '<30ms',
    adv2_metric1_lbl: 'Avg. First Token Time',
    adv2_metric2_val: '24+',
    adv2_metric2_lbl: 'Global Edge Nodes',
    adv3_tag: 'Seamless Integration',
    adv3_title: 'OpenAI Standard Format',
    adv3_desc: '100% compatible with OpenAI API specs. Claude, Gemini, or open weights connect seamlessly via official SDKs.',
    adv3_metric1_val: '100%',
    adv3_metric1_lbl: 'SDK Protocol Match',
    adv3_metric2_val: '0 Lines',
    adv3_metric2_lbl: 'Code Modification',

    quick_hub_title: 'AI Relay Console',
    quick_hub_desc: 'Instant interactive test bench',
    quick_models_title: 'Supported Models',
    quick_models_desc: 'Claude 3.7 / GPT-4o / Gemini',
    quick_pricing_title: 'Dedicated Enterprise',
    quick_pricing_desc: 'Custom high-concurrency pipe',

    footer_copy: 'Foyton API · Enterprise LLM & Agent Gateway Platform © 2025',
    footer_home: 'Home',
    footer_console: 'AI Console',
    footer_contact: 'Business & API Key Request',
    modal_title: 'Book Enterprise API Consultation',
    modal_desc: 'Share your workload requirements and concurrency needs, our architect will contact you within 15 mins',
    modal_name: 'Your Name',
    modal_email: 'Business Email',
    modal_company: 'Company / Organization',
    modal_concurrency: 'Estimated Monthly Tokens or QPS',
    modal_notes: 'Your specific use case & technical specs',
    modal_submit: 'Submit Application',
    modal_success: 'Application received! Our architect will reach out shortly.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Requirement 2: Default is Chinese ('zh')
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
