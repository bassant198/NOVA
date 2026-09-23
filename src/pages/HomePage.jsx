import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, Flame, CheckCircle2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/Button';
import { PRODUCTS, CATEGORY_META } from '../data/products';

export default function HomePage({ onNavigate, onSelectProduct, onSelectCategory }) {
  // Featured products (top 8 picks with badges or high ratings)
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div id="home-page" className="flex flex-col">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative overflow-hidden bg-neutral-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32"
      >
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        {/* Ambient radial glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-500/15 via-cyan-950/5 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1.5 text-xs font-medium text-cyan-400 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Gen Minimalist Collection 2026</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Aesthetics of <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-cyan-400">
                  Engineered Precision.
                </span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
                Discover unibody audio monitors, aerospace titanium wearables, and tactile workspace
                essentials machined for deliberate, uncluttered daily workflow.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  id="hero-shop-collection-btn"
                  variant="accent"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto"
                >
                  Explore Collection
                </Button>

                <Button
                  id="hero-categories-btn"
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('categories')}
                  className="w-full sm:w-auto text-neutral-300 border-neutral-700 hover:bg-neutral-900 hover:text-white"
                >
                  Browse Categories
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-neutral-850 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>Aerospace-Grade Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>30-Day In-Hand Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>Worldwide Courier Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-cyan-950/20">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
                    alt="NOVA Aether Acoustic Headphones"
                    className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-6 inset-x-6 rounded-2xl border border-white/10 bg-neutral-950/70 p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                          Flagship Model
                        </span>
                        <h4 className="text-sm font-semibold text-white">
                          NOVA Aether Acoustics
                        </h4>
                        <p className="text-xs text-neutral-400">Lossless 42h ANC Wireless</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-white">$349</span>
                        <button
                          type="button"
                          onClick={() => onSelectProduct('nova-01')}
                          className="block text-[11px] font-semibold text-cyan-400 hover:underline mt-0.5"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section id="popular-categories-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
              Curation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
              Engineered Product Disciplines
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('categories')}
            className="group flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-cyan-700 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORY_META.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              onSelectCategory={(catName) => {
                onSelectCategory(catName);
                onNavigate('shop');
              }}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section id="featured-products-section" className="bg-neutral-100/70 py-20 border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
                Handpicked Hardware
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
                Featured Highlights
              </h2>
            </div>
            <Button
              variant="outline"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('shop')}
            >
              Browse Full Catalog (24)
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner: The Obsidian Series */}
      <section id="promo-banner-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white p-8 sm:p-12 lg:p-16">
          {/* Subtle Ambient Radial */}
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-md bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Flame className="h-3.5 w-3.5" />
                <span>Special Release Drop</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                The Obsidian Workspace Collection. <br />
                Solid Anodized Metal.
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                Every detail sculpted from single blocks of 6063 aerospace aluminum. High tactile resonance,
                integrated cable channels, and zero-distraction matte black sandblasted finish.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => {
                    onSelectCategory('Desk & Workspace');
                    onNavigate('shop');
                  }}
                >
                  Explore Workspace Essentials
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-xl max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
                  alt="NOVA Helix Mechanical Keyboard"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-neutral-400">NOVA Helix 75% Keyboard</p>
                    <p className="text-sm font-bold text-white">$215 USD</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectProduct('nova-04')}
                    className="text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    View Specs →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Shop With NOVA" Section */}
      <section id="why-shop-section" className="bg-white py-20 border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
              The NOVA Standard
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 mt-2">
              Why Discerning Creators Choose NOVA
            </h2>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              We reject transient consumer trends in favor of industrial longevity, tactile feedback,
              and sustainable modularity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400 mb-6">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Uncompromising Engineering
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                From titanium unibody casings to custom planar magnetic diaphragms, every component is
                tested under strict physical tolerances before leaving our production cleanrooms.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400 mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                30-Day Zero-Risk Experience
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Test any device in your personal acoustic and workflow environment. If it doesn't immediately
                elevate your everyday setup, return it with our complimentary courier pickup.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400 mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Pure Architectural Minimalism
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Free of obnoxious logos, gaudy RGB lights, or disposable plastics. Designed to seamlessly
                integrate into sophisticated interior architecture and creative studios.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
