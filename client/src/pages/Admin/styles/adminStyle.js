import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const AdminWrapper = styled(Box)(() => ({
  display: "flex",
  height: "100vh",
}));

export const LeftWrapper = styled(Box)(() => ({
  width: "20%",
  background: "#313A46",
  color: "#fff",
  padding: "2rem 0",
}));

export const LeftTabContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1.5rem",
  padding: "0 2rem",
}));

export const RightWrapper = styled(Box)(() => ({
  width: "80%",
  height: "90vh",
  padding: "20px 0",
  border: "solid #313A46 20px",
  overflowY: "scroll",
  display: "flex",
  justifyContent: "center",
  scrollbarWidth: "none", //Firefox
  "&::-webkit-scrollbar": {
    display: "none", //Chrome, Safari and Opera
    MsOverflowStyle: "none", // IE, Edge
  },
}));

export const RightContentContainer = styled(Box)(() => ({
  width: "90%",
}));
