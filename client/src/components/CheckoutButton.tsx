import React from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($cartItems: [CartItemInput!]!) {
    createCheckoutSession(cartItems: $cartItems) {
      url
    }
  }
`;

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutButtonProps {
  cartItems: CartItem[];
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cartItems }) => {
  const [createCheckoutSession, { loading }] = useMutation(CREATE_CHECKOUT_SESSION);

  const handleCheckout = async () => {
    try {
      const { data } = await createCheckoutSession({
        variables: { cartItems },
      });

      // ✅ Backend returns { url }, so we redirect to that
      const checkoutUrl = data?.createCheckoutSession?.url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (error) {
      console.error('Error starting checkout:', error);
      alert('Something went wrong with checkout.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || cartItems.length === 0}
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? 'Redirecting...' : 'Checkout'}
    </button>
  );
};

export default CheckoutButton;
