import { Box, Button, styled, Table, Typography } from '@mui/material';
// import theme from "../../../utils/theme";

export const CloseButtonWrapper = styled(Button)(() => ({
  color: 'red',
  position: 'absolute',
  margin: '0.5rem',
  top: 0,
  right: 0,
  '&: hover': {
    background: 'red',
    color: 'white',
  },
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
