// import theme from "../../../utils/theme";
import { Box, styled, Typography } from "@mui/material";

export const RegisterWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}));

export const RegisterContainer = styled(Box)(() => ({
  maxWidth: "60%",
}));

export const HeaderWrapper = styled(Box)(() => ({
  padding: "1rem 0",
}));
export const TitleWrapper = styled(Typography)(() => ({}));
export const FormWrapper = styled(Box)(() => ({}));
export const FormInputWrapper = styled(Box)(() => ({
  padding: "1rem 0",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
}));

export const FormInput = styled(Box)(() => ({
  width: "100%",
}));

export const LoginWrapper = styled(Box)(() => ({
  padding: "1rem 0",
  display: "flex",
  justifyContent: "flex-end",
}));
