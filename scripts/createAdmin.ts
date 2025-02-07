import mongoose from 'mongoose';
import Admin from '../src/models/Admin';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { connectDB } from '../src/lib/db';  // Change this line

dotenv.config();

async function createAdmin() {
  if (process.argv.length < 4) {
    console.log('Usage: npm run create-admin <email> <password>');
    process.exit(1);
  }

  const email = process.argv[2];
  const password = process.argv[3];

  try {
    await connectDB(); // Use the same connection utility as the main app
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.error('Admin with this email already exists');
      process.exit(1);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await Admin.create({
      email,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Admin created successfully');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();