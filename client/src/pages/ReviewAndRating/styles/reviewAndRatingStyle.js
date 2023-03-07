import { Box, styled } from '@mui/material';

export const ReviewWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  //   height: '100%',
}));

export const ReviewContainer = styled(Box)(() => ({}));
export const ReviewTitleWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
  '& >p': {
    fontWeight: 600,
    fontSize: '24px',
  },
}));
export const RatingFormsWrapper = styled(Box)(() => ({
  // display: 'flex',
  border: 'solid grey 2px',
  padding: '1rem',
}));
