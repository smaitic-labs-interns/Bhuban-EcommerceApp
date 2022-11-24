// import theme from "../../../utils/theme";
import { Box, styled, TableCell, TableRow } from "@mui/material";

export const EditOrderWrapper = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 800,
  overflowY: "scroll",
  background: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}));

export const CloseButtonWrapper = styled(Box)(() => ({
  position: "sticky",
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem",
}));

export const OrderContentWrapper = styled(Box)(() => ({
  padding: "0 1rem",
}));

export const CustomTableCell = styled(TableCell)(() => ({
  fontWeight: 600,
  fontSize: "18px",
}));

export const CustomTableCellValue = styled(TableCell)(() => ({
  fontWeight: 600,
  fontSize: "16px",
  fontFamily: "italic",
  color: "gray",
}));

export const CustomTableRow = styled(TableRow)(() => ({
  // display: "flex",
  // alignItems: "center",
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
