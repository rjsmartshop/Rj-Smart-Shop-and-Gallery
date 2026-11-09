import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShoppingBag, Zap, Heart, Eye, Scale } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { PRODUCTS } from '../data/products';
import { DeviceVisual } from './DeviceVisual';

export const FlashSale: React.FC = () => {
  const {
    language,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    setQuickViewProduct,
    setIsCheckoutOpen,
  } = useShop();

  const t = I18N[language];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.filter(p => p.isHotDeal);

  const handleBuyNow = (product: any) => {
    addToCart(product);
    setIsCheckoutOpen(true);
  };

  return (
    <section className="py-6 md:py-8 bg-zinc-950/60 border-y border-zinc-900" id="hot-deals">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Header & Live Timer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-lg shadow-red-500/10">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-widest text-red-400 uppercase">
                {t.flashSale}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white">
                {t.limitedTimeDeals}
              </h2>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div className="flex items-center gap-1.5 self-center sm:self-auto bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl shadow-inner">
            <Clock className="w-4 h-4 text-red-400 mr-1 animate-spin-slow" />
            
            {/* Days */}
            <div className="text-center min-w-[36px]">
              <div className="text-sm md:text-base font-extrabold text-white font-mono leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-zinc-400 uppercase mt-0.5">{t.days}</div>
            </div>
            <span className="text-zinc-600 font-bold">:</span>

            {/* Hours */}
            <div className="text-center min-w-[36px]">
              <div className="text-sm md:text-base font-extrabold text-white font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-zinc-400 uppercase mt-0.5">{t.hours}</div>
            </div>
            <span className="text-zinc-600 font-bold">:</span>

            {/* Minutes */}
            <div className="text-center min-w-[36px]">
              <div className="text-sm md:text-base font-extrabold text-white font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-zinc-400 uppercase mt-0.5">{t.mins}</div>
            </div>
            <span className="text-zinc-600 font-bold">:</span>

            {/* Seconds */}
            <div className="text-center min-w-[36px]">
              <div className="text-sm md:text-base font-extrabold text-red-400 font-mono leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[9px] text-zinc-400 uppercase mt-0.5">{t.secs}</div>
            </div>
          </div>
        </div>

        {/* Deals Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {dealProducts.map(product => {
            const hasHeart = isInWishlist(product.id);
            const sold = product.soldCount || 10;
            const total = product.totalStock || 20;
            const progress = Math.min(100, Math.round((sold / total) * 100));

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all p-4 flex flex-col justify-between shadow-xl relative group"
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded uppercase tracking-wide">
                    {language === 'bn' ? product.tagBn : product.tag}
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
                      className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
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

                {/* Device Visual */}
                <div
                  onClick={() => setQuickViewProduct(product)}
                  className="w-full h-44 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform my-1"
                >
                  <DeviceVisual
                    type={product.imageType}
                    imageUrl={product.imageUrl}
                    alt={product.name}
                    className="w-36 h-40"
                  />
                </div>

                {/* Content */}
                <div className="mt-2">
                  <span className="text-[10px] font-bold tracking-wider text-amber-400/90 uppercase">
                    {product.brand.toUpperCase()} · {language === 'bn' ? product.warrantyBn : product.warranty}
                  </span>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-xs md:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 mt-1 cursor-pointer"
                  >
                    {language === 'bn' ? product.nameBn : product.name}
                  </h3>

                  {/* Specs chips */}
                  <div className="flex flex-wrap gap-1.5 my-2.5">
                    {product.specs.slice(0, 2).map((sp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base md:text-lg font-black text-amber-400 font-mono">
                      ৳ {product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-zinc-500 line-through font-mono">
                      ৳ {product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Stock progress */}
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                      <span>{t.sold} <strong className="text-white font-mono">{sold}</strong></span>
                      <span className="text-amber-400/90 font-medium">{t.left} <strong className="font-mono">{total - sold}</strong></span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="py-2 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.addCart}</span>
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm"
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
      </div>
    </section>
  );
};
