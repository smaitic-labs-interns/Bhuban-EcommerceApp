import React, { useEffect, useState } from "react";
import { Typography, Button, Link } from "@mui/material";
import { AllInclusive, Close, Menu, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { user_logout } from "../redux/actions/userActions";
import CustomMenuItem from "./components/CustomMenuItem";
import { random_color } from "../utils";
import { generalMenue, withoutLoginMenu } from "../datas/navBarMenuItem";
import {
  NavbarWrapper,
  NavbarContainer,
  HeaderWrapper,
  NavbarMenu,
  HamburgerWrapper,
} from "./styles/navbarStyle";
import { theme } from "../utils";

export default function Navbar() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [animColor, setAnimColor] = useState("#0f0");
  const [openMenue, setOpenMenue] = useState(false);

  let image =
    login.imageUrl && login.imageUrl !== "" && login.imageUrl != null
      ? login.imageUrl
      : "/images/user/user.webp";

  const handleLogout = () => {
    dispatch(user_logout());
  };

  useEffect(() => {
    const var2 = setInterval(() => {
      setAnimColor(random_color());
    }, 100);
    return () => clearInterval(var2);
  }, []);

  const loginMenue = [
    { id: 4, icon: <ShoppingCart sx={{ fontSize: "50px" }} />, href: "/cart" },
    { id: 5, image: image, imageAltText: login.imageAltText, href: "/profile" },
  ];

  const handleToggleMenue = () => {
    setOpenMenue((openMenue) => !openMenue);
  };

  const menuStyle = {
    [theme.breakpoints.down("900")]: {
      display: openMenue ? "flex" : "none",
    },
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <HeaderWrapper>
          <Link href="/">
            <AllInclusive sx={{ color: animColor }} />
            <Typography variant="mh1" sx={{ color: animColor }}>
              INFINITY SHOP
            </Typography>
          </Link>
        </HeaderWrapper>
        <HamburgerWrapper>
          <Button onClick={handleToggleMenue}>
            <Menu sx={{ display: openMenue ? "none" : "flex" }} />
            <Close sx={{ display: openMenue ? "flex" : "none" }} />
          </Button>
        </HamburgerWrapper>
        <NavbarMenu sx={menuStyle}>
          {generalMenue.map((menue) => (
            <CustomMenuItem key={menue.id} page={menue} />
          ))}

          {login.isLogined ? (
            <>
              {loginMenue.map((menue) => (
                <CustomMenuItem key={menue.id} page={menue} />
              ))}

              <Button onClick={handleLogout}>
                <Typography sx={{ color: "#fff" }}>{"Logout"}</Typography>
              </Button>
            </>
          ) : (
            <>
              {withoutLoginMenu.map((menue) => (
                <CustomMenuItem key={menue.id} page={menue} />
              ))}
            </>
          )}
        </NavbarMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
}
