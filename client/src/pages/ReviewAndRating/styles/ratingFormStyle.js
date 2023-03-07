import { Box, styled } from '@mui/material';

export const RatingFormWrapper = styled(Box)(() => ({
  display: 'flex',
  borderBottom: 'solid 1px grey',
}));

export const RatingBox = styled(Box)(() => ({
  borderRight: 'solid  2px grey',
  padding: '1rem',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const RatingTitle = styled(Box)(() => ({}));

export const RatingContent = styled(Box)(() => ({
  padding: '1rem 0',
}));

export const RatingLabelWrapper = styled(Box)(() => ({
  margin: '0 auto 0 auto',
  '& >p': {
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: '20px',
    color: 'burlywood',
  },
}));

export const RatingFormContainer = styled(Box)(() => ({
  display: 'flex',
}));
