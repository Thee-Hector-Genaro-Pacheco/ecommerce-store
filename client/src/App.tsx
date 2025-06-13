import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Specific static paths first */}
        <Route path="/" element={<Products />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/products" element={<Products />} />
        
        {/* Then dynamic routes */}
        <Route path="/products/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
