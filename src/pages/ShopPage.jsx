import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import Button from '../components/Button';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function ShopPage({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  searchQuery,
  setSearchQuery
}) {
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('featured');
  const [minRating, setMinRating] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts = { All: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = PRODUCTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating.rate < minRating) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesFeatures = product.features?.some((f) => f.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesFeatures) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating.rate - a.rating.rate;
      }
      if (sortBy === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      // Featured / default
      return 0;
    });
  }, [selectedCategory, priceRange, minRating, searchQuery, sortBy]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (priceRange < 500) count++;
    if (minRating > 0) count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, priceRange, minRating, searchQuery]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    setPriceRange(500);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div id="shop-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Page Title */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
          Curated Inventory
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-2xl">
          Browse the complete catalog of precision instruments, tactile workspace gear, and
          engineered carry essentials.
        </p>
      </div>

      {/* Quick Category Tabs for Fast Filter on Desktop/Tablet */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar border-b border-neutral-200/80">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              id={`quick-cat-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white border border-neutral-200/80 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60 text-[11px]">
                ({categoryCounts[cat] ?? 0})
              </span>
            </button>
          );
        })}
      </div>

      {/* Top Search & Filter Bar Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
        <div className="w-full sm:max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search products by name, audio, titanium..."
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Mobile Filter Sheet Button */}
          <button
            type="button"
            id="mobile-filter-open-btn"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-50"
          >
            <Filter className="h-4 w-4 text-cyan-600" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Product Count Display */}
          <div className="text-xs font-medium text-neutral-600">
            Showing <span className="font-bold text-neutral-900">{filteredProducts.length}</span> of {PRODUCTS.length} products
          </div>

          {/* Desktop Sort Dropdown */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-neutral-500 whitespace-nowrap">Sort by:</span>
            <select
              id="desktop-shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-900 focus:border-cyan-500 focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Top Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-neutral-500 font-medium">Active filters:</span>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-200/80 px-2.5 py-1 text-neutral-800">
              Category: {selectedCategory}
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {priceRange < 500 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-200/80 px-2.5 py-1 text-neutral-800">
              Under ${priceRange}
              <button
                type="button"
                onClick={() => setPriceRange(500)}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-200/80 px-2.5 py-1 text-neutral-800">
              Rating: {minRating}+ Stars
              <button
                type="button"
                onClick={() => setMinRating(0)}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-neutral-200/80 px-2.5 py-1 text-neutral-800">
              Keyword: "{searchQuery}"
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="hover:text-rose-600 ml-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            id="clear-all-filter-chips-btn"
            onClick={handleResetFilters}
            className="text-cyan-700 hover:text-cyan-900 hover:underline font-semibold ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Layout: Filter Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-64 shrink-0 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xs">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            maxAvailablePrice={500}
            sortBy={sortBy}
            onSortChange={setSortBy}
            minRating={minRating}
            onRatingChange={setMinRating}
            categoryCounts={categoryCounts}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 w-full">
          <ProductGrid
            products={filteredProducts}
            onSelectProduct={onSelectProduct}
            onResetFilters={handleResetFilters}
            emptyTitle={`No products match your criteria`}
            emptyDescription={
              searchQuery
                ? `We couldn't find any products matching "${searchQuery}". Check the spelling or reset your filters.`
                : `No products found within this price range or category. Try resetting your filters.`
            }
          />
        </div>
      </div>

      {/* Mobile Filter Modal / Drawer */}
      {isMobileFilterOpen && (
        <div
          id="mobile-filter-sheet"
          className="fixed inset-0 z-50 flex bg-neutral-950/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="ml-auto flex h-full w-full max-w-xs flex-col bg-white shadow-2xl animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
              <h3 className="text-base font-semibold text-neutral-900">Filters</h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  onSelectCategory(cat);
                  setIsMobileFilterOpen(false);
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                maxAvailablePrice={500}
                sortBy={sortBy}
                onSortChange={setSortBy}
                minRating={minRating}
                onRatingChange={setMinRating}
                categoryCounts={categoryCounts}
                onResetFilters={handleResetFilters}
                activeFilterCount={activeFilterCount}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
