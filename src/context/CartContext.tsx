'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCartQuantity: (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const updateCartQuantity = (
    product: Product, 
    quantity: number, 
    selectedColor?: string, 
    selectedSize?: string
  ) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => 
          item.product._id === product._id && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        if (quantity === 0) {
          return prevItems.filter(item => item !== existingItem);
        }
        return prevItems.map(item =>
          item === existingItem
            ? { ...item, quantity }
            : item
        );
      }

      if (quantity > 0) {
        return [...prevItems, { product, quantity, selectedColor, selectedSize }];
      }

      return prevItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCartQuantity, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 