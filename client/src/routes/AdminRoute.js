import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children, role }) {
  const roles = ["superadmin", "admin"];
  const login = useSelector((state) => state.login);

  return login.isLogined && roles.includes(login.role) ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
