import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { DeviceVisual } from './DeviceVisual';

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useShop();

  const t = I18N[language];
  const deliveryEstimate = cart.length > 0 ? 70 : 0;
  const total = subtotal + deliveryEstimate;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Cart Drawer"
          className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-base md:text-lg text-white">
                {t.shoppingCart}
              </h3>
              <span className="text-xs text-zinc-400">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 divide-y divide-zinc-800/80">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">{t.emptyCart}</h4>
                <p className="text-xs text-zinc-500 mb-4">
                  {language === 'bn'
                    ? 'আপনার পছন্দের স্মার্টফোন বা গ্যাজেটটি কার্টে যুক্ত করুন।'
                    : 'Explore our catalog and add smartphones or gadgets to your cart.'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs"
                >
                  {language === 'bn' ? 'শপিং শুরু করুন' : 'Start Shopping'}
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <div className="w-16 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 p-1">
                    <DeviceVisual
                      type={item.product.imageType}
                      imageUrl={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-16"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white truncate">
                        {language === 'bn' ? item.product.nameBn : item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {item.selectedStorage || item.product.storageOptions[0]}
                      {item.selectedColor ? ` · ${item.selectedColor}` : ''}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-700 bg-zinc-900 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-xs font-bold text-amber-400 font-mono">
                        ৳ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 md:p-6 bg-zinc-900 border-t border-zinc-800">
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>{t.subtotal}</span>
                  <span className="text-white font-bold font-mono">৳ {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t.deliveryCharge}</span>
                  <span className="text-white font-mono">৳ {deliveryEstimate}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                  <span>{t.totalAmount}</span>
                  <span className="text-amber-400 font-mono">৳ {total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{t.proceedCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
