// client/src/pages/Products.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import ProductCard from "../components/ProductCard";
import { Product } from "../graphql/types/productTypes"; // ✅ import your Product type
import { GET_PRODUCTS } from "../graphql/queries/getProducts";
import "../styles/Products.css"; // ✅ import your CSS styles

const Products: React.FC = () => {
  const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS); // ✅ type your query result

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products 😢</p>;

  return (
    <div className="product-grid">
      {data?.products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          inStock={product.inStock}
          category={product.category}
        />

      ))}
    </div>
  );
};

export default Products;
