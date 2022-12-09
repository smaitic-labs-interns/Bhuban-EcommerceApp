// import theme from "../../../utils/theme";
import { Box, styled } from "@mui/material";

export const CardWrapper = styled(Box)(() => ({
  //   border: "solid red 1px",
}));

export const CardContainer = styled(Box)(() => ({
  width: "189px",
  padding: "1rem",
  boxShadow: "5px 10px 18px #757575",
}));

export const ImageWrapper = styled(Box)(() => ({
  width: "189px",
  height: "189px",
}));

export const ContentWrapper = styled(Box)(() => ({
  marginBottom: "0.5rem",
}));

export const ProductTitleWrapper = styled(Box)(() => ({
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  display: "-webkit-box",
  height: "3rem",
  marginBottom: "0.5rem",
}));

export const ProductPriceWrapper = styled(Box)(() => ({
  //   color: "#ccc",
  //   "&:hover": {
  //     color: "#f85606",
  //   },
  color: "#f85606",
}));

export const ProductDiscountWrapper = styled(Box)(() => ({
  padding: "1rem 0",
  display: "flex",
  gap: "0.5rem",
}));
export const ProductPreviousPriceWrapper = styled(Box)(() => ({
  textDecoration: "line-through",
  color: "grey",
}));
export const ProductDiscountPercenteWrapper = styled(Box)(() => ({
  color: "yellowgreen",
}));
export const ProductRatingWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "0.5rem",
}));
export const ProductRatingStarWrapper = styled(Box)(() => ({
  color: "#FACA51",
}));
export const ProductUserRaterWrapper = styled(Box)(() => ({}));
