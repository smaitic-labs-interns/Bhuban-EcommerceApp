import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return isAuthenticated === true ? children : <Navigate to="/login" />;
}
