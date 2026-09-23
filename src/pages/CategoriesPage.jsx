import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { CATEGORY_META } from '../data/products';

export default function CategoriesPage({ onNavigate, onSelectCategory }) {
  return (
    <div id="categories-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
          Structural Taxonomies
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-2">
          Product Categories
        </h1>
        <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
          Explore our products categorized by discipline—from lossless acoustics and titanium wearables
          to engineered desktop fixtures.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORY_META.map((category) => (
          <div key={category.name} className="flex flex-col">
            <CategoryCard
              category={category}
              onSelectCategory={(catName) => {
                onSelectCategory(catName);
                onNavigate('shop');
              }}
            />
            <div className="mt-4 flex items-center justify-between px-2">
              <span className="text-xs text-neutral-500 font-medium">
                {category.tagline}
              </span>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory(category.name);
                  onNavigate('shop');
                }}
                className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 hover:underline"
              >
                Shop ({category.count}) →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
