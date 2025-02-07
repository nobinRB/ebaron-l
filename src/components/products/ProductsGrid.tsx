import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { useState } from 'react';
import { Grid2X2, Grid3X3, LayoutGrid, ChevronDown } from 'lucide-react';

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
}

type GridLayout = '2' | '3' | '4';
type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'name';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20 
  },
  show: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

export default function ProductsGrid({ products: initialProducts, isLoading }: ProductsGridProps) {
  const [layout, setLayout] = useState<GridLayout>('4');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [products, setProducts] = useState(initialProducts);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    const sortedProducts = [...products];
    
    switch (option) {
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
        // Assuming products are already sorted by newest first in initialProducts
        setProducts(initialProducts);
        return;
    }
    
    setProducts(sortedProducts);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const gridCols = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center space-x-4 pb-4 border-b">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as SortOption)}
            className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="newest">Newest First</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>

        {/* Layout Switcher */}
        <div className="flex items-center space-x-2 border rounded-md p-1">
          <button
            onClick={() => setLayout('2')}
            className={`p-1.5 rounded ${layout === '2' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            title="2 Columns"
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayout('3')}
            className={`p-1.5 rounded ${layout === '3' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            title="3 Columns"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayout('4')}
            className={`p-1.5 rounded ${layout === '4' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            title="4 Columns"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid ${gridCols[layout]} gap-6`}
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={item}
              initial="hidden"
              animate="show"
              exit="exit"
              layout
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
