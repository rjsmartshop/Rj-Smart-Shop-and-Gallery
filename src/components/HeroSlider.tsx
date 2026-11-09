import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Info, Repeat, Gift, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { DeviceVisual } from './DeviceVisual';
import { PRODUCTS } from '../data/products';

export const HeroSlider: React.FC = () => {
  const { language, addToCart, setQuickViewProduct } = useShop();
  const t = I18N[language];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      tag: language === 'bn' ? 'নতুন লঞ্চ ২০২৬' : 'NEW LAUNCH 2026',
      tagIcon: Sparkles,
      title: 'iPhone 16 Pro',
      subtitle: 'Hello, Apple Intelligence.',
      desc:
        language === 'bn'
          ? 'গ্রেড ৫ প্রিমিয়াম টাইটানিয়াম ডিজাইন, আল্ট্রা-থিন ব্যাজেল, ক্যামেরা কন্ট্রোল বাটন ও পাওয়ারফুল A18 প্রো চিপ।'
          : 'Grade 5 titanium design with thinner borders, Camera Control, and the powerful A18 Pro chip.',
      priceLabel: language === 'bn' ? 'মূল্য শুরু' : 'Starting from',
      currentPrice: '৳ 1,54,999',
      oldPrice: '৳ 1,65,000',
      deviceType: 'iphone16promax',
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=85',
      productId: 'deal-1',
      bgGradient: 'from-amber-950/30 via-zinc-900 to-zinc-950',
    },
    {
      id: 'slide-2',
      tag: language === 'bn' ? 'Galaxy AI ফিচার সহ' : 'Galaxy AI is Here',
      tagIcon: Zap,
      title: 'Galaxy S24 Ultra',
      subtitle: 'Titanium Elegance.',
      desc:
        language === 'bn'
          ? 'বিল্ট-ইন এস-পেন, ২০০ মেগাপিক্সেল ক্যামেরা এবং কৃত্রিম বুদ্ধিমত্তা সম্পন্ন গ্যালাক্সি এআই। সহজ ক্যাশ অন ডেলিভারি সুবিধা!'
          : 'Built-in S Pen, 200MP Pro-grade camera, and revolutionary Galaxy AI with nationwide Cash on Delivery.',
      priceLabel: language === 'bn' ? 'স্পেশাল অফার' : 'Special Deal',
      currentPrice: '৳ 1,39,999',
      oldPrice: '৳ 1,49,999',
      deviceType: 's24ultra',
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=85',
      productId: 'deal-2',
      bgGradient: 'from-blue-950/30 via-zinc-900 to-zinc-950',
    },
    {
      id: 'slide-3',
      tag: language === 'bn' ? 'মেগা এক্সচেঞ্জ অফার' : 'MEGA EXCHANGE FEST',
      tagIcon: Repeat,
      title: language === 'bn' ? 'পুরনো ফোন বদলে নিন' : 'Upgrade Your Old Phone',
      subtitle: language === 'bn' ? 'সর্বোচ্চ ৫,০০০৳ বোনাস ভাউচার' : 'Get Up to ৳ 5,000 Bonus',
      desc:
        language === 'bn'
          ? 'যেকোনো কন্ডিশনের পুরনো স্মার্টফোন নিয়ে আসুন আর নিয়ে যান ব্র্যান্ড নিউ স্মার্টফোন সেরা মার্কেট ভ্যালু ও ইনস্ট্যান্ট ক্যাশব্যাক সহ!'
          : 'Exchange any smartphone in any condition. Instant valuation and seamless handover at our outlets.',
      priceLabel: language === 'bn' ? 'এক্সচেঞ্জ বোনাস' : 'Trade-in Bonus',
      currentPrice: '+ ৳ 5,000',
      oldPrice: '৳ 0',
      deviceType: 'pixel9pro',
      imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=85',
      actionType: 'exchange',
      bgGradient: 'from-emerald-950/30 via-zinc-900 to-zinc-950',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const TagIcon = slide.tagIcon;

  const handleHeroAction = () => {
    if (slide.actionType === 'exchange') {
      const exchangeEl = document.getElementById('exchange');
      if (exchangeEl) exchangeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const targetProd = PRODUCTS.find(p => p.id === slide.productId);
      if (targetProd) {
        addToCart(targetProd);
      }
    }
  };

  const handleLearnMore = () => {
    if (slide.actionType === 'exchange') {
      const exchangeEl = document.getElementById('exchange');
      if (exchangeEl) exchangeEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const targetProd = PRODUCTS.find(p => p.id === slide.productId);
      if (targetProd) {
        setQuickViewProduct(targetProd);
      }
    }
  };

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Hero Slider (Takes 2 Columns on Desktop) */}
          <div className="lg:col-span-2 relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[420px] md:min-h-[460px]">
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90 transition-all duration-700 pointer-events-none`}></div>

            {/* Slide Content */}
            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 h-full my-auto">
              {/* Text side */}
              <div className="max-w-md text-center md:text-left">
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                  <TagIcon className="w-3.5 h-3.5" />
                  <span>{slide.tag}</span>
                </div>

                {/* Headline */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {slide.title} <br />
                  <span className="text-amber-400">{slide.subtitle}</span>
                </h1>

                {/* Description */}
                <p className="mt-3 text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {slide.desc}
                </p>

                {/* Price block */}
                <div className="mt-4 flex items-baseline justify-center md:justify-start gap-2.5">
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">{slide.priceLabel}:</span>
                  <span className="text-xl md:text-2xl font-black text-amber-400 font-mono">
                    {slide.currentPrice}
                  </span>
                  {slide.oldPrice !== '৳ 0' && (
                    <span className="text-xs text-zinc-500 line-through font-mono">
                      {slide.oldPrice}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    onClick={handleHeroAction}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{slide.actionType === 'exchange' ? t.calcValue : t.orderNow}</span>
                  </button>

                  <button
                    onClick={handleLearnMore}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs md:text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Info className="w-4 h-4 text-amber-400" />
                    <span>{slide.actionType === 'exchange' ? t.findOutlets : t.learnMore}</span>
                  </button>
                </div>
              </div>

              {/* Hardware visual side */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="relative">
                  {/* Backdrop subtle halo */}
                  <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full"></div>
                  <DeviceVisual
                    type={slide.deviceType}
                    imageUrl={slide.imageUrl}
                    alt={slide.title}
                    className="w-48 h-64 md:w-56 md:h-72"
                  />
                </div>
              </div>
            </div>

            {/* Slider Navigation controls */}
            <div className="relative z-10 px-6 py-3 bg-zinc-950/60 border-t border-zinc-800/60 flex items-center justify-between">
              {/* Pagination dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-6 bg-amber-500' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Side Promo Cards (1 Column on Desktop) */}
          <div className="flex flex-col gap-4">
            {/* Promo Card 1: Apple Watch Ultra 2 */}
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl group relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider mb-2">
                    {language === 'bn' ? '১৫% বিশেষ ছাড়' : '15% SPECIAL OFF'}
                  </span>
                  <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 transition-colors">
                    Apple Watch Ultra 2
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {language === 'bn' ? 'টাইটানিয়াম ও ওয়াটারপ্রুফ GPS' : 'Rugged Titanium GPS + Cellular'}
                  </p>
                </div>
                <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                  <DeviceVisual
                    type="watchultra"
                    imageUrl="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=85"
                    alt="Apple Watch Ultra 2"
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="text-base font-extrabold text-amber-400 font-mono">৳ 92,500</div>
                  <div className="text-[10px] text-zinc-500 line-through font-mono">৳ 99,000</div>
                </div>
                <button
                  onClick={() => {
                    const prod = PRODUCTS.find(p => p.id === 'prod-watchultra2');
                    if (prod) addToCart(prod);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-black font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.buyNow}</span>
                </button>
              </div>
            </div>

            {/* Promo Card 2: AirPods Pro (2nd Gen) */}
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl group relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wider mb-2">
                    {language === 'bn' ? 'হট ডিল' : 'HOT DEAL'}
                  </span>
                  <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 transition-colors">
                    AirPods Pro (2nd Gen)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {language === 'bn' ? 'অ্যাক্টিভ নয়েজ ক্যান্সেলেশন ও টাইপ-সি' : 'Active Noise Cancelling & USB-C'}
                  </p>
                </div>
                <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                  <DeviceVisual
                    type="airpodspro"
                    imageUrl="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=85"
                    alt="AirPods Pro"
                    className="w-16 h-16"
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="text-base font-extrabold text-amber-400 font-mono">৳ 26,500</div>
                  <div className="text-[10px] text-zinc-500 line-through font-mono">৳ 29,500</div>
                </div>
                <button
                  onClick={() => {
                    const prod = PRODUCTS.find(p => p.id === 'prod-airpodspro2');
                    if (prod) addToCart(prod);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-black font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.buyNow}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
