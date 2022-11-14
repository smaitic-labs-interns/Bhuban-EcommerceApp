import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const LeftBarCardWrapper = styled(Box)(() => ({
  display: "flex",
  padding: "10px",
  columnGap: "16px",
  alignItems: "center",
  cursor: "pointer",
}));
