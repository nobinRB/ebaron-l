'use client';

import { useCart } from '@/context/CartContext';
import { FaMinus, FaPlus, FaTrash, FaXmark } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    // Reset error state
    setCouponError('');
    
    // Validate empty coupon
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Validate coupon format (alphanumeric, 5-10 characters)
    if (!/^[A-Za-z0-9]{5,10}$/.test(couponCode)) {
      setCouponError('Invalid coupon format. Must be 5-10 alphanumeric characters');
      return;
    }

    try {
      setIsApplyingCoupon(true);
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (replace with actual API validation)
      if (couponCode !== 'SAVE10') {
        throw new Error('Invalid coupon code');
      }

      // Handle successful coupon application
      // Add your discount logic here
      
    } catch (error) {
      setCouponError(error instanceof Error ? error.message : 'Failed to apply coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const subtotal = cartItems.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-black">Your cart is empty</h1>
          <p className="text-gray-700 mb-8">Add items to your cart to continue shopping</p>
          <Link 
            href="/shop" 
            className="inline-block bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-2xl font-semibold mb-8 text-black">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button Above First Item */}
            {cartItems.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => clearCart()}
                  className="text-gray-600 hover:text-black"
                  aria-label="Clear cart"
                >
                  <FaTrash />
                </button>
              </div>
            )}
            {cartItems.map((item) => (
              <div key={`${item.product._id}-${item.selectedColor}-${item.selectedSize}`} 
                className="flex gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-300 shadow-sm"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.product.imageUrl || item.product.images?.main || '/images/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-black">{item.product.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-gray-600 hover:text-black"
                      aria-label="Remove item"
                    >
                      <FaXmark />
                    </button>
                  </div>

                  {/* Variants */}
                  <div className="text-sm text-gray-700 mt-1">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && (
                      <span className="ml-4">Color: {item.selectedColor}</span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-black">₹{item.product.price.toFixed(2)}</span>
                      {item.product.originalPrice && (
                        <>
                          <span className="text-gray-600 line-through text-sm">
                            ₹{item.product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-600 text-sm">
                            ({Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}% off)
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button
                        onClick={() => updateCartQuantity(
                          item.product,
                          item.quantity - 1,
                          item.selectedColor,
                          item.selectedSize
                        )}
                        className="px-2 py-1 hover:bg-gray-50"
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus className={`w-2.5 h-2.5 ${item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                      <span className="px-2 py-1 text-sm text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(
                          item.product,
                          item.quantity + 1,
                          item.selectedColor,
                          item.selectedSize
                        )}
                        className="px-2 py-1 hover:bg-gray-50"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <FaPlus className={`w-2.5 h-2.5 ${item.quantity >= item.product.stock ? 'text-gray-300' : 'text-gray-600'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="mt-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-300 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Apply Coupon</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError('');
                    }}
                    placeholder="Enter coupon code"
                    className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                      couponError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={10}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                    className={`px-6 py-2 bg-gray-800 text-white rounded-lg transition-colors duration-200 ${
                      isApplyingCoupon 
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:bg-gray-900'
                    }`}
                  >
                    {isApplyingCoupon ? 'Applying...' : 'Apply'}
                  </button>
                </div>
                {couponError && (
                  <p className="text-red-500 text-sm">{couponError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white/90 backdrop-blur-sm p-6 mt-8 rounded-lg border border-gray-300 shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-4 text-black">Order Summary</h2>
            
            <div className="space-y-2 pb-4 border-b border-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium text-black">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 font-semibold text-black">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <Link 
              href="/checkout"
              className="w-full bg-gray-800 text-white py-3 rounded mt-6 hover:bg-gray-900 transition-colors inline-block text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}