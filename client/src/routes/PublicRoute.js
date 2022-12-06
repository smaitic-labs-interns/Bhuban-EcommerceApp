import React from "react";
import { Route, useNavigate } from "react-router-dom";

export default function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <>
      <Route element={!isAuthenticated ? children : null}></Route>
    </>
  );
}
