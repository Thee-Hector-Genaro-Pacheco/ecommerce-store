export interface CreateProductArgs {
    title: string;
    description?: string;   // optional
    price: number;
    category: 'shirts' | 'necklaces' | 'purses' | 'stanley-cups'; // enum
    image?: string;         // optional
    inStock?: boolean;      // optional
}