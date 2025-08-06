import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import "../styles/CartPage.css";

const CartPage = () => {
  const { state } = useCart();

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {state.items.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>

          {/* ✅ Pass items mapped to match CartItemInput */}
          <CheckoutButton
            cartItems={state.items.map(item => ({
              id: item.id,
              title: item.title,    // ✅ matches server type
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            }))}
          />
        </>
      )}
    </div>
  );
};

export default CartPage;
