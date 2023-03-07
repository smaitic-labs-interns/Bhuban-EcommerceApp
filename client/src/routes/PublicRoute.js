import React from 'react';
import { Route } from 'react-router-dom';

export default function PublicRoute({ children, isAuthenticated, ...rest }) {
  return (
    <>
      <Route element={!isAuthenticated ? children : null}></Route>
    </>
  );
}
