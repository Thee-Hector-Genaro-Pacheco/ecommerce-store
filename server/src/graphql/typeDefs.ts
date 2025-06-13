import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    isAdmin: Boolean!
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

  type UploadResponse {
    url: String!
  }
  input CreateProductInput {
    title: String!
    description: String
    price: Float!
    category: String!       # enum category: 'shirts' | 'necklaces' | 'purses' | 'stanley-cups'
    image: String
    inStock: Boolean
  }
  type Query {
    hello: String
    users: [User!]!
    products: [Product!]!
    productsByCategory(category: String!): [Product!]!
    product(id: ID!): Product
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): String
    createProduct(
      input: CreateProductInput!
    ): Product
    uploadImage(fileBuffer: String!, originalName: String!, mimeType: String!): UploadResponse
  }
`;
