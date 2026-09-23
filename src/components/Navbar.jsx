import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';

export default function Navbar({
  activePage,
  onNavigate,
  onSelectCategory,
  onSearchSubmit,
  searchQuery,
  setSearchQuery
}) {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (onSearchSubmit) onSearchSubmit(searchQuery);
      setIsSearchOpen(false);
      onNavigate('shop');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories', hasDropdown: true },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-neutral-200/80 bg-white/90 backdrop-blur-md shadow-xs'
            : 'border-b border-neutral-200/40 bg-white/80 backdrop-blur-xs'
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-neutral-950 px-4 py-2 text-center text-xs font-medium text-neutral-300">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Complimentary worldwide courier delivery on orders over $100</span>
            <span className="text-neutral-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-cyan-400 font-semibold">
              Use code NOVA10 for 10% off
            </span>
          </div>
        </div>

        {/* Main Nav Container */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              type="button"
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-2.5 text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-cyan-400 shadow-xs transition-transform duration-300 group-hover:scale-105">
                <span className="font-display font-black text-lg tracking-tighter">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-tight text-neutral-950">
                  NOVA
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 -mt-1">
                  Precision Gear
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setIsCategoryMenuOpen(true)}
                    onMouseLeave={() => setIsCategoryMenuOpen(false)}
                  >
                    <button
                      type="button"
                      id="desktop-categories-dropdown-btn"
                      onClick={() => onNavigate('categories')}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-cyan-600 ${
                        isActive ? 'text-cyan-600 font-semibold' : 'text-neutral-700'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isCategoryMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isCategoryMenuOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 z-50 animate-in fade-in zoom-in-95">
                        <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-900/10">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                onSelectCategory(cat);
                                onNavigate('shop');
                                setIsCategoryMenuOpen(false);
                              }}
                              className="w-full text-left rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  type="button"
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`relative text-sm font-medium transition-colors hover:text-cyan-600 ${
                    isActive ? 'text-cyan-600 font-semibold' : 'text-neutral-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-cyan-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Search & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button / Expandable Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    id="navbar-search-expanded"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyPress}
                    placeholder="Search gear..."
                    className="w-40 sm:w-56 rounded-xl border border-neutral-300 bg-white py-1.5 pl-3 pr-14 text-xs text-neutral-900 focus:border-cyan-500 focus:outline-none shadow-xs"
                  />
                  <div className="absolute right-1 flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSearchSubmit) onSearchSubmit(searchQuery);
                        setIsSearchOpen(false);
                        onNavigate('shop');
                      }}
                      aria-label="Submit search"
                      className="rounded-lg p-1 text-neutral-500 hover:text-cyan-700"
                    >
                      <Search className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      aria-label="Close search"
                      className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  id="navbar-search-btn"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Open search"
                  className="rounded-xl p-2.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              type="button"
              id="navbar-cart-btn"
              onClick={() => onNavigate('cart')}
              aria-label={`Go to shopping cart with ${totalItems} items`}
              className="relative flex items-center justify-center rounded-xl p-2.5 text-neutral-800 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span
                  id="navbar-cart-badge"
                  className="absolute top-1 right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-neutral-950 shadow-xs"
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2"
          >
            {/* Mobile Search Field */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  id="mobile-nav-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (onSearchSubmit) onSearchSubmit(searchQuery);
                      setIsMobileMenuOpen(false);
                      onNavigate('shop');
                    }
                  }}
                  placeholder="Search products, titanium, audio..."
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-3.5 pr-10 text-xs text-neutral-900 focus:border-cyan-500 focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (onSearchSubmit) onSearchSubmit(searchQuery);
                    setIsMobileMenuOpen(false);
                    onNavigate('shop');
                  }}
                  aria-label="Search"
                  className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-700"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  id={`mobile-nav-${link.id}`}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    activePage === link.id
                      ? 'bg-neutral-100 text-cyan-600 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              ))}

              {/* Cart link on mobile */}
              <button
                type="button"
                id="mobile-nav-cart-btn"
                onClick={() => {
                  onNavigate('cart');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  activePage === 'cart'
                    ? 'bg-neutral-100 text-cyan-600 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-cyan-600" />
                  <span>Shopping Cart</span>
                </div>
                {totalItems > 0 && (
                  <span className="rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-bold text-neutral-950">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Quick Category Links */}
              <div className="pt-3 mt-2 border-t border-neutral-100">
                <span className="block px-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Featured Categories
                </span>
                <div className="grid grid-cols-2 gap-1.5 px-2">
                  {CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat);
                        onNavigate('shop');
                        setIsMobileMenuOpen(false);
                      }}
                      className="rounded-lg bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 text-left"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
