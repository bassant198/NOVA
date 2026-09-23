import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-200 bg-white text-emerald-900',
      iconColor: 'text-emerald-600',
      accentBg: 'bg-emerald-50'
    },
    error: {
      icon: AlertCircle,
      border: 'border-rose-200 bg-white text-rose-900',
      iconColor: 'text-rose-600',
      accentBg: 'bg-rose-50'
    },
    info: {
      icon: Info,
      border: 'border-neutral-200 bg-white text-neutral-900',
      iconColor: 'text-cyan-600',
      accentBg: 'bg-neutral-50'
    }
  };

  const current = typeConfig[type] || typeConfig.info;
  const Icon = current.icon;

  return (
    <div
      id="global-toast"
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-xl border p-4 shadow-xl shadow-neutral-900/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 backdrop-blur-md"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${current.accentBg}`}>
        <Icon className={`h-5 w-5 ${current.iconColor}`} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-neutral-900 leading-snug">{message}</p>
      </div>

      <button
        type="button"
        id="toast-close-btn"
        onClick={closeToast}
        aria-label="Close notification"
        className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
