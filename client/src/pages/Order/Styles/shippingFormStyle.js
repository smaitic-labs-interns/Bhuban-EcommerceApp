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

export const OrderFormSelectInputWrapper = styled(Box)(() => ({
  width: "45%",
  "&> select": {
    width: "100%",
    padding: "1rem",
    gap: "1rem",
    "& >option": {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
  },
}));

export const PlaceOrderButtonWrapper = styled(Box)(() => ({
  width: "100%",
}));
