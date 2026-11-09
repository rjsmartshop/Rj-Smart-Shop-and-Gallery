import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  Scale, 
  Check, 
  CreditCard,
  Layers,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { PRODUCTS } from '../data/products';
import { DeviceVisual } from './DeviceVisual';
import { Product } from '../types';

export const ProductComparisonModal: React.FC = () => {
  const {
    language,
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isCompareOpen,
    setIsCompareOpen,
    addToCart,
    setIsCheckoutOpen,
  } = useShop();

  const t = I18N[language];
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  if (!isCompareOpen) return null;

  // Selected products
  const selectedProducts: Product[] = compareList
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  // Candidate phones to add (category 'iphone' or 'smartphones' not currently selected)
  const availablePhones = PRODUCTS.filter(
    p => (p.category === 'iphone' || p.category === 'smartphones') && !compareList.includes(p.id)
  );

  const specCategories = [
    {
      name: t.specsPrice,
      key: 'price',
      render: (p: Product) => (
        <div>
          <div className="text-base font-extrabold text-amber-400 font-mono">
            ৳ {p.price.toLocaleString('en-IN')}
          </div>
          {p.oldPrice > p.price && (
            <div className="text-[11px] text-zinc-500 line-through font-mono">
              ৳ {p.oldPrice.toLocaleString('en-IN')}
            </div>
          )}
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
            {language === 'bn' ? 'ক্যাশ অন ডেলিভারি প্রযোজ্য' : 'Cash on Delivery Available'}
          </div>
        </div>
      ),
      getValue: (p: Product) => p.price,
    },
    {
      name: t.specsWarranty,
      key: 'warranty',
      render: (p: Product) => (
        <span
          className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
            p.isOfficial
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
          }`}
        >
          {language === 'bn' ? p.warrantyBn : p.warranty}
        </span>
      ),
      getValue: (p: Product) => p.isOfficial,
    },
    {
      name: t.specsDisplay,
      key: 'display',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200">
          {language === 'bn'
            ? p.detailedSpecsBn?.display || p.specs[0]
            : p.detailedSpecs?.display || p.specs[0]}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.display || p.specs[0],
    },
    {
      name: t.specsProcessor,
      key: 'processor',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200 font-medium">
          {language === 'bn'
            ? p.detailedSpecsBn?.processor || p.specs[1]
            : p.detailedSpecs?.processor || p.specs[1]}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.processor || p.specs[1],
    },
    {
      name: t.specsRamStorage,
      key: 'ramStorage',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200">
          {language === 'bn'
            ? p.detailedSpecsBn?.ramStorage || p.storageOptions.join(' / ')
            : p.detailedSpecs?.ramStorage || p.storageOptions.join(' / ')}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.ramStorage || p.storageOptions.join(' / '),
    },
    {
      name: t.specsRearCamera,
      key: 'cameraRear',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200">
          {language === 'bn'
            ? p.detailedSpecsBn?.cameraRear || 'প্রো ক্যামেরা সিস্টেম'
            : p.detailedSpecs?.cameraRear || 'Pro Camera System'}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.cameraRear || '',
    },
    {
      name: t.specsFrontCamera,
      key: 'cameraFront',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200">
          {language === 'bn'
            ? p.detailedSpecsBn?.cameraFront || 'এইচডি সেলফি ক্যামেরা'
            : p.detailedSpecs?.cameraFront || 'HD Selfie Camera'}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.cameraFront || '',
    },
    {
      name: t.specsBattery,
      key: 'batteryCharging',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200">
          {language === 'bn'
            ? p.detailedSpecsBn?.batteryCharging || 'ফাস্ট চার্জিং অল-ডে ব্যাটারি'
            : p.detailedSpecs?.batteryCharging || 'Fast Charging All-Day Battery'}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.batteryCharging || '',
    },
    {
      name: t.specsBuild,
      key: 'buildRating',
      render: (p: Product) => (
        <span className="text-xs text-zinc-200">
          {language === 'bn'
            ? p.detailedSpecsBn?.buildRating || 'ওয়াটার রেজিস্ট্যান্ট ও প্রিমিয়াম বিল্ড'
            : p.detailedSpecs?.buildRating || 'Water Resistant & Premium Build'}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.buildRating || '',
    },
    {
      name: t.specsSpecial,
      key: 'specialFeature',
      render: (p: Product) => (
        <span className="text-xs font-semibold text-amber-400">
          {language === 'bn'
            ? p.detailedSpecsBn?.specialFeature || 'ফ্ল্যাগশিপ এআই ও প্রিমিয়াম ফিচার'
            : p.detailedSpecs?.specialFeature || 'Flagship AI & Exclusive Feature'}
        </span>
      ),
      getValue: (p: Product) => p.detailedSpecs?.specialFeature || '',
    },
  ];

  // Check if a row has differences between products
  const hasRowDifferences = (getValueFn: (p: Product) => any) => {
    if (selectedProducts.length < 2) return false;
    const firstVal = getValueFn(selectedProducts[0]);
    return selectedProducts.some(p => getValueFn(p) !== firstVal);
  };

  const handleAddPhone = (productId: string) => {
    addToCompare(productId);
    setShowAddDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCompareOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-6xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="p-4 md:p-6 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-black text-white">
                {t.compareTitle}
              </h3>
              <p className="text-xs text-zinc-400">
                {t.compareSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Highlight Diff toggle, Clear, Close */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Highlight Differences toggle */}
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                highlightDifferences
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
              title="Highlight differing specifications"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.highlightDiff}</span>
            </button>

            {/* Clear All */}
            {selectedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                {t.clearCompare}
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 md:p-6 no-scrollbar">
          {selectedProducts.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <Scale className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                {t.emptyCompare}
              </h4>
              <p className="text-xs text-zinc-500 mb-6">
                {language === 'bn'
                  ? 'ক্যাটালগ থেকে যেকোনো স্মার্টফোনে "তুলনা করুন" বাটনে ক্লিক করুন।'
                  : 'Click the "Compare" button on any phone card to start comparing.'}
              </p>

              {/* Quick Suggestions to add */}
              <div className="max-w-md mx-auto">
                <span className="text-xs font-semibold text-zinc-400 block mb-2">
                  {language === 'bn' ? 'জনপ্রিয় তুলনা নির্বাচন করুন:' : 'Quick Select:'}
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => {
                      addToCompare('deal-1');
                      addToCompare('deal-2');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-xs text-white font-medium transition-colors"
                  >
                    iPhone 16 Pro Max vs S24 Ultra
                  </button>
                  <button
                    onClick={() => {
                      addToCompare('deal-1');
                      addToCompare('deal-3');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-xs text-white font-medium transition-colors"
                  >
                    iPhone 16 Pro vs Pixel 9 Pro
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <table className="w-full border-collapse min-w-[650px] table-fixed">
              {/* Product Card Headers Column row */}
              <thead>
                <tr>
                  {/* Left Label header */}
                  <th className="w-48 text-left p-3 pb-6 align-bottom">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                      {language === 'bn' ? 'স্পেসিফিকেশন' : 'Specifications'}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {selectedProducts.length} {language === 'bn' ? 'টি ডিভাইস' : 'Devices'}
                    </div>
                  </th>

                  {/* Compared Phone Columns */}
                  {selectedProducts.map(p => (
                    <th key={p.id} className="p-3 pb-6 align-top text-left font-normal border-l border-zinc-800/80">
                      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 relative group flex flex-col justify-between h-full">
                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        {/* Thumbnail */}
                        <div className="w-full h-32 flex items-center justify-center my-1">
                          <DeviceVisual
                            type={p.imageType}
                            imageUrl={p.imageUrl}
                            alt={p.name}
                            className="w-24 h-28"
                          />
                        </div>

                        {/* Info */}
                        <div className="mt-2 text-center">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            {p.brand.toUpperCase()}
                          </span>
                          <h4 className="text-xs md:text-sm font-bold text-white line-clamp-2 mt-0.5 min-h-[32px]">
                            {language === 'bn' ? p.nameBn : p.name}
                          </h4>

                          <div className="text-sm font-black text-amber-400 font-mono mt-2">
                            ৳ {p.price.toLocaleString('en-IN')}
                          </div>

                          {/* Quick Add to Cart CTA */}
                          <button
                            onClick={() => addToCart(p)}
                            className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{t.addCart}</span>
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}

                  {/* Add another phone slot (if < 4 phones) */}
                  {selectedProducts.length < 4 && (
                    <th className="p-3 pb-6 align-top text-left font-normal border-l border-zinc-800/80">
                      <div className="rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800 p-4 flex flex-col items-center justify-center h-full min-h-[240px] text-center relative">
                        <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-amber-400 mb-2">
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-zinc-300 mb-1">
                          {t.addMorePhones}
                        </span>
                        <span className="text-[10px] text-zinc-500 mb-3">
                          {language === 'bn' ? '৪টি পর্যন্ত তুলনা করুন' : 'Compare up to 4 devices'}
                        </span>

                        {/* Dropdown selector */}
                        <div className="relative w-full">
                          <button
                            onClick={() => setShowAddDropdown(!showAddDropdown)}
                            className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white flex items-center justify-between border border-zinc-700 cursor-pointer"
                          >
                            <span>{language === 'bn' ? 'ফোন নির্বাচন করুন' : 'Select Phone'}</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>

                          {showAddDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-1 z-50 max-h-48 overflow-y-auto text-left">
                              {availablePhones.map(phone => (
                                <button
                                  key={phone.id}
                                  onClick={() => handleAddPhone(phone.id)}
                                  className="w-full p-2 hover:bg-zinc-800 rounded-lg text-left text-xs transition-colors cursor-pointer"
                                >
                                  <div className="font-bold text-white truncate">
                                    {language === 'bn' ? phone.nameBn : phone.name}
                                  </div>
                                  <div className="text-[10px] text-amber-400 font-mono">
                                    ৳ {phone.price.toLocaleString('en-IN')}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Spec Rows Body */}
              <tbody className="divide-y divide-zinc-800/60">
                {specCategories.map((spec, sIdx) => {
                  const isDiff = highlightDifferences && hasRowDifferences(spec.getValue);

                  return (
                    <tr
                      key={sIdx}
                      className={`transition-colors ${
                        isDiff
                          ? 'bg-amber-500/[0.04] border-l-2 border-l-amber-500/80'
                          : 'hover:bg-zinc-900/40'
                      }`}
                    >
                      {/* Left spec name header */}
                      <td className="p-3.5 text-xs font-bold text-zinc-300 align-top bg-zinc-950/70">
                        <div className="flex items-center gap-1.5">
                          {isDiff && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                          )}
                          <span>{spec.name}</span>
                        </div>
                      </td>

                      {/* Values for each phone */}
                      {selectedProducts.map(p => (
                        <td
                          key={p.id}
                          className="p-3.5 align-top border-l border-zinc-800/80"
                        >
                          {spec.render(p)}
                        </td>
                      ))}

                      {/* Filler cell if < 4 phones */}
                      {selectedProducts.length < 4 && (
                        <td className="p-3.5 border-l border-zinc-800/80 text-zinc-700 text-xs italic">
                          —
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer info & CTA */}
        <div className="p-4 md:p-6 bg-zinc-900/80 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span>{language === 'bn' ? 'সকল স্পেসিফিকেশন অফিসিয়াল গ্লোবাল ও BTRC নথি অনুযায়ী ভেরিফাইড।' : 'All specifications are verified from official manufacturer and BTRC documents.'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCompareOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition-colors"
            >
              {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
