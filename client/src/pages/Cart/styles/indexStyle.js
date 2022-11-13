import theme from "../../../utils/theme";
import { Box, Card, styled } from "@mui/material";

export const CartWrapper = styled(Box)(() => ({
  display: "flex",
  //   height: "100vh",
  background: "#eff0f4",
  padding: "2rem 165px",
  justifyContent: "space-between",
}));

export const CartLeftWrapper = styled(Box)(() => ({
  //   border: "solid green 5px",
}));

export const CartLeftCardWrapper = styled(Card)(() => ({}));

export const CartRightWrapper = styled(Box)(() => ({}));

export const CartRightCardWrapper = styled(Card)(() => ({
  height: "400px",
  padding: "0 100px",
}));
