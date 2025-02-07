'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { updateCartQuantity, cartItems } = useCart();

  // Updated mock product data with actual image paths
  const product = {
    _id: resolvedParams.id,
    name: 'Traditional Clay Pot',
    imageUrl: '/images/products/clay-pots/traditional/1.jpeg',
    description: 'Handcrafted clay pot made with traditional techniques.',
    price: 1299,
    originalPrice: 1599,
    stock: 10,
    category: 'clay-pots',
    subcategory: 'traditional',
    images: {
      main: '/images/products/clay-pots/traditional/1.jpeg',
      gallery: [
        '/images/products/clay-pots/traditional/1.jpeg',
        '/images/products/clay-pots/traditional/2.jpeg',
        '/images/products/clay-pots/traditional/3.jpeg',
        '/images/products/clay-pots/traditional/4.jpeg'
      ]
    },
    variants: {
      colors: [
        { name: 'Terra Cotta', code: '#B74803', inStock: true },
        { name: 'Brown', code: '#8B4513', inStock: true },
      ],
      sizes: [
        { name: 'Small', inStock: true },
        { name: 'Medium', inStock: true },
        { name: 'Large', inStock: false },
      ]
    },
    ratings: 4.5,
    reviews: [] // Add empty reviews array
  } as Product; // Type assertion to Product




  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment 
      ? Math.min(quantity + 1, product.stock) 
      : Math.max(1, quantity - 1);
    
    setQuantity(newQuantity);
    
    // Only update cart if color and size are selected
    if (selectedColor && selectedSize) {
      updateCartQuantity(product, newQuantity, selectedColor, selectedSize);
    }
  };

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      updateCartQuantity(product, quantity, selectedColor, selectedSize);
      router.push('/cart');
    } else {
      alert('Please select a color and size before adding to cart');
    }
  };

  const handleBuyNow = () => {
    if (selectedColor && selectedSize) {
      updateCartQuantity(product, quantity, selectedColor, selectedSize);
      router.push('/checkout');
    }
  };

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image Gallery Card - now takes 1/2 width */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Main Image */}
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden mt-2 mb-2 px-8">
              <Image
                src={product.images?.gallery?.[selectedImage] || '/images/placeholder.png'}
                alt={`${product.name} - ${selectedImage === 0 ? 'Main View' : `View ${selectedImage + 1}`}`}
                fill
                className="object-cover"
                priority={selectedImage === 0}
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex justify-center space-x-2 mt-4">
              {product.images?.gallery?.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === index ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || '/images/placeholder.png'}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details Card - now takes 1/2 width */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-black mb-2">{product.name}</h1>
              <p className="text-gray-700 mb-4">{product.description}</p>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold text-black">₹{product.price}</span>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="text-green-600">({discountPercentage}% off)</span>
                </div>
                <p className="text-xs text-gray-600">Inclusive of all taxes</p>
              </div>
            </div>

            {/* Variants Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Colors */}
              {product.variants.colors && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs
                          ${selectedColor === color.name 
                            ? 'border-gray-900 bg-gray-50 text-black' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }
                          ${!color.inStock && 'opacity-50 cursor-not-allowed'}
                        `}
                        disabled={!color.inStock}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border shadow-sm"
                          style={{ backgroundColor: color.code }}
                        />
                        <span>{color.name}</span>
                        {!color.inStock && <span className="text-xs text-red-500 ml-1">(Out of Stock)</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.variants.sizes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.sizes.map(size => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`px-3 py-1.5 rounded border text-xs
                          ${selectedSize === size.name 
                            ? 'border-gray-900 bg-gray-50 text-black' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }
                          ${!size.inStock && 'opacity-50 cursor-not-allowed'}
                        `}
                        disabled={!size.inStock}
                      >
                        {size.name}
                        {!size.inStock && <span className="inline-block text-xs text-red-500 ml-1">(Out of Stock)</span>}
                      </button>
                   
                    ))}
                  </div>

                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Quantity
                </label>
                <div className="flex items-center border rounded w-fit">
                  <button
                    onClick={() => handleQuantityChange(false)}
                    className="px-2 py-1.5 hover:bg-gray-50 rounded-l"
                    disabled={quantity <= 1}
                  >
                    <FaMinus className={`w-2.5 h-2.5 ${quantity <= 1 ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                  <span className="px-4 py-1.5 text-sm text-black font-medium border-x">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(true)}
                    className="px-2 py-1.5 hover:bg-gray-50 rounded-r"
                    disabled={quantity >= product.stock}
                  >
                    <FaPlus className={`w-2.5 h-2.5 ${quantity >= product.stock ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.stock} items available
                </p>
              </div>
            </div>

            {/* Action Buttons Card */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={handleAddToCart}
                className="mt-6 w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedColor || !selectedSize || quantity > product.stock}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 