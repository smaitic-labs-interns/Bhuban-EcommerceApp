import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// routes
import { PrivateRoute, ProtectedRoute, AdminRoute } from "./routes";

// pages
import Home from "./pages/Home/Home";
import ProductDetailContainer from "./pages/Product/ProductDetailContainer";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import Logout from "./pages/Logout/index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import Order from "./pages/Order/Order";
import Bill from "./pages/Bill/Bill";
import Layout from "./Layout/Layout";
import Track from "./pages/track/Track";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* For user Pages  */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="profile"
              element={<PrivateRoute children={<Profile />} />}
            />
            <Route
              path="login"
              element={<ProtectedRoute children={<Login />} />}
            />
            <Route
              path="register"
              element={<ProtectedRoute children={<Register />} />}
            />
            <Route path="logout" element={<Logout />}></Route>
            <Route
              path="product/:productId"
              element={<ProductDetailContainer />}
            ></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="generateBill" element={<Bill />}></Route>
            <Route path="order" element={<Track />}></Route>
            <Route path="search" element={<Search />}></Route>

            <Route
              path="placeOrder"
              element={<PrivateRoute children={<Order />} />}
            />
          </Route>

          {/* For admin route  */}
          <Route path="/admin">
            <Route index element={<AdminRoute children={<Admin />} />}></Route>
          </Route>

          {/* for not found pages */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
