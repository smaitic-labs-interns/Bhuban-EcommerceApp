import React from "react";

// For routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetailContainer from "./pages/Product/ProductDetailContainer";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import Logout from "./pages/Logout/index";
import Profile from "./pages/Profile";
// import UserProfileContainer from "./containers/UserProfileContainer";
// import NotFoundContainer from "./containers/NotFoundContainer";
import NotFound from "./pages/NotFound/NotFound";
// import CartContainer from "./containers/CartContainer";
import Cart from "./pages/Cart/index";
import Admin from "./pages/Admin/Admin";
// import User from "./pages/UserTest";
// import Admin from "./pages/Admin/Admin";

// my Changes//
// import { ColorModeContext, useMode } from "./theme";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Dashboard from "./scenes/dashboard/Dashboard";
// import Sidebar from "./scenes/global/Sidebar";
// import { useState } from "react";
// import Sidebar from "./scenes/global/Sidebar";
// import Team from "./scenes/Team";
// import Invoices from "./scenes/Invoices";
// import Contacts from "./scenes/Contacts";
// import Bar from "./scenes/Bar";
// import Form from "./scenes/Form";
// import Line from "./scenes/Line";
// import Pie from "./scenes/Pie";
// import FAQ from "./scenes/FAQ";
// import Geography from "./scenes/Geography";
// import Calendar from "./scenes/Calendar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetailContainer />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          {/* <Route path="/test" element={<User />}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar isSidebar = {isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar = {setIsSidebar} />
//             <BrowserRouter>
//               <Routes>
//                 <Route path="/" element={<Dashboard />} ></Route>
//                 {/* <Route path="/team" element={<Team />} /> */}
//                 {/* <Route path="/contacts" element={<Contacts />} /> */}
//                 {/* <Route path="/invoices" element={<Invoices />} /> */}
//                 {/* <Route path="/form" element={<Form />} /> */}
//                 {/* <Route path="/bar" element={<Bar />} /> */}
//                 {/* <Route path="/pie" element={<Pie />} /> */}
//                 {/* <Route path="/line" element={<Line />} /> */}
//                 {/* <Route path="/faq" element={<FAQ />} /> */}
//                 {/* <Route path="/geography" element={<Geography />} /> */}
//                 {/* <Route path="/calendar" element={<Calendar />} /> */}
//               </Routes>
//             </BrowserRouter>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// }

export const AdminApp = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
