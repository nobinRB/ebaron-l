'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Slider } from '@mui/material';
import debounce from 'lodash/debounce';
import { Check } from 'lucide-react';

interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sizes: string[];
  isUpdatingPrice: boolean;
}

interface AvailableFilters {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
}

const defaultAvailableFilters: AvailableFilters = {
  categories: [],  // Empty array as default
  colors: [],
  sizes: [],
  priceRange: [0, 3000]
};

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
    colors: [],
    sizes: [],
    isUpdatingPrice: false
  });

  const [availableFilters, setAvailableFilters] = useState<AvailableFilters>(defaultAvailableFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>(defaultAvailableFilters.priceRange);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize filters from URL params
    const categories = searchParams.get('categories')?.split(',') || [];
    const colors = searchParams.get('colors')?.split(',') || [];
    const sizes = searchParams.get('sizes')?.split(',') || [];
    const minPrice = Number(searchParams.get('minPrice')) || defaultAvailableFilters.priceRange[0];
    const maxPrice = Number(searchParams.get('maxPrice')) || defaultAvailableFilters.priceRange[1];

    setFilters({
      categories,
      colors,
      sizes,
      minPrice,
      maxPrice,
      isUpdatingPrice: false
    });
    setPriceRange([minPrice, maxPrice]);

    // Fetch available filters from API
    const fetchFilters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products/filters');
        if (!response.ok) {
          throw new Error('Failed to fetch filters');
        }
        const data = await response.json();
        setAvailableFilters({
          categories: data.categories || defaultAvailableFilters.categories,
          colors: data.colors || defaultAvailableFilters.colors,
          sizes: data.sizes || defaultAvailableFilters.sizes,
          priceRange: data.priceRange || defaultAvailableFilters.priceRange,
        });
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    updateFilters({ ...filters, categories: newCategories });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    
    updateFilters({ ...filters, colors: newColors });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    updateFilters({ ...filters, sizes: newSizes });
  };

  // Debounced price update function
  const debouncedPriceUpdate = useCallback(
    debounce((newFilters: FilterState) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('minPrice', newFilters.minPrice.toString());
      params.set('maxPrice', newFilters.maxPrice.toString());
      router.push(`/shop?${params.toString()}`);
      setFilters(prev => ({ ...prev, isUpdatingPrice: false }));
    }, 500),
    [searchParams]
  );

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setPriceRange([min, max]);
    
    const newFilters = {
      ...filters,
      minPrice: min,
      maxPrice: max,
      isUpdatingPrice: true
    };
    
    setFilters(newFilters);
    debouncedPriceUpdate(newFilters);
  };

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Update URL with new filters
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.categories.length) {
      params.set('categories', newFilters.categories.join(','));
    } else {
      params.delete('categories');
    }
    
    if (newFilters.colors.length) {
      params.set('colors', newFilters.colors.join(','));
    } else {
      params.delete('colors');
    }
    
    if (newFilters.sizes.length) {
      params.set('sizes', newFilters.sizes.join(','));
    } else {
      params.delete('sizes');
    }
    
    params.set('minPrice', newFilters.minPrice.toString());
    params.set('maxPrice', newFilters.maxPrice.toString());
    
    router.push(`/shop?${params.toString()}`);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedPriceUpdate.cancel();
    };
  }, [debouncedPriceUpdate]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      {/* Categories */}
      {availableFilters.categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Categories</h3>
          <div className="space-y-3">
            {availableFilters.categories.map((category) => (
              <label 
                key={`category-${category}`} 
                className="flex items-center cursor-pointer group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="peer sr-only"
                  />
                  <div className="w-6 h-6 border-2 rounded-lg border-gray-300 bg-white peer-checked:bg-black peer-checked:border-black transition-colors duration-200">
                    <Check className={`w-4 h-4 text-white absolute left-1 top-1 transition-opacity duration-200 ${
                      filters.categories.includes(category) ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
                </div>
                <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      {availableFilters.priceRange[0] !== availableFilters.priceRange[1] && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center justify-between">
            Price Range
            {filters.isUpdatingPrice && (
              <span className="inline-block animate-spin h-4 w-4 border-2 border-blue-600 rounded-full border-t-transparent"></span>
            )}
          </h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={availableFilters.priceRange[0]}
              max={availableFilters.priceRange[1]}
              className="transition-opacity duration-200"
              sx={{
                '& .MuiSlider-thumb': {
                  transition: 'left 0.2s ease-out',
                },
                '& .MuiSlider-track': {
                  transition: 'width 0.2s ease-out',
                },
                opacity: filters.isUpdatingPrice ? 0.7 : 1,
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span className={`transition-colors duration-200 ${filters.isUpdatingPrice ? 'text-gray-400' : ''}`}>
                ₹{priceRange[0]}
              </span>
              <span className={`transition-colors duration-200 ${filters.isUpdatingPrice ? 'text-gray-400' : ''}`}>
                ₹{priceRange[1]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Colors */}
      {availableFilters.colors.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Colors</h3>
          <div className="space-y-3">
            {availableFilters.colors.map((color) => (
              <label key={color} className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="peer sr-only"
                  />
                  <div className="w-6 h-6 border-2 rounded-lg border-gray-300 bg-white peer-checked:bg-black peer-checked:border-black transition-colors duration-200">
                    <Check className={`w-4 h-4 text-white absolute left-1 top-1 transition-opacity duration-200 ${
                      filters.colors.includes(color) ? 'opacity-100' : 'opacity-0'
                    }`} />
                  </div>
                </div>
                <span className="ml-3 text-gray-700 flex items-center group-hover:text-gray-900 transition-colors duration-200">
                  <span
                    className="w-5 h-5 rounded-full mr-2 border border-gray-200"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  {color}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {availableFilters.sizes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Sizes</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableFilters.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  filters.sizes.includes(size)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters Button - Only show if there are active filters */}
      {(filters.categories.length > 0 ||
        filters.colors.length > 0 ||
        filters.sizes.length > 0 ||
        filters.minPrice !== defaultAvailableFilters.priceRange[0] ||
        filters.maxPrice !== defaultAvailableFilters.priceRange[1]) && (
        <div className="flex justify-center w-full">
          <button
            onClick={() => {
              setFilters({
                categories: [],
                minPrice: defaultAvailableFilters.priceRange[0],
                maxPrice: defaultAvailableFilters.priceRange[1],
                colors: [],
                sizes: [],
                isUpdatingPrice: false
              });
              setPriceRange(defaultAvailableFilters.priceRange);
              router.push('/shop');
            }}
            className="px-4 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200 w-auto inline-flex items-center"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}