import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css"; // Import your CSS styles

interface ProductCardProps {
    id: string; // Assuming you have an id for the product
    title: string;
    description?: string;
    price: number;
    image?: string;
    inStock?: boolean;
    category?: string; // Optional, if you want to display category
}

const ProductCard: React.FC<ProductCardProps> = ({id, title, description, price, image, inStock, category}) => {
    return (
        <Link to={`/product/${id}`} className="product-link">

            <div className="product-card">
                {image && <img src={image} alt={title} className="product-image" />}
                <p className="product-category">{category}</p>

                <h2>{title}</h2>
                <p>{description}</p>
                <p><strong>Price: ${price.toFixed(2)}</strong></p>
                <p style={{color: inStock ? 'green' : 'red'}}>
                    {inStock ? 'In Stock 🟢' : 'Out of Stock 🔴'}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;


