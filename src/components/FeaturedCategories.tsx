import React from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Headphones, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { Category } from '../types';

export const FeaturedCategories: React.FC = () => {
  const { language, selectedCategory, setSelectedCategory } = useShop();
  const t = I18N[language];

  const categories = [
    {
      id: 'iphone' as Category,
      name: 'iPhones',
      nameBn: 'আইফোন',
      count: language === 'bn' ? 'অফিসিয়াল ও ইন্টা.' : 'Official & Int.',
      icon: Sparkles,
      color: 'from-amber-500/20 to-zinc-900',
    },
    {
      id: 'smartphones' as Category,
      name: 'Android Phones',
      nameBn: 'অ্যান্ড্রয়েড ফোন',
      count: 'Samsung, Pixel',
      icon: Smartphone,
      color: 'from-blue-500/20 to-zinc-900',
    },
    {
      id: 'macbooks' as Category,
      name: 'MacBooks',
      nameBn: 'ম্যাকবুক',
      count: 'M2 / M3 / M4',
      icon: Laptop,
      color: 'from-purple-500/20 to-zinc-900',
    },
    {
      id: 'tablets' as Category,
      name: 'iPads & Tabs',
      nameBn: 'আইপ্যাড ও ট্যাব',
      count: 'Pro, Air, Mini',
      icon: Tablet,
      color: 'from-emerald-500/20 to-zinc-900',
    },
    {
      id: 'smartwatches' as Category,
      name: 'Smart Watches',
      nameBn: 'স্মার্টওয়াচ',
      count: 'Apple, Galaxy',
      icon: Watch,
      color: 'from-orange-500/20 to-zinc-900',
    },
    {
      id: 'audio' as Category,
      name: 'Earbuds & Audio',
      nameBn: 'ইয়ারবাডস ও অডিও',
      count: 'AirPods, Marshall',
      icon: Headphones,
      color: 'from-rose-500/20 to-zinc-900',
    },
    {
      id: 'chargers' as Category,
      name: 'Power & Adapters',
      nameBn: 'চার্জার ও এডাপ্টার',
      count: 'Apple 20W, Anker',
      icon: Zap,
      color: 'from-yellow-500/20 to-zinc-900',
    },
    {
      id: 'accessories' as Category,
      name: 'Cases & Covers',
      nameBn: 'কেস ও প্রটেকশন',
      count: 'MagSafe, Spigen',
      icon: ShieldCheck,
      color: 'from-cyan-500/20 to-zinc-900',
    },
  ];

  const handleSelect = (catId: Category) => {
    setSelectedCategory(catId);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 md:py-8" id="categories">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-lg md:text-2xl font-extrabold text-white">
              {t.featuredCategories}
            </h2>
          </div>

          <button
            onClick={() => handleSelect('all')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group transition-colors"
          >
            <span>{t.viewAllCategories}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`p-3 md:p-4 rounded-xl border text-center flex flex-col items-center justify-between transition-all group cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                    isSelected ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-amber-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="w-full">
                  <h3 className="text-xs font-bold truncate">
                    {language === 'bn' ? cat.nameBn : cat.name}
                  </h3>
                  <span className="text-[10px] text-zinc-500 block truncate mt-0.5">
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
