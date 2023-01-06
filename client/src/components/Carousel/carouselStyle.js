// import theme from "../../../utils/theme";
import { Box, styled } from '@mui/material';
import { random_color } from 'Utils';

export const BannerWrapper = styled(Box)(() => ({
  width: '100%',
}));

export const BannerContainer = styled(Box)(() => ({
  position: 'relative',
}));

export const ImageWrapper = styled(Box)(() => ({
  width: '100%',
  background: random_color(),
  '&>img': {
    objectFit: 'contain',
  },
}));
export const CircleWrapper = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  bottom: '1.5rem',
}));
export const CircleContainer = styled(Box)(() => ({
  width: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  color: 'grey',
  '&>svg': {
    cursor: 'pointer',
  },
}));
