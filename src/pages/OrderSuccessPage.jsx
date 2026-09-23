import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck, Calendar, MapPin } from 'lucide-react';
import Button from '../components/Button';

export default function OrderSuccessPage({ order, onNavigate }) {
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">No Active Order Found</h2>
        <p className="text-sm text-neutral-500 mb-6">
          You haven't placed an order in this session yet.
        </p>
        <Button variant="primary" onClick={() => onNavigate('shop')}>
          Browse Hardware Collection
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="order-success-page" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Top Celebratory Header */}
      <div className="text-center mb-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 mb-6 border border-emerald-200 shadow-sm">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
          <PackageCheck className="h-3.5 w-3.5" />
          <span>Payment & Order Confirmed</span>
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Order Placed Successfully
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Thank you for choosing NOVA. A confirmation email has been dispatched to{' '}
          <strong className="text-neutral-900 font-semibold">{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Order Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-neutral-100 text-xs">
          <div>
            <span className="text-neutral-400 block mb-1 font-medium">Order Number</span>
            <span className="font-bold text-neutral-900 text-sm">{order.orderNumber}</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1 font-medium">Order Date</span>
            <span className="font-semibold text-neutral-900">{order.date}</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1 font-medium">Est. Delivery</span>
            <span className="font-semibold text-neutral-900">3–5 Business Days</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-1 font-medium">Payment Method</span>
            <span className="font-semibold text-neutral-900">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Shipping Destination Summary */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-150 text-xs text-neutral-600">
          <MapPin className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-neutral-900 block mb-0.5">
              Delivering to {order.customer.name}
            </span>
            <p className="text-neutral-600 leading-relaxed">{order.customer.address}</p>
            <p className="text-neutral-500 mt-1">Phone: {order.customer.phone}</p>
          </div>
        </div>

        {/* Purchased Items List */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
            Hardware Enclosed ({order.items.length} items)
          </h3>
          <div className="divide-y divide-neutral-100 border rounded-2xl border-neutral-100 p-2">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <span className="text-neutral-400">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-neutral-900">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Breakdown */}
        <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-900">${order.subtotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Promo Discount</span>
              <span>-${order.discount}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Sales Tax</span>
            <span>${order.tax}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm font-bold text-neutral-900">
            <span>Total Paid</span>
            <span className="text-lg font-black">${order.total} USD</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            id="print-receipt-btn"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print or Save Receipt</span>
          </button>

          <Button
            id="success-continue-shopping-btn"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate('shop')}
          >
            Continue Exploring
          </Button>
        </div>
      </div>
    </div>
  );
}
