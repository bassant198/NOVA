import React from 'react';

export default function LoadingState({ count = 6, type = 'grid' }) {
  if (type === 'detail') {
    return (
      <div id="loading-detail-state" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square w-full rounded-2xl bg-neutral-200" />
          <div className="space-y-4">
            <div className="h-6 w-24 rounded bg-neutral-200" />
            <div className="h-10 w-3/4 rounded bg-neutral-200" />
            <div className="h-8 w-32 rounded bg-neutral-200" />
            <div className="h-24 w-full rounded bg-neutral-200" />
            <div className="h-12 w-48 rounded-xl bg-neutral-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="loading-grid-state" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-neutral-200/70 bg-white p-4 animate-pulse shadow-xs"
        >
          <div className="aspect-square w-full rounded-xl bg-neutral-200 mb-4" />
          <div className="h-3.5 w-20 rounded bg-neutral-200 mb-2" />
          <div className="h-5 w-4/5 rounded bg-neutral-200 mb-2" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-6 w-16 rounded bg-neutral-200" />
            <div className="h-9 w-20 rounded-xl bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
