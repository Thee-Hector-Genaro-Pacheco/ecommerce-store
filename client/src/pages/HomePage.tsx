// client/src/pages/HomePage.tsx
import React from "react";
import Products from "./Products";
import { useUser } from "../hooks/useUser";
import { Navigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Products />;
};

export default HomePage;
