import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const login = useSelector((state) => state.login);
  const roles = ["superadmin", "admin"];

  return login.isLogined ? (
    roles.includes(login.role) ? (
      <Navigate to={"/admin"} />
    ) : (
      <Navigate to="/profile" />
    )
  ) : (
    children
  );
}
