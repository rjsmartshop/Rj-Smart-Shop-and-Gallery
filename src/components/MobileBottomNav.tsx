import React from 'react';
import { Home, Layers, Repeat, ShoppingBag, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';

export const MobileBottomNav: React.FC = () => {
  const {
    language,
    cartCount,
    setIsCartOpen,
    setIsTrackOrderOpen,
    setSelectedCategory,
  } = useShop();

  const t = I18N[language];

  const handleCategoriesClick = () => {
    setSelectedCategory('all');
    const catEl = document.getElementById('categories');
    if (catEl) {
      catEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExchangeClick = () => {
    const exEl = document.getElementById('exchange');
    if (exEl) {
      exEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/90 py-2 px-3 safe-area-bottom">
      <div className="flex items-center justify-around">
        {/* Home */}
        <a
          href="#"
          className="flex flex-col items-center text-zinc-400 hover:text-amber-400 transition-colors py-1 px-2"
        >
          <Home className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-semibold mt-1 text-white">{t.home}</span>
        </a>

        {/* Categories */}
        <button
          onClick={handleCategoriesClick}
          className="flex flex-col items-center text-zinc-400 hover:text-amber-400 transition-colors py-1 px-2 cursor-pointer"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">{language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}</span>
        </button>

        {/* Exchange */}
        <button
          onClick={handleExchangeClick}
          className="flex flex-col items-center text-zinc-400 hover:text-amber-400 transition-colors py-1 px-2 cursor-pointer"
        >
          <Repeat className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-semibold mt-1 text-amber-400">
            {language === 'bn' ? 'এক্সচেঞ্জ' : 'Exchange'}
          </span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center text-zinc-400 hover:text-amber-400 transition-colors py-1 px-2 relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-zinc-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">{language === 'bn' ? 'কার্ট' : 'Cart'}</span>
        </button>

        {/* Track Order */}
        <button
          onClick={() => setIsTrackOrderOpen(true)}
          className="flex flex-col items-center text-zinc-400 hover:text-amber-400 transition-colors py-1 px-2 cursor-pointer"
        >
          <Truck className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">{language === 'bn' ? 'ট্র্যাক' : 'Track'}</span>
        </button>
      </div>
    </div>
  );
};
