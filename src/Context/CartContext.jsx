import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CART_KEY = "shop-cart";
const PROMO_KEY = "shop-promo";

// Valid promo codes and how much each takes off
const PROMO_CODES = { SAVE20: 0.2, WELCOME10: 0.1 };
const DELIVERY_FEE = 15;

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadPromo = () => {
  try {
    const saved = localStorage.getItem(PROMO_KEY) || "";
    return PROMO_CODES[saved] ? saved : "";
  } catch {
    return "";
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart);
  const [promo, setPromo] = useState(loadPromo);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable: the cart still works, it just won't be saved
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_KEY, promo);
    } catch {
      // storage unavailable
    }
  }, [promo]);

  const addToCart = (product) => {
    const key = `${product.id}-${product.size}-${product.color}`;

    setItems((prev) => {
      const found = prev.find((item) => item.key === key);
      if (found) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + product.qty } : item
        );
      }
      return [...prev, { ...product, key }];
    });
  };

  const changeQty = (key, change) => {
    setItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  // Returns true if the code is valid, false if not
  const applyPromo = (input) => {
    const code = input.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromo(code);
      return true;
    }
    return false;
  };

  const removePromo = () => setPromo("");

  const clearCart = () => {
    setItems([]);
    setPromo("");
  };

  // Totals, worked out once here so every page agrees
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountRate = PROMO_CODES[promo] || 0;
  const discount = Math.round(subtotal * discountRate);
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal - discount + delivery;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        changeQty,
        removeItem,
        totalItems,
        promo,
        applyPromo,
        removePromo,
        clearCart,
        subtotal,
        discountRate,
        discount,
        delivery,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};