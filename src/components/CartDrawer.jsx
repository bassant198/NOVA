import React, { useEffect } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import Button from './Button';

export default function CartDrawer({ onNavigate, onSelectProduct }) {
  const {
    items,
    totalItems,
    subtotal,
    shipping,
    total,
    isCartOpen,
    setIsCartOpen,
    clearCart,
    freeShippingThreshold
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    if (onNavigate) onNavigate('checkout');
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    if (onNavigate) onNavigate('cart');
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/40 backdrop-blur-xs transition-opacity duration-300"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="fixed inset-y-0 right-0 flex max-w-full pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-screen max-w-md flex-col bg-white shadow-2xl">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-cyan-600" />
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              type="button"
              id="cart-drawer-close-btn"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-100 text-xs">
              <div className="flex items-center justify-between text-neutral-700 font-medium mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-cyan-600" />
                  <span>
                    {freeShippingLeft === 0
                      ? 'Congratulations! Free express delivery unlocked.'
                      : `Add $${freeShippingLeft} more for free worldwide delivery.`}
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-2">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="max-w-xs text-xs text-neutral-500 mb-6">
                  Explore our curated precision gear and find your next staple.
                </p>
                <Button
                  id="cart-empty-shop-btn"
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onNavigate) onNavigate('shop');
                  }}
                >
                  Explore Collection
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onSelectProduct={(id) => {
                      setIsCartOpen(false);
                      if (onSelectProduct) onSelectProduct(id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50/50 p-6">
              <div className="space-y-2 mb-4 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-medium">Free</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                  <span>Estimated Total</span>
                  <span>${subtotal + shipping}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <Button
                  id="cart-drawer-checkout-btn"
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={handleCheckoutClick}
                >
                  Proceed to Checkout
                </Button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    id="cart-drawer-view-full-btn"
                    onClick={handleViewCartClick}
                    className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 hover:underline"
                  >
                    View Full Cart Details
                  </button>

                  <button
                    type="button"
                    id="cart-drawer-clear-btn"
                    onClick={clearCart}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
