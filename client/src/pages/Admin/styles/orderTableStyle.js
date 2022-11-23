import theme from "../../../utils/theme";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const OrderTableWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
}));

export const TableWrapper = styled(TableContainer)(() => ({}));

export const CustomTable = styled(Table)(() => ({}));
export const CustomTableHead = styled(TableHead)(() => ({
  "& >tr >th": {
    fontWeight: 600,
  },
}));
export const CustomTableBody = styled(TableBody)(() => ({}));
export const CustomTableRow = styled(TableRow)(() => ({}));
export const CustomTableCell = styled(TableCell)(() => ({}));
export const CustomStatusTableCell = styled(TableCell)(() => ({
  fontWeight: 600,
  fontSize: "20px",
}));
