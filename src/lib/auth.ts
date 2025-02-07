import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export async function verifyAuth(token: string): Promise<DecodedToken> {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}