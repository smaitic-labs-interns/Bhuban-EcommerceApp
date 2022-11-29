import theme from "../../../utils/theme";
import { Box, Button, styled } from "@mui/material";

export const OrderWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
}));

export const OrderContainer = styled(Box)(() => ({
  width: "100%",
  //   display: "flex",
}));

export const ProductActionWrapper = styled(Box)(() => ({
  // display: "flex",
  // justifyContent: "center",
}));

export const AddProductCntntWrapper = styled(Box)(() => ({
  border: " solid green 2px",
}));

export const AddProductButton = styled(Button)(() => ({
  borderRadius: "3px",
  backgroundColor: "green",
  border: "solid yello-green 2px",
  color: "#fff",
  margin: "1rem",
  boxShadow: "0 2px 6px 0 rgba(198, 250, 177)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "green",
    border: "solid green 2px",
    borderRadius: "0.5rem",
  },
}));

export const RightSideButtonsWrapper = styled(Button)(() => ({
  borderRadius: "3px",
  backgroundColor: "blue",
  border: "solid yello-green 2px",
  color: "#fff",
  boxShadow: "0 2px 6px 0 rgba(198, 250, 177)",
  "&:hover": {
    backgroundColor: "#fff",
    color: "blue",
    border: "solid green 2px",
    borderRadius: "0.5rem",
  },
}));

export const DisplaySearchWrapper = styled(Box)(() => ({
  padding: "2rem",
  display: "flex",
  justifyContent: "space-between",
  background: "darkgray",
}));

export const SearchBarWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const TableWrapper = styled(Box)(() => ({
  //   ds
}));

export const DisplayOrderWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));
