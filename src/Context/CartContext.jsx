import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const STORAGE_KEY = "shop-cart";

// Read the saved cart when the site opens (empty if nothing is saved)
const loadCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCart);

  // Save the cart every time it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable: the cart still works, it just won't be saved
    }
  }, [items]);

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

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, changeQty, removeItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};