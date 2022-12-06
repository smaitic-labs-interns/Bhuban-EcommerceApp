import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const login = useSelector((state) => state.login);
  return login.isLogined === false ? children : <Navigate to="/profile" />;
}
