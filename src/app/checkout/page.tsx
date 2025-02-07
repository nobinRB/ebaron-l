'use client';

import { useCart } from '@/context/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  const { cartItems } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-2xl font-semibold mb-8 text-black">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary items={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
} 