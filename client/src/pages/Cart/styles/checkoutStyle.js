import { Box, Button, styled } from '@mui/material';

export const CheckoutWrapper = styled(Box)(() => ({}));

export const CheckoutTitleWrapper = styled(Box)(() => ({
  padding: '20px',
}));

export const CheckoutButtonWrapper = styled(Button)(() => ({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  textTransform: 'none',
  backgroundColor: 'green',
  color: '#fff',
  padding: '1rem',
  '&:hover': {
    backgroundColor: '#fff',
    color: 'green',
    border: 'solid green 1px',
  },
}));
