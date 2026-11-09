import React, { useState } from 'react';
import { 
  Headset, 
  Mail, 
  MapPin, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { I18N } from '../data/i18n';

export const Footer: React.FC = () => {
  const { language, setIsTrackOrderOpen } = useShop();
  const t = I18N[language];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div>
            <div className="mb-4">
              <img
                src="/assets/aistudio/c2c21ecb-c57d-4659-8161-37f665da39a7_removalai_preview_b191dea9.png"
                alt="RJ SMART SHOP & GALLERY"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              {t.brandDesc}
            </p>

            <div className="space-y-2 text-xs">
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.hotline} <strong className="font-mono text-white">+880 1700-000000</strong></span>
              </a>

              <a
                href="mailto:support@rjsmartshop.com"
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>support@rjsmartshop.com</span>
              </a>

              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'bn'
                    ? 'শিবপুর হাট, বানেশ্বর, পুঠিয়া, রাজশাহী'
                    : 'Shibpur Hat, Baneshwar, Puthia, Rajshahi'}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  {t.smartphones}
                </a>
              </li>
              <li>
                <a href="#hot-deals" className="hover:text-amber-400 transition-colors text-red-400 font-semibold">
                  {t.hotDeals}
                </a>
              </li>
              <li>
                <a href="#exchange" className="hover:text-amber-400 transition-colors text-amber-400 font-semibold">
                  {t.exchange}
                </a>
              </li>
              <li>
                <a href="#outlets" className="hover:text-amber-400 transition-colors">
                  {t.showrooms}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {t.trackOrder}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.policies}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() =>
                    alert(
                      language === 'bn'
                        ? '১ বছর অফিসিয়াল ও শপ রিপ্লেসমেন্ট ওয়ারেন্টি পলিসি।'
                        : '1 Year Official & Store Replacement Warranty Policy.'
                    )
                  }
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {language === 'bn' ? 'অফিসিয়াল ওয়ারেন্টি নির্দেশিকা' : 'Official Warranty Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    alert(
                      language === 'bn'
                        ? 'যেকোনো ম্যানুফ্যাকচারিং ত্রুটিতে ৭ দিনের তাৎক্ষণিক রিপ্লেসমেন্ট সুবিধা।'
                        : '7 Days Hassle-Free Replacement Guarantee on manufacturing defects.'
                    )
                  }
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {language === 'bn' ? '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি' : '7 Days Replacement Guarantee'}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    alert(
                      language === 'bn'
                        ? 'সারা বাংলাদেশে নির্ভরযোগ্য ক্যাশ অন ডেলিভারি সুবিধা। পণ্য রিসিভ করে দেখে সম্পূর্ণ মূল্য পরিশোধ করুন।'
                        : 'Nationwide Cash on Delivery available across Bangladesh. Pay securely after inspecting your parcel.'
                    )
                  }
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {language === 'bn' ? 'ক্যাশ অন ডেলিভারি নির্দেশিকা' : 'Cash on Delivery Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    alert(
                      language === 'bn'
                        ? 'পুরনো ফোন দিয়ে নতুন ফোন নেয়ার সম্পূর্ণ গাইডলাইন।'
                        : 'Complete trade-in exchange guidelines.'
                    )
                  }
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {language === 'bn' ? 'এক্সচেঞ্জ নির্দেশিকা' : 'Trade-In Guidelines'}
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    alert(
                      language === 'bn'
                        ? 'গ্রাহকদের ব্যক্তিগত তথ্যের শতভাগ গোপনীয়তা রক্ষা করা হয়।'
                        : 'Your data and privacy are strictly confidential.'
                    )
                  }
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {language === 'bn' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              {t.stayConnected}
            </h4>
            <p className="text-zinc-400 text-xs mb-3">
              {t.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl font-bold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <div className="text-[11px] text-emerald-400 mb-3 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {language === 'bn' ? 'ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।' : 'Thank you for subscribing!'}
                </span>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {['Facebook', 'Instagram', 'YouTube', 'WhatsApp'].map(soc => (
                <a
                  key={soc}
                  href={soc === 'WhatsApp' ? 'https://wa.me/8801700000000' : 'https://facebook.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-semibold text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                >
                  {soc}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-zinc-900 text-center text-zinc-500 text-[11px]">
          © 2026 <strong className="text-zinc-300">RJ SMART SHOP & GALLERY</strong>. {t.rights} Designed with excellence for Bangladesh.
        </div>
      </div>
    </footer>
  );
};
