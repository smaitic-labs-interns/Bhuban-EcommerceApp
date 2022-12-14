import { Box, Button, styled } from "@mui/material";
import { theme } from "Utils";

export const NavbarWrapper = styled(Box)(() => ({
  background: "#1976D2",
  color: "#fff",
  width: "100%",
}));

export const NavbarContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "1rem",
  [theme.breakpoints.down("900")]: {
    flexDirection: "column",
  },
}));

export const HeaderWrapper = styled(Box)(() => ({
  "& >a ": {
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    "& > svg": {
      fontSize: "100px",
    },
  },
}));

export const NavbarMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("900")]: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));

export const HamburgerWrapper = styled(Box)(() => ({
  display: "none",
  [theme.breakpoints.down("900")]: {
    display: "flex",
    width: "100%",
    padding: "1rem",
    justifyContent: "flex-end",
    position: "relative",
  },
  "& > button": {
    position: "absolute",
    bottom: "1rem",
  },
  "&> button >svg": {
    fontSize: "40px",
    color: "#fff",
  },
  "&> button >svg: nth-of-type(2)": {
    background: "#f00",
  },
}));

export const NavbarProfileWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 999,
}));
export const LogoutBtnWrapper = styled(Button)(() => ({}));
