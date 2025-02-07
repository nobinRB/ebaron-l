import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

const sampleProducts = [
  {
    name: 'Unglazed Clay Handi with Lid (2.8L)',
    description: 'Traditional clay pot for cooking & serving with natural white firing shade & mirror shine. FREE ASH for cleaning included.',
    price: 946.00,
    imageUrl: '/images/products/1.jpeg',
    category: 'Clay Cookware',
    stock: 15,
    ratings: 4.8,
    reviews: [],
    originalPrice: 1999.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Unglazed Clay Kadai (1.8L)',
    description: 'Mitti ka bartan for traditional cooking with natural firing shade & mirror shine. FREE ASH for cleaning included.',
    price: 896.00,
    imageUrl: '/images/products/2.jpeg',
    category: 'Clay Cookware',
    stock: 20,
    ratings: 4.7,
    reviews: [],
    originalPrice: 1899.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Black Clay Biryani Handi (4L)',
    description: 'Large clay pot perfect for biryani cooking with lid. Natural mirror shine finish. FREE ASH for cleaning included.',
    price: 1299.00,
    imageUrl: '/images/products/3.jpeg',
    category: 'Clay Cookware',
    stock: 10,
    ratings: 4.9,
    reviews: [],
    originalPrice: 1999.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Clay Hot Case with Lid (2.8L)',
    description: 'Earthen hot case for serving with natural white firing shade & mirror shine. FREE ASH for cleaning included.',
    price: 1399.00,
    imageUrl: '/images/products/4.jpeg',
    category: 'Clay Tableware',
    stock: 15,
    ratings: 4.7,
    reviews: [],
    originalPrice: 2799.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Clay Cooking Set Combo (1L, 2L, 3L)',
    description: 'Set of 3 clay pots with natural firing shade & mirror shine. FREE ASH for cleaning included.',
    price: 2299.00,
    imageUrl: '/images/products/5.png',
    category: 'Clay Cookware',
    stock: 8,
    ratings: 4.8,
    reviews: [],
    originalPrice: 3999.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Clay Dahi Handi (1L)',
    description: 'Traditional curd pot for making and storing yogurt. Natural firing shade.',
    price: 449.00,
    imageUrl: '/images/products/6.png',
    category: 'Clay Tableware',
    stock: 25,
    ratings: 4.5,
    reviews: [],
    originalPrice: 899.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Clay Cooker with Lid',
    description: 'HandMade unglazed clay cooker with mirror finish. FREE ASH for cleaning included.',
    price: 1049.00,
    imageUrl: '/images/products/7.jpeg',
    category: 'Clay Cookware',
    stock: 12,
    ratings: 4.6,
    reviews: [],
    originalPrice: 1999.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  },
  {
    name: 'Clay Pot Combo Set (2.5L & 2.8L)',
    description: 'Set of 2 clay pots for cooking & serving. Natural firing shade & mirror shine.',
    price: 1569.00,
    imageUrl: '/images/products/8.jpeg',
    category: 'Clay Cookware',
    stock: 10,
    ratings: 4.7,
    reviews: [],
    originalPrice: 2999.00,
    variants: {
      colors: [
        { name: 'Natural Brown', code: '#8B4513', inStock: true },
        { name: 'Terra Cotta', code: '#E2725B', inStock: true },
        { name: 'Black Clay', code: '#393939', inStock: false }
      ],
      sizes: [
        { name: '1.5L', value: '1.5', inStock: true },
        { name: '2.8L', value: '2.8', inStock: true },
        { name: '4L', value: '4', inStock: false }
      ]
    }
  }
];

export async function GET() {
  try {
    console.log('Starting seed process...');
    
    const mongoose = await connectDB();
    if (!mongoose) {
      console.error('Database connection failed');
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    console.log('Connected to database, clearing existing products...');
    await Product.deleteMany({});
    
    console.log('Inserting sample products...');
    const insertedProducts = await Product.insertMany(sampleProducts);
    
    console.log(`Successfully inserted ${insertedProducts.length} products`);
    return NextResponse.json({ 
      message: 'Sample products added successfully',
      count: insertedProducts.length,
      products: insertedProducts
    });
  } catch (error) {
    console.error('Failed to seed products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to seed products' },
      { status: 500 }
    );
  }
} 