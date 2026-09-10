import React from 'react';
import { ArrowRight, Check, Layers3, Route, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ActiveView } from '../types';

interface ServiceJourneySectionProps {
  onNavigate: (view: ActiveView) => void;
}

export const ServiceJourneySection: React.FC<ServiceJourneySectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const journeySteps = [
    { number: '01', title: t.serviceJourney_step1Title, description: t.serviceJourney_step1Desc, icon: Layers3 },
    { number: '02', title: t.serviceJourney_step2Title, description: t.serviceJourney_step2Desc, icon: Route },
    { number: '03', title: t.serviceJourney_step3Title, description: t.serviceJourney_step3Desc, icon: ShieldCheck },
  ];

  return (
    <section id="service-journey-section" className="border-b border-neutral-200 bg-neutral-50/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-orange-600 uppercase">
            <Sparkles className="h-4 w-4" />
            {t.serviceJourney_eyebrow}
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{t.serviceJourney_title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base">{t.serviceJourney_subtitle}</p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xs lg:grid-cols-5">
          <div className="relative overflow-hidden bg-neutral-900 p-7 text-white sm:p-10 lg:col-span-2">
            <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-orange-400/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
                  <Check className="h-3.5 w-3.5 text-orange-300" />
                  {t.serviceJourney_compatibleBadge}
                </div>
                <h3 className="mt-6 max-w-sm text-2xl font-extrabold leading-tight sm:text-3xl">{t.serviceJourney_cardTitle}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-300">{t.serviceJourney_cardDescription}</p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('docs')}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 transition-colors hover:bg-orange-50 cursor-pointer"
              >
                {t.serviceJourney_exploreAction}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-5">
              <div>
                <h3 className="font-bold text-neutral-900">{t.serviceJourney_journeyTitle}</h3>
                <p className="mt-1 text-xs text-neutral-500">{t.serviceJourney_journeySubtitle}</p>
              </div>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-700">{t.serviceJourney_noPricePromise}</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {journeySteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-orange-600">{step.number}</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-neutral-700 shadow-2xs">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h4 className="mt-5 text-sm font-bold text-neutral-900">{step.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{step.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-dashed border-neutral-200 pt-5">
              {[
                t.serviceJourney_featureCache,
                t.serviceJourney_featureFailover,
                t.serviceJourney_featureBilling,
                t.serviceJourney_featureRecords,
              ].map((feature) => (
                <span key={feature} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600">{feature}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
