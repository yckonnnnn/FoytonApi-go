import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Sparkles, Send } from 'lucide-react';
import { ConsultationForm } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ConsultationForm>({
    name: '',
    email: '',
    company: '',
    estimatedTokens: '50M - 200M / 月',
    selectedModels: ['Claude 3.7 Sonnet', 'GPT-4o'],
    notes: '',
  });

  if (!isOpen) return null;

  const toggleModel = (model: string) => {
    setFormData(prev => ({
      ...prev,
      selectedModels: prev.selectedModels.includes(model)
        ? prev.selectedModels.filter(m => m !== model)
        : [...prev.selectedModels, model],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      id="consultation-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="consultation-modal-dialog"
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100 overflow-hidden"
      >
        {/* Close button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              {language === 'zh' ? '预约已成功提交！' : 'Consultation Booked Successfully!'}
            </h3>
            <p className="text-neutral-500 max-w-md text-sm leading-relaxed mb-6">
              {language === 'zh' ? (
                <>
                  感谢您的关注。我们的架构师团队已收到您的需求，将在 2 小时内通过邮件 <span className="font-semibold text-neutral-800">{formData.email || 'you@company.com'}</span> 发送专属 30 分钟会议邀请及免费测试 Key。
                </>
              ) : (
                <>
                  Thank you! Our solutions architecture team has received your request and will reach out to <span className="font-semibold text-neutral-800">{formData.email || 'you@company.com'}</span> within 2 hours with a Google Meet invitation and test API key.
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {language === 'zh' ? '完成并返回' : 'Done & Return'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'zh' ? '预约 30 分钟架构沟通' : 'Book a 30-Minute Consultation'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-2">
              {language === 'zh' ? '预约企业级中转规划' : 'Schedule Enterprise API Onboarding'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mb-6">
              {language === 'zh' 
                ? '针对您的业务场景，快速对齐大模型中转架构、高并发专线成本优化与专属落地计划。'
                : 'Align on enterprise LLM relay architecture, dedicated line routing, volume discounts, and custom agent integrations.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'zh' ? '您的姓名 / 称呼 *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'zh' ? '张经理' : 'Alex Zhang'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'zh' ? '工作邮箱 *' : 'Work Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'zh' ? '公司或项目名称' : 'Company or Project Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Tech Inc."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {language === 'zh' ? '预计月度 Token 吞吐量' : 'Estimated Monthly Token Volume'}
                  </label>
                  <select
                    value={formData.estimatedTokens}
                    onChange={e => setFormData({ ...formData, estimatedTokens: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all bg-white"
                  >
                    <option>{language === 'zh' ? '< 50M / 月 (初期尝鲜)' : '< 50M / mo (Starter)'}</option>
                    <option>{language === 'zh' ? '50M - 200M / 月 (快速增长)' : '50M - 200M / mo (Growth)'}</option>
                    <option>{language === 'zh' ? '200M - 1B / 月 (企业中等并发)' : '200M - 1B / mo (Scale)'}</option>
                    <option>{language === 'zh' ? '> 1B+ / 月 (超大规模专线集群)' : '> 1B+ / mo (Enterprise)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-2">
                  {language === 'zh' ? '核心所需模型架构 (多选)' : 'Required Model Architectures (Multi-select)'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Claude 3.7 Sonnet', 'GPT-4o', 'DeepSeek R1/V3', 'Gemini 2.5 Pro', 'Midjourney v6'].map(model => (
                    <button
                      type="button"
                      key={model}
                      onClick={() => toggleModel(model)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        formData.selectedModels.includes(model)
                          ? 'bg-purple-50 border-purple-300 text-purple-700 font-semibold'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {language === 'zh' ? '当前业务痛点或补充说明' : 'Current Challenges or Notes'}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    language === 'zh'
                      ? '例如：需要稳定的 Claude 官方合规直连通道、希望支持自定义账单与子 Key 分发...'
                      : 'e.g., Require dedicated low-latency Claude relay, custom team API key quotas...'
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{language === 'zh' ? '30 分钟专属 Google Meet 专场' : '30-minute Google Meet session'}</span>
                </div>

                <button
                  type="submit"
                  id="btn-submit-consultation"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'zh' ? '确认并发送预约' : 'Submit Consultation'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
