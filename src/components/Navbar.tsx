import React, { useState } from 'react';
import { 
  Flame, 
  Repeat, 
  Headphones, 
  Watch, 
  Smartphone, 
  Laptop, 
  Layers, 
  ChevronDown, 
  Headset, 
  Home, 
  Sparkles,
  Plug,
  Shield,
  X,
  Scale
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { Category } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    selectedCategory,
    setSelectedCategory,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    compareList,
    setIsCompareOpen,
  } = useShop();

  const t = I18N[language];
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categoriesList: { id: Category; label: string; icon: any }[] = [
    { id: 'iphone', label: 'Apple iPhone', icon: Sparkles },
    { id: 'smartphones', label: language === 'bn' ? 'অ্যান্ড্রয়েড স্মার্টফোন' : 'Android Phones', icon: Smartphone },
    { id: 'macbooks', label: language === 'bn' ? 'ম্যাকবুক ও ল্যাপটপ' : 'MacBooks & Laptops', icon: Laptop },
    { id: 'tablets', label: language === 'bn' ? 'আইপ্যাড ও ট্যাবলেট' : 'iPads & Tablets', icon: Smartphone },
    { id: 'smartwatches', label: language === 'bn' ? 'স্মার্টওয়াচ' : 'Smart Watches', icon: Watch },
    { id: 'audio', label: language === 'bn' ? 'ইয়ারবাডস ও হেডফোন' : 'Earbuds & Headphones', icon: Headphones },
    { id: 'chargers', label: language === 'bn' ? 'চার্জার ও এডাপ্টার' : 'Power & Adapters', icon: Plug },
    { id: 'accessories', label: language === 'bn' ? 'কেস ও প্রটেকশন' : 'Cases & Protection', icon: Shield },
  ];

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setShowCategoryDropdown(false);
    setIsMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="hidden md:block bg-zinc-900 border-b border-zinc-800 text-sm font-medium">
        <div className="max-w-7xl mx-auto px-3 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1 lg:gap-2">
            {/* All Categories Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-none transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>{t.allCategories}</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>

              {/* Dropdown Menu */}
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 w-64 bg-zinc-950 border border-zinc-700 shadow-2xl rounded-b-xl py-2 z-50">
                  {categoriesList.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategorySelect(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs text-left transition-colors ${
                          selectedCategory === item.id
                            ? 'bg-amber-500/10 text-amber-400 font-semibold'
                            : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Nav links */}
            <ul className="flex items-center space-x-1 lg:space-x-2 text-xs font-semibold text-zinc-300">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-1.5 px-3 py-3 hover:text-amber-400 transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{t.home}</span>
                </a>
              </li>

              <li>
                <a
                  href="#catalog"
                  onClick={() => setSelectedCategory('smartphones')}
                  className="flex items-center gap-1.5 px-3 py-3 hover:text-amber-400 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.smartphones}</span>
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={() => setSelectedCategory('smartwatches')}
                  className="flex items-center gap-1.5 px-3 py-3 hover:text-amber-400 transition-colors"
                >
                  <Watch className="w-3.5 h-3.5" />
                  <span>{t.smartwatches}</span>
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={() => setSelectedCategory('audio')}
                  className="flex items-center gap-1.5 px-3 py-3 hover:text-amber-400 transition-colors"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>{t.audioSound}</span>
                </a>
              </li>
              <li>
                <a
                  href="#exchange"
                  className="flex items-center gap-1.5 px-3 py-3 text-amber-400 hover:text-amber-300 transition-colors group"
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>{t.exchange}</span>
                  <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter">
                    NEW
                  </span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-3 hover:text-amber-400 transition-colors text-zinc-300 font-semibold cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.compare}</span>
                  {compareList.length > 0 && (
                    <span className="text-[10px] bg-amber-500 text-zinc-950 font-bold px-1.5 py-0.2 rounded-full">
                      {compareList.length}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <a
                  href="#hot-deals"
                  className="flex items-center gap-1.5 px-3 py-3 text-red-400 hover:text-red-300 transition-colors font-bold"
                >
                  <Flame className="w-4 h-4 text-red-500 animate-bounce" />
                  <span>{t.hotDeals}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Support Hotline */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Headset className="w-4 h-4 text-amber-400" />
            <span>
              {t.support} <strong className="text-zinc-200 font-mono">01700-000000</strong>
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-zinc-950 border-r border-zinc-800 h-full p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/aistudio/c2c21ecb-c57d-4659-8161-37f665da39a7_removalai_preview_b191dea9.png"
                    alt="RJ SMART SHOP & GALLERY"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Quick Links */}
              <div className="mt-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {t.allCategories}
                </h4>
                <div className="space-y-1">
                  {categoriesList.map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategorySelect(item.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-zinc-900 hover:text-amber-400 transition-colors text-left"
                      >
                        <Icon className="w-4 h-4 text-amber-400" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Sections */}
              <div className="mt-6 pt-4 border-t border-zinc-800 space-y-1">

                <a
                  href="#exchange"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-amber-400 bg-amber-500/10 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4" />
                    <span>{t.exchange}</span>
                  </div>
                  <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCompareOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-zinc-900 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>{t.compareTitle}</span>
                  </div>
                  {compareList.length > 0 && (
                    <span className="text-[10px] bg-amber-500 text-zinc-950 font-bold px-2 py-0.5 rounded-full">
                      {compareList.length}
                    </span>
                  )}
                </button>
                <a
                  href="#hot-deals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 font-bold"
                >
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>{t.hotDeals}</span>
                </a>
                <a
                  href="#outlets"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-zinc-900"
                >
                  <Home className="w-4 h-4 text-amber-400" />
                  <span>{t.showrooms}</span>
                </a>
              </div>
            </div>

            {/* Footer Support in Mobile Menu */}
            <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-400">
              <div>{t.support}</div>
              <a href="tel:+8801700000000" className="text-white font-bold font-mono text-sm">
                +880 1700-000000
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
