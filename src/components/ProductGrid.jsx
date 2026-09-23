import React from 'react';
import ProductCard from './ProductCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

export default function ProductGrid({
  products = [],
  isLoading = false,
  onSelectProduct,
  onResetFilters,
  emptyTitle,
  emptyDescription
}) {
  if (isLoading) {
    return <LoadingState count={8} type="grid" />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || "No products found"}
        description={emptyDescription || "No products match your active search filters. Try clearing or expanding your query."}
        onAction={onResetFilters}
        actionLabel="Clear Filters"
      />
    );
  }

  return (
    <div
      id="product-grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}
