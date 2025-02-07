import { Suspense } from 'react';
import Banner from '@/components/home/Banner';
import CategorySection from '@/components/home/CategorySection';
import ProductGrid from '@/components/products/ProductGrid';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import CtaBanner from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <main className="mt-16">
      <Banner />
      
      <CategorySection />
      
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Products</h2>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid limit={8} layout="4" sortBy="newest" />
          </Suspense>
        </div>
      </div>

      <TestimonialCarousel />
      
      <CtaBanner />
    </main>
  );
}
