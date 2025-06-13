import React from "react";
import ProductForm from "../components/ProductForm";
import { useUser } from "../hooks/useUser";

const AdminPage: React.FC = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  if (!user?.isAdmin) {
    return <h2>🚫 Access denied: Admins only.</h2>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.username}!</p>
      </div>
      <ProductForm />
    </div>
  );
};

export default AdminPage;
