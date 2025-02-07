import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const cookieToken = (await cookies()).get('token')?.value;
    const authHeader = (await headers()).get('authorization');
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    
    // Use either cookie token or bearer token
    const token = cookieToken || bearerToken;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    if (!verified) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: typeof verified === 'object' ? verified : null 
    });
    
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}