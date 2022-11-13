import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import ProductDetailContainer from "./pages/Product/ProductDetailContainer";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import Logout from "./pages/Logout/index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import { useSelector } from "react-redux";

// For routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Layout from "./Layout/Layout";

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
          <Route path="/" element={<Layout />}>
            {/* <Routes> */}
            <Route index element={<Home />} />
            <Route
              path="profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="login"
              element={
                <ProtectedRoute
                  children={<Login />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="register"
              element={
                <ProtectedRoute
                  children={<Register />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="logout" element={<Logout />}></Route>
            <Route
              path="product/:productId"
              element={<ProductDetailContainer />}></Route>
            <Route path="cart" element={<Cart />}></Route>
          </Route>
          <Route path="/admin">
            <Route
              index
              element={
                <AdminRoute
                  children={<Admin />}
                  isAuthenticated={isAuthenticated}
                />
              }></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// function App() {
//   return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// }
export default App;
