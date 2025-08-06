import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  inStock?: boolean;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  image,
  inStock,
  category,
}) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation on button click

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id,
        title,
        price,
        image: image || "",
      },
    });

    console.log("✅ Added to cart:", { id, title, price, image });
  };

  return (
    <Link to={`/product/${id}`} className="product-link">
      <div className="product-card">
        {image && <img src={image} alt={title} className="product-image" />}
        <p className="product-category">{category}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <strong>Price: ${price.toFixed(2)}</strong>
        </p>
        <p style={{ color: inStock ? "green" : "red" }}>
          {inStock ? "In Stock 🟢" : "Out of Stock 🔴"}
        </p>

        {/* 🛒 Add to Cart Button */}
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
