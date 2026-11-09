import React, { useState } from 'react';
import { X, ShoppingBag, Zap, Heart, CheckCircle2, ShieldCheck, Banknote, Scale } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { DeviceVisual } from './DeviceVisual';

export const QuickViewModal: React.FC = () => {
  const {
    language,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    setIsCompareOpen,
    setIsCheckoutOpen,
  } = useShop();

  const t = I18N[language];

  if (!quickViewProduct) return null;

  const [selectedStorage, setSelectedStorage] = useState(quickViewProduct.storageOptions[0]);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]?.name);

  const hasHeart = isInWishlist(quickViewProduct.id);

  const handleBuyNow = () => {
    addToCart(quickViewProduct, 1, selectedStorage, selectedColor);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddCart = () => {
    addToCart(quickViewProduct, 1, selectedStorage, selectedColor);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 z-10 my-8">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left visual box */}
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                quickViewProduct.isOfficial
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
              }`}
            >
              {quickViewProduct.isOfficial ? t.official : t.storeWarranty}
            </span>

            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                onClick={() => {
                  addToCompare(quickViewProduct.id);
                  setQuickViewProduct(null);
                  setIsCompareOpen(true);
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isInCompare(quickViewProduct.id)
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-zinc-800 text-zinc-400 hover:text-amber-400'
                }`}
                title={language === 'bn' ? 'তুলনা করুন' : 'Compare'}
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  hasHeart
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-zinc-800 text-zinc-400 hover:text-red-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${hasHeart ? 'fill-current' : ''}`} />
              </button>
            </div>

            <DeviceVisual
              type={quickViewProduct.imageType}
              imageUrl={quickViewProduct.imageUrl}
              alt={quickViewProduct.name}
              className="w-48 h-60 my-2"
            />
          </div>

          {/* Right info side */}
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              {quickViewProduct.brand.toUpperCase()} · {language === 'bn' ? quickViewProduct.warrantyBn : quickViewProduct.warranty}
            </span>

            <h3 className="text-base md:text-xl font-black text-white mt-1 leading-snug">
              {language === 'bn' ? quickViewProduct.nameBn : quickViewProduct.name}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-2.5 my-3">
              <span className="text-xl md:text-2xl font-black text-amber-400 font-mono">
                ৳ {quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.oldPrice > quickViewProduct.price && (
                <span className="text-xs text-zinc-500 line-through font-mono">
                  ৳ {quickViewProduct.oldPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Cash on Delivery tag */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 mb-3">
              <Banknote className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? 'ক্যাশ অন ডেলিভারি সুবিধা (পণ্য দেখে মূল্য পরিশোধ)'
                  : 'Cash on Delivery Available (Pay after checking)'}
              </span>
            </div>

            {/* Storage selection */}
            {quickViewProduct.storageOptions && quickViewProduct.storageOptions.length > 0 && (
              <div className="mb-3">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                  Storage Variant:
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.storageOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedStorage === opt
                          ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selection */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                  Color: <strong className="text-white">{selectedColor}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                        selectedColor === c.name ? 'border-amber-400 scale-110' : 'border-zinc-700'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
              {language === 'bn' ? quickViewProduct.descriptionBn : quickViewProduct.description}
            </p>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleAddCart}
                className="py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>{t.addCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>{t.buyNow}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
