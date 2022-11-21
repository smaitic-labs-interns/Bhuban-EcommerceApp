import { Box, styled, Typography } from "@mui/material";
import theme from "../../../utils/theme";

export const TrackResultWrapper = styled(Box)(() => ({
  width: "60%",
  border: "dashed green 5px",
  padding: "2rem",
  boxShadow: "5px 5px 32px #1976d2;",
  borderRadius: "1rem",
}));

export const ResultTitle = styled(Typography)(() => ({
  fontWeight: 600,
  textAlign: "center",
  fontSize: "30px",
  "& > span": {
    fontStyle: "italic",
  },
}));

export const TrackResultContent = styled(Typography)(() => ({
  padding: "1rem 0",
  fontWeight: 600,
  "& > span": {
    marginLeft: "1rem",
    fontStyle: "italic",
  },
}));
