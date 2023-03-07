// import { theme } from 'utils';
import { Box, styled, Button } from '@mui/material';

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
export const PagerWrapper = styled(Box)(() => ({}));

export const PagerContainer = styled(Box)(() => ({
  border: 'solid blue 2px',
  padding: '1rem',
  margin: '1rem 4rem',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const PreviousBtnWrapper = styled(Button)(() => ({
  display: 'flex',
  gap: '0.5rem',
  border: 'solid 1px #037AFD',
  textTransform: 'none',
  color: '#037AFD',
  '&: hover': {
    backgroundColor: '#037AFD',
    color: '#fff',
  },
}));

export const DescriptionWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  padding: '1rem',
}));

export const NextBtnWrapper = styled(Button)(() => ({
  display: 'flex',
  gap: '0.5rem',
  color: '#4FA845',
  textTransform: 'none',
  '&: hover': {
    backgroundColor: '#4FA845',
    color: '#fff',
  },
}));
