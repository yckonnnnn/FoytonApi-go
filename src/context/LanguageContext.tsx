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

  // Modal
  modal_title: string;
  modal_desc: string;
  modal_name: string;
  modal_email: string;
  modal_company: string;
  modal_concurrency: string;
  modal_notes: string;
  modal_submit: string;
  modal_success: string;

  // Service Journey Section (从一次调用，到一条清晰记录)
  serviceJourney_eyebrow: string;
  serviceJourney_title: string;
  serviceJourney_subtitle: string;
  serviceJourney_compatibleBadge: string;
  serviceJourney_cardTitle: string;
  serviceJourney_cardDescription: string;
  serviceJourney_exploreAction: string;
  serviceJourney_journeyTitle: string;
  serviceJourney_journeySubtitle: string;
  serviceJourney_noPricePromise: string;
  serviceJourney_step1Title: string;
  serviceJourney_step1Desc: string;
  serviceJourney_step2Title: string;
  serviceJourney_step2Desc: string;
  serviceJourney_step3Title: string;
  serviceJourney_step3Desc: string;
  serviceJourney_featureCache: string;
  serviceJourney_featureFailover: string;
  serviceJourney_featureBilling: string;
  serviceJourney_featureRecords: string;

  // Model Pricing Reference Section (模型价格参考)
  priceReference_title: string;
  priceReference_subtitle: string;
  priceReference_unitLabel: string;
  priceReference_referenceBadge: string;
  priceReference_referenceInput: string;
  priceReference_referenceOutput: string;
  priceReference_referenceOnly: string;
  pricing_contextWindow: string;
  pricing_newBadge: string;
  pricing_fastMode: string;
  quickConnect_action: string;

  // Token Value Banner (每一份 token 都更划算)
  tokenBanner_titlePart1: string;
  tokenBanner_titlePart2: string;
  tokenBanner_subtitle: string;
  tokenBanner_buyBtn: string;
  tokenBanner_tag1: string;
  tokenBanner_tag2: string;
  tokenBanner_tag3: string;
  tokenBanner_tag4: string;

  // Site Footer
  footer_slogan: string;
  footer_contactUs: string;
  footer_cashbackStamp: string;
  footer_prodTitle: string;
  footer_resTitle: string;
  footer_compTitle: string;
  footer_pricing: string;
  footer_models: string;
  footer_serviceJourney: string;
  footer_console: string;
  footer_agentConnect: string;
  footer_docs: string;
  footer_referral: string;
  footer_about: string;
  footer_blog: string;
  footer_solutions: string;
  footer_copyright: string;

  // Login / Register Page
  login_title: string;
  login_subtitle: string;
  login_tabSignin: string;
  login_tabRegister: string;
  login_emailLabel: string;
  login_emailPlaceholder: string;
  login_passwordLabel: string;
  login_passwordPlaceholder: string;
  login_forgotPassword: string;
  login_codeLabel: string;
  login_codePlaceholder: string;
  login_sendCode: string;
  login_nameLabel: string;
  login_namePlaceholder: string;
  login_inviteLabel: string;
  login_invitePlaceholder: string;
  login_inviteBonus: string;
  login_agreeTerms: string;
  login_termsLink: string;
  login_privacyLink: string;
  login_signinBtn: string;
  login_registerBtn: string;
  login_demoBtn: string;
  login_githubBtn: string;
  login_googleBtn: string;
  login_securityBadge: string;
  login_switchToCode: string;
  login_switchToPassword: string;
  login_feature1Title: string;
  login_feature1Sub: string;
  login_feature2Title: string;
  login_feature2Sub: string;
  login_feature3Title: string;
  login_feature3Sub: string;
  login_backHome: string;

  // Package Purchase Modal
  package_title: string;
  package_subtitle: string;
  package_popular: string;
  package_buyNow: string;
  package_features: string;
  package_perMonth: string;
  package_team: string;
  package_teamDesc: string;
  package_junior: string;
  package_juniorDesc: string;
  package_pro: string;
  package_proDesc: string;
  package_teamPrice: string;
  package_juniorPrice: string;
  package_proPrice: string;
  package_teamFeature1: string;
  package_teamFeature2: string;
  package_teamFeature3: string;
  package_teamFeature4: string;
  package_juniorFeature1: string;
  package_juniorFeature2: string;
  package_juniorFeature3: string;
  package_juniorFeature4: string;
  package_proFeature1: string;
  package_proFeature2: string;
  package_proFeature3: string;
  package_proFeature4: string;
  package_loginRequired: string;
  package_loginRedirect: string;
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

    modal_title: '预约企业级中转专线咨询',
    modal_desc: '填写您的业务诉求与预期并发量，专属解决方案架构师将在 15 分钟内与您联系',
    modal_name: '您的姓名',
    modal_email: '企业或业务邮箱',
    modal_company: '公司或团队名称',
    modal_concurrency: '预估月度 Token 消耗或 QPS 并发',
    modal_notes: '您的具体业务场景与技术需求',
    modal_submit: '立即提交接入申请',
    modal_success: '提交成功！我们的架构师将尽快联系您。',

    serviceJourney_eyebrow: '为稳定调用而设计',
    serviceJourney_title: '从一次调用，到一条清晰记录',
    serviceJourney_subtitle: '一次接入，照常发起请求，每一笔调用都清楚可查。',
    serviceJourney_compatibleBadge: '兼容 OpenAI 接入方式',
    serviceJourney_cardTitle: '一个地址，连接团队需要的模型',
    serviceJourney_cardDescription: '保留原有使用习惯，连接、路由与每次调用的记录都由平台统一处理。',
    serviceJourney_exploreAction: '查看接入方式',
    serviceJourney_journeyTitle: '每一次调用，都清楚可查',
    serviceJourney_journeySubtitle: '从选择模型到查看记录，过程始终简单明了。',
    serviceJourney_noPricePromise: '过程清晰透明',
    serviceJourney_step1Title: '选择模型',
    serviceJourney_step1Desc: '继续使用现有工作流里的模型名称。',
    serviceJourney_step2Title: '发起请求',
    serviceJourney_step2Desc: '在已支持的客户端中使用同一个地址。',
    serviceJourney_step3Title: '查看记录',
    serviceJourney_step3Desc: '需要时可在同一处查看用量和调用详情。',
    serviceJourney_featureCache: '提示缓存',
    serviceJourney_featureFailover: '自动切换',
    serviceJourney_featureBilling: '统一账单',
    serviceJourney_featureRecords: '用量记录',

    priceReference_title: '模型价格参考',
    priceReference_subtitle: '页面价格便于比较模型；请求处理完成后，以用量日志记录的金额为准。',
    priceReference_unitLabel: '价格单位',
    priceReference_referenceBadge: '参考价格',
    priceReference_referenceInput: '输入参考价',
    priceReference_referenceOutput: '输出参考价',
    priceReference_referenceOnly: '非实时价格',
    pricing_contextWindow: '上下文 {{size}}',
    pricing_newBadge: '上新',
    pricing_fastMode: '极速通道',
    quickConnect_action: '快速接入',

    tokenBanner_titlePart1: '每一分算力，都',
    tokenBanner_titlePart2: '物超所值',
    tokenBanner_subtitle: '全球供应商高频竞价 + 多云智能路由，确保每次调用都运行在市场最低价。余额随用随扣，永不过期。',
    tokenBanner_buyBtn: '立即充值',
    tokenBanner_tag1: 'USD 计费',
    tokenBanner_tag2: '无最低消费',
    tokenBanner_tag3: '实时竞价',
    tokenBanner_tag4: '随用随扣',

    footer_slogan: '为企业和专业人士打造的 Agentic LLM 统一网关',
    footer_contactUs: '联系我们',
    footer_cashbackStamp: '邀请返现',
    footer_prodTitle: '产品',
    footer_resTitle: '资源',
    footer_compTitle: '公司',
    footer_pricing: '定价',
    footer_models: '模型广场',
    footer_serviceJourney: '服务保障',
    footer_console: '控制台',
    footer_agentConnect: '接入 Agent',
    footer_docs: 'API 文档',
    footer_referral: '邀请返现',
    footer_about: '关于智能路由',
    footer_blog: '博客',
    footer_solutions: '企业解决方案',
    footer_copyright: '保留所有权利。',

    // Login / Register Page
    login_title: '登录 Foyton',
    login_subtitle: '统一接入 OpenAI、Anthropic、DeepSeek 与更多大模型',
    login_tabSignin: '账号登录',
    login_tabRegister: '快速注册',
    login_emailLabel: '工作邮箱 / 手机号',
    login_emailPlaceholder: 'name@company.com',
    login_passwordLabel: '登录密码',
    login_passwordPlaceholder: '••••••••••••',
    login_forgotPassword: '忘记密码？',
    login_codeLabel: '邮箱验证码',
    login_codePlaceholder: '6 位验证码',
    login_sendCode: '获取验证码',
    login_nameLabel: '用户名 / 企业团队',
    login_namePlaceholder: '例如: Alex Chen 或 某某科技',
    login_inviteLabel: '邀请码 (选填)',
    login_invitePlaceholder: 'FYT-2026-VIP',
    login_inviteBonus: '填邀请码送 ¥50 体验金',
    login_agreeTerms: '我已阅读并同意',
    login_termsLink: '《服务协议》',
    login_privacyLink: '《隐私权政策》',
    login_signinBtn: '进入控制台',
    login_registerBtn: '立即创建账号并进入',
    login_demoBtn: '⚡ 免密一键试用登录（内含 ¥382 预存体验金）',
    login_githubBtn: 'GitHub 快捷登录',
    login_googleBtn: 'Google 快捷登录',
    login_securityBadge: '全链路 TLS 1.3 专线加密安全防护',
    login_switchToCode: '切换为验证码登录',
    login_switchToPassword: '切换为密码登录',
    login_feature1Title: '密钥管理',
    login_feature1Sub: '一键生成 API Key，支持按月额度管控',
    login_feature2Title: '用量透明',
    login_feature2Sub: '每次请求实时记录，费用清晰可查',
    login_feature3Title: '极速通道',
    login_feature3Sub: '全球多节点加速，平均延迟 < 200ms',
    login_backHome: '返回首页',

    // Package Purchase Modal
    package_title: '选择适合您的套餐',
    package_subtitle: '灵活的定价方案，满足不同规模的业务需求',
    package_popular: '最受欢迎',
    package_buyNow: '立即购买',
    package_features: '套餐包含',
    package_perMonth: '/月',
    package_team: '团队版',
    package_teamDesc: '适合小型团队和初创项目',
    package_junior: '初级版',
    package_juniorDesc: '适合个人开发者和自由职业者',
    package_pro: '专业版',
    package_proDesc: '适合大型企业和高并发场景',
    package_teamPrice: '¥299',
    package_juniorPrice: '¥99',
    package_proPrice: '¥999',
    package_teamFeature1: '每月 50,000 次 API 调用',
    package_teamFeature2: '最多 5 个 API 密钥',
    package_teamFeature3: '基础技术支持',
    package_teamFeature4: '标准响应速度',
    package_juniorFeature1: '每月 10,000 次 API 调用',
    package_juniorFeature2: '最多 2 个 API 密钥',
    package_juniorFeature3: '邮件技术支持',
    package_juniorFeature4: '标准响应速度',
    package_proFeature1: '每月 500,000 次 API 调用',
    package_proFeature2: '无限 API 密钥',
    package_proFeature3: '7×24 专属技术支持',
    package_proFeature4: '优先响应 + 专属通道',
    package_loginRequired: '需要先登录',
    package_loginRedirect: '请先登录后再进行购买',
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

    modal_title: 'Book Enterprise API Consultation',
    modal_desc: 'Share your workload requirements and concurrency needs, our architect will contact you within 15 mins',
    modal_name: 'Your Name',
    modal_email: 'Business Email',
    modal_company: 'Company / Organization',
    modal_concurrency: 'Estimated Monthly Tokens or QPS',
    modal_notes: 'Your specific use case & technical specs',
    modal_submit: 'Submit Application',
    modal_success: 'Application received! Our architect will reach out shortly.',

    serviceJourney_eyebrow: 'Built for dependable calls',
    serviceJourney_title: 'A smoother path from request to record',
    serviceJourney_subtitle: 'Connect once, send requests as usual, and keep each call easy to follow.',
    serviceJourney_compatibleBadge: 'OpenAI-compatible access',
    serviceJourney_cardTitle: 'One endpoint for the models your team needs',
    serviceJourney_cardDescription: 'Keep your existing workflow while the platform handles the connection, routing, and records behind each call.',
    serviceJourney_exploreAction: 'Explore integration',
    serviceJourney_journeyTitle: 'Every call stays easy to follow',
    serviceJourney_journeySubtitle: 'A clear path from choosing a model to reviewing its record.',
    serviceJourney_noPricePromise: 'Clear from start to finish',
    serviceJourney_step1Title: 'Choose a model',
    serviceJourney_step1Desc: 'Keep the model name your workflow already uses.',
    serviceJourney_step2Title: 'Send your request',
    serviceJourney_step2Desc: 'Use one familiar endpoint across supported clients.',
    serviceJourney_step3Title: 'Review the record',
    serviceJourney_step3Desc: 'Find usage and call details together when you need them.',
    serviceJourney_featureCache: 'Prompt cache',
    serviceJourney_featureFailover: 'Automatic failover',
    serviceJourney_featureBilling: 'Unified billing',
    serviceJourney_featureRecords: 'Usage records',

    priceReference_title: 'Model Price Reference',
    priceReference_subtitle: 'Prices shown here are for model comparison; the amount recorded in your usage logs is what applies once a request completes.',
    priceReference_unitLabel: 'Price unit',
    priceReference_referenceBadge: 'Reference price',
    priceReference_referenceInput: 'Reference input',
    priceReference_referenceOutput: 'Reference output',
    priceReference_referenceOnly: 'Non-realtime price',
    pricing_contextWindow: '{{size}} context',
    pricing_newBadge: 'NEW',
    pricing_fastMode: 'Fast channel',
    quickConnect_action: 'Quick connect',

    tokenBanner_titlePart1: 'Every Token, ',
    tokenBanner_titlePart2: 'Maximum Value',
    tokenBanner_subtitle: 'Global dynamic bidding + multi-cloud smart routing ensure every call runs at the lowest market price. Your balance never expires.',
    tokenBanner_buyBtn: 'Top Up',
    tokenBanner_tag1: 'USD Billing',
    tokenBanner_tag2: 'No Minimum',
    tokenBanner_tag3: 'Live Bidding',
    tokenBanner_tag4: 'Pay-as-you-go',

    footer_slogan: 'The Agentic LLM gateway built for enterprises and professionals',
    footer_contactUs: 'Contact Us',
    footer_cashbackStamp: 'Rewards',
    footer_prodTitle: 'Product',
    footer_resTitle: 'Resources',
    footer_compTitle: 'Company',
    footer_pricing: 'Pricing',
    footer_models: 'Model Square',
    footer_serviceJourney: 'Service Assurance',
    footer_console: 'Console',
    footer_agentConnect: 'Connect Agents',
    footer_docs: 'API Docs',
    footer_referral: 'Referral Rewards',
    footer_about: 'About Smart Routing',
    footer_blog: 'Blog',
    footer_solutions: 'Enterprise Solutions',
    footer_copyright: 'All rights reserved.',

    // Login / Register Page
    login_title: 'Sign in to Foyton',
    login_subtitle: 'Unified gateway for OpenAI, Anthropic, DeepSeek and more',
    login_tabSignin: 'Sign In',
    login_tabRegister: 'Register',
    login_emailLabel: 'Work Email / Phone',
    login_emailPlaceholder: 'name@company.com',
    login_passwordLabel: 'Password',
    login_passwordPlaceholder: '••••••••••••',
    login_forgotPassword: 'Forgot?',
    login_codeLabel: 'Verification Code',
    login_codePlaceholder: '6-digit code',
    login_sendCode: 'Get Code',
    login_nameLabel: 'Name / Team',
    login_namePlaceholder: 'e.g. Alex Chen',
    login_inviteLabel: 'Invite Code (Optional)',
    login_invitePlaceholder: 'FYT-2026-VIP',
    login_inviteBonus: 'Extra $8 Bonus',
    login_agreeTerms: 'I agree to the',
    login_termsLink: 'Terms of Service',
    login_privacyLink: 'Privacy Policy',
    login_signinBtn: 'Sign In Now',
    login_registerBtn: 'Register & Claim Bonus',
    login_demoBtn: '⚡ Instant Demo Login ($50 Preloaded)',
    login_githubBtn: 'Sign in with GitHub',
    login_googleBtn: 'Sign in with Google',
    login_securityBadge: 'TLS 1.3 Encrypted Security',
    login_switchToCode: 'Switch to code login',
    login_switchToPassword: 'Switch to password login',
    login_feature1Title: 'Key Management',
    login_feature1Sub: 'Generate API keys instantly with monthly quota control',
    login_feature2Title: 'Transparent Usage',
    login_feature2Sub: 'Real-time request logging, clear cost tracking',
    login_feature3Title: 'Fast Channel',
    login_feature3Sub: 'Global multi-node acceleration, avg latency < 200ms',
    login_backHome: 'Back to Home',

    // Package Purchase Modal
    package_title: 'Choose Your Plan',
    package_subtitle: 'Flexible pricing options for different business needs',
    package_popular: 'Most Popular',
    package_buyNow: 'Buy Now',
    package_features: 'Includes',
    package_perMonth: '/month',
    package_team: 'Team',
    package_teamDesc: 'For small teams and startups',
    package_junior: 'Junior',
    package_juniorDesc: 'For individual developers and freelancers',
    package_pro: 'Pro',
    package_proDesc: 'For enterprises and high-concurrency scenarios',
    package_teamPrice: '$42',
    package_juniorPrice: '$14',
    package_proPrice: '$140',
    package_teamFeature1: '50,000 API calls per month',
    package_teamFeature2: 'Up to 5 API keys',
    package_teamFeature3: 'Basic technical support',
    package_teamFeature4: 'Standard response time',
    package_juniorFeature1: '10,000 API calls per month',
    package_juniorFeature2: 'Up to 2 API keys',
    package_juniorFeature3: 'Email support',
    package_juniorFeature4: 'Standard response time',
    package_proFeature1: '500,000 API calls per month',
    package_proFeature2: 'Unlimited API keys',
    package_proFeature3: '24/7 dedicated support',
    package_proFeature4: 'Priority response + dedicated channel',
    package_loginRequired: 'Login Required',
    package_loginRedirect: 'Please login before purchasing',
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
