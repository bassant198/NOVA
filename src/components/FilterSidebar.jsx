import React from 'react';
import { RotateCcw, SlidersHorizontal, Star, Check } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  maxAvailablePrice = 500,
  sortBy,
  onSortChange,
  minRating,
  onRatingChange,
  categoryCounts = {},
  onResetFilters,
  activeFilterCount = 0,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) {
  return (
    <aside
      id="catalog-filter-sidebar"
      className={`flex flex-col gap-6 ${
        isMobileDrawer ? 'p-6' : 'w-full lg:w-64 shrink-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-cyan-600" />
          <h2 className="text-base font-semibold text-neutral-900 tracking-tight">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </h2>
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            id="reset-filters-btn"
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-medium text-cyan-700 hover:text-cyan-900 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sort Section */}
      <div>
        <label
          htmlFor="catalog-sort-select"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5"
        >
          Sort Products
        </label>
        <select
          id="catalog-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm font-medium text-neutral-800 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-xs cursor-pointer"
        >
          <option value="featured">Featured Picks</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
          Categories
        </h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] ?? 0;

            return (
              <button
                key={cat}
                type="button"
                id={`filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectCategory(cat)}
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all text-left ${
                  isSelected
                    ? 'bg-neutral-900 text-white font-medium shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-neutral-800 text-neutral-300'
                      : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Max Price
          </h3>
          <span className="text-sm font-bold text-neutral-900">
            ${priceRange}
          </span>
        </div>
        <input
          type="range"
          id="price-range-slider"
          min="30"
          max={maxAvailablePrice}
          step="10"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-cyan-600 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-neutral-400 mt-1">
          <span>$30</span>
          <span>${maxAvailablePrice}</span>
        </div>
      </div>

      {/* Rating Filter Section */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2.5">
          Minimum Rating
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Any', value: 0 },
            { label: '4.5 & up', value: 4.5 },
            { label: '4.7 & up', value: 4.7 },
            { label: '4.9 & up', value: 4.9 }
          ].map((item) => {
            const isSelected = minRating === item.value;
            return (
              <button
                key={item.value}
                type="button"
                id={`filter-rating-${item.value}`}
                onClick={() => onRatingChange(item.value)}
                className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 px-2 text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/50 text-cyan-950 font-semibold'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {item.value > 0 && (
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isMobileDrawer && (
        <div className="mt-auto pt-6 border-t border-neutral-200">
          <button
            type="button"
            onClick={onCloseMobileDrawer}
            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white shadow-xs hover:bg-neutral-800"
          >
            Apply & View Results
          </button>
        </div>
      )}
    </aside>
  );
}
