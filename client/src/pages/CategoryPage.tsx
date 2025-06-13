import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css"

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  inStock?: boolean;
}


const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      id
      title
      description
      price
      image
      inStock
    }
  }
`;
const CategoryPage: React.FC = () => {
    const { category } = useParams<{category: string}>();
    // console.log("🔍 Sending category variable to GraphQL:", category);

    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: { category },
        

    });
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products 😢</p>;

     return (
    <div className="product-grid">
      <h2>{category?.toUpperCase()}</h2>
      {data.productsByCategory.map((product: Product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
export default CategoryPage;