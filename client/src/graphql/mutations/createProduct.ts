import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $price: Float!
    $description: String
    $image: String
    $inStock: Boolean
    $category: String!
  ) {
    createProduct(
      title: $title
      price: $price
      description: $description
      image: $image
      inStock: $inStock
      category: $category
    ) {
      id
      title
      category
    }
  }
`;
