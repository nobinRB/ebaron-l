'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { FaChevronDown, FaMinus, FaPlus } from 'react-icons/fa6';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { IProductBase } from '@/models/Product';

interface ProductCardProps {
  product: IProductBase;  // Change from IProduct to IProductBase
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.colors?.[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.sizes?.[0]?.name || ''
  );
  const [quantity, setQuantity] = useState(0);

  const { updateCartQuantity } = useCart();

  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment ? quantity + 1 : quantity - 1;
    const validQuantity = Math.max(0, Math.min(newQuantity, product.stock));
    setQuantity(validQuantity);
    updateCartQuantity(product as unknown as Product, validQuantity, selectedColor, selectedSize);
  };

  const handleAddToCart = () => {
    // Update cart quantity
    updateCartQuantity(product as unknown as Product, 1, selectedColor, selectedSize);
    // Navigate to cart page
    router.push('/cart');
  };
console.log("product test: ",product);
  // Calculate prices based on quantity
  const sellingPrice = product.price;
  const totalSellingPrice = quantity > 0 ? sellingPrice * quantity : sellingPrice;
  const mrpPrice = product.originalPrice || (product.price * 1.2);
  const totalMRP = quantity > 0 ? mrpPrice * quantity : mrpPrice;
  
  const discountPercentage = Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48">
          <Image
            src={product.imageUrl || (product.images && product.images[0]) || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Title */}
        <h3 className="text-gray-900 text-lg font-semibold mb-2">{product.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Variants Section */}
        <div className="space-y-2 mb-4">
          {/* Size Variant Dropdown */}
          {product.variants?.sizes && product.variants.sizes.length > 0 && (
            <div className="relative">
              <button
                onClick={() => {
                  setIsSizeDropdownOpen(!isSizeDropdownOpen);
                  setIsColorDropdownOpen(false);
                }}
                className="w-full px-3 py-2 border rounded-lg flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>{selectedSize || 'Select Size'}</span>
                <FaChevronDown className={`transition-transform ${isSizeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSizeDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => {
                        setSelectedSize(size.name);
                        setIsSizeDropdownOpen(false);
                      }}
                      disabled={!size.inStock}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50
                        ${!size.inStock ? 'opacity-50 cursor-not-allowed' : ''}
                        ${size.name === selectedSize ? 'bg-gray-50' : ''}
                      `}
                    >
                      {size.name}
                      {!size.inStock && <span className="text-gray-500">(Out of Stock)</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Color Variant Dropdown */}
          {product.variants?.colors && product.variants.colors.length > 0 && (
            <div className="relative">
              <button
                onClick={() => {
                  setIsColorDropdownOpen(!isColorDropdownOpen);
                  setIsSizeDropdownOpen(false);
                }}
                className="w-full px-3 py-2 border rounded-lg flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{
                      backgroundColor: product.variants.colors.find(
                        c => c.name === selectedColor
                      )?.code || '#000'
                    }}
                  />
                  {selectedColor || 'Select Color'}
                </span>
                <FaChevronDown className={`transition-transform ${isColorDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isColorDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        setIsColorDropdownOpen(false);
                      }}
                      disabled={!color.inStock}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50
                        ${!color.inStock ? 'opacity-50 cursor-not-allowed' : ''}
                        ${color.name === selectedColor ? 'bg-gray-50' : ''}
                      `}
                    >
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.code }}
                      />
                      {color.name}
                      {!color.inStock && <span className="ml-auto text-gray-500">(Out of Stock)</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            {/* Left side: Selling Price and discount */}
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-semibold text-lg">
                ₹{totalSellingPrice.toFixed(2)}
              </span>
              <div className="text-green-600 text-sm font-medium">
                ({discountPercentage}% off)
              </div>
            </div>

            {/* Right side: MRP */}
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500"></span>
              <span className="text-gray-500 line-through">
                ₹{totalMRP.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Quantity calculation - shown when quantity > 1 */}
          {quantity > 1 && (
            <div className="text-sm text-gray-500 mt-1">
              (₹{sellingPrice.toFixed(2)} × {quantity} items)
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-1">
            Inclusive of all taxes
          </p>
        </div>

        {/* Quantity and Add to Cart/View */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(false)}
              className="px-2 py-1 hover:bg-gray-50"
              disabled={quantity <= 0}
            >
              <FaMinus className={`w-2.5 h-2.5 ${quantity <= 0 ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <span className="px-2 py-1 text-sm text-gray-900">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(true)}
              className="px-2 py-1 hover:bg-gray-50"
              disabled={quantity >= product.stock}
            >
              <FaPlus className={`w-2.5 h-2.5 ${quantity >= product.stock ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
          <button
            onClick={quantity > 0 ? () => router.push(`/products/${product._id}`) : handleAddToCart}
            className="px-3 py-1.5 text-sm rounded transition-colors bg-gray-900 text-white hover:bg-gray-800"
          >
            {quantity > 0 ? 'View' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}