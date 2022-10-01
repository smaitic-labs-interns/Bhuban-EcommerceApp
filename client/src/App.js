import logo from "./logo.svg";
import "./App.css";

// For routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailContainer from "./containers/ProductDetailContainer";
import UserProfileContainer from "./containers/UserProfileContainer";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/product/:productId" element={<ProductDetailContainer />}></Route>
        <Route path="/profile" element={<UserProfileContainer />}></Route>        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
