import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get all products
    const products = await Product.find({}).lean();
    // Extract unique categories (handle array of categories)
    const categories = [...new Set(products.flatMap(p => 
      Array.isArray(p.category) ? p.category : [p.category]
    ))].filter(Boolean);

    // Extract unique colors and sizes from variants
    const colors = [...new Set(products.flatMap(p => 
      p.variants?.colors?.map((c: { name: string }) => c.name) || []
    ))].filter(Boolean);
    
    const sizes = [...new Set(products.flatMap(p => 
      p.variants?.sizes?.map((s: { name: string }) => s.name) || []
    ))].filter(Boolean);

    // Calculate price range
    const prices = products.map(p => p.price).filter(Boolean);
    const priceRange: [number, number] = [
      Math.floor(Math.min(...prices)),
      Math.ceil(Math.max(...prices))
    ];

    return NextResponse.json({
      categories,
      colors,
      sizes,
      priceRange
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    );
  }
}
