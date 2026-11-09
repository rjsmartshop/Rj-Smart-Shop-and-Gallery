import React from 'react';
import { Heart, X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { PRODUCTS } from '../data/products';
import { DeviceVisual } from './DeviceVisual';

export const WishlistDrawer: React.FC = () => {
  const {
    language,
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useShop();

  const t = I18N[language];

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Wishlist Drawer"
          className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              <h3 className="font-extrabold text-base md:text-lg text-white">
                {t.wishlist}
              </h3>
              <span className="text-xs text-zinc-400">({wishlistProducts.length})</span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 divide-y divide-zinc-800/80">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-400 mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  {language === 'bn' ? 'উইশলিস্ট খালি' : 'Wishlist is empty'}
                </h4>
                <p className="text-xs text-zinc-500">
                  {language === 'bn'
                    ? 'আপনার পছন্দের স্মার্টফোন বা গ্যাজেটের হার্ট আইকনে ক্লিক করে সেভ করুন।'
                    : 'Save products you love by clicking the heart icon on any card.'}
                </p>
              </div>
            ) : (
              wishlistProducts.map(prod => (
                <div key={prod.id} className="py-4 flex gap-3.5 items-center">
                  <div className="w-16 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 p-1">
                    <DeviceVisual
                      type={prod.imageType}
                      imageUrl={prod.imageUrl}
                      alt={prod.name}
                      className="w-12 h-16"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-white truncate">
                        {language === 'bn' ? prod.nameBn : prod.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {prod.specs[0]}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        ৳ {prod.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(prod);
                          toggleWishlist(prod.id);
                        }}
                        className="py-1 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>{t.addCart}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 md:p-6 bg-zinc-900 border-t border-zinc-800">
              <button
                onClick={() => {
                  wishlistProducts.forEach(p => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'bn' ? 'সবগুলো কার্টে যোগ করুন' : 'Move All to Cart'}</span>
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
