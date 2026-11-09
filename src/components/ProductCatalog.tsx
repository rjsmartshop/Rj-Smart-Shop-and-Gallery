import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Zap, 
  Heart, 
  Eye, 
  SlidersHorizontal,
  Layers,
  ArrowUpDown,
  Scale
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { PRODUCTS } from '../data/products';
import { Brand, Category } from '../types';
import { DeviceVisual } from './DeviceVisual';

export const ProductCatalog: React.FC = () => {
  const {
    language,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    setQuickViewProduct,
    setIsCheckoutOpen,
  } = useShop();

  const t = I18N[language];
  const [sortBy, setSortBy] = useState<'default' | 'low-to-high' | 'high-to-low'>('default');

  const brands: { id: Brand; label: string; icon?: string }[] = [
    { id: 'all', label: t.allDevices },
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'pixel', label: 'Google Pixel', icon: 'G' },
    { id: 'xiaomi', label: 'Xiaomi' },
    { id: 'oneplus', label: 'OnePlus' },
  ];

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBn = p.nameBn.includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        return matchesName || matchesBn || matchesBrand;
      }
      return true;
    });

    if (sortBy === 'low-to-high') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleBuyNow = (product: any) => {
    addToCart(product);
    setIsCheckoutOpen(true);
  };

  return (
    <section className="py-8 md:py-12" id="catalog">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                {language === 'bn' ? 'সকল স্মার্টফোন ও গ্যাজেট' : 'All Smartphones & Gadgets'}
              </h2>
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              <span>{t.showing} </span>
              <strong className="text-amber-400 font-mono">{filteredProducts.length}</strong>{' '}
              <span>{t.productsCount}</span>
              {searchQuery && (
                <span className="ml-2 text-zinc-300">
                  (for "{searchQuery}" <button onClick={() => setSearchQuery('')} className="text-amber-400 underline ml-1">Clear</button>)
                </span>
              )}
            </div>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden sm:inline">{t.sortBy}</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 py-2 pl-3 pr-8 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="default">{language === 'bn' ? 'ফিচার্ড (ডিফল্ট)' : 'Featured'}</option>
                <option value="low-to-high">{t.priceLowHigh}</option>
                <option value="high-to-low">{t.priceHighLow}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar">
          {[
            { id: 'all' as Category, label: 'All Items', labelBn: 'সকল প্রোডাক্ট' },
            { id: 'iphone' as Category, label: 'iPhones', labelBn: 'আইফোন' },
            { id: 'smartphones' as Category, label: 'Android Phones', labelBn: 'অ্যান্ড্রয়েড ফোন' },
            { id: 'macbooks' as Category, label: 'MacBooks & Laptops', labelBn: 'ম্যাকবুক ও ল্যাপটপ' },
            { id: 'tablets' as Category, label: 'iPads & Tabs', labelBn: 'আইপ্যাড ও ট্যাব' },
            { id: 'smartwatches' as Category, label: 'Smart Watches', labelBn: 'স্মার্টওয়াচ' },
            { id: 'audio' as Category, label: 'Earbuds & Audio', labelBn: 'ইয়ারবাডস ও অডিও' },
            { id: 'chargers' as Category, label: 'Power & Adapters', labelBn: 'চার্জার ও এডাপ্টার' },
            { id: 'accessories' as Category, label: 'Accessories', labelBn: 'এক্সেসরিজ' },
          ].map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.label}
              </button>
            );
          })}
        </div>

        {/* Brand Filter Tabs Bar (Segmented button controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {brands.map(b => {
            const isActive = selectedBrand === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 shadow-md'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                }`}
              >
                {b.icon && <span>{b.icon}</span>}
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/40 rounded-2xl border border-zinc-800 p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'কোনো প্রোডাক্ট পাওয়া যায়নি' : 'No products found'}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              {language === 'bn'
                ? 'অন্য কোনো ব্র্যান্ড বা ক্যাটাগরি ফিল্টার নির্বাচন করুন।'
                : 'Try selecting a different brand or clearing your search query.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs cursor-pointer hover:bg-amber-400"
            >
              {language === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredProducts.map(product => {
              const hasHeart = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 p-4 flex flex-col justify-between transition-all duration-300 shadow-lg group"
                >
                  <div>
                    {/* Header: Official Badge + Wishlist + Quick View */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${
                          product.isOfficial
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {product.isOfficial ? t.official : t.storeWarranty}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addToCompare(product.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isInCompare(product.id)
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-zinc-800 text-zinc-400 hover:text-amber-400 hover:bg-zinc-700'
                          }`}
                          title={isInCompare(product.id) ? (language === 'bn' ? 'তুলনা থেকে সরান' : 'Remove from Compare') : (language === 'bn' ? 'তুলনা করুন' : 'Compare')}
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                          title="Quick View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            hasHeart
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700'
                          }`}
                          title="Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasHeart ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Hardware Visual */}
                    <div
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full h-44 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform my-2"
                    >
                      <DeviceVisual
                        type={product.imageType}
                        imageUrl={product.imageUrl}
                        alt={product.name}
                        className="w-36 h-40"
                      />
                    </div>

                    {/* Brand and Title */}
                    <div className="text-[10px] font-bold text-amber-400/90 tracking-wider uppercase">
                      {product.brand.toUpperCase()}
                    </div>
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-xs md:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mt-0.5 cursor-pointer"
                    >
                      {language === 'bn' ? product.nameBn : product.name}
                    </h3>

                    {/* Specs chips */}
                    <div className="flex flex-wrap gap-1.5 my-2.5">
                      {product.specs.slice(0, 3).map((sp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>

                    {/* Color dots preview */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 mb-2.5">
                        {product.colors.map((c, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Price Row */}
                    <div className="flex items-baseline gap-2 pt-2 border-t border-zinc-800/80 mb-3">
                      <span className="text-base font-black text-amber-400 font-mono">
                        ৳ {product.price.toLocaleString('en-IN')}
                      </span>
                      {product.oldPrice > product.price && (
                        <span className="text-xs text-zinc-500 line-through font-mono">
                          ৳ {product.oldPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.addCart}</span>
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{t.buyNow}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
