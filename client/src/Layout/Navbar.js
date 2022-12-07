import React from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import { Adb, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { user_logout } from "../redux/actions/userActions";
import {
  NavbarWrapper,
  NavbarContainer,
  NavbarTitle,
  NavbarMenu,
  ImageWrapper,
} from "./styles/navbarStyle";
import CustomMenuItem from "./components/CustomMenuItem";

export default function Navbar() {
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  let image =
    login.imageUrl && login.imageUrl !== "" && login.imageUrl != null
      ? login.imageUrl
      : "/images/user/user.webp";

  const handleLogout = () => {
    dispatch(user_logout());
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <Link href="/" sx={{ textDecoration: "none", color: "#fff" }}>
          <NavbarTitle>
            <Adb />
            <Typography>My Shop</Typography>
          </NavbarTitle>
        </Link>
        <NavbarMenu>
          <CustomMenuItem page={{ name: "Search", href: "/search/" }} />
          <CustomMenuItem page={{ name: "Track My Order", href: "/order" }} />

          {login.isLogined ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                underline="none"
                href={"/cart"}
                sx={{ textDecoration: "none", color: "#fff" }}
              >
                <Typography textAlign="center">
                  <ShoppingCart />
                </Typography>
              </Link>
              <Link
                underline="none"
                href={"/profile"}
                sx={{ textDecoration: "none", color: "#fff" }}
              >
                <ImageWrapper>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${image}`}
                    alt={login.imageAltText}
                  />
                </ImageWrapper>
              </Link>
              <Link
                underline="none"
                href={"/login"}
                sx={{ textDecoration: "none" }}
              >
                <Button onClick={handleLogout}>
                  <Typography sx={{ color: "#fff" }}>{"Logout"}</Typography>
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              <CustomMenuItem page={{ name: "login", href: "/login" }} />
              <CustomMenuItem page={{ name: "register", href: "/register" }} />
            </>
          )}
        </NavbarMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
}
