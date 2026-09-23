import React from 'react';
import { PackageSearch, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = "No products found",
  description = "Try adjusting your search criteria or resetting filters to explore the catalog.",
  actionLabel = "Reset Filters",
  onAction,
  icon: Icon = PackageSearch
}) {
  return (
    <div
      id="empty-state-container"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/60 px-6 py-16 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xs border border-neutral-200/80 mb-4 text-neutral-500">
        <Icon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 tracking-tight mb-1">
        {title}
      </h3>
      <p className="max-w-md text-sm text-neutral-500 mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button
          id="empty-state-action-btn"
          variant="outline"
          size="md"
          icon={RefreshCw}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
