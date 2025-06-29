// Description: GraphQL type definitions for user and product management, including input types, query, and mutation definitions.
export interface CreateUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
    age?: number;
    gender: string;
    address?: {
      street?: string;
      apartment?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
    isAdmin?: boolean;
    country?: string;
    phone?: string;
    profilePicture?: string;
  };
}