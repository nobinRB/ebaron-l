import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose.connection;
    }

    // Assert MONGODB_URI is defined since we checked earlier
    await mongoose.connect(MONGODB_URI!);
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}