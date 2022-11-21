import { Box, styled } from "@mui/material";
import theme from "../../../utils/theme";

export const TrackWrapper = styled(Box)(() => ({
  display: "Flex",
  width: "100%",
}));

export const TrackContainer = styled(Box)(() => ({
  width: "100%",
  display: "Flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const TrackFormContainer = styled(Box)(() => ({
  width: "60%",
  margin: "1rem 0",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "0.5rem",
  alignItems: "center",
  boxShadow: "5px 10px 18px #888888",
}));

export const TrackFormInputWrapper = styled(Box)(() => ({
  width: "45%",
}));

export const TrackFormSubmitBtnWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
}));

export const TrackResultWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "2rem",
}));
