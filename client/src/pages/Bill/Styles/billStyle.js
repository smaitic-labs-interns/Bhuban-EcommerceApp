// import theme from "../../../utils/theme";
import { Box, Button, styled, TableCell, TableHead, Typography } from '@mui/material';

export const BillWrapper = styled(Box)(() => ({
  padding: '0 4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const PrintBillWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '1rem',
}));

export const PrintButtonWrapper = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  gap: '0.5rem',
  background: 'green',
  color: 'white',
  '&: hover': {
    border: 'solid green 1px',
    color: 'green',
    background: '#fff',
    transition: 'none',
  },
  '&::after': {
    transition: 'none',
  },
}));

export const BillContainer = styled(Box)(() => ({
  //   width: "60%",
  border: 'dashed 10px orange',
}));

export const HeaderWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem',
  borderBottom: 'dashed green 5px',
}));

export const SiteTitleWrapper = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '60px',
  fontWeight: 600,
  color: '#1976d2',
  '&>svg': {
    paddingRight: '0.5rem',
    fontSize: '90px',
  },
}));

export const ShopDetailWrapper = styled(Box)(() => ({
  position: 'relative',
}));

export const DateWrapper = styled(Box)(() => ({
  fontWeight: 600,
  '& > span': {
    borderBottom: 'dashed 1px',
    lineHeight: '32px',
    fontStyle: 'italic',
    fontWeight: 500,
  },
}));

export const TitleWrapper = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '30px',
  textAlign: 'center',
}));

export const UserDescWrapper = styled(Box)(() => ({
  margin: '0 1rem',
  border: 'dashed green 2px',
  display: 'flex',
  padding: '0 1rem',
  justifyContent: 'space-between',
}));

export const UserDetailsWrapper = styled(Box)(() => ({
  padding: '1rem',
}));

export const ContentWrapper = styled(Typography)(() => ({
  fontWeight: 600,
  '& > span': {
    borderBottom: 'dashed 1px',
    lineHeight: '32px',
    fontStyle: 'italic',
    fontWeight: 500,
  },
}));

export const ProductDetailsWrapper = styled(Typography)(() => ({
  fontWeight: 600,
  '& > span': {
    borderBottom: 'dashed 1px',
    lineHeight: '32px',
    fontStyle: 'italic',
    fontWeight: 500,
  },
}));

export const TableHeaderWrapper = styled(TableHead)(() => ({
  '& > tr > th ': {
    fontWeight: 600,
    fontSize: '20px',
  },
}));

export const TableCellCustom = styled(TableCell)(() => ({
  fontWeight: 600,
  fontSize: '16px',
  textAlign: 'center',
}));

export const TermsAndConditionWrapper = styled(Typography)(() => ({
  border: 'dashed green 2px',
  margin: '2rem 1rem 0 1rem',
  padding: '1rem',
}));

export const TermsPointWrapper = styled(Typography)(() => ({
  fontWeight: 600,
  '& > span': {
    lineHeight: '32px',
    fontStyle: 'italic',
    fontWeight: 500,
  },
}));

export const QrCodeWrapper = styled(Box)(() => ({
  border: 'solid black 1px',
  textAlign: 'center',
  padding: '1rem',
}));

export const VerificationWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '1rem',
  position: 'relative',
  alignItems: 'center',
}));

export const VerificationContentContainer = styled(Box)(() => ({
  borderTop: 'dashed ',
  textAlign: 'center',
}));

export const VerifyerWrapper = styled(Box)(() => ({}));
