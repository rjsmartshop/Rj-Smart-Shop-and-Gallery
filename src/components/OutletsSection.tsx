import React from 'react';
import { MapPin, PhoneCall, Clock, Navigation, Store } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { OUTLETS } from '../data/outlets';

export const OutletsSection: React.FC = () => {
  const { language } = useShop();
  const t = I18N[language];

  return (
    <section className="py-10 md:py-16 bg-zinc-950" id="outlets">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Store className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                {t.ourOutlets}
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              {t.outletsSub}
            </p>
          </div>
        </div>

        {/* Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTLETS.map(outlet => (
            <div
              key={outlet.id}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {language === 'bn' ? outlet.cityBn : outlet.city}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>{t.openToday}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {language === 'bn' ? outlet.nameBn : outlet.name}
                </h3>

                <div className="mt-4 space-y-2.5 text-xs text-zinc-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? outlet.locationBn : outlet.location}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-mono text-zinc-200">{outlet.phones.join(' / ')}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-400">{language === 'bn' ? outlet.hoursBn : outlet.hours}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${outlet.phones[0].replace(/\s+/g, '')}`}
                  className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.callBranch}</span>
                </a>

                <a
                  href={outlet.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.getDirections}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
