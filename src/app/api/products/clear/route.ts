import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    const mongoose = await connectDB();
    if (!mongoose) {
      throw new Error('Failed to connect to database');
    }

    await Product.deleteMany({});
    
    return NextResponse.json({ message: 'Database cleared successfully' });
  } catch (error) {
    console.error('Failed to clear database:', error);
    return NextResponse.json(
      { error: 'Failed to clear database' },
      { status: 500 }
    );
  }
} 