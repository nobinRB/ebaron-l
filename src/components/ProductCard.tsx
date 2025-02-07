'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { updateCartQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract base name (remove size in parentheses)
  const baseName = product.name.replace(/\s*\([^)]*\)\s*$/, '');
  
  // Default variants if not provided in product data
  const defaultSizes = ['1.8L', '2.4L', '3.0L'];
  const hasDefaultSizes = baseName.toLowerCase().includes('kadai');
  
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.variants?.sizes?.[0]?.name || (hasDefaultSizes ? defaultSizes[0] : undefined)
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.variants?.colors?.[0]?.name
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateCartQuantity(product, 1, selectedColor, selectedSize);
    toast.success(`Added to cart!${selectedSize ? ` Size: ${selectedSize}` : ''}${selectedColor ? ` Color: ${selectedColor}` : ''}`);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSelectedColor(e.target.value);
  };

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => router.push(`/products/${product._id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={baseName}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {baseName}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Variant Selectors */}
        <div className="space-y-3 mb-3" onClick={(e) => e.stopPropagation()}>
          {/* Size Selector */}
          {((product.variants?.sizes?.length ?? 0) > 0 || hasDefaultSizes) && (
            <div className="relative">
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {(product.variants?.sizes || (hasDefaultSizes ? defaultSizes.map(size => ({ name: size, inStock: true })) : [])).map((size) => (
                  <option 
                    key={typeof size === 'string' ? size : size.name} 
                    value={typeof size === 'string' ? size : size.name}
                    disabled={typeof size !== 'string' && !size.inStock}
                  >
                    {typeof size === 'string' ? size : `${size.name}${!size.inStock ? ' (Out of Stock)' : ''}`}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.variants?.colors && product.variants.colors.length > 0 && (
            <div className="relative">
              <select
                value={selectedColor}
                onChange={handleColorChange}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {product.variants.colors.map((color) => (
                  <option key={color.name} value={color.name} disabled={!color.inStock}>
                    {color.name} {!color.inStock && '(Out of Stock)'}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full py-2 px-4 rounded-md transition-all duration-300 ${
            isHovered
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
