import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'nova_cart_items_v1';
const PROMO_STORAGE_KEY = 'nova_promo_code';

export function CartProvider({ children }) {
  // Initialize cart from localStorage
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save promo code:', e);
    }
  }, [appliedPromo]);

  // Toast auto-clear
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(current => (current && current.id === message.id ? null : current));
    }, 3200);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  // Cart operations
  const addToCart = (product, quantity = 1, openDrawer = true) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    setItems(currentItems => {
      const existingIndex = currentItems.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...currentItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [...currentItems, { product, quantity: qty }];
      }
    });

    showToast(`Added ${product.title} (${qty}) to cart`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    setItems(currentItems => {
      const target = currentItems.find(item => item.product.id === productId);
      if (target) {
        showToast(`Removed ${target.product.title} from cart`, 'info');
      }
      return currentItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo('');
    showToast('Cart cleared', 'info');
  };

  // Calculations
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items]);

  // Free shipping over $100
  const freeShippingThreshold = 100;
  const standardShippingFee = 12;
  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= freeShippingThreshold ? 0 : standardShippingFee;
  }, [subtotal]);

  // Discount calculation
  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    const code = appliedPromo.trim().toUpperCase();
    if (code === 'NOVA10') {
      return Math.round(subtotal * 0.1);
    }
    if (code === 'WELCOME20') {
      return Math.min(20, subtotal);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const estimatedTax = useMemo(() => {
    return Math.round((subtotal - discount) * 0.08); // 8% tax
  }, [subtotal, discount]);

  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discount + shipping + estimatedTax);
  }, [subtotal, discount, shipping, estimatedTax]);

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NOVA10') {
      setAppliedPromo('NOVA10');
      showToast('10% discount applied!', 'success');
      return { success: true, message: 'Code applied: 10% off your order.' };
    }
    if (clean === 'WELCOME20') {
      setAppliedPromo('WELCOME20');
      showToast('$20 welcome credit applied!', 'success');
      return { success: true, message: 'Code applied: $20 discount.' };
    }
    showToast('Invalid promotion code. Try NOVA10', 'error');
    return { success: false, message: 'Invalid code. Try "NOVA10" for 10% off.' };
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    showToast('Promo code removed', 'info');
  };

  const value = {
    items,
    totalItems,
    subtotal,
    shipping,
    discount,
    estimatedTax,
    total,
    freeShippingThreshold,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    toastMessage,
    closeToast,
    showToast
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
