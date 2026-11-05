import React, { useState } from 'react';
import { Globe, CreditCard, Store, Search, User, Truck, Heart, ShoppingBag, X } from 'lucide-react';
import { ComfyHomeLogo } from './ProductThumbnails.tsx';

interface HeaderProps {
  cartCount: number;
  onGoToCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onGoToCart }) => {
  const [showSurveyBanner, setShowSurveyBanner] = useState(true);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top micro bar */}
      <div className="bg-[#111111] text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button type="button" className="flex items-center gap-1.5 hover:underline text-gray-200 cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>SG | English</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-gray-300">
              <CreditCard className="w-3.5 h-3.5" />
              <span>0% instalment payment plan</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="flex items-center gap-1.5 hover:underline text-gray-200 cursor-pointer">
              <Store className="w-3.5 h-3.5" />
              <span>Select store</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Logo & category links */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onGoToCart}
            className="cursor-pointer focus:outline-none"
            aria-label="COMFY HOME Home"
          >
            <ComfyHomeLogo />
          </button>
          <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-gray-900" aria-label="Main menu">
            <a href="#products" onClick={(e) => e.preventDefault()} className="hover:underline">Products</a>
            <a href="#rooms" onClick={(e) => e.preventDefault()} className="hover:underline">Rooms</a>
            <a href="#offers" onClick={(e) => e.preventDefault()} className="hover:underline">Offers</a>
            <a href="#ideas" onClick={(e) => e.preventDefault()} className="hover:underline">Ideas & guides</a>
            <a href="#services" onClick={(e) => e.preventDefault()} className="hover:underline">Services</a>
          </nav>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              readOnly
              placeholder="What are you looking for?"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 hover:bg-gray-200/70 rounded-full text-sm text-gray-900 placeholder-gray-500 border-none outline-none transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-gray-900">
          <button type="button" className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:opacity-75 cursor-pointer">
            <User className="w-5 h-5 text-gray-800" />
            <span>Hej! Log in or sign up</span>
          </button>
          <button type="button" aria-label="Delivery" className="p-1 hover:opacity-75 cursor-pointer">
            <Truck className="w-5 h-5 text-gray-800" />
          </button>
          <button type="button" aria-label="Favourites" className="p-1 hover:opacity-75 cursor-pointer">
            <Heart className="w-5 h-5 text-gray-800" />
          </button>
          <button
            type="button"
            onClick={onGoToCart}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="p-1 hover:opacity-75 relative cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-gray-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#0058a3] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Blue Promo Survey Banner from screenshot */}
      {showSurveyBanner && (
        <div className="bg-[#0058a3] text-white text-sm py-2 px-4 sm:px-8">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>
                Share your thoughts and stand to be one of ten lucky participants to win a{' '}
                <strong className="font-bold">$50 COMFY HOME gift card</strong>.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="bg-white text-gray-900 px-3.5 py-1 rounded-full text-xs font-bold hover:bg-gray-100 cursor-pointer whitespace-nowrap"
              >
                Start survey now &gt;
              </button>
              <button
                type="button"
                onClick={() => setShowSurveyBanner(false)}
                aria-label="Dismiss survey banner"
                className="p-1 hover:opacity-75 cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
