import React from 'react';
import { ArrowRight, Compass, Shield, Sliders, Layers, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export default function AboutPage({ onNavigate }) {
  return (
    <div id="about-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      {/* Intro Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
          The NOVA Philosophy
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mt-2 leading-[1.15]">
          Stripping away the superfluous. <br />
          Engineering for tactile longevity.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-neutral-600 leading-relaxed">
          Founded on the conviction that everyday consumer hardware has become disposable, loud,
          and bloated with distracting features. NOVA designs tools for physical presence—unibody
          chassis, tactile feedback, and timeless industrial aesthetics.
        </p>
      </div>

      {/* Hero Visual Collage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
            alt="Precision CNC milling workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-medium text-white">
              Sub-millimeter CNC tolerances in anodized alloys
            </span>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <img
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80"
            alt="Acoustic tuning and optical design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent flex items-end p-6">
            <span className="text-xs font-medium text-white">
              Acoustic dampening and non-reflective optical lenses
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Principles Grid */}
      <div className="mb-20">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
            Core Tenets
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
            Our Architectural Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-cyan-400 mb-6">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Form Follows Physical Intention
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every curve, chamfer, and texture serves a functional purpose: guiding the hand,
              dissipating thermal buildup, or reducing mechanical fatigue over long creative hours.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-cyan-400 mb-6">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Responsible Metallurgy
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We machine our chassis from recycled 6063 aerospace aluminum and Grade 5 titanium,
              avoiding brittle single-use polymers that degrade into microplastics.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-cyan-400 mb-6">
              <Sliders className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Tactile Friction & Audio Resonance
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Digital screens isolate us from physical feedback. NOVA hardware reintroduces weighted
              rotary dials, tactile mechanical switches, and natural soundboards.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-cyan-400 mb-6">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Repairable & Upgradable Architecture
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We design with standard hex screws, replaceable lithium cells, and modular cables.
              Your investment is built to survive operating system upgrades and generational cycles.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-neutral-950 p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Experience the Collection
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Explore 24 engineered tools designed for the modern workspace and personal transit.
          </p>
        </div>
        <Button
          variant="accent"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => onNavigate('shop')}
        >
          Browse All Products
        </Button>
      </div>
    </div>
  );
}
