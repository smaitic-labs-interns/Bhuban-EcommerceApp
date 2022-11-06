import React, { useState, useEffect } from "react";

import Home from "./pages/Home/Home";
import ProductDetailContainer from "./pages/Product/ProductDetailContainer";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import Logout from "./pages/Logout/index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/index";
import Admin from "./pages/Admin/Admin";
import { useSelector } from "react-redux";

// For routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useSelector((state) => state.login);

  useEffect(() => {
    if (login.isLogined === true) setIsAuthenticated(true);
  }, [login.isLogined]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                children={<Login />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                children={<Register />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route path="/logout" element={<Logout />}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetailContainer />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>

          {/* << FOR ADMIN ACCESS >> */}
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// For Admin Pages

export const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useSelector((state) => state.login);

  useEffect(() => {
    if (login.isLogined === true) setIsAuthenticated(true);
  }, [login.isLogined]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute
                children={<Admin />}
                isAuthenticated={isAuthenticated}
              />
            }></Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute
                children={<Login />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
