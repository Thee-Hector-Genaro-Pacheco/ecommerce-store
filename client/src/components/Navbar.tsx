import React, { useState} from "react";
import { Link } from "react-router-dom";    
import "../styles/Navbar.css"; // Import your CSS styles

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
    <nav className="navbar">
      <Link to="/" className="logo">🏠 EcomStore</Link>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <div className="dropdown">
          <button className="dropbtn">Products ▾</button>
          <div className="dropdown-content">
            <Link to="/products/shirts">Shirts</Link>
            <Link to="/products/necklaces">Necklaces</Link>
            <Link to="/products/purses">Purses</Link>
            <Link to="/products/stanley-cups">Stanley Cups</Link>
          </div>
        </div>
        <Link to="/admin">Admin</Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </nav>
  );
};

export default Navbar;