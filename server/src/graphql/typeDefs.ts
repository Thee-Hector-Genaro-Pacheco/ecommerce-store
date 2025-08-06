import gql from 'graphql-tag';

export const typeDefs = gql`
  # =======================
  # 🧾 INPUT TYPES
  # =======================
  input AddressInput {
    street: String
    apartment: String
    city: String
    state: String
    zipCode: String
  }

  input CreateUserInput {
    username: String!
    isAdmin: Boolean = false
    email: String!
    password: String!
    age: Int
    gender: String
    address: AddressInput
    country: String
    phone: String
    profilePicture: String
  }

  input CreateProductInput {
    title: String!
    description: String
    price: Float!
    category: String!
    image: String
    inStock: Boolean
  }
  input CartItemInput {
    id: ID!
    quantity: Int!  # Quantity of the product in the cart     
    price: Float!  # Price of the product at the time it was added to the cart
    title: String!  # Title of the product
    image: String # Optional, if you want to include the image URL
  }
  input CartItemInput {
    id: ID!
    quantity: Int!  # Quantity of the product in the cart
    price: Float!  # Price of the product at the time it was added to the cart
    title: String!  # Title of the product
  } 

  # =======================
  # 📦 TYPE DEFINITIONS
  # =======================
  type Address {
    street: String
    apartment: String
    city: String
    state: String
    zipCode: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
    age: Int
    gender: String
    address: Address
    country: String
    phone: String
    profilePicture: String
  }

  type Product {
    id: ID!
    title: String!
    description: String
    price: Float!
    category: String!
    image: String
    inStock: Boolean
    createdAt: String
    updatedAt: String
  }

  type CheckoutResponse {
    url: String!
  }


  type UploadResponse {
    url: String!
  }
  type LoginResponse {
    token: String!
    user: User!
  }

  type CheckoutResponse {
    url: String!
  }

  # =======================
  # 🔍 QUERY DEFINITIONS
  # =======================
  type Query {
    hello: String
    users: [User!]!
    products: [Product!]!
    productsByCategory(category: String!): [Product!]!
    product(id: ID!): Product
    me: User
  }

  # =======================
  # ✏️ MUTATION DEFINITIONS
  # =======================
  type Mutation {
    createUser(input: CreateUserInput!): User
    loginUser(email: String!, password: String!): LoginResponse
    createProduct(input: CreateProductInput!): Product
    uploadImage(fileBuffer: String!, originalName: String!, mimeType: String!): UploadResponse
    getPresignedUrl(filename: String!, folder: String!): String!
    createCheckoutSession(cartItems: [CartItemInput!]!): CheckoutResponse!
  }
`;
