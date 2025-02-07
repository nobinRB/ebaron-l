import { NextResponse } from 'next/server';

export async function GET() {
  // This is sample data - replace with actual database queries
  const stats = {
    totalSales: {
      amount: 9328.55,
      orders: 731,
      growth: 15.6,
      weeklyGrowth: 1400,
    },
    visitors: {
      total: 12302,
      avgTime: '4:30m',
      growth: 12.7,
      weeklyGrowth: 1200,
    },
    refunds: {
      total: 963,
      disputed: 2,
      growth: -12.7,
      weeklyChange: -213,
    },
  };

  return NextResponse.json(stats);
}