import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, onSelectCategory }) {
  return (
    <div
      id={`category-card-${category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      onClick={() => onSelectCategory(category.name)}
      className="group relative overflow-hidden rounded-2xl bg-neutral-900 aspect-4/5 cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl"
    >
      {/* Background Image with Dark Vignette */}
      <img
        src={category.image}
        alt={category.name}
        className="h-full w-full object-cover object-center opacity-70 transition-transform duration-700 ease-out group-hover:scale-108 group-hover:opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

      {/* Card Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {category.count} Products
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition-transform duration-300 group-hover:bg-cyan-500 group-hover:text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <h3 className="mt-2 text-xl font-bold text-white tracking-tight leading-snug">
          {category.name}
        </h3>

        <p className="mt-1 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
          {category.tagline}
        </p>
      </div>
    </div>
  );
}
