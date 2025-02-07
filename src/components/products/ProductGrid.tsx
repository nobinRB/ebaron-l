'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { IProduct } from '@/models/Product';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  products?: IProduct[];
  limit?: number;
  layout: '2' | '3' | '4';
  sortBy: 'newest' | 'price-low-high' | 'price-high-low' | 'name';
}

const gridCols = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export default function ProductGrid({ products: propProducts, limit, layout, sortBy }: ProductGridProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Handle sorting when sortBy changes or when products are updated
  useEffect(() => {
    if (!products.length) return;

    const sortedProducts = [...products];
    switch (sortBy) {
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    setProducts(sortedProducts);
  }, [sortBy, products.length]);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        
        const categories = searchParams.get('categories');
        const colors = searchParams.get('colors');
        const sizes = searchParams.get('sizes');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        if (categories) params.set('categories', categories);
        if (colors) params.set('colors', colors);
        if (sizes) params.set('sizes', sizes);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);

        const queryString = params.toString();
        const url = `/api/products${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (isMounted) {
          const limitedProducts = limit ? data.slice(0, limit) : data;
          setProducts(limitedProducts);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // Ignore abort errors
        }
        console.error('Error fetching products:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (propProducts) {
      const limitedProducts = limit ? propProducts.slice(0, limit) : propProducts;
      if (isMounted) {
        setProducts(limitedProducts);
        setLoading(false);
      }
    } else {
      fetchProducts();
    }

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [searchParams, propProducts, limit]);

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className={`grid ${gridCols[layout]} gap-6`}>
        <AnimatePresence>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-100 rounded-lg h-[400px] animate-pulse"
              />
            ))
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id.toString()}
                product={{
                  _id: product._id.toString(),
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  category: product.category,
                  subcategory: product.subcategory,
                  images: product.images || [],
                  mainImage: product.mainImage,
                  variants: product.variants || { colors: [], sizes: [] },
                  reviews: product.reviews?.map(review => ({
                    _id: review._id.toString(),
                    userId: review.userId.toString(),
                    rating: review.rating,
                    comment: review.comment || '',
                    createdAt: review.createdAt
                  })) || [],
                  createdAt: product.createdAt,
                  updatedAt: product.updatedAt,
                  stock: product.stock || 0,
                  ratings: product.ratings || 0,
                  originalPrice: product.originalPrice || product.price,
                  imageUrl: product.imageUrl || product.images?.[0] || ''
                } as IProduct}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}