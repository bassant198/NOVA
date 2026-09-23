import React, { useState } from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    }
  };

  return (
    <article
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        <img
          src={imgSrc}
          alt={product.title}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="inline-flex items-center rounded-md bg-neutral-900/90 backdrop-blur-xs px-2.5 py-1 text-xs font-medium tracking-wide text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="inline-flex items-center rounded-md bg-cyan-500/90 backdrop-blur-xs px-2 py-0.5 text-xs font-semibold tracking-wide text-neutral-950">
              SAVE ${product.originalPrice - product.price}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-neutral-800">{product.rating.rate}</span>
            <span className="text-neutral-400">({product.rating.count})</span>
          </div>
        </div>

        <h3 className="font-medium text-neutral-900 leading-snug tracking-tight line-clamp-1 group-hover:text-cyan-700 transition-colors">
          {product.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price & Add to Cart Button */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-neutral-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            aria-label={`Add ${product.title} to cart`}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-900 hover:text-white active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
