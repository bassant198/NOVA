import React from 'react';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../context/CartContext';

export default function CartItem({ item, onSelectProduct }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div
      id={`cart-item-${product.id}`}
      className="flex gap-4 py-4 border-b border-neutral-100 last:border-b-0"
    >
      {/* Product Thumbnail */}
      <div
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 cursor-pointer border border-neutral-200/60"
        onClick={() => onSelectProduct && onSelectProduct(product.id)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform hover:scale-105"
        />
      </div>

      {/* Info & Quantity */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              {product.category}
            </span>
            <h4
              onClick={() => onSelectProduct && onSelectProduct(product.id)}
              className="text-sm font-medium text-neutral-900 leading-snug line-clamp-1 hover:text-cyan-700 cursor-pointer"
            >
              {product.title}
            </h4>
          </div>

          <button
            type="button"
            id={`remove-cart-item-${product.id}`}
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.title} from cart`}
            className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => updateQuantity(product.id, quantity + 1)}
            onDecrease={() => updateQuantity(product.id, quantity - 1)}
            size="sm"
          />

          <div className="text-right">
            <span className="text-sm font-bold text-neutral-900">
              ${product.price * quantity}
            </span>
            {quantity > 1 && (
              <span className="block text-[11px] text-neutral-400">
                ${product.price} each
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
