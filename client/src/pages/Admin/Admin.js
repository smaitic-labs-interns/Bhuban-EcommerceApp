import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LeftTabCard from "Pages/Admin/Components/LeftTabCard";
import {
  Home,
  Inventory,
  Logout,
  People,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import RightContent from "Pages/Admin/Components/RightContent";
import Product from "Pages/Admin/Components/Product";
import Order from "Pages/Admin/Components/Order";
import User from "Pages/Admin/Components/User";
import Dashboard from "Pages/Admin/Components/Dashboard";
import { user_logout } from "Actions/userActions";
import {
  AdminWrapper,
  LeftWrapper,
  LeftTabContainer,
  RightWrapper,
  RightContentContainer,
} from "Pages/Admin/styles/adminStyle";

export default function Admin() {
  const [target, setTarget] = useState(1);
  const dispatch = useDispatch();

  const selected = {
    background: "#fff",
    borderRadius: "1rem",
    color: "#000",
  };

  const showContent = {
    display: "flex",
  };

  const handleLogout = () => {
    dispatch(user_logout());
  };

  return (
    <>
      <AdminWrapper>
        <LeftWrapper>
          <LeftTabContainer>
            <LeftTabCard
              icon={<Home />}
              title={"Dashboard"}
              sx={target === 1 ? selected : null}
              onClick={() => setTarget(1)}
            />
            <LeftTabCard
              icon={<Inventory />}
              title={"Product"}
              sx={target === 2 ? selected : null}
              onClick={() => setTarget(2)}
            />
            <LeftTabCard
              icon={<ShoppingCartCheckout />}
              title={"Order"}
              sx={target === 3 ? selected : null}
              onClick={() => setTarget(3)}
            />
            <LeftTabCard
              icon={<People />}
              title={"Users"}
              sx={target === 4 ? selected : null}
              onClick={() => setTarget(4)}
            />
            <LeftTabCard
              icon={<Logout />}
              title={"Logout"}
              onClick={handleLogout}
            />
          </LeftTabContainer>
        </LeftWrapper>
        <RightWrapper>
          <RightContentContainer>
            <RightContent sx={target === 1 ? showContent : null}>
              <Dashboard />
            </RightContent>
            <RightContent sx={target === 2 ? showContent : null}>
              <Product />
            </RightContent>
            <RightContent sx={target === 3 ? showContent : null}>
              <Order />
            </RightContent>
            <RightContent sx={target === 4 ? showContent : null}>
              <User />
            </RightContent>
          </RightContentContainer>
        </RightWrapper>
      </AdminWrapper>
    </>
  );
}
