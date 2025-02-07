import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: Context
): Promise<Response> {
  try {
    await connectToDatabase();
    
    const productId = context.params.id;
    
    // Find the product by ID
    const product = await Product.findById(productId).lean().exec();

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
