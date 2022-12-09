import { Box, Button, styled } from "@mui/material";
import { theme } from "../../utils";

export const LayoutWrapper = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
}));

export const NavbarContainer = styled(Box)(() => ({
  //   height: "10vh",
  //   zIndex: 1,
}));

export const BodyContainer = styled(Box)(() => ({
  border: "solid #1976D2 15px",
  borderTop: "none",
  borderBottom: "none",
  position: "relative",
  height: "77.6vh",
  overflow: "scroll",
  // whiteSpace: "nowrap",
  scrollbarWidth: "none", //Firefox
  "&::-webkit-scrollbar": {
    display: "none", //Chrome, Safari and Opera
    MsOverflowStyle: "none", // IE, Edge
  },
}));

export const FooterContainer = styled(Box)(() => ({
  //   height: "5vh",
  border: "solid #1976D2 15px",
  //   zIndex: 1,
}));
