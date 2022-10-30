import { Box, styled } from "@mui/material";
import theme from "../../../utils/theme";

export const ProfilRightWrapper = styled(Box)(() => ({
  width: "987px",
}));

export const RightTitleWrapper = styled(Box)(() => ({}));

export const CardWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));
export const LeftCardWrapper = styled(Box)(() => ({
  width: "240px",
  minHeight: "182px",
  backgroundColor: " #fff",
  padding: "16px",
}));

export const LeftCardContentWrapper = styled(Box)(() => ({
  displya: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
}));

export const LeftCardContentUpperWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "inherit",
  "& >  div ": {
    fontSize: "16px",
    lineHeight: "20px",
  },
}));

export const RightCardWrapper = styled(Box)(() => ({
  width: "656px",
  minHeight: "182px",
  backgroundColor: " #fff",
  padding: "16px",
  display: "flex",
}));

export const RightCardLeftContentWrapper = styled(Box)(() => ({
  borderRight: "solid #eff0f5 2px",
  paddingRight: "16px",
  gap: "10px",
  display: "flex",
  flexDirection: "column",
}));

export const RightCardRightContentWrapper = styled(Box)(() => ({
  paddingLeft: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingTop: "32px",
  // width: "656px",
  // minHeight: "182px",
  // backgroundColor: " #fff",
  // padding: "16px",
}));

export const LowerWrapper = styled(Box)(() => ({
  marginTop: "20px",
}));

export const ManageAccountWrapper = styled(Box)(() => ({
  color: "#519CB7",
  "& > p": {
    fontWeight: 600,
  },
}));

export const ManageAccountContentWrapper = styled(Box)(() => ({
  paddingLeft: "16px",
  "& >a > p": {
    color: "#757775",
    fontSize: "14px",
    lineHeight: "22px",
  },
}));

export const OrderWrapper = styled(Box)(() => ({
  display: "flex",
  width: "inherit",
  justifyContent: "flex-start",
  "& > p": {
    fontWeight: 600,
  },
}));

export const OrderContentWrapper = styled(Box)(() => ({
  paddingLeft: "16px",
  "& >a > p": {
    color: "#757775",
    fontSize: "14px",
    lineHeight: "22px",
  },
}));

export const ReviewWrapper = styled(Box)(() => ({
  padding: "10px 0",
  "& > p": {
    fontWeight: 600,
  },
}));

export const WishlistWrapper = styled(Box)(() => ({
  padding: "10px 0",
  "& > p": {
    fontWeight: 600,
  },
}));

export const SellOnDarazWrapper = styled(Box)(() => ({
  padding: "10px 0",
  "& > p": {
    fontWeight: 600,
  },
}));
