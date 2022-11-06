import theme from "../../../utils/theme";
import { Box, Card, styled } from "@mui/material";

export const AddProductWrapper = styled(Box)(() => ({
  display: "flex",
  position: " relative",
  justifyContent: "center",
  width: "100%",
}));

export const AddProductContainer = styled(Card)(() => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
}));

export const AddProductImageWrapper = styled(Box)(() => ({
  position: "absolute",
  padding: "1rem",
  border: "solid #5978A6 2px",
  borderRadius: "40%",
  overflow: "hidden",
  margin: "auto",
  "&> img": {
    padding: "0.5rem",
    width: "150px",
    height: "150px",
  },
}));

export const AddProductFormWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: "200px",
}));

export const AddProductFormContainer = styled(Box)(() => ({
  padding: "1rem 4rem",
  textAlign: "center",
}));
