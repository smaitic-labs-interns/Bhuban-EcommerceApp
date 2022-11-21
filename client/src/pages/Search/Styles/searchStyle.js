// import theme from "../../../utils/theme";
import { Box, Button, styled } from "@mui/material";

export const SearchWrapper = styled(Box)(() => ({
  //   display: "flex",
}));

export const SearchBoxWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: "2rem 0",
}));

export const SearchInputWrapper = styled(Box)(() => ({
  width: "50%",
  position: "relative",
  //   "& > div > div >input ": {
  //     borderBottomRighttRadius: "0",
  //     borderTopRightRadius: "0",
  //     borderColor: "#1976d2",
  //     borderSize: "2px",
  //   },
}));

export const SearchButtonWrapper = styled(Box)(() => ({}));

export const SearchButton = styled(Button)(() => ({
  display: "flex",
  justifyContent: "space-between",
  background: "#1976d2",
  color: "white",
  padding: "1rem 2rem",
  borderBottomLeftRadius: "0",
  borderTopLeftRadius: "0",
  "&:hover": {
    color: "blue",
    border: "solid #1976d2 1px",
    background: "#fff",
  },
}));
