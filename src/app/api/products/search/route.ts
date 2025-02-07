import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id name description price category images variants') // Select specific fields
    .lean()
    .limit(10);

    // Transform the products to ensure unique IDs
    const formattedProducts = products.map(product => ({
      ...product,
      _id: (product._id as { toString(): string }).toString(), // Convert ObjectId to string
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}
