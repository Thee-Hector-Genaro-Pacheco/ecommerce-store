// server/src/graphql/types/CartItemInput.ts

export interface CartItemInput {
  id: string;
  quantity: number;
  price: number;
  title: string;
  image?: string; // Optional, if you want to include the image URL
}
