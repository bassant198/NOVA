import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import Button from '../components/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'product-inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion active state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      question: "What is NOVA's 30-Day Risk-Free Trial policy?",
      answer: "You have 30 calendar days from the date of physical receipt to test any NOVA device in your personal acoustic and workspace environment. If you are not completely satisfied, initiate a return from your account for a 100% refund with prepaid courier pickup."
    },
    {
      question: "How long does global express delivery take?",
      answer: "All orders placed before 14:00 UTC dispatch same-day from our climate-controlled fulfillment hubs. Standard courier takes 3-5 business days; Priority Air Courier takes 1-2 business days with full door-to-door tracking."
    },
    {
      question: "Are NOVA mechanical keyboards and audio gear compatible with macOS and Windows?",
      answer: "Yes. All NOVA products feature native dual-OS toggle switches, universal USB-C HID compliance, and cross-platform Bluetooth 5.4 LE connectivity."
    },
    {
      question: "How does the 2-Year Precision Warranty work?",
      answer: "Every hardware unit is serial-tracked upon dispatch. The warranty comprehensively covers driver failure, battery degradation below 80%, chassis material defects, and mechanical button switches."
    },
    {
      question: "Can I use promotional codes on sale items?",
      answer: "Yes, promotional codes like 'NOVA10' apply to your full subtotal including already discounted hardware during seasonal drops."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email address required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'product-inquiry',
        message: ''
      });
    }, 1000);
  };

  return (
    <div id="contact-page" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
          Support & Communications
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
          Contact Our Hardware Studio
        </h1>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed">
          Have a question about technical specifications, batch availability, or your recent order?
          Our engineering support team responds within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
          <h2 className="font-display text-xl font-bold tracking-tight text-neutral-900 mb-6">
            Direct Transmission
          </h2>

          {isSubmitted ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">Transmission Received</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A hardware support specialist has logged your inquiry
                and will respond promptly to your email.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSubmitted(false)}
                className="mt-2"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jordan Miller"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.name
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jordan@domain.com"
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none ${
                      errors.email
                        ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Subject Category
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-medium text-neutral-900 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="product-inquiry">Product Inquiries & Specifications</option>
                  <option value="order-status">Order Status & Tracking</option>
                  <option value="returns">Returns & 30-Day Trial</option>
                  <option value="warranty">Warranty & Hardware Service</option>
                  <option value="press">Press & Architectural Collaborations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Detail your inquiry, system requirements, or order query..."
                  className={`w-full rounded-xl border bg-white p-3.5 text-xs text-neutral-900 focus:outline-none ${
                    errors.message
                      ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-neutral-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] text-rose-500">{errors.message}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  id="contact-submit-btn"
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Send}
                  iconPosition="right"
                  isLoading={isSubmitting}
                >
                  Transmit Message
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Studio Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50/60 p-8 space-y-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-neutral-900">
              Hardware Headquarters
            </h3>

            <div className="flex items-start gap-4 text-xs text-neutral-600">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-cyan-600">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block">Direct Inquiries</span>
                <span>concierge@nova-concept.store</span>
              </div>
            </div>

            <div className="flex items-start gap-4 text-xs text-neutral-600">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-cyan-600">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block">Response Schedule</span>
                <span>Monday – Friday: 08:00 – 19:00 UTC</span>
              </div>
            </div>

            <div className="flex items-start gap-4 text-xs text-neutral-600">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-neutral-200 text-cyan-600">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-neutral-900 block">Design & Engineering Studio</span>
                <span>NOVA Labs, 450 Mission Street, Suite 900</span>
                <span>San Francisco, CA 94105</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="border-t border-neutral-200 pt-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-1">
            Common Hardware & Service Inquiries
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200/80 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-cyan-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
