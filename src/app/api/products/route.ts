import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import type { IProduct, IProductBase } from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const colors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || Number.MAX_VALUE;

    const query: mongoose.FilterQuery<IProduct> = {};

    if (categories.length > 0) {
      query.category = { $in: categories };
    }

    query.price = {
      $gte: minPrice,
      $lte: maxPrice
    };

    if (colors.length > 0) {
      query['variants.colors'] = {
        $elemMatch: {
          name: { $in: colors },
          inStock: true
        }
      };
    }
    
    if (sizes.length > 0) {
      query['variants.sizes'] = {
        $elemMatch: {
          name: { $in: sizes },
          inStock: true
        }
      };
    }

    const products = await Product.find(query)
      .lean()
      .limit(100)
      .sort({ createdAt: -1 });

    return NextResponse.json(products);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    
    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}