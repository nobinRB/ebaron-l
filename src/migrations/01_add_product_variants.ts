import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';  // Updated import
import Product from '@/models/Product';

const potColors = [
  { name: 'Natural Clay', code: '#B87456', inStock: true },
  { name: 'Red Clay', code: '#8B4513', inStock: true },
  { name: 'Black Clay', code: '#3B3B3B', inStock: true },
  { name: 'Brown', code: '#654321', inStock: true },
  { name: 'Terra Cotta', code: '#E2725B', inStock: true }
];

const potSizes = [
  { name: 'Small', inStock: true },
  { name: 'Medium', inStock: true },
  { name: 'Large', inStock: true },
  { name: 'Extra Large', inStock: true }
];

const categoryMap: { [key: string]: string } = {
  'curry-mud-pots': 'Curry Mud Pots',
  'water-dispensers': 'Water Dispensers',
  'planters': 'Planters',
  'mud-stoves': 'Mud Stoves',
  'decorative-pots': 'Decorative Pots',
  'serving-pots': 'Serving Pots'
};

async function migrate(): Promise<void> {
  try {
    await connectDB();
    console.log('Connected to database');

    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);
    
    for (const product of products) {
      await Product.findByIdAndUpdate(product._id, {
        $set: {
          variants: {
            colors: potColors,
            sizes: potSizes
          },
          category: categoryMap[product.category.toLowerCase()] || product.category
        }
      });
    }

    console.log('Successfully updated all products with variants');
    process.exit(0);
  } catch (error) {
    console.error('Error updating products:', error);
    process.exit(1);
  }
}

migrate();