import React, { useState } from "react";
import LeftTabCard from "./Components/LeftTabCard";
import {
  AdminWrapper,
  LeftWrapper,
  LeftTabContainer,
  RightWrapper,
  RightContentContainer,
} from "./styles/adminStyle";
import { Home, Inventory, People } from "@mui/icons-material";
import RightContent from "./Components/RightContent";
import AddProduct from "./Components/AddProduct";
import Product from "./Components/Product";

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
              title={"Home"}
              sx={target === 1 ? selected : null}
              onClick={() => setTarget(1)}
            />
            <LeftTabCard
              icon={<Inventory />}
              title={"Add Product"}
              sx={target === 2 ? selected : null}
              onClick={() => setTarget(2)}
            />
            <LeftTabCard
              icon={<People />}
              title={"Users"}
              sx={target === 3 ? selected : null}
              onClick={() => setTarget(3)}
            />
          </LeftTabContainer>
        </LeftWrapper>
        <RightWrapper>
          <RightContentContainer>
            <RightContent sx={target === 1 ? showContent : null}>
              <Product />
            </RightContent>
            <RightContent sx={target === 2 ? showContent : null}>
              <AddProduct />
            </RightContent>
            <RightContent sx={target === 3 ? showContent : null}>
              COntent 3
            </RightContent>
          </RightContentContainer>
        </RightWrapper>
      </AdminWrapper>
    </>
  );
}
