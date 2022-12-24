import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// routes
import { PrivateRoute, ProtectedRoute, AdminRoute } from 'Routes';

// pages
import Layout from 'Layout';
import Home from 'Pages/Home';
import ProductDetailContainer from 'Pages/Product/ProductDetailContainer';
import Register from 'Pages/Register';
import Login from 'Pages/Login';
import Profile from 'Pages/Profile';
import NotFound from 'Pages/NotFound/NotFound';
import Cart from 'Pages/Cart';
import Admin from 'Pages/Admin/Admin';
import Order from 'Pages/Order/Order';
import Bill from 'Pages/Bill';
import Track from 'Pages/track/Track';
import Search from 'Pages/Search/Search';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {/* For user Pages  */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<PrivateRoute children={<Profile />} />} />
            <Route path='login' element={<ProtectedRoute children={<Login />} />} />
            <Route path='register' element={<ProtectedRoute children={<Register />} />}></Route>
            <Route path='product/:productId' element={<ProductDetailContainer />} />
            <Route path='cart' element={<Cart />} />
            <Route path='generateBill' element={<Bill />} />
            <Route path='order' element={<Track />} />
            <Route path='search' element={<Search />} />

            <Route path='placeOrder' element={<PrivateRoute children={<Order />} />} />
          </Route>

          {/* For admin route  */}
          <Route path='/admin'>
            <Route index element={<AdminRoute children={<Admin />} />}></Route>
          </Route>

          {/* for not found pages */}
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
