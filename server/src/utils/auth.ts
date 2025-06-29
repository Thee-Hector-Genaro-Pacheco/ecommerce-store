// server/src/utils/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  User  from '../../models/User'; // Adjust the import path as necessary

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


export const loginAndGenerateToken = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );
};