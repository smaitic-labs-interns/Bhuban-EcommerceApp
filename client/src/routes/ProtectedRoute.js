import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated === false ? children : <Navigate to="/profile" />;
}
