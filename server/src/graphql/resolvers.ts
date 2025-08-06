import User from '../../models/User';
import Product from '../../models/Product';
import { getUserFromToken, DecodedUser, loginAndGenerateToken } from '../utils/auth';
import { uploadImage } from '../lib/uploadImage';
import { hashPassword } from '../utils/hash';

import { CreateUserArgs } from './types/userTypes';
import { CreateProductArgs } from './types/productTypes';
import { UploadImageArgs } from './types/imageTypes';
import { CartItemInput } from './types/CartItemInput';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Stripe from 'stripe';
import { url } from 'inspector';


const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil', // ✅ use Stripe's newest supported version
});



interface Context {
  token: string | null;
}
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

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
    createCheckoutSession: async (_: any, { cartItems }: { cartItems: CartItemInput[] } ) => {
      try {
        console.log("Incoming checkout items:", cartItems); // Add this log
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: cartItems.map(item => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                images: item.image ? [item.image] : [], // Optional: include image if provided
              },
              unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
            },
            quantity: item.quantity,
          })),
          success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_URL}/cart`,               

        });
        return { url: session.url };
      } catch (error: any) {
         console.error("Stripe session error details:", error); // ✅ Log full error
         console.log("Incoming checkout items:", cartItems); // Add this log
         throw new Error("Failed to create checkout session");
      }

    },
    createUser: async (_: unknown, args: CreateUserArgs) => {
      const {
        username,
        email,
        password,
        age,
        gender,
        address,
        country,
        phone,
        profilePicture,
        isAdmin, 
      } = args.input;

      const hashedPassword = await hashPassword(password);
      const finalProfilePicture =
        profilePicture && profilePicture.trim() !== ''
          ? profilePicture
          : (gender ?? '').toLowerCase() === 'female'
            ? 'https://ecommerce-store-images-hectors-products.s3.us-east-2.amazonaws.com/default-female-icon.png'
            : 'https://ecommerce-store-images-hectors-products.s3.us-east-2.amazonaws.com/default-male-icon.png';

      return await User.create({
        username,
        email,
        password: hashedPassword,
        age,
        gender,
        address,
        country,
        phone,
        profilePicture: finalProfilePicture,
          isAdmin: isAdmin || false,
      });
    },

    createProduct: async (_: unknown, { input }: { input: CreateProductArgs} , context: Context) => {
      const user = await getUserFromToken(context.token) as DecodedUser;
      if (!user || !user.isAdmin) throw new Error("Unauthorized: only admins can create products");

      const { title, description, price, category, image, inStock } = input;
      return await Product.create({ title, description, price, category, image, inStock });
    },

    uploadImage: async (_: unknown, args: UploadImageArgs) => {
      const { fileBuffer, originalName, mimeType, folder = 'misc' } = args;
      const buffer = Buffer.from(fileBuffer, 'base64');
      const url = await uploadImage(buffer, originalName, mimeType, folder);
      return { url };
    },
   loginUser: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      // Manually shape the user to match the GraphQL `User` type
      const fullUser = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        age: user.age,
        gender: user.gender,
        country: user.country,
        phone: user.phone,
        profilePicture: user.profilePicture,
        address: user.address ? {
          street: user.address.street,
          apartment: user.address.apartment,
          city: user.address.city,
          state: user.address.state,
          zipCode: user.address.zipCode
        } : null
      };

      return { token, user: fullUser };
    },
    getPresignedUrl: async (
  _: unknown,
  { filename, folder }: { filename: string; folder: string }
) => {
  const key = `${folder}/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ContentType: "image/png", // consider customizing based on file extension
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // valid for 5 minutes
  return signedUrl;
},
  },
};
