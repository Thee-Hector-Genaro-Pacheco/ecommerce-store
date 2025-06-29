export interface Address {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  phone?: string;
  country?: string;
  gender?: string;
  age?: number;
  address?: Address;
}