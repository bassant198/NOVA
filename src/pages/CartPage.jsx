import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, Tag, Truck, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

export default function CartPage({ onNavigate, onSelectProduct }) {
  const {
    items,
    totalItems,
    subtotal,
    shipping,
    discount,
    estimatedTax,
    total,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError(res.message);
    }
  };

  if (items.length === 0) {
    return (
      <div id="cart-page-empty" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-neutral-100 text-neutral-400 mb-6">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
            You haven't selected any items yet. Browse our curated hardware catalog to discover
            precision audio, titanium accessories, and workspace tools.
          </p>
          <Button
            id="cart-empty-explore-btn"
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate('shop')}
          >
            Explore Product Catalog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Title & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          type="button"
          id="cart-clear-all-btn"
          onClick={() => {
            if (isConfirmingClear) {
              clearCart();
              setIsConfirmingClear(false);
            } else {
              setIsConfirmingClear(true);
              setTimeout(() => setIsConfirmingClear(false), 4000);
            }
          }}
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border transition-colors ${
            isConfirmingClear
              ? 'border-rose-300 bg-rose-50 text-rose-700'
              : 'border-neutral-200 text-neutral-500 hover:text-rose-600 hover:border-neutral-300'
          }`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>{isConfirmingClear ? 'Click again to confirm' : 'Clear entire cart'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Tracker Banner */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-700 mb-2">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-cyan-600" />
                <span>
                  {freeShippingLeft === 0 ? (
                    <strong className="text-emerald-700">
                      You've unlocked free express courier shipping!
                    </strong>
                  ) : (
                    <span>
                      Add <strong className="text-neutral-900">${freeShippingLeft}</strong> more
                      to qualify for complimentary global shipping.
                    </span>
                  )}
                </span>
              </div>
              <span className="text-neutral-500">{freeShippingProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items Box */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs divide-y divide-neutral-100">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs space-y-6 sticky top-24">
          <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900">
            Order Summary
          </h2>

          {/* Cost Breakdown */}
          <div className="space-y-3 text-xs text-neutral-600 border-b border-neutral-100 pb-4">
            <div className="flex justify-between">
              <span>Items Subtotal ({totalItems})</span>
              <span className="font-semibold text-neutral-900">${subtotal}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promotional Discount</span>
                <span>-${discount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  `$${shipping}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="text-neutral-900">${estimatedTax}</span>
            </div>
          </div>

          {/* Promo Code Form */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Promotional Code
            </span>
            {appliedPromo ? (
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-900 font-medium">
                <div className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{appliedPromo} Applied</span>
                </div>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-xs text-rose-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  id="promo-code-input"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="e.g. NOVA10"
                  className="w-full uppercase rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium focus:border-cyan-500 focus:outline-none"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>
            )}
            {promoError && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                <span>{promoError}</span>
              </p>
            )}
            <p className="text-[11px] text-neutral-400">
              Hint: Try promo code <code className="font-bold text-neutral-700">NOVA10</code> for 10% off.
            </p>
          </div>

          {/* Total Amount */}
          <div className="border-t border-neutral-100 pt-4 flex items-baseline justify-between">
            <span className="text-base font-bold text-neutral-900">Total Due</span>
            <div className="text-right">
              <span className="text-2xl font-black text-neutral-950">${total}</span>
              <span className="block text-[11px] text-neutral-400">USD with all taxes included</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <Button
            id="cart-proceed-checkout-btn"
            variant="primary"
            size="lg"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate('checkout')}
          >
            Proceed to Checkout
          </Button>

          <p className="text-center text-[11px] text-neutral-400">
            Encrypted 256-bit checkout simulation.
          </p>
        </div>
      </div>
    </div>
  );
}
