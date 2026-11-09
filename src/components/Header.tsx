import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { Category } from '../types';
import { PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const {
    language,
    cartCount,
    subtotal,
    wishlist,
    compareList,
    setIsCompareOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartOpen,
    setIsWishlistOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setQuickViewProduct,
  } = useShop();

  const t = I18N[language];
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter preview for instant search
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p => {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameBn.includes(searchQuery) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesQuery && matchesCategory;
      }).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Logo & Wordmark */}
          <a href="#" className="flex items-center shrink-0 group py-0.5">
            <img
              src="/assets/aistudio/c2c21ecb-c57d-4659-8161-37f665da39a7_removalai_preview_b191dea9.png"
              alt="RJ SMART SHOP & GALLERY"
              className="h-11 md:h-14 w-auto max-w-[170px] md:max-w-[210px] object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Search Bar with Category Filter (Dazzle Style) */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form
              onSubmit={handleSearchSubmit}
              className="w-full flex items-center rounded-xl bg-zinc-900 border border-zinc-700/80 focus-within:border-amber-500/80 transition-all overflow-hidden"
            >
              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as Category)}
                className="bg-zinc-800/90 text-xs text-zinc-300 px-3 py-2.5 border-r border-zinc-700 focus:outline-none cursor-pointer shrink-0"
              >
                <option value="all">{t.allCategories}</option>
                <option value="iphone">Apple / iPhone</option>
                <option value="smartphones">{t.smartphones}</option>
                <option value="smartwatches">{t.smartwatches}</option>
                <option value="audio">{t.audioSound}</option>
                <option value="macbooks">MacBooks</option>
                <option value="chargers">{t.accessories}</option>
              </select>

              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent px-3.5 py-2 text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none"
              />

              {/* Submit button */}
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs flex items-center gap-1 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-xl shadow-2xl p-2 z-50">
                <div className="text-[11px] text-zinc-400 px-3 py-1 font-semibold uppercase tracking-wider">
                  {language === 'bn' ? 'অনুসন্ধান ফলাফল' : 'Quick Results'}
                </div>
                <div className="divide-y divide-zinc-800">
                  {searchResults.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setQuickViewProduct(prod);
                        setShowSearchDropdown(false);
                      }}
                      className="flex items-center justify-between p-2.5 hover:bg-zinc-800/60 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs">
                          {prod.brand === 'apple' ? '🍎' : '📱'}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {language === 'bn' ? prod.nameBn : prod.name}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {prod.specs[0]} · {prod.warranty}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-amber-400 font-mono">
                          ৳ {prod.price.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-zinc-500 line-through font-mono">
                          ৳ {prod.oldPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Compare, Wishlist, Cart Drawer, Account */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Compare Button */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-white relative cursor-pointer"
              title={t.compare}
            >
              <div className="relative">
                <Scale className="w-5 h-5 text-amber-400" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-none">
                <span className="text-[11px] text-zinc-400">{t.compare}</span>
                <span className="text-xs font-semibold text-white">
                  {compareList.length} {language === 'bn' ? 'টি' : 'phones'}
                </span>
              </div>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-white relative cursor-pointer"
              title={t.wishlist}
            >
              <div className="relative">
                <Heart className="w-5 h-5 text-zinc-300" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-none">
                <span className="text-[11px] text-zinc-400">{t.wishlist}</span>
                <span className="text-xs font-semibold text-white">
                  {wishlist.length} {language === 'bn' ? 'টি' : 'items'}
                </span>
              </div>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-white transition-all shadow-sm"
              title={t.myCart}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] text-amber-300/90">{t.myCart}</span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  ৳ {subtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </button>

            {/* Account Profile */}
            <button
              onClick={() => {
                alert(
                  language === 'bn'
                    ? 'স্বাগতম! আপনি একজন রেজিস্টার্ড ভিআইপি মেম্বার হিসেবে ব্রাউজ করছেন।'
                    : 'Welcome! You are browsing as a registered VIP member.'
                );
              }}
              className="hidden sm:flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
              title={t.account}
            >
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <User className="w-4 h-4 text-amber-400" />
              </div>
              <div className="hidden xl:flex flex-col text-left leading-none">
                <span className="text-[10px] text-zinc-400">{t.account}</span>
                <span className="text-xs font-semibold text-zinc-200">{t.signIn}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Visible on mobile screens) */}
        <div className="md:hidden mt-2.5">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-amber-500/80 transition-all overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-amber-500 text-zinc-950 text-xs font-medium"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
