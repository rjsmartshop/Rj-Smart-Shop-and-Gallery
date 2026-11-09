import React, { useState } from 'react';
import { X, CalendarCheck, CheckCircle2, MapPin, Sparkles, PhoneCall, Repeat } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';
import { OUTLETS } from '../data/outlets';

export const ExchangeModal: React.FC = () => {
  const { language, isExchangeModalOpen, setIsExchangeModalOpen, exchangeDetails } = useShop();
  const t = I18N[language];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [outlet, setOutlet] = useState(OUTLETS[0].name);
  const [date, setDate] = useState('Tomorrow 3:00 PM');
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isExchangeModalOpen || !exchangeDetails) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingId(`#EX-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsExchangeModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 z-10 my-8">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">
                  {language === 'bn' ? 'এক্সচেঞ্জ বুকিং ফর্ম' : 'Trade-In Booking Form'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {language === 'bn' ? 'শোরুমে ইনস্ট্যান্ট ভেরিফিকেশন ও হ্যান্ডওভার' : 'Instant 5-minute showroom verification'}
                </p>
              </div>
            </div>

            {/* Valuation Summary Box */}
            <div className="my-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>{language === 'bn' ? 'আপনার বর্তমান ডিভাইস:' : 'Your Device:'}</span>
                <span className="font-bold text-white">
                  {exchangeDetails.oldBrand} {exchangeDetails.oldModel} ({exchangeDetails.condition})
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{language === 'bn' ? 'টার্গেট আপগ্রেড ফোন:' : 'Target Upgrade:'}</span>
                <span className="font-bold text-amber-400">{exchangeDetails.targetPhone}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{language === 'bn' ? 'আনুমানিক এক্সচেঞ্জ ভ্যালু:' : 'Estimated Trade-in Value:'}</span>
                <span className="font-mono text-zinc-200">৳ {exchangeDetails.estimatedValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{language === 'bn' ? 'RJ বোনাস ভাউচার:' : 'RJ Bonus Voucher:'}</span>
                <span className="font-mono text-emerald-400">+ ৳ {exchangeDetails.bonus.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-sm">
                <span className="text-white">{language === 'bn' ? 'আনুমানিক প্রদেয় বাকি টাকা:' : 'Approx Net Payable:'}</span>
                <span className="text-amber-400 font-mono text-base">
                  ৳ {exchangeDetails.netPay.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={language === 'bn' ? 'আপনার পুরো নাম' : 'Full Name'}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

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
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {language === 'bn' ? 'যে শোরুমে আসতে চান' : 'Select Preferred Showroom'}
                </label>
                <select
                  value={outlet}
                  onChange={e => setOutlet(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {OUTLETS.map(o => (
                    <option key={o.id} value={o.name}>
                      {language === 'bn' ? o.nameBn : o.name} — {o.city}
                    </option>
                  ))}
                  <option value="doorstep">
                    {language === 'bn' ? 'হোম পিকআপ ও ডেলিভারি (ঢাকা)' : 'Doorstep Pickup & Delivery (Dhaka)'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  {language === 'bn' ? 'ভিজিটের সম্ভাব্য তারিখ ও সময়' : 'Preferred Visit Schedule'}
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  placeholder="e.g. Today 5:00 PM"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{language === 'bn' ? 'বুকিং কনফার্ম করুন' : 'Confirm Trade-in Appointment'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-white">
              {language === 'bn' ? 'এক্সচেঞ্জ বুকিং সফল হয়েছে!' : 'Trade-In Booking Confirmed!'}
            </h3>

            <p className="text-xs text-zinc-400 mt-1">
              Token ID: <strong className="text-amber-400 font-mono text-sm">{bookingId}</strong>
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left text-xs space-y-2 text-zinc-300">
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Name:</span>
                <span className="font-bold text-white">{name}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Showroom:</span>
                <span className="text-amber-400 font-semibold">{outlet}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-500">Target Phone:</span>
                <span className="text-white">{exchangeDetails.targetPhone}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold">
                <span className="text-zinc-400">Net Payable Approx:</span>
                <span className="text-amber-400 font-mono text-sm">৳ {exchangeDetails.netPay.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 mt-4 leading-relaxed">
              {language === 'bn'
                ? '📌 অনুগ্রহ করে ডিভাইসটির সাথে চার্জার ও বক্স (যদি থাকে) এবং আপনার জাতীয় পরিচয়পত্র/আইডি নিয়ে শোরুমে আসুন।'
                : '📌 Please bring your device, charger/box (if available), and national ID to the selected outlet.'}
            </p>

            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'Got it'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
