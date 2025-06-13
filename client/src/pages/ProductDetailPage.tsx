import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  inStock?: boolean;
  category: string;
}

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      image
      inStock
      category
    }
  }
`;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ product: Product }>(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error loading product 😢</p>;

  const product = data?.product;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail">
      {product.image && <img src={product.image} alt={product.title} className="detail-image" />}
      <h1>{product.title}</h1>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description || "No description."}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p style={{ color: product.inStock ? 'green' : 'red' }}>
        {product.inStock ? 'In Stock 🟢' : 'Out of Stock 🔴'}
      </p>
    </div>
  );
};

export default ProductDetailPage;
