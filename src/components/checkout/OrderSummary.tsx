'use client';

import { CartItem } from '@/context/CartContext';
import Image from 'next/image';

interface OrderSummaryProps {
  items: CartItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );
  
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-black">Order Summary</h2>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product._id}-${item.selectedColor}-${item.selectedSize}`} 
            className="flex gap-4"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-black">{item.product.name}</h3>
              <p className="text-sm text-gray-700">
                Qty: {item.quantity} × ₹{item.product.price.toFixed(2)}
              </p>
              {item.selectedSize && <p className="text-sm text-gray-700">Size: {item.selectedSize}</p>}
              {item.selectedColor && <p className="text-sm text-gray-700">Color: {item.selectedColor}</p>}
            </div>
            <div className="text-sm font-medium text-black">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-black">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Tax (18% GST)</span>
          <span className="text-black">₹{tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold text-black">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-700 mt-1">
          Inclusive of all taxes
        </p>
      </div>
    </div>
  );
} 