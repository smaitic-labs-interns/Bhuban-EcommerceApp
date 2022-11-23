// import theme from "../../../utils/theme";
import { Box, styled, TableCell, TableRow } from "@mui/material";

export const ViewOrderWrapper = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
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

export const CustomTableRow = styled(TableRow)(() => ({}));
