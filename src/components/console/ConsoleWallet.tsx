import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Wallet, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  Building,
  ArrowRight,
  QrCode,
  Download,
  Receipt,
  Copy,
  Check,
  Percent
} from 'lucide-react';

export const ConsoleWallet: React.FC = () => {
  const { user, transactions, recharge } = useAuth();
  const { language } = useLanguage();

  const [selectedTier, setSelectedTier] = useState<number>(300);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay' | 'bank' | 'usdt'>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedTxId, setCopiedTxId] = useState<string | null>(null);

  // Recharge presets with business bonus
  const tiers = [
    { amount: 100, bonus: 0, tag: '个人尝鲜', popular: false },
    { amount: 300, bonus: 30, tag: '赠 ¥30 · 返 10%', popular: true },
    { amount: 500, bonus: 65, tag: '赠 ¥65 · 返 13%', popular: false },
    { amount: 1000, bonus: 160, tag: '赠 ¥160 · 返 16%', popular: false },
    { amount: 3000, bonus: 600, tag: '赠 ¥600 · 返 20%', popular: false },
  ];

  const currentRechargeAmount = customAmount ? parseFloat(customAmount) || 0 : selectedTier;
  
  let currentBonus = 0;
  if (customAmount) {
    const val = parseFloat(customAmount) || 0;
    if (val >= 3000) currentBonus = 600;
    else if (val >= 1000) currentBonus = 160;
    else if (val >= 500) currentBonus = 65;
    else if (val >= 300) currentBonus = 30;
  } else {
    const tier = tiers.find(t => t.amount === selectedTier);
    if (tier) currentBonus = tier.bonus;
  }

  const handleSelectTier = (amount: number) => {
    setSelectedTier(amount);
    setCustomAmount('');
  };

  const handleOpenPayment = () => {
    if (currentRechargeAmount <= 0) {
      alert('请输入或选择有效的充值金额');
      return;
    }
    setShowQrModal(true);
  };

  const handleConfirmMockPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      recharge(currentRechargeAmount, paymentMethod);
      setIsProcessing(false);
      setShowQrModal(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 800);
  };

  const handleCopyTx = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedTxId(id);
    setTimeout(() => setCopiedTxId(null), 1800);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 text-left">
      
      {/* ── Top Toast Notification ── */}
      {showSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-sm animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-semibold">
              充值成功！已成功到账 ¥{currentRechargeAmount} {currentBonus > 0 && `(含活动额外赠送 ¥${currentBonus} 返利金)`}，已立即充实至账户余额。
            </span>
          </div>
        </div>
      )}

      {/* ── 1. Financial Overview Cards (High-End White Theme, NO heavy black) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Main Available Balance (Clean, Crisp, High-Contrast White Card) */}
        <div className="p-6 rounded-3xl bg-white border border-blue-200/80 shadow-[0_4px_24px_rgba(37,99,235,0.04)] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-50/60 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                钱包可用余额 (CNY)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                ● 实时结算
              </span>
            </div>
            
            <div className="mt-3.5 flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-neutral-900">¥</span>
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-neutral-900 tracking-tight">
                {user?.balance.toFixed(2) || '0.00'}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>预估仍可支持约 <strong className="text-neutral-900 font-bold">45</strong> 天日常业务调用</span>
            <span className="text-blue-600 font-medium">额度永久有效</span>
          </div>
        </div>

        {/* Total Recharged */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.015)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                累计充值本金与赠额
              </span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <Receipt className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3.5 flex items-baseline gap-1">
              <span className="text-base font-bold text-neutral-900">¥</span>
              <span className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
                {user?.totalRecharged.toFixed(2) || '1,200.00'}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>可开具增值税数电发票</span>
            <span className="text-blue-600 font-semibold cursor-pointer hover:underline">申请发票</span>
          </div>
        </div>

        {/* Total Spent */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_2px_16px_rgba(0,0,0,0.015)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                累计调用消耗支出
              </span>
              <div className="p-2 rounded-xl bg-neutral-100 text-neutral-600">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3.5 flex items-baseline gap-1">
              <span className="text-base font-bold text-neutral-900">¥</span>
              <span className="text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
                {user?.totalSpent.toFixed(2) || '817.60'}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>日均调用支出约 <strong className="text-neutral-900">¥18.20</strong></span>
            <span className="text-emerald-600 font-mono font-medium">费率稳定</span>
          </div>
        </div>

      </div>

      {/* ── 2. Recharge Options & Payment Setup ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
        
        <div>
          <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>选择充值金额</span>
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            充值资金将即时折算为 Foyton 通用调用额度，单笔充值满额即可享受限时阶梯返利。
          </p>
        </div>

        {/* Preset Tiers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.amount && !customAmount;
            return (
              <div
                key={tier.amount}
                onClick={() => handleSelectTier(tier.amount)}
                className={`relative p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between min-h-[105px] ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/30 shadow-[0_2px_12px_rgba(37,99,235,0.08)] ring-1 ring-blue-600'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50'
                }`}
              >
                {/* Popular / Promo Tag */}
                {tier.tag && (
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1.5 self-start ${
                    tier.popular
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                  }`}>
                    {tier.tag}
                  </div>
                )}

                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xs font-semibold text-neutral-600">¥</span>
                    <span className="text-2xl font-extrabold text-neutral-900 font-mono">{tier.amount}</span>
                  </div>
                  {tier.bonus > 0 ? (
                    <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      实际到账 ¥{tier.amount + tier.bonus}
                    </div>
                  ) : (
                    <div className="text-[11px] text-neutral-400 mt-0.5">基础到账</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
            或自定义充值金额 (CNY)
          </label>
          <div className="relative max-w-sm">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-400">¥</span>
            <input
              type="number"
              min="10"
              placeholder="最低充值 ¥10 起"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedTier(0);
              }}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm font-mono outline-none"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-4 border-t border-neutral-100">
          <label className="block text-xs font-semibold text-neutral-700 mb-3">
            支付方式
          </label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
            
            {/* WeChat */}
            <button
              type="button"
              onClick={() => setPaymentMethod('wechat')}
              className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                paymentMethod === 'wechat'
                  ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 ring-1 ring-emerald-500'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                微
              </div>
              <span>微信支付</span>
            </button>

            {/* Alipay */}
            <button
              type="button"
              onClick={() => setPaymentMethod('alipay')}
              className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                paymentMethod === 'alipay'
                  ? 'border-blue-500 bg-blue-50/40 text-blue-900 ring-1 ring-blue-500'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[10px]">
                支
              </div>
              <span>支付宝</span>
            </button>

            {/* Bank Transfer */}
            <button
              type="button"
              onClick={() => setPaymentMethod('bank')}
              className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                paymentMethod === 'bank'
                  ? 'border-neutral-900 bg-neutral-100 text-neutral-900 ring-1 ring-neutral-900'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <Building className="w-4 h-4 text-neutral-600" />
              <span>企业对公转账</span>
            </button>

            {/* USDT */}
            <button
              type="button"
              onClick={() => setPaymentMethod('usdt')}
              className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                paymentMethod === 'usdt'
                  ? 'border-teal-500 bg-teal-50/40 text-teal-900 ring-1 ring-teal-500'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-[10px]">
                ₮
              </div>
              <span>USDT (TRC-20)</span>
            </button>

          </div>
        </div>

        {/* Total & Checkout Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50/80 p-4 rounded-2xl border border-neutral-200/70">
          <div className="space-y-0.5">
            <div className="text-xs text-neutral-500">
              应付金额：<strong className="text-lg font-bold text-neutral-900 font-mono">¥{currentRechargeAmount.toFixed(2)}</strong>
              {currentBonus > 0 && (
                <span className="ml-2 text-xs font-semibold text-emerald-600 font-sans">
                  (加赠 ¥{currentBonus}，到账 ¥{(currentRechargeAmount + currentBonus).toFixed(2)})
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400">
              支付完成即刻到账，支持开具增值税专用/普通发票
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenPayment}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-[0_2px_12px_rgba(37,99,235,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>立即支付确认</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ── 3. Billing & Transactions History ── */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              财务充值订单记录
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              近期的资金充值、活动返利与账单流水凭证
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            共 {transactions.length} 笔订单
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-neutral-100 text-neutral-400 uppercase">
                <th className="py-3 px-4 font-medium">订单编号</th>
                <th className="py-3 px-4 font-medium">发生时间</th>
                <th className="py-3 px-4 font-medium">支付渠道</th>
                <th className="py-3 px-4 font-medium">充值本金</th>
                <th className="py-3 px-4 font-medium">返利到账</th>
                <th className="py-3 px-4 font-medium">状态</th>
                <th className="py-3 px-4 font-medium text-right font-sans">发票操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <span>{tx.id}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyTx(tx.id)}
                        className="text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                        title="复制订单号"
                      >
                        {copiedTxId === tx.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px] whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-neutral-800">
                    {tx.method === 'wechat' ? '微信支付' : tx.method === 'alipay' ? '支付宝' : tx.method === 'bank' ? '对公转账' : 'USDT'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
                    +¥{tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 font-semibold">
                    {tx.bonus > 0 ? `+¥${tx.bonus.toFixed(2)}` : '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-bold border border-emerald-200/60 font-mono">
                      成功到账
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`已生成订单 ${tx.id} 的增值税电子发票下载凭证。`)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>开具发票</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Payment QR Code Simulation Modal (Crisp White Theme) ── */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-neutral-200 shadow-2xl animate-in zoom-in-95 text-center">
            
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-base font-bold text-neutral-900">
              扫码完成资金划转
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              正在向 Foyton 生产网关账户充值
            </p>

            <div className="my-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center">
              {/* Simulated QR Pattern */}
              <div className="w-40 h-40 bg-white p-2 rounded-xl border border-neutral-200 shadow-xs flex items-center justify-center relative">
                <div className="w-full h-full border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center text-neutral-400 p-2 text-center text-xs font-mono">
                  <span className="font-bold text-neutral-800 font-sans">
                    {paymentMethod === 'wechat' ? '微信扫码' : paymentMethod === 'alipay' ? '支付宝扫码' : '转账网关'}
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-1">¥{currentRechargeAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-neutral-500 font-mono">
                订单号: ord_{Date.now().toString().slice(-8)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmMockPay}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {isProcessing ? '正在入账...' : '已完成支付'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
