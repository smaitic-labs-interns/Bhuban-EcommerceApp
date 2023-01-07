// import { theme } from 'utils';
import { Box, styled, Typography } from '@mui/material';

export const NotFoundWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const NotFoundContainer = styled(Box)(() => ({}));

export const NotFoundHelper = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  border: 'solid #1976d2 1px',
  borderRadius: '0.8rem',
  padding: '1rem',
  margin: '2rem',
  textAlign: 'center',
  boxShadow: '5px 5px 5px 5px #1976d2',

  '&> a': {
    textDecoration: 'none',
  },
}));
