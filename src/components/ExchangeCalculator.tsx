import React, { useState } from 'react';
import { 
  Repeat, 
  Calculator, 
  CalendarCheck, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Clock,
  PhoneCall
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { TRADE_IN_DEVICES } from '../data/products';

export const ExchangeCalculator: React.FC = () => {
  const { language, setIsExchangeModalOpen, setExchangeDetails } = useShop();
  const t = I18N[language];

  // Calculator State
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedModel, setSelectedModel] = useState<string>(TRADE_IN_DEVICES[0].model);
  const [conditionMult, setConditionMult] = useState<number>(1.0);
  const [targetPrice, setTargetPrice] = useState<number>(154999);
  const [targetName, setTargetName] = useState<string>('iPhone 16 Pro (৳ 1,54,999)');

  const targetPhones = [
    { name: 'iPhone 16 Pro (128GB)', price: 154999 },
    { name: 'iPhone 16 Pro Max (256GB)', price: 174999 },
    { name: 'iPhone 16 (128GB)', price: 122500 },
    { name: 'Galaxy S24 Ultra (256GB)', price: 139999 },
    { name: 'Google Pixel 9 Pro (128GB)', price: 108500 },
    { name: 'Xiaomi 14 Ultra (512GB)', price: 124000 },
  ];

  // Available models for selected brand
  const brandModels = TRADE_IN_DEVICES.filter(d => d.brand === selectedBrand);

  const currentDevice = TRADE_IN_DEVICES.find(d => d.model === selectedModel) || brandModels[0];
  const baseVal = currentDevice ? currentDevice.baseValue : 45000;
  const estimatedOldValue = Math.round(baseVal * conditionMult);
  const bonus = 3000;
  const youPay = Math.max(0, targetPrice - (estimatedOldValue + bonus));

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const first = TRADE_IN_DEVICES.find(d => d.brand === brand);
    if (first) {
      setSelectedModel(first.model);
    }
  };

  const handleBookNow = () => {
    setExchangeDetails({
      oldBrand: selectedBrand,
      oldModel: selectedModel,
      condition: conditionMult === 1.0 ? t.likeNew : conditionMult === 0.85 ? t.good : t.fair,
      targetPhone: targetName,
      estimatedValue: estimatedOldValue,
      bonus,
      netPay: youPay,
    });
    setIsExchangeModalOpen(true);
  };

  const whatsappText = encodeURIComponent(
    `Hello RJ Smart Shop! I want to exchange my old ${selectedBrand} ${selectedModel} (Estimated Trade-in: ৳${estimatedOldValue}) for ${targetName}. Net payable approx: ৳${youPay}. Please guide me on showroom handover.`
  );

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-t border-zinc-800" id="exchange">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Info Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
              <Repeat className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{language === 'bn' ? 'মেগা ফোন এক্সচেঞ্জ অফার ২০২৬' : 'MEGA PHONE TRADE-IN 2026'}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {t.exchangeTitle} <br />
              <span className="text-amber-400">{t.exchangeSubtitle}</span>
            </h2>

            <p className="mt-4 text-xs md:text-sm text-zinc-300 leading-relaxed max-w-xl">
              {t.exchangeDesc}
            </p>

            {/* 3 Step Flow */}
            <div className="mt-8 space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center shrink-0">
                  ১
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white">
                    {language === 'bn' ? '১. মডেল ও কন্ডিশন সিলেক্ট করুন' : '1. Select Device & Condition'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {language === 'bn'
                      ? 'আপনার পুরনো ফোনের ব্র্যান্ড, মডেল ও অবস্থা দিয়ে আনুমানিক এক্সচেঞ্জ মূল্য দেখুন।'
                      : 'Choose your old phone details to calculate instant estimated trade-in value.'}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center shrink-0">
                  ২
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white">
                    {language === 'bn' ? '২. নিকটস্থ শোরুমে ফোনটি নিয়ে আসুন' : '2. Visit Showroom or Request Pickup'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {language === 'bn'
                      ? 'আমাদের যমুনা ফিউচার পার্ক, বসুন্ধরা সিটি বা চট্টগ্রাম ফিনলে স্কয়ার শোরুমে ডিভাইসটি আনুন।'
                      : 'Bring your phone to Jamuna Future Park, Bashundhara City, or Finlay Square.'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center shrink-0">
                  ৩
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white">
                    {language === 'bn' ? '৩. ৫ মিনিটে টেস্ট ও নতুন ফোন বুঝে নিন' : '3. 5-Minute Test & Instant Handover'}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {language === 'bn'
                      ? 'আমাদের এক্সপার্ট টিম ৫ মিনিটে টেস্ট সম্পন্ন করে সাথে সাথে নতুন ফোন বুঝিয়ে দেবে!'
                      : 'Our technicians verify your device and hand over your brand new dream phone!'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Calculator Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-zinc-900 border border-amber-500/30 p-6 md:p-7 shadow-2xl relative">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h3 className="text-base md:text-lg font-bold text-white">
                  {t.tradeInCalc}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mb-5">
                {t.calcSub}
              </p>

              <div className="space-y-4">
                {/* Brand select */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.currentBrand}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Apple', 'Samsung', 'Google Pixel', 'OnePlus', 'Xiaomi'].map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleBrandChange(b)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                          selectedBrand === b
                            ? 'bg-amber-500 text-zinc-950 border-amber-400 font-bold'
                            : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model select */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.currentModel}
                  </label>
                  <select
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {brandModels.map(m => (
                      <option key={m.model} value={m.model}>
                        {m.model} (Base: ৳{m.baseValue.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Pills */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.conditionLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setConditionMult(1.0)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        conditionMult === 1.0
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.likeNew}</div>
                      <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">{t.likeNewDesc}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConditionMult(0.85)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        conditionMult === 0.85
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.good}</div>
                      <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">{t.goodDesc}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConditionMult(0.65)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        conditionMult === 0.65
                          ? 'bg-amber-500/20 border-amber-500 text-white'
                          : 'bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.fair}</div>
                      <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">{t.fairDesc}</div>
                    </button>
                  </div>
                </div>

                {/* Target Phone select */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    {t.targetPhone}
                  </label>
                  <select
                    value={targetPrice}
                    onChange={e => {
                      const p = Number(e.target.value);
                      setTargetPrice(p);
                      const found = targetPhones.find(tp => tp.price === p);
                      if (found) setTargetName(found.name);
                    }}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {targetPhones.map(item => (
                      <option key={item.price} value={item.price}>
                        {item.name} — ৳ {item.price.toLocaleString('en-IN')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calculation Summary Box */}
                <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-2 mt-4">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>{t.oldPhoneValue}</span>
                    <strong className="text-white font-mono">৳ {estimatedOldValue.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>{t.bonusVoucher}</span>
                    <strong className="text-emerald-400 font-mono">+ ৳ {bonus.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>{t.targetPhonePrice}</span>
                    <strong className="text-white font-mono">৳ {targetPrice.toLocaleString('en-IN')}</strong>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-white">{t.youOnlyPay}</span>
                    <span className="text-xl font-black text-amber-400 font-mono">
                      ৳ {youPay.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <button
                    onClick={handleBookNow}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{t.bookExchange}</span>
                  </button>

                  <a
                    href={`https://wa.me/8801700000000?text=${whatsappText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
