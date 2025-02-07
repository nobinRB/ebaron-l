import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const token = (await headersList).get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, return a mock user
    // Later, you can replace this with actual user data from your database
    return NextResponse.json({
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    });

  } catch (error) {
    console.error('Error in user route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}