export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;      // Selling price
  originalPrice: number;  // MRP (Maximum Retail Price)
  stock: number;
  category: string;
  subcategory?: string;
  imageUrl: string;  // Main product image
  images?: {        // Optional additional images
    main: string;
    gallery: string[];
  };
  variants: {
    colors?: Array<{
      name: string;
      code: string;
      inStock: boolean;
    }>;
    sizes?: Array<{
      name: string;
      inStock: boolean;
    }>;
  };
  ratings: number[];
  reviews: Review[];
}

export class Product implements IProduct {
  _id: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  originalPrice: number = 0;
  stock: number = 0;
  category: string = '';
  subcategory?: string;
  imageUrl: string = '';
  images?: {
    main: string;
    gallery: string[];
  };
  variants: {
    colors?: Array<{
      name: string;
      code: string;
      inStock: boolean;
    }>;
    sizes?: Array<{
      name: string;
      inStock: boolean;
    }>;
  } = {
    colors: [],
    sizes: []
  };
  ratings: number[] = [];
  reviews: Review[] = [];

  constructor(init?: Partial<IProduct>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  clone(): Product {
    return new Product(this);
  }

  calculateAverageRating(): number {
    if (this.ratings.length === 0) return 0;
    return this.ratings.reduce((acc, curr) => acc + curr, 0) / this.ratings.length;
  }
}

export interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}