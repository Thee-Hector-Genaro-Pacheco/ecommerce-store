import mongoose, { Schema, Document } from "mongoose";

export type Category = 'shirts' | 'necklaces' | 'purses' | 'stanley-cups';

export interface ProductDocument extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  inStock?: boolean;
  category: Category;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['shirts', 'necklaces', 'purses', 'stanley-cups'],
      required: true,
    },
    image: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ProductDocument>("Product", productSchema);
