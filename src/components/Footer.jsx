import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Footer({ onNavigate, onSelectCategory }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="main-footer" className="border-t border-neutral-200 bg-neutral-950 text-neutral-300">
      {/* Brand Value Pillars */}
      <div className="border-b border-neutral-850 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Global Express Courier</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Tracked international transit. Free on orders above $100.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">30-Day Risk-Free Trial</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Experience NOVA in your daily routine. Seamless returns if unsatisfied.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">2-Year Precision Warranty</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                Every unit is engineered to aircraft tolerances and backed comprehensively.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-cyan-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Sustainable Metallurgy</h4>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                100% recycled aerospace alloys and plastic-free unboxing packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500 text-neutral-950 font-bold">
                N
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                NOVA
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-6">
              Precision-machined lifestyle goods, acoustic monitors, and everyday essentials.
              Stripped of superfluous ornament, engineered for enduring utility.
            </p>

            {/* Newsletter Subscription */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Join the NOVA Dispatch
              </h4>
              <p className="text-xs text-neutral-400 mb-3">
                Early access to hardware drops, firmware revisions, and design essays.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-xl bg-neutral-900 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Welcome to the registry. Check your inbox for confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex max-w-md gap-2">
                    <input
                      type="email"
                      id="newsletter-email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                    <button
                      type="submit"
                      id="newsletter-submit-btn"
                      aria-label="Subscribe to newsletter"
                      className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && <p className="text-[11px] text-rose-400">{error}</p>}
                </form>
              )}
            </div>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('shop');
                    }}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Category Index
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Customer Support
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Warranty Registration
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  FAQ & Guides
                </button>
              </li>
              <li>
                <span className="text-neutral-500">support@nova-concept.store</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} NOVA Industries Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
            <span className="text-cyan-400/80">Frontend Portfolio Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
