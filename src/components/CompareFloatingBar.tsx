import React from 'react';
import { ArrowLeftRight, X, Sparkles, Scale } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { PRODUCTS } from '../data/products';

export const CompareFloatingBar: React.FC = () => {
  const {
    language,
    compareList,
    removeFromCompare,
    clearCompare,
    setIsCompareOpen,
  } = useShop();

  const t = I18N[language];

  if (compareList.length === 0) return null;

  const comparedProducts = compareList
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl">
      <div className="rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-amber-500/40 p-3 md:p-3.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-3">
        {/* Left: Device thumbnails & badge */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Scale className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {comparedProducts.map(p => p && (
              <div
                key={p.id}
                className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg py-1 px-2 text-[11px] text-zinc-200"
              >
                <span className="font-semibold truncate max-w-[90px] md:max-w-[130px]">
                  {language === 'bn' ? p.nameBn : p.name}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeFromCompare(p.id);
                  }}
                  className="text-zinc-500 hover:text-red-400 p-0.5"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="py-1.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? `তুলনা করুন (${compareList.length})`
                : `Compare (${compareList.length})`}
            </span>
          </button>

          <button
            onClick={clearCompare}
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title={t.clearCompare}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
