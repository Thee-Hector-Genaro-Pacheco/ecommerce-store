import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useUser } from "../hooks/useUser";

const AdminPage: React.FC = () => {
  const { user, loading, error } = useUser();
  const navigate = useNavigate();

  console.log("user:", user);
  console.log("loading:", loading);
  console.log("error:", error);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate("/"); // or "/login" if you make a login page later
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.username}!</p>
      </div>
      <ProductForm />
    </div>
  );
};

export default AdminPage;