'use client';

import { Suspense, useState } from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import FilterSidebar from '@/components/filters/FilterSidebar';
import { Grid2X2, Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react';

type GridLayout = '2' | '3' | '4';
type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'name';

export default function ShopPage() {
  const [layout, setLayout] = useState<GridLayout>('4');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Our Products</h1>
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

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/6">
              <FilterSidebar />
            </aside>
            
            <div className="w-full md:w-5/6">
              <Suspense fallback={<div>Loading products...</div>}>
                <ProductGrid layout={layout} sortBy={sortBy} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}