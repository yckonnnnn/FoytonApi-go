import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FoytonLogo } from './FoytonLogo';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Ticket, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Github
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register, sendVerificationCode } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);

  // Sync mode with prop when opened
  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSendCode = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert(language === 'zh' ? '请先输入邮箱地址' : 'Please enter an email address first');
      return;
    }
    setSendingCode(true);
    const result = await sendVerificationCode(email);
    setSendingCode(false);
    if (!result.success) { alert(result.error); return; }
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert(language === 'zh' ? '请输入用户名或邮箱' : 'Please enter username or email');
      return;
    }

    if (mode === 'login') {
      const result = await login(email, password);
      if (!result.success) alert(result.error);
    } else {
      if (!agreeTerms) {
        alert(language === 'zh' ? '请勾选同意服务协议与隐私条款' : 'Please agree to terms');
        return;
      }
      if (!/^\d{6}$/.test(code)) {
        alert(language === 'zh' ? '请输入 6 位邮箱验证码' : 'Enter the 6-digit email code');
        return;
      }
      const result = await register(email, name, password, code);
      if (!result.success) alert(result.error);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Light Blur Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog (Pure Light Theme, High-End B-End Card) */}
      <div className="relative w-full max-w-[460px] bg-white rounded-[28px] border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200 text-left">
        
        {/* Subtle top brand decoration */}
        <div className="p-6 sm:p-7 pb-3 border-b border-neutral-100 relative bg-gradient-to-b from-blue-50/40 to-transparent">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 mb-2">
            <FoytonLogo className="w-7 h-7" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-neutral-900">
                Foyton
              </span>
              <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 border border-blue-200/70">
                Cloud
              </span>
            </div>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight text-neutral-900">
            {mode === 'login' 
              ? (language === 'zh' ? '登录开发者控制台' : 'Sign in to Console') 
              : (language === 'zh' ? '开启 Foyton 开发者空间' : 'Create Developer Account')}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {language === 'zh' 
              ? '聚合 OpenAI、Claude 3.5、DeepSeek V3 与 Gemini 智能网关' 
              : 'Unified Agentic LLM Gateway for Modern Builders'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 sm:p-7 pt-4 pb-0">
          <div className="flex rounded-xl bg-neutral-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                mode === 'login' 
                  ? 'bg-white text-neutral-900 shadow-2xs' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {language === 'zh' ? '账号登录' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                mode === 'register' 
                  ? 'bg-white text-neutral-900 shadow-2xs' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {language === 'zh' ? '快速注册' : 'Register'}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-3.5 pt-4">
          
          {/* If Register: User Name */}
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              {mode === 'login' ? (language === 'zh' ? '用户名或邮箱' : 'Username or email') : (language === 'zh' ? '注册邮箱' : 'Registration email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={mode === 'login' ? (language === 'zh' ? '用户名或 name@company.com' : 'Username or name@company.com') : 'name@company.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          {(
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  {language === 'zh' ? '登录密码' : 'Password'}
                </label>
                {mode === 'login' && (
                  <button type="button" className="text-[11px] text-neutral-400 hover:text-neutral-600 cursor-pointer">
                    {language === 'zh' ? '忘记密码？' : 'Forgot?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Verification Code Input */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                {language === 'zh' ? '邮箱验证码' : 'Verification Code'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder={language === 'zh' ? '6 位验证码' : '6-digit code'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={countdown > 0 || sendingCode}
                  className="px-3.5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 disabled:opacity-50 text-neutral-700 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  {sendingCode ? (language === 'zh' ? '发送中…' : 'Sending…') : countdown > 0 ? `${countdown}s` : (language === 'zh' ? '获取验证码' : 'Get Code')}
                </button>
              </div>
            </div>
          )}

          {/* If Register: Invite Code */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center justify-between">
                <span>{language === 'zh' ? '邀请码 (选填)' : 'Invite Code (Optional)'}</span>
                <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {language === 'zh' ? '填邀请码送 ¥50 体验金' : 'Extra $8 Bonus'}
                </span>
              </label>
              <div className="relative">
                <Ticket className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="FYT-2026-VIP"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm outline-none transition-all font-mono uppercase"
                />
              </div>
            </div>
          )}

          {/* Terms checkbox for register */}
          {mode === 'register' && (
            <div className="flex items-start gap-2 pt-1 text-xs text-neutral-500">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-neutral-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
              />
              <label htmlFor="terms" className="cursor-pointer text-[11px]">
                {language === 'zh' ? '我已阅读并同意' : 'I agree to the'}{' '}
                <span className="text-neutral-900 font-medium underline">
                  {language === 'zh' ? '《服务协议》' : 'Terms of Service'}
                </span>{' '}
                {language === 'zh' ? '与' : 'and'}{' '}
                <span className="text-neutral-900 font-medium underline">
                  {language === 'zh' ? '《隐私权政策》' : 'Privacy Policy'}
                </span>
              </label>
            </div>
          )}

          {/* Main Submit Button (Clean Blue Theme, NO heavy black) */}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-[0_2px_10px_rgba(37,99,235,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {mode === 'login' 
                ? (language === 'zh' ? '进入控制台' : 'Sign In Now') 
                : (language === 'zh' ? '立即创建账号并进入' : 'Register & Claim Bonus')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>


        </form>

        {/* Footer Security Badge */}
        <div className="px-6 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{language === 'zh' ? '全链路 TLS 1.3 专线加密安全防护' : 'TLS 1.3 Encrypted Security'}</span>
        </div>

      </div>
    </div>
  );
};
