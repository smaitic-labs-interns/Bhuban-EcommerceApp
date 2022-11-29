import React, { useState } from "react";
import LeftTabCard from "./Components/LeftTabCard";
import {
  AdminWrapper,
  LeftWrapper,
  LeftTabContainer,
  RightWrapper,
  RightContentContainer,
} from "./styles/adminStyle";
import {
  Home,
  Inventory,
  People,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import RightContent from "./Components/RightContent";
import Product from "./Components/Product";
import Order from "./Components/Order";
import User from "./Components/User";
import Dashboard from "./Components/Dashboard";

export default function Admin() {
  const [target, setTarget] = useState(1);

  const selected = {
    background: "#fff",
    borderRadius: "1rem",
    color: "#000",
  };

  const showContent = {
    display: "flex",
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
