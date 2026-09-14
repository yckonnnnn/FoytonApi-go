import React, { useState } from 'react';
import {
  Mail,
  Lock,
  User,
  Ticket,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Github,
  KeyRound,
  BarChart3,
  Zap,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ActiveView } from '../types';
import { FoytonLogo } from './FoytonLogo';

interface LoginViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate }) => {
  const { login, register, sendVerificationCode } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (mode === 'login') {
      if (!username || !password) {
        setLoginError(language === 'zh' ? '请输入用户名或邮箱和密码' : 'Please enter username or email and password');
        return;
      }
      const result = await login(username, password);
      if (result.success) {
        onNavigate('console-wallet');
      } else {
        setLoginError(result.error || (language === 'zh' ? '登录失败' : 'Login failed'));
      }
    } else {
      if (!agreeTerms) return;
      if (password.length < 8) {
        setLoginError(language === 'zh' ? '密码至少需要 8 位' : 'Password must be at least 8 characters');
        return;
      }
      if (!/^\d{6}$/.test(verificationCode)) {
        setLoginError(language === 'zh' ? '请输入 6 位邮箱验证码' : 'Enter the 6-digit email code');
        return;
      }
      const result = await register(email, name, password, verificationCode);
      if (result.success) onNavigate('console-wallet');
      else setLoginError(result.error || (language === 'zh' ? '注册失败' : 'Registration failed'));
    }
  };

  const handleSendCode = async () => {
    setLoginError('');
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLoginError(language === 'zh' ? '请先填写有效邮箱地址' : 'Enter a valid email first');
      return;
    }
    setSendingCode(true);
    const result = await sendVerificationCode(email);
    setSendingCode(false);
    if (!result.success) { setLoginError(result.error || (language === 'zh' ? '验证码发送失败' : 'Could not send code')); return; }
    setCountdown(60);
    const timer = window.setInterval(() => setCountdown((seconds) => {
      if (seconds <= 1) { window.clearInterval(timer); return 0; }
      return seconds - 1;
    }), 1000);
  };


  const features = [
    { icon: KeyRound, title: t.login_feature1Title, sub: t.login_feature1Sub },
    { icon: BarChart3, title: t.login_feature2Title, sub: t.login_feature2Sub },
    { icon: Zap, title: t.login_feature3Title, sub: t.login_feature3Sub },
  ];

  return (
    <div className="min-h-screen w-full flex font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ===== LEFT: Brand Panel ===== */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#1e1b4b] to-[#312e81] text-white">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          {/* Top: logo + back */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div style={{ filter: 'invert(1) brightness(1.4)' }}>
                <FoytonLogo className="w-8 h-8" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl tracking-tight">Foyton</span>
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/20">
                  API
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('lost-original')}
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.login_backHome}</span>
            </button>
          </div>

          {/* Middle: headline */}
          <div className="max-w-md">
            <h1 className="text-4xl xl:text-[42px] font-extrabold tracking-tight leading-tight">
              {t.login_title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              {t.login_subtitle}
            </p>

            {/* Feature pills */}
            <div className="mt-10 space-y-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm p-4 hover:bg-white/[0.1] transition-colors"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    <f.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white">{f.title}</div>
                    <div className="mt-0.5 text-xs text-white/50 leading-relaxed">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: stats */}
          <div className="flex items-center gap-8 text-xs text-white/40">
            <div>
              <div className="text-2xl font-extrabold text-white">99.99%</div>
              <div className="mt-0.5">SLA</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">15+</div>
              <div className="mt-0.5">{language === 'zh' ? '大模型' : 'Models'}</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">&lt;200ms</div>
              <div className="mt-0.5">{language === 'zh' ? '全球延迟' : 'Latency'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT: Auth Card ===== */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[#f8f9fb] relative overflow-y-auto">
        {/* Language Toggle (top-right) */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-[12.5px] font-semibold border border-neutral-200/90 shadow-2xs cursor-pointer z-10"
          title={language === 'zh' ? 'Switch to English' : '切换为中文'}
        >
          <Globe className="w-3.5 h-3.5 text-neutral-500" />
          <span className="flex items-center gap-1 tracking-tight">
            <span className={language === 'zh' ? 'text-neutral-950 font-bold' : 'text-neutral-400 font-normal'}>中</span>
            <span className="text-neutral-300">/</span>
            <span className={language === 'en' ? 'text-neutral-950 font-bold' : 'text-neutral-400 font-normal'}>EN</span>
          </span>
        </button>

        {/* Mobile brand header */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('lost-original')}
            className="mr-1 p-1.5 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <FoytonLogo className="w-6 h-6" />
          <span className="font-extrabold text-lg tracking-tight text-neutral-900">Foyton</span>
        </div>

        <div className="w-full max-w-[440px]">
          {/* Brand */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FoytonLogo className="w-7 h-7" />
              <span className="font-extrabold text-lg tracking-tight text-neutral-900">Foyton</span>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/70">
                Cloud
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              {mode === 'login'
                ? (language === 'zh' ? '登录开发者控制台' : 'Sign in to Console')
                : (language === 'zh' ? '开启 Foyton 开发者空间' : 'Create Developer Account')}
            </h2>
            <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed">
              {language === 'zh'
                ? '聚合 OpenAI、Claude 3.5、DeepSeek V3 与 Gemini 智能网关'
                : 'Unified Agentic LLM Gateway for Modern Builders'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-neutral-100 p-1 text-xs font-semibold mb-5">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg transition-all text-center cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t.login_tabSignin}
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg transition-all text-center cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-neutral-900 shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t.login_tabRegister}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Login Error Message */}
            {loginError && (
              <div className="px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {loginError}
              </div>
            )}

            {/* Optional username (register only); email is the primary registration account. */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {language === 'zh' ? '用户名（选填）' : 'Username (optional)'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={language === 'zh' ? '例如：yckon（留空将自动生成）' : 'e.g. yckon (auto-generated if blank)'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all bg-white"
                  />
                </div>
              </div>
            )}

            {/* Username or email for login; email is required for registration. */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                {mode === 'login'
                  ? (language === 'zh' ? '用户名或邮箱' : 'Username or email')
                  : t.login_emailLabel}
              </label>
              <div className="relative">
                {mode === 'login'
                  ? <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  : <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                }
                <input
                  type={mode === 'login' ? 'text' : 'text'}
                  required
                  placeholder={mode === 'login'
                    ? (language === 'zh' ? '请输入用户名或邮箱' : 'Enter username or email')
                    : t.login_emailPlaceholder}
                  value={mode === 'login' ? username : email}
                  onChange={(e) => mode === 'login' ? setUsername(e.target.value) : setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all bg-white"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">{language === 'zh' ? '邮箱验证码' : 'Email verification code'}</label>
                <div className="flex gap-2">
                  <input type="text" inputMode="numeric" maxLength={6} required placeholder={language === 'zh' ? '输入 6 位验证码' : '6-digit code'} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))} className="min-w-0 flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all bg-white font-mono" />
                  <button type="button" onClick={handleSendCode} disabled={sendingCode || countdown > 0} className="shrink-0 px-3 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 text-neutral-700 text-xs font-semibold">{sendingCode ? (language === 'zh' ? '发送中…' : 'Sending…') : countdown ? `${countdown}s` : (language === 'zh' ? '获取验证码' : 'Send code')}</button>
                </div>
                <p className="mt-1.5 text-[11px] text-neutral-400">{language === 'zh' ? '验证码将发送到该邮箱，10 分钟内有效。' : 'The code is sent to this email and expires in 10 minutes.'}</p>
              </div>
            )}

            {/* Password (both modes) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  {t.login_passwordLabel}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="text-[11px] text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    {t.login_forgotPassword}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder={t.login_passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all bg-white"
                />
              </div>
            </div>


            {/* Invite code (register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center justify-between">
                  <span>{t.login_inviteLabel}</span>
                  <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {t.login_inviteBonus}
                  </span>
                </label>
                <div className="relative">
                  <Ticket className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={t.login_invitePlaceholder}
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all bg-white font-mono uppercase"
                  />
                </div>
              </div>
            )}

            {/* Terms (register only) */}
            {mode === 'register' && (
              <div className="flex items-start gap-2 pt-1 text-xs text-neutral-500">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                />
                <label htmlFor="terms" className="cursor-pointer text-[11px] leading-relaxed">
                  {t.login_agreeTerms}{' '}
                  <span className="text-neutral-900 font-medium underline">{t.login_termsLink}</span>
                  {' '}{language === 'zh' ? '与' : 'and'}{' '}
                  <span className="text-neutral-900 font-medium underline">{t.login_privacyLink}</span>
                </label>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-[0_2px_10px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{mode === 'login' ? t.login_signinBtn : t.login_registerBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Security badge */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.login_securityBadge}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
