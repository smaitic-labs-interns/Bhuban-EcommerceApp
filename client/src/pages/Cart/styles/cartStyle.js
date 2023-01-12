// import {theme} from "utils";
import { Box, Card, styled } from '@mui/material';

export const CartWrapper = styled(Box)(() => ({
  display: 'flex',
  height: '91%',
  background: '#eff0f4',
  padding: '2rem',
  justifyContent: 'space-between',
}));

export const CartLeftWrapper = styled(Box)(() => ({
  width: '70%',
}));

export const CartLeftCardWrapper = styled(Card)(() => ({}));

export const CartRightWrapper = styled(Box)(() => ({
  width: '25%',
}));

export const CartRightCardWrapper = styled(Card)(() => ({
  height: '400px',
  padding: '0 100px',
}));
