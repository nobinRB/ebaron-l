'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import AuthMenu from '../auth/AuthMenu';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { useDebounce } from '@/hooks/useDebounce';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { cartCount } = useCart();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.trim()) {
        try {
          const response = await fetch(`/api/products/search?q=${encodeURIComponent(debouncedSearch)}`);
          const data = await response.json();
          setSearchResults(data);
          setIsSearchOpen(true);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
        setIsSearchOpen(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  const handleSearchSelect = useCallback((productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setSearchResults([]);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-black">
              Clay Craft
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 text-black focus:ring-gray-200"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </form>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                {searchResults.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleSearchSelect(product._id)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link 
              href="/shop" 
              className="text-black font-medium hover:text-gray-700 transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/cart" 
              className="relative text-black hover:text-gray-700 transition-colors"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <AuthMenu />
          </div>
        </div>
      </div>
    </header>
  );
}