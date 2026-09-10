import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { POPULAR_MODELS } from '../data/modelPricing';
import { ModelProviderIcon } from './ModelProviderIcon';
import { useLanguage } from '../context/LanguageContext';
import { ActiveView } from '../types';

interface ModelPricingSectionProps {
  onNavigate: (view: ActiveView) => void;
}

/** 小额价格保留 4 位小数，其余保留 2 位，与参考实现一致。 */
const formatReferencePrice = (price: number) => `$${price.toFixed(price < 0.1 ? 4 : 2)}`;

/** 把 {{size}} 占位符替换成实际值。 */
const interpolate = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(vars[key] ?? ''));

export const ModelPricingSection: React.FC<ModelPricingSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const scrollToServiceJourney = () => {
    document.getElementById('service-journey-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing-section" className="border-b border-neutral-200 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{t.priceReference_title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
              {t.priceReference_subtitle}
              <br />
              {t.priceReference_unitLabel}: <span className="font-semibold text-neutral-700">USD / 1M Tokens</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToServiceJourney}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-colors hover:text-orange-600 md:mt-0 cursor-pointer"
          >
            <span>{t.serviceJourney_exploreAction}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {POPULAR_MODELS.map((model) => (
            <article
              key={model.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-50 text-neutral-900">
                    <ModelProviderIcon provider={model.provider} className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-neutral-900">{model.name}</h3>
                    <div className="mt-1 text-xs text-neutral-400">
                      {model.providerName} · {interpolate(t.pricing_contextWindow, { size: model.contextSize })}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {model.isNew && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[10px] font-extrabold tracking-[0.08em] text-orange-700 shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {t.pricing_newBadge}
                    </span>
                  )}
                  <span className="rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-bold text-white shadow-2xs">
                    {t.priceReference_referenceBadge}
                  </span>
                </div>
              </div>

              <div className="my-6 grid grid-cols-2 divide-x divide-dashed divide-neutral-200 border-y border-dashed border-neutral-200 py-4 font-mono">
                <div className="pr-4">
                  <div className="font-sans text-xs text-neutral-400">{t.priceReference_referenceInput} / 1M</div>
                  <div className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900">
                    {formatReferencePrice(model.inputPrice)}
                  </div>
                </div>
                <div className="pl-4">
                  <div className="font-sans text-xs text-neutral-400">{t.priceReference_referenceOutput} / 1M</div>
                  <div className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900">
                    {formatReferencePrice(model.outputPrice)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                {model.fastMode ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                    <Zap className="h-3 w-3" /> {t.pricing_fastMode}
                  </span>
                ) : (
                  <span className="text-[11px] text-neutral-400">{t.priceReference_referenceOnly}</span>
                )}
                <button
                  type="button"
                  onClick={() => onNavigate('docs')}
                  className="cursor-pointer border border-dashed border-neutral-300 px-4 py-2 text-xs font-bold text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                >
                  {t.quickConnect_action}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
