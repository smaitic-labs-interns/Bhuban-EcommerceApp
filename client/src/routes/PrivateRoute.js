import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, isAuthenticated, ...rest }) {
  const login = useSelector((state) => state.login);
  return login.isLogined ? children : <Navigate to="/login" />;
}
