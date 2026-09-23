import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  Truck,
  CheckCircle2,
  Wallet,
  Building,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function CheckoutPage({ onNavigate, onOrderSuccess }) {
  const { items, subtotal, shipping, discount, estimatedTax, total, clearCart } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'card', // 'card' | 'wallet' | 'cod'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardHolder: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to shop
  if (items.length === 0) {
    return (
      <div id="checkout-empty" className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-neutral-500 mb-6">
          Add some items before proceeding to checkout.
        </p>
        <Button variant="primary" onClick={() => onNavigate('shop')}>
          Go to Shop
        </Button>
      </div>
    );
  }

  const shippingCost = formData.shippingMethod === 'express' ? 15 : shipping;
  const finalOrderTotal = Math.max(0, subtotal - discount + shippingCost + estimatedTax);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatting for card number (auto spaced every 4 digits)
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'cardExpiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length >= 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
    } else if (name === 'cardCvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    // Clear error on input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Valid phone number is required for shipping updates';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal / ZIP code is required';
    }

    if (formData.paymentMethod === 'card') {
      const rawCard = formData.cardNumber.replace(/\s/g, '');
      if (rawCard.length < 15) {
        newErrors.cardNumber = 'Valid 16-digit card number required';
      }
      if (formData.cardExpiry.length < 5) {
        newErrors.cardExpiry = 'MM/YY required';
      }
      if (formData.cardCvc.length < 3) {
        newErrors.cardCvc = '3 or 4 digits';
      }
      if (!formData.cardHolder.trim()) {
        newErrors.cardHolder = 'Cardholder name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement delay
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder = {
        orderNumber: `NV-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state || ''} ${formData.postalCode}, ${formData.country}`
        },
        shippingMethod: formData.shippingMethod === 'express' ? 'Express Worldwide Courier' : 'Standard Insured Delivery',
        paymentMethod:
          formData.paymentMethod === 'card'
            ? `Card ending in ${formData.cardNumber.slice(-4) || '4242'}`
            : formData.paymentMethod === 'wallet'
            ? 'Digital Wallet'
            : 'Cash on Delivery',
        items: [...items],
        subtotal,
        discount,
        shipping: shippingCost,
        tax: estimatedTax,
        total: finalOrderTotal
      };

      clearCart();
      if (onOrderSuccess) {
        onOrderSuccess(generatedOrder);
      }
    }, 1500);
  };

  const handleFillDemoData = () => {
    setFormData({
      email: 'alex.rivera@designstudio.io',
      phone: '+1 (415) 890-2134',
      firstName: 'Alex',
      lastName: 'Rivera',
      address: '742 Mission Street',
      apartment: 'Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
      shippingMethod: 'standard',
      paymentMethod: 'card',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: '12/28',
      cardCvc: '888',
      cardHolder: 'Alex Rivera'
    });
    setErrors({});
  };

  return (
    <div id="checkout-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Demo Notice Banner */}
      <div className="mb-8 rounded-2xl border border-cyan-200 bg-cyan-50/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-cyan-900">
              Demo Checkout Simulation
            </span>
            <p className="text-xs text-cyan-800/90 leading-relaxed mt-0.5">
              This is a portfolio demonstration for Junior Frontend Developer evaluation. No real payment
              or financial charge will occur.
            </p>
          </div>
        </div>

        <button
          type="button"
          id="fill-demo-details-btn"
          onClick={handleFillDemoData}
          className="shrink-0 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-cyan-700 transition-colors"
        >
          Fill Demo Details
        </button>
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={() => onNavigate('cart')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Shopping Cart</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Checkout Form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-10">
          {/* Step 1: Customer Contact */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900">
                1. Customer Contact
              </h2>
              <span className="text-xs text-neutral-400">Order verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="checkout-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="alex.creator@example.com"
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                    errors.email
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="checkout-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 019-2834"
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                    errors.phone
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-rose-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900">
                2. Shipping Address
              </h2>
              <span className="text-xs text-neutral-400">Physical destination</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="checkout-firstname"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Alex"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.firstName
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="checkout-lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Vance"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.lastName
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="checkout-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="742 Evergreen Terrace"
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                    errors.address
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-[11px] text-rose-500">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Apt / Suite / Unit
                  </label>
                  <input
                    type="text"
                    id="checkout-apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Suite 4B (Optional)"
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    id="checkout-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="San Francisco"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.city
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Postal / ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="checkout-postalcode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="94107"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.postalCode
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Country / Region
                </label>
                <select
                  id="checkout-country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-medium text-neutral-900 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Shipping Method Radio */}
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Shipping Carrier Service
              </h3>
              <div className="space-y-2.5">
                <label className="flex items-center justify-between rounded-xl border border-neutral-200 p-3.5 text-xs cursor-pointer hover:border-neutral-300">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                      className="accent-cyan-600 h-4 w-4"
                    />
                    <div>
                      <span className="font-semibold text-neutral-900">Standard Insured Transit</span>
                      <p className="text-[11px] text-neutral-500">3-5 business days via Courier</p>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-900">
                    {shipping === 0 ? 'FREE' : `$${shipping}`}
                  </span>
                </label>

                <label className="flex items-center justify-between rounded-xl border border-neutral-200 p-3.5 text-xs cursor-pointer hover:border-neutral-300">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                      className="accent-cyan-600 h-4 w-4"
                    />
                    <div>
                      <span className="font-semibold text-neutral-900">NOVA Priority Air Courier</span>
                      <p className="text-[11px] text-neutral-500">1-2 business days with signature release</p>
                    </div>
                  </div>
                  <span className="font-semibold text-neutral-900">$15</span>
                </label>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method UI */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
              <h2 className="font-display text-lg font-bold tracking-tight text-neutral-900">
                3. Payment Method
              </h2>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                <Lock className="h-3 w-3" />
                <span>Simulated Sandbox</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <CreditCard className="h-4 w-4" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'wallet' }))}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition-all ${
                  formData.paymentMethod === 'wallet'
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Wallet className="h-4 w-4" />
                <span>Apple / Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cod' }))}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold gap-1.5 transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Building className="h-4 w-4" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    id="checkout-cardholder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleInputChange}
                    placeholder="Alex Vance"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.cardHolder
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.cardHolder && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.cardHolder}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Card Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="checkout-cardnumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4532 8901 2345 6789"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                        errors.cardNumber
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                      }`}
                    />
                    <CreditCard className="absolute right-3.5 top-2.5 h-4 w-4 text-neutral-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="checkout-cardexpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                        errors.cardExpiry
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                      }`}
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 text-[11px] text-rose-500">{errors.cardExpiry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      CVC / CVV *
                    </label>
                    <input
                      type="password"
                      id="checkout-cardcvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="842"
                      maxLength={4}
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                        errors.cardCvc
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                      }`}
                    />
                    {errors.cardCvc && (
                      <p className="mt-1 text-[11px] text-rose-500">{errors.cardCvc}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'wallet' && (
              <div className="rounded-2xl bg-neutral-50 p-6 text-center text-xs text-neutral-600 border border-neutral-200">
                <p className="font-semibold text-neutral-900 mb-1">
                  Instant One-Touch Payment Ready
                </p>
                <p>
                  Upon placing the order, your browser's native biometrics (Apple Pay / Google Wallet)
                  will confirm the authorization token.
                </p>
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div className="rounded-2xl bg-neutral-50 p-6 text-center text-xs text-neutral-600 border border-neutral-200">
                <p className="font-semibold text-neutral-900 mb-1">
                  Cash or Card on Courier Arrival
                </p>
                <p>
                  You will inspect and pay our authorized international courier upon physical delivery
                  to your door.
                </p>
              </div>
            )}
          </div>

          {/* Place Order CTA Button */}
          <div className="pt-2">
            <Button
              id="checkout-place-order-btn"
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              Place Order • ${finalOrderTotal} USD
            </Button>
            <p className="text-center text-[11px] text-neutral-400 mt-3">
              By placing your order, you agree to NOVA's 30-Day trial terms and warranty policy.
            </p>
          </div>
        </form>

        {/* Right: Order Summary Sticky Sidebar */}
        <div className="lg:col-span-5 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs sticky top-24">
          <h3 className="font-display text-lg font-bold tracking-tight text-neutral-900 pb-4 border-b border-neutral-100">
            Order Review ({items.length} items)
          </h3>

          {/* Items Preview */}
          <div className="py-4 divide-y divide-neutral-100 max-h-72 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200/80">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-0 right-0 rounded-bl bg-neutral-900 px-1 py-0.2 text-[9px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 line-clamp-1">
                      {item.product.title}
                    </p>
                    <p className="text-[11px] text-neutral-400">{item.product.category}</p>
                  </div>
                </div>
                <span className="font-bold text-neutral-900 whitespace-nowrap">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">${subtotal}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promo Discount</span>
                <span>-${discount}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping ({formData.shippingMethod})</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-emerald-600 font-semibold">FREE</span>
                ) : (
                  `$${shippingCost}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span className="text-neutral-900">${estimatedTax}</span>
            </div>
          </div>

          {/* Final Total */}
          <div className="border-t border-neutral-200 mt-4 pt-4 flex items-baseline justify-between">
            <span className="text-sm font-bold text-neutral-900">Total Amount</span>
            <div className="text-right">
              <span className="text-2xl font-black text-neutral-950">${finalOrderTotal}</span>
              <span className="block text-[11px] text-neutral-400">USD Guaranteed</span>
            </div>
          </div>

          {/* Safety Guarantees */}
          <div className="mt-6 rounded-2xl bg-neutral-50 p-4 space-y-2 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2 text-neutral-700 font-medium">
              <ShieldCheck className="h-4 w-4 text-cyan-600" />
              <span>Full Buyer Protection Included</span>
            </div>
            <p>
              Your order is packaged in climate-neutral FSC-certified cardboard and insured for its
              entire transit journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
