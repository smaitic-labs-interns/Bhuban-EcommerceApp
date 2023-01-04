import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// routes
import { PrivateRoute, ProtectedRoute, AdminRoute } from 'Routes';

// pages
import Layout from 'Layout';
import Home from 'Pages/Home';
import ProductDetailContainer from 'Pages/Product';
import Register from 'Pages/Register';
import Login from 'Pages/Login';
import Profile from 'Pages/Profile';
import NotFound from 'Pages/NotFound';
import Cart from 'Pages/Cart';
import Admin from 'Pages/Admin';
import Order from 'Pages/Order';
import Bill from 'Pages/Bill';
import Track from 'Pages/Track';
import Search from 'Pages/Search';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {/* For user Pages  */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path='profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='register'
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            ></Route>
            <Route path='product/:productId' element={<ProductDetailContainer />} />
            <Route
              path='cart'
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path='generateBill'
              element={
                <PrivateRoute>
                  <Bill />
                </PrivateRoute>
              }
            />
            <Route path='order' element={<Track />} />
            <Route path='search' element={<Search />} />

            <Route
              path='placeOrder'
              element={
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              }
            />
          </Route>

          {/* For admin route  */}
          <Route path='/admin'>
            <Route
              index
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            ></Route>
          </Route>

          {/* for not found pages */}
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
