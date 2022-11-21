import { Box, styled, TableCell } from "@mui/material";
import theme from "../../../utils/theme";

export const CustomTableCell = styled(TableCell)(() => ({
  fontWeight: 600,
}));

export const TablePageWrapper = styled(TableCell)(() => ({
  display: "flex",
  border: "dashed green",
  margin: "1rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
}));
