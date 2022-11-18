import { Box, styled } from "@mui/material";
import theme from "../../../utils/theme";

export const CheckoutWrapper = styled(Box)(() => ({}));

export const CheckoutTitleWrapper = styled(Box)(() => ({
  padding: "20px",
}));

export const CheckoutButtonWrapper = styled(Box)(() => ({
  "& >button": {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "green",
      border: "solid green 1px",
    },
  },
}));
