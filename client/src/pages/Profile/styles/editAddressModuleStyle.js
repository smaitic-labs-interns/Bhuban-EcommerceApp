// import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const FormWrapper = styled(Box)(() => ({
  display: "flex",
}));

export const FormContainer = styled(Box)(() => ({
  padding: "1rem 4rem",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "0.5rem",
}));

export const OrderFormInputWrapper = styled(Box)(() => ({
  width: "45%",
}));

export const PlaceOrderButtonWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
}));
