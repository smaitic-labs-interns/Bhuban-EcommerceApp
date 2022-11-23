// import theme from "../../../utils/theme";
import { Box, styled, TableCell, TableRow } from "@mui/material";

export const ViewProductWrapper = styled(Box)(() => ({
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

export const ImageWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const ImageContainer = styled(Box)(() => ({
  width: "330px",
  height: "330px",
  objectFit: "contain",
}));

export const ImageControlsWrapper = styled(Box)(() => ({
  width: "338px",
  display: "flex",
  justifyContent: "space-between",
}));

export const ImageControlsLeftArrowWrapper = styled(Box)(() => ({}));

export const ImageControlsImageWrapper = styled(Box)(() => ({}));

export const ImageControlsRightArrowWrapper = styled(Box)(() => ({}));

export const ProductContentWrapper = styled(Box)(() => ({}));

export const CustomTableCell = styled(TableCell)(() => ({
  fontWeight: 600,
  fontSize: "18px",
}));

export const CustomTableRow = styled(TableRow)(() => ({
  display: "flex",
  alignItems: "center",
}));
