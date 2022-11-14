// import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const BannerWrapper = styled(Box)(() => ({
  width: "100%",
  //   border: "solid red 1px",
}));

export const BannerContainer = styled(Box)(() => ({
  //   width: "189px",
  //   padding: "1rem",
  //   boxShadow: "5px 10px 18px #757575",
  position: "relative",
}));

export const ImageWrapper = styled(Box)(() => ({
  width: "100%",
  //   position: "relative",
  //   height: "189px",
  //   objectFit: "cover",
  background: "#D1A5D7",
  "&>img": {
    // objectFit: "fill",
  },
}));
export const CircleWrapper = styled(Box)(() => ({
  position: "absolute",
  width: "100%",
  bottom: "1.5rem",
}));
export const CircleContainer = styled(Box)(() => ({
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  gap: "0.5rem",
  color: "grey",
  "&>svg": {
    cursor: "pointer",
  },
}));
