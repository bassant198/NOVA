import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('nova-01');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentOrder, setRecentOrder] = useState(null);

  // Hash-based routing to support refresh and browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setActivePage('home');
        return;
      }

      if (hash.startsWith('product/')) {
        const prodId = hash.replace('product/', '');
        setSelectedProductId(prodId);
        setActivePage('product-details');
      } else if (['home', 'shop', 'cart', 'checkout', 'categories', 'about', 'contact', 'order-success'].includes(hash)) {
        setActivePage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, params: { productId?: string } = {}) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'product-details' && params.productId) {
      setSelectedProductId(params.productId);
      window.location.hash = `product/${params.productId}`;
    } else {
      window.location.hash = page;
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('product-details', { productId });
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleOrderSuccess = (orderData) => {
    setRecentOrder(orderData);
    navigateTo('order-success');
  };

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#fafafa] text-neutral-900 font-sans selection:bg-cyan-500 selection:text-white">
        {/* Sticky Global Navigation */}
        <Navbar
          activePage={activePage}
          onNavigate={navigateTo}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            navigateTo('shop');
          }}
          onSearchSubmit={(query) => {
            setSearchQuery(query);
            navigateTo('shop');
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          {activePage === 'home' && (
            <HomePage
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                navigateTo('shop');
              }}
            />
          )}

          {activePage === 'shop' && (
            <ShopPage
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onSelectProduct={handleSelectProduct}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activePage === 'product-details' && (
            <ProductDetailsPage
              productId={selectedProductId}
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                navigateTo('shop');
              }}
            />
          )}

          {activePage === 'cart' && (
            <CartPage
              onNavigate={navigateTo}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activePage === 'checkout' && (
            <CheckoutPage
              onNavigate={navigateTo}
              onOrderSuccess={handleOrderSuccess}
            />
          )}

          {activePage === 'order-success' && (
            <OrderSuccessPage
              order={recentOrder}
              onNavigate={navigateTo}
            />
          )}

          {activePage === 'categories' && (
            <CategoriesPage
              onNavigate={navigateTo}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                navigateTo('shop');
              }}
            />
          )}

          {activePage === 'about' && (
            <AboutPage onNavigate={navigateTo} />
          )}

          {activePage === 'contact' && (
            <ContactPage />
          )}
        </main>

        {/* Global Cart Slide-Over Drawer */}
        <CartDrawer
          onNavigate={navigateTo}
          onSelectProduct={handleSelectProduct}
        />

        {/* Floating Toast Feedback */}
        <Toast />

        {/* Global Footer */}
        <Footer
          onNavigate={navigateTo}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            navigateTo('shop');
          }}
        />
      </div>
    </CartProvider>
  );
}
