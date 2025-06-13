// server/src/utils/auth.ts
import jwt from 'jsonwebtoken';

export interface DecodedUser {
  id: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export const getUserFromToken = (token: string | null): DecodedUser | null => {
  if (!token) return null;

  console.log('🔐 Token received in getUserFromToken:', token);

  try {
    const cleanedToken = token.replace('Bearer ', '').trim();
    const user = jwt.verify(cleanedToken, process.env.JWT_SECRET as string) as DecodedUser;
    return user;
  } catch (error) {
    console.error('❌ Error verifying token:', error);
    return null;
  }
};
