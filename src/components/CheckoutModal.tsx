import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Lock, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  Printer
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';

export const CheckoutModal: React.FC = () => {
  const {
    language,
    cart,
    subtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder,
    lastOrder,
    setIsTrackOrderOpen,
  } = useShop();

  const t = I18N[language];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryArea === 'dhaka' ? 70 : 130;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert(language === 'bn' ? 'অনুগ্রহ করে সকল তথ্য পূরণ করুন।' : 'Please fill all required fields.');
      return;
    }

    createOrder({
      customerName: name,
      customerPhone: phone,
      deliveryArea,
      address,
      paymentMethod,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 z-10 my-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">
                  {t.expressCheckout}
                </h3>
                <p className="text-xs text-zinc-400">
                  {t.checkoutDesc}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: মো: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Phone & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    {t.deliveryArea}
                  </label>
                  <select
                    value={deliveryArea}
                    onChange={e => setDeliveryArea(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="dhaka">{t.insideDhaka}</option>
                    <option value="outside">{t.outsideDhaka}</option>
                  </select>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {t.address}
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'বাড়ি/ফ্ল্যাট নং, রোড নং, এলাকা, থানা ও জেলা...'
                      : 'House/Flat No, Road, Area, Thana & District...'
                  }
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              {/* Payment Methods */}
              {/* Payment Method (Cash on Delivery Only) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  {language === 'bn' ? 'পেমেন্ট পদ্ধতি (শুধুমাত্র ক্যাশ অন ডেলিভারি)' : 'Payment Method (Cash on Delivery Only)'}
                </label>
                <div className="p-3.5 rounded-xl border border-amber-500/60 bg-amber-500/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center text-xl shrink-0">
                    💵
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{language === 'bn' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'Cash on Delivery (COD)'}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                        {language === 'bn' ? 'সরাসরি হোম ডেলিভারি' : 'Nationwide COD'}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      {language === 'bn'
                        ? 'পণ্য হাতে পেয়ে পুরোপুরি চেক করে ডেলিভারি ম্যানকে মূল্য পরিশোধ করুন।'
                        : 'Inspect your gadget at your doorstep before paying. 100% safe & risk-free.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>{t.subtotal}</span>
                  <span className="text-white font-bold font-mono">৳ {subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t.deliveryCharge}</span>
                  <span className="text-white font-mono">৳ {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                  <span>{t.totalAmount}</span>
                  <span className="text-amber-400 font-mono">৳ {total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>{t.confirmOrder}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl md:text-2xl font-black text-white">
              {t.orderSuccessTitle}
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              {t.orderIdText} <strong className="text-amber-400 font-mono text-sm">{lastOrder?.id}</strong>
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-4 text-left text-xs space-y-2 text-zinc-300">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Customer:</span>
                <span className="font-bold text-white">{lastOrder?.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Phone:</span>
                <span className="font-mono text-white">{lastOrder?.customerPhone}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Address:</span>
                <span className="text-right text-zinc-200">{lastOrder?.address}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Payment:</span>
                <span className="font-semibold text-amber-400">Cash on Delivery (ক্যাশ অন ডেলিভারি)</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-400 font-mono">৳ {lastOrder?.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  handleClose();
                  setIsTrackOrderOpen(true);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{t.trackOrder}</span>
              </button>

              <button
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors"
              >
                {t.continueShopping}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
