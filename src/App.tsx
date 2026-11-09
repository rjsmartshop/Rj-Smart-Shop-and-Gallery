import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Topbar } from './components/Topbar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { TrustStrip } from './components/TrustStrip';
import { FeaturedCategories } from './components/FeaturedCategories';
import { FlashSale } from './components/FlashSale';
import { ProductCatalog } from './components/ProductCatalog';
import { ExchangeCalculator } from './components/ExchangeCalculator';
import { OutletsSection } from './components/OutletsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ExchangeModal } from './components/ExchangeModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { CompareFloatingBar } from './components/CompareFloatingBar';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        {/* Top utility bar */}
        <Topbar />

        {/* Main Header with Logo & Search */}
        <Header />

        {/* Category & mega navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="mainContent" className="flex-1">
          {/* Flagship Hero slider & side promos */}
          <HeroSlider />

          {/* Genuine, replacement, EMI, and fast delivery assurances */}
          <TrustStrip />

          {/* Featured categories with direct filter triggers */}
          <FeaturedCategories />

          {/* Flash sale deals with live countdown & stock progress */}
          <FlashSale />

          {/* Complete smartphones & gadgets catalog with brand filters */}
          <ProductCatalog />

          {/* Phone exchange & trade-in valuation calculator */}
          <ExchangeCalculator />

          {/* Physical showroom outlets in Dhaka & Chittagong */}
          <OutletsSection />
        </main>

        {/* Brand Footer */}
        <Footer />

        {/* Slide-in cart & interactive modals */}
        <CartDrawer />
        <CheckoutModal />
        <TrackOrderModal />
        <QuickViewModal />
        <WishlistDrawer />
        <ExchangeModal />
        <ProductComparisonModal />

        {/* Floating comparison badge bar */}
        <CompareFloatingBar />

        {/* App-like mobile bottom navigation */}
        <MobileBottomNav />
      </div>
    </ShopProvider>
  );
}
