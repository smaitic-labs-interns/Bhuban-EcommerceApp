import { Box, Button, styled } from "@mui/material";
// import theme from "../../../utils/theme";

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
}));

export const NavbarTitle = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  "& >p ": {
    fonntWeight: 600,
    fontSize: "28px",
  },
}));

export const NavbarMenu = styled(Box)(() => ({
  display: "flex",
}));

export const NavbarProfileWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 999,
}));
export const ImageWrapper = styled(Button)(() => ({
  marginLeft: "1rem",
  "& >img": {
    width: "50px",
    height: "50px",
    borderRadius: "40%",
    position: "relative",
    objectfit: "contain",
  },
}));
