import User from '../../models/User';
import Product from '../../models/Product';
import { getUserFromToken, DecodedUser } from '../utils/auth';
import { uploadImage } from '../lib/uploadImage';
import { hashPassword } from '../utils/hash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


import { CreateUserArgs } from './types/userTypes';
import { CreateProductArgs } from './types/productTypes';
import { UploadImageArgs } from './types/imageTypes';

interface Context {
  token: string | null;
}

export const resolvers /*: Resolvers<Context>*/ = {
  Query: {
    hello: (): string => "Hello, world!",

    users: async () => {
      return await User.find();
    },

    products: async () => {
      return await Product.find();
    },
    productsByCategory: async (_: unknown, { category }: { category: string }) => {
      return await Product.find({ category });
    },
    product: async (_: unknown, { id }: { id: string }) => {
      return await Product.findById(id);
    },


    me: async (_: unknown, __: unknown, context: Context) => {
      const decoded = await getUserFromToken(context.token) as DecodedUser;
      if (!decoded) throw new Error("Not authenticated");

      const user = await User.findById(decoded.id);
      if (!user) throw new Error("User not found");
      return user;
    },
  },

  Mutation: {
    createUser: async (_: unknown, args: CreateUserArgs) => {
      const { username, email, password } = args;
      const hashedPassword = await hashPassword(password);
      return await User.create({ username, email, password: hashedPassword });
    },

    createProduct: async (_: unknown, { input }: { input: CreateProductArgs} , context: Context) => {
      const user = await getUserFromToken(context.token) as DecodedUser;
      if (!user || !user.isAdmin) throw new Error("Unauthorized: only admins can create products");

      const { title, description, price, category, image, inStock } = input;
      return await Product.create({ title, description, price, category, image, inStock });
    },

    uploadImage: async (_: unknown, args: UploadImageArgs) => {
      const { fileBuffer, originalName, mimeType } = args;
      const buffer = Buffer.from(fileBuffer, 'base64');
      const url = await uploadImage(buffer, originalName, mimeType);
      return { url };
    },
    loginUser: async (_: unknown, { email, password }: { email: string, password: string }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Sign a token with user ID and isAdmin
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

    return token;
  },
  },
};
