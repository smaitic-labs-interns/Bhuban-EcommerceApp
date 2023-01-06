// import { theme } from 'utils';
import { Box, styled } from '@mui/material';

export const ProductCardsWrapper = styled(Box)(() => ({
  //   display: "flex",
}));

export const ProductsCardContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
}));
