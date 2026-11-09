import React from 'react';
import { MapPin, Repeat, PhoneCall, Truck, Globe } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';

export const Topbar: React.FC = () => {
  const { language, toggleLanguage, setIsTrackOrderOpen } = useShop();
  const t = I18N[language];

  return (
    <div className="bg-zinc-950 border-b border-zinc-800/80 text-xs text-zinc-400 py-1.5 px-3 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Outlets & Exchange Highlight */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <a
            href="#outlets"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t.showrooms}</span>
          </a>

          <span className="text-zinc-700 hidden sm:inline">|</span>

          <a
            href="#exchange"
            className="hidden sm:flex items-center gap-2 hover:text-amber-400 transition-colors group"
          >
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 group-hover:bg-amber-500/20">
              <Repeat className="w-3 h-3 animate-spin-slow" />
              {t.exchangeOfferPill}
            </span>
            <span className="text-zinc-300">{t.exchangeOfferText}</span>
          </a>
        </div>

        {/* Right: Hotline, Track Order, Language switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+8801700000000"
            className="hidden md:flex items-center gap-1.5 text-zinc-300 hover:text-amber-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hotline} <strong className="font-semibold text-white font-mono">+880 1700-000000</strong></span>
          </a>

          <span className="text-zinc-700 hidden md:inline">|</span>

          <button
            onClick={() => setIsTrackOrderOpen(true)}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-zinc-300"
            title={t.trackOrder}
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">{t.trackOrder}</span>
          </button>

          <span className="text-zinc-700">|</span>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-amber-500/50 text-zinc-200 transition-all text-[11px] font-medium"
            title="Toggle Bangla / English"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{language === 'bn' ? '🇧🇩 বাংলা' : '🇬🇧 English'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
