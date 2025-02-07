'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import FilterSidebar from '@/components/filters/FilterSidebar';
import { Product } from '@/types/product';
import { Grid2X2, Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react';

type GridLayout = '2' | '3' | '4';
type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'name';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [layout, setLayout] = useState<GridLayout>('4');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 text-center md:text-left">
              {query ? `Search Results for "${query}"` : 'Search Results'}
            </h1>
            <div className="flex items-center space-x-6">
              {/* Sort Dropdown */}
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-300 text-gray-800 font-medium rounded-lg px-4 py-2 pr-10 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors duration-200"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name">Alphabetical</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>

              {/* Grid Layout Controls */}
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border border-gray-300">
                <button
                  onClick={() => setLayout('2')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    layout === '2' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-label="2-column grid"
                >
                  <Grid2X2 size={20} />
                </button>
                <button
                  onClick={() => setLayout('3')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    layout === '3' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-label="3-column grid"
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setLayout('4')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    layout === '4' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  aria-label="4-column grid"
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/6">
              <FilterSidebar />
            </aside>
            
            <div className="w-full md:w-5/6">
              <Suspense fallback={<div>Loading search results...</div>}>
                <SearchResults query={query} layout={layout} sortBy={sortBy} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchResults({ query, layout, sortBy }: { query: string | null, layout: GridLayout, sortBy: SortOption }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          setLoading(true);
          const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
          
          const data = await response.json();
          // Transform the data to ensure it matches the Product type
          const transformedProducts = data.map((item: any) => new Product({
            _id: item._id.toString(),
            name: item.name || '',
            description: item.description || '',
            price: Number(item.price) || 0,
            originalPrice: Number(item.originalPrice) || 0,
            stock: Number(item.stock) || 0,
            category: item.category || '',
            subcategory: item.subcategory,
            imageUrl: item.imageUrl || '',
            images: item.images || undefined,
            variants: {
              colors: Array.isArray(item.variants?.colors) ? item.variants.colors : [],
              sizes: Array.isArray(item.variants?.sizes) ? item.variants.sizes : []
            },
            ratings: Array.isArray(item.ratings) ? item.ratings : [],
            reviews: Array.isArray(item.reviews) ? item.reviews : []
          }));
          
          setProducts(transformedProducts);
          setError(null);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
          setProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="bg-gray-300 h-[300px] rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-105"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Search Error
        </h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      {products.length > 0 ? (
        <ProductGrid products={products} layout={layout} sortBy={sortBy} />
      ) : (
        <div>
          <p className="text-xl text-gray-600 mb-4">
            We couldn't find any products matching your search.
          </p>
          <p className="text-gray-500">
            Try different keywords or browse our categories.
          </p>
        </div>
      )}
    </div>
  );
}
