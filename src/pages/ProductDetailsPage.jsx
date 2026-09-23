import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Share2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function ProductDetailsPage({
  productId,
  onNavigate,
  onSelectProduct,
  onSelectCategory
}) {
  const { addToCart, showToast } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  // Find product by id
  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  }, [productId]);

  // Reset image index and quantity when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Related products from same category or random top picks
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  }, [product]);

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    onNavigate('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'info');
    }
  };

  return (
    <div id="product-details-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hover:text-cyan-700 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="hover:text-cyan-700 transition-colors"
        >
          Shop
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
        <button
          type="button"
          onClick={() => {
            onSelectCategory(product.category);
            onNavigate('shop');
          }}
          className="hover:text-cyan-700 transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
        <span className="font-semibold text-neutral-900 truncate max-w-xs sm:max-w-sm">
          {product.title}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[540px] shrink-0">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-neutral-950 ring-2 ring-neutral-950/20'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Hero Image */}
          <div className="relative aspect-square flex-1 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-sm">
            <img
              src={galleryImages[activeImageIndex] || product.image}
              alt={product.title}
              className="h-full w-full object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-md bg-neutral-950/90 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-xs">
                {product.badge}
              </span>
            )}
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share product"
              className="absolute top-4 right-4 rounded-xl bg-white/90 p-2.5 text-neutral-600 shadow-xs hover:bg-white hover:text-neutral-950 transition-colors backdrop-blur-md"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-neutral-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-neutral-900">{product.rating.rate}</span>
              <span className="text-neutral-400">({product.rating.count} verified reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-neutral-950">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-base text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.originalPrice && (
              <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-semibold">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* In Stock Indicator */}
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>In Stock – Dispatches within 24 hours</span>
          </div>

          {/* Description */}
          <div className="mt-6 border-t border-neutral-100 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              Design & Architecture
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Features Bullet List */}
          {product.features && product.features.length > 0 && (
            <div className="mt-6 border-t border-neutral-100 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                Key Features
              </h3>
              <ul className="space-y-2 text-xs text-neutral-600">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity & CTA Section */}
          <div className="mt-8 border-t border-neutral-100 pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-neutral-700">Quantity</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => Math.min(99, q + 1))}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                id="product-add-to-cart-btn"
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1"
                icon={isAdded ? Check : ShoppingBag}
              >
                {isAdded ? 'Added to Cart' : `Add to Cart • $${product.price * quantity}`}
              </Button>

              <Button
                id="product-buy-now-btn"
                variant="accent"
                size="lg"
                onClick={handleBuyNow}
                className="sm:w-44"
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Trust Value Badges */}
          <div className="mt-8 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-5 space-y-3">
            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <Truck className="h-4 w-4 text-cyan-600 shrink-0" />
              <span>Free express courier shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <RotateCcw className="h-4 w-4 text-cyan-600 shrink-0" />
              <span>30-day effortless risk-free trial and returns</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-700">
              <ShieldCheck className="h-4 w-4 text-cyan-600 shrink-0" />
              <span>Official 2-year manufacturer precision warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      {product.specs && (
        <div className="mb-20 rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
          <h2 className="font-display text-xl font-bold tracking-tight text-neutral-900 mb-6">
            Technical Specifications
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
            {Object.entries(product.specs).map(([specKey, specVal]) => (
              <div
                key={specKey}
                className="flex justify-between py-2.5 border-b border-neutral-100"
              >
                <dt className="text-neutral-500 font-medium">{specKey}</dt>
                <dd className="text-neutral-900 font-semibold text-right">{specVal}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
                Coordinated Ecosystem
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 mt-1">
                Related Equipment
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={ChevronRight}
              iconPosition="right"
              onClick={() => {
                onSelectCategory(product.category);
                onNavigate('shop');
              }}
            >
              View More in {product.category}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
