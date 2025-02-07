import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(req: Request) {
  const { amount } = await req.json();

  const order = await razorpay.orders.create({
    amount: amount * 100, // amount in paise
    currency: 'INR'
  });

  return Response.json({ orderId: order.id });
} 