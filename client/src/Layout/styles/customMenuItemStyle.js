import { Box, MenuItem, styled, Typography } from "@mui/material";
import { theme } from "Utils";

export const MenuItemWrapper = styled(Box)(() => ({
  background: "#1976D2",
  color: "#fff",
  width: "100%",
}));

export const MenuItemContainer = styled(MenuItem)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const MenuItemTitle = styled(Typography)(() => ({
  textAlign: "center",
}));

export const ImageWrapper = styled(Box)(() => ({
  marginLeft: "1rem",
  "& >img": {
    width: "50px",
    height: "50px",
    borderRadius: "40%",
    position: "relative",
    objectfit: "contain",
  },
}));
