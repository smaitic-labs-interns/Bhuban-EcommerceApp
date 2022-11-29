// import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const CardWrapper = styled(Box)(() => ({
  width: "250px",
  height: "150px",
  padding: "1rem",
  color: "#fff",
  background: "#17a2b8",
  boxShadow: `5px 10px 8px 10px gray`,
}));

export const CardContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const LeftContent = styled(Box)(() => ({
  textAlign: "center",
  "& > p": {
    fontWeight: 600,
    fontSize: "20px",
  },
}));

export const RightIcon = styled(Box)(() => ({
  "&> svg": {
    fontSize: "100px",
  },
}));

export const MoreInfo = styled(Box)(() => ({
  padding: "1rem 0 0 0",
  textAlign: "center",
}));
