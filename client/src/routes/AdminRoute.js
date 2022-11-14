import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children, isAuthenticated }) {
  const userRole = "admin";
  //   return isAuthenticated === true ? children : <Navigate to="/login" />;
  return children;
}
