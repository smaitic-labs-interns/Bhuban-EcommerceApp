// import theme from "../../../utils/theme";
import { Box, styled, Typography } from "@mui/material";

export const LoginWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

export const LoginContainer = styled(Box)(() => ({
  maxWidth: "40%",
  marginTop: "50px",
}));

export const HeaderWrapper = styled(Box)(() => ({}));
export const TitleWrapper = styled(Typography)(() => ({}));
export const FormWrapper = styled(Box)(() => ({}));
export const ForgotPwdWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const CreateAccWrapper = styled(Box)(() => ({
  padding: "1rem 0",
  display: "flex",
  justifyContent: "flex-end",
}));
