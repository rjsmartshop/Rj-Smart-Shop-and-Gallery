import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';

export const TrackOrderModal: React.FC = () => {
  const { language, isTrackOrderOpen, setIsTrackOrderOpen, lastOrder } = useShop();
  const t = I18N[language];

  const [orderQuery, setOrderQuery] = useState(lastOrder?.id || '#RJ-48291');
  const [searched, setSearched] = useState(true);

  if (!isTrackOrderOpen) return null;

  const steps = [
    {
      title: language === 'bn' ? 'অর্ডার গ্রহণ ও কনফার্ম' : 'Order Placed & Confirmed',
      desc: language === 'bn' ? 'সিস্টেমে ভেরিফাইড হয়েছে' : 'Verified by automated invoice',
      completed: true,
      current: false,
    },
    {
      title: language === 'bn' ? 'সিরিয়াল ও IMEI ভেরিফিকেশন' : 'Serial & IMEI Verification',
      desc: language === 'bn' ? 'ওয়ারেন্টি কার্ড সিল সহ প্যাকড' : 'Inspected with warranty seal',
      completed: true,
      current: true,
    },
    {
      title: language === 'bn' ? 'কুরিয়ারে হস্তান্তর' : 'Handed to Courier Partner',
      desc: language === 'bn' ? 'Steadfast / RedX এক্সপ্রেস' : 'Fast-track priority transit',
      completed: false,
      current: false,
    },
    {
      title: language === 'bn' ? 'ডেলিভারিতে বের হয়েছে' : 'Out for Delivery',
      desc: language === 'bn' ? 'রাইডার আপনার লোকেশনে আসছেন' : 'Rider is on the way to your door',
      completed: false,
      current: false,
    },
    {
      title: language === 'bn' ? 'সফল ডেলিভারি' : 'Delivered & Handover',
      desc: language === 'bn' ? 'পণ্য বুঝে নিয়ে পেমেন্ট সম্পন্ন' : 'Cash collected & warranty active',
      completed: false,
      current: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsTrackOrderOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 z-10 my-8">
        <button
          onClick={() => setIsTrackOrderOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-white">
              {t.trackOrder}
            </h3>
            <p className="text-xs text-zinc-400">
              {language === 'bn' ? 'আপনার অর্ডার নম্বর বা ফোন দিয়ে ট্র্যাক করুন' : 'Enter your Order ID or phone number'}
            </p>
          </div>
        </div>

        {/* Input search */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={orderQuery}
            onChange={e => setOrderQuery(e.target.value)}
            placeholder="#RJ-XXXXX"
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono uppercase"
          />
          <button
            onClick={() => setSearched(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'bn' ? 'খুঁজুন' : 'Track'}</span>
          </button>
        </div>

        {searched && (
          <div className="mt-6 pt-5 border-t border-zinc-800/80">
            {/* Status overview */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 mb-6">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                  {language === 'bn' ? 'বর্তমান স্ট্যাটাস:' : 'Current Status:'}
                </span>
                <div className="text-xs md:text-sm font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>{language === 'bn' ? 'প্যাকিং ও ভেরিফিকেশন চলছে' : 'Processing & Verification'}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-mono">
                  Order {orderQuery || '#RJ-48291'}
                </span>
                <div className="text-[11px] text-zinc-300 font-medium">
                  {language === 'bn' ? 'সম্ভাব্য ডেলিভারি: ২৪-৪৮ ঘণ্টা' : 'Est. Delivery: 24-48 Hours'}
                </div>
              </div>
            </div>

            {/* Step Progress Vertical Timeline */}
            <div className="space-y-4 relative pl-3 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
              {steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs ${
                      st.completed
                        ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/30'
                        : st.current
                        ? 'bg-amber-500/20 border-2 border-amber-500 text-amber-400 animate-pulse'
                        : 'bg-zinc-900 border border-zinc-700 text-zinc-500'
                    }`}
                  >
                    {st.completed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        st.completed || st.current ? 'text-white' : 'text-zinc-500'
                      }`}
                    >
                      {st.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Courier Info */}
            <div className="mt-6 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" />
                <span>Courier: <strong className="text-zinc-200">Steadfast Express</strong></span>
              </div>
              <div>
                <span>Support: </span>
                <a href="tel:+8801700000000" className="text-amber-400 font-mono hover:underline">
                  01700-000000
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
