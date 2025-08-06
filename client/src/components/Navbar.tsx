// client/src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';
import { use } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item ) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="logo" to="/">Ecommerce Store</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="nav-link">
          Cart 🛒 ({totalItems})
        </Link>
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <Link className="user-link" to="/account">
              <img
                className="user-avatar"
                src={user.profilePicture}
                alt="profile"
              />
              {user.username}
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;