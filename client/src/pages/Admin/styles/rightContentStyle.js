import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const RightContentWrapper = styled(Box)(() => ({
  display: "none",
  padding: "1rem 2rem",
  overflowY: "scroll",
  width: "100%",
  scrollbarWidth: "none", //Firefox
  "&::-webkit-scrollbar": {
    display: "none", //Chrome, Safari and Opera
    MsOverflowStyle: "none", // IE, Edge
  },
}));
