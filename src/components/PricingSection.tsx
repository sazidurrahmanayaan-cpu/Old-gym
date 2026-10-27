import React from 'react';
import { PricingPlan, GYM_INFO } from '../data/gymData';
import { useGym } from '../context/GymContext';
import { useLanguage } from '../context/LanguageContext';
import { Check, Zap, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const { pricingPlans } = useGym();
  const { t, language } = useLanguage();

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle gold glow behind popular plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFD700]">
            <Zap className="w-3.5 h-3.5" />
            <span>{t('pricing.badge', 'Transparent & Value-Packed')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            {t('pricing.title', 'Membership Plans & Pricing')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            {t('pricing.subtitle', 'Join Munshiganj’s most respected fitness center. No hidden registration fees.')}
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan: PricingPlan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'glass-gold border-2 border-[#FFD700] shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-100 lg:-translate-y-2'
                  : 'glass-gold border border-[#D4AF37]/30 hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-black text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Most Popular · Recommended
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-2xl font-bold uppercase text-white">
                    {plan.name}
                  </h3>
                  {plan.savings && (
                    <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-full">
                      {plan.savings}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-neutral-800">
                  <span className="font-heading text-5xl font-extrabold text-white tracking-tight tabular-nums">
                    ৳{plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">
                    /{plan.billingPeriod}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    What's included:
                  </p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                      <div className={`p-1 rounded-full shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-[#D4AF37]/20 text-[#FFD700]' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 px-6 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(255,215,0,0.55)] hover:scale-[1.02]'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[11px] text-center text-neutral-500 mt-3 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-[#D4AF37]" />
                  Includes free locker & floor trainer orientation
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Member Assurance Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-[#121212] border border-neutral-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-0.5">
            <h4 className="text-sm font-semibold text-white">Have questions about student or group discounts?</h4>
            <p className="text-xs text-neutral-400">Call our desk directly or message us on WhatsApp for rapid enrollment.</p>
          </div>
          <a
            href={GYM_INFO.callUrl}
            className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase text-white bg-neutral-800 hover:bg-neutral-700 transition-colors whitespace-nowrap"
          >
            Call {GYM_INFO.phone}
          </a>
        </div>

      </div>
    </section>
  );
};
