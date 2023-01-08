import { Box, Button, styled } from '@mui/material';

export const ModalWrapper = styled(Box)(() => ({}));

export const OpenModalButton = styled(Button)(() => ({
  display: 'flex',
  gap: '0.5rem',
  padding: '0.5rem',
  alignItems: 'center',
}));

export const ModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 800,
  overflow: 'hidden',
  backgroundColor: '#fff',
  boxShadow: 24,
  p: 4,
}));

export const ModalHeaderWrapper = styled(Box)(() => ({
  minHeight: '3rem',
  width: '100%',
  textAlign: 'center',
  padding: '1rem',
}));
export const ModalTitleWrapper = styled(Box)(() => ({
  overflow: 'hidden',
  width: 'inherit',
  padding: '1rem',
  height: '2rem',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
}));

export const ModalTitleDescWrapper = styled(Box)(() => ({
  overflow: 'hidden',
  width: 'inherit',
  padding: '1rem',
  height: '3rem',
  textOverflow: 'ellipsis',
  WebkitLineClamp: '4',
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
}));

export const CloseButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '0.5rem',
}));

export const CloseButton = styled(Button)(() => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  background: 'red',
  border: 'solid red 2px',
  boxShadow: '2px 2px 2px red',
  color: '#fff',
  top: '10px',
  right: '10px',
  '&: hover': {
    color: 'red',
    background: '#fff',
  },
}));

export const ModalBodyWrapper = styled(Box)(() => ({
  height: 600,
  padding: '0 1rem',
  overflowY: 'scroll',
}));
export const ModalBodyContainer = styled(Box)(() => ({}));

export const ModalFooterWrapper = styled(Box)(() => ({
  padding: '1rem',
}));
export const ModalFooterContainer = styled(Box)(() => ({}));
