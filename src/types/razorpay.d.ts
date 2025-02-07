declare module 'razorpay' {
  export default class Razorpay {
    constructor(options: {
      key_id: string;
      key_secret: string;
    });
    
    orders: {
      create(options: {
        amount: number;
        currency: string;
      }): Promise<{
        id: string;
        [key: string]: any;
      }>;
    };
  }
} 