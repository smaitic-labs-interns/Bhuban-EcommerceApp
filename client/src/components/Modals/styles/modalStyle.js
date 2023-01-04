import { Box, Button, styled, Table, Typography } from '@mui/material';

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
  backgroundColor: '#fff',
  boxShadow: 24,
  p: 4,
}));

export const ModalHeaderWrapper = styled(Box)(() => ({
  minHeight: '3rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '1rem',
}));
export const ModalTitleWrapper = styled(Box)(() => ({}));

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
  color: 'red',
  top: 0,
  right: 0,
  '&: hover': {
    background: 'red',
    color: 'white',
  },
}));

export const ModalBodyWrapper = styled(Box)(() => ({
  overflowY: 'scroll',
}));

export const ModalFooter = styled(Box)(() => ({
  overflowY: 'scroll',
}));

export const ViewOrderModalWrapper = styled(Box)(() => ({
  fontWeight: 600,
}));

export const ContentTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '24px',
  textAlign: 'center',
  //   border: "dashed green",
  color: 'green',
  margin: '1rem 0',
}));

export const ContentContainer = styled(Box)(() => ({
  width: 'inherit',
  display: 'flex',
}));

export const DetailsWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '2rem',
  justifyContent: 'space-between',
  border: 'solid darkgray',
  borderRadius: '10px',
  textAlign: 'center',
}));

export const ContentText = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '16px',
  '& > span': {
    fontStyle: 'italic',
    color: 'darkgray',
  },
}));

export const EditButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const ContentTable = styled(Table)(() => ({
  '& > thead >tr ': {
    background: 'gray',
    color: 'white',
  },
  '& > thead >tr >th': {
    fontWeight: 600,
    fontSize: '20px',
    color: 'white',
  },
}));

export const ContentDescription = styled(Typography)(() => ({
  fontWeight: 600,
}));
