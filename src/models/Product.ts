import mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IReview {
  _id: ObjectId | string;
  userId: ObjectId | string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

interface IVariant {
  colors?: Array<{
    name: string;
    code: string;
    inStock: boolean;
  }>;
  sizes?: Array<{
    name: string;
    inStock: boolean;
  }>;
}

export interface IProductBase {
  _id: string | ObjectId;  // Add this line
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  category: string;
  subcategory?: string;
  stock: number;
  ratings: number;
  reviews: IReview[];
  variants: IVariant;
  images: string[];
  mainImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document, IProductBase {
  _id: string | ObjectId;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please provide the original price (MRP)'],
    min: [0, 'Original price cannot be negative'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide a product image URL'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
  },
  subcategory: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  variants: {
    colors: [{
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      inStock: {
        type: Boolean,
        default: true,
      },
    }],
    sizes: [{
      name: {
        type: String,
        required: true,
      },
      inStock: {
        type: Boolean,
        default: true,
      },
    }],
  },
  images: [{ type: String }],
  mainImage: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);