import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = 99, size = 'default' }) {
  const isSmall = size === 'sm';

  return (
    <div
      id="quantity-selector"
      className={`inline-flex items-center rounded-lg border border-neutral-200 bg-white ${
        isSmall ? 'p-0.5' : 'p-1'
      } shadow-xs`}
    >
      <button
        type="button"
        id="quantity-decrease-btn"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-30 disabled:hover:bg-transparent ${
          isSmall ? 'h-7 w-7' : 'h-9 w-9'
        }`}
      >
        <Minus className={isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>

      <span
        id="quantity-display"
        className={`text-center font-medium text-neutral-900 select-none ${
          isSmall ? 'w-8 text-xs' : 'w-12 text-sm'
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        id="quantity-increase-btn"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 disabled:opacity-30 disabled:hover:bg-transparent ${
          isSmall ? 'h-7 w-7' : 'h-9 w-9'
        }`}
      >
        <Plus className={isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </button>
    </div>
  );
}
