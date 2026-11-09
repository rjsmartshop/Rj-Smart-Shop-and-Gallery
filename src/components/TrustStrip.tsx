import React from 'react';
import { ShieldCheck, RotateCcw, Banknote, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';

export const TrustStrip: React.FC = () => {
  const { language } = useShop();
  const t = I18N[language];

  const features = [
    {
      icon: ShieldCheck,
      title: t.genuineTitle,
      desc: t.genuineDesc,
    },
    {
      icon: RotateCcw,
      title: t.replaceTitle,
      desc: t.replaceDesc,
    },
    {
      icon: Banknote,
      title: t.emiTitle, // will now be Cash on Delivery
      desc: t.emiDesc,
    },
    {
      icon: Truck,
      title: t.deliveryTitle,
      desc: t.deliveryDesc,
    },
  ];

  return (
    <section className="py-2 md:py-4">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/30 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-zinc-950 text-amber-400 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="leading-snug">
                  <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
