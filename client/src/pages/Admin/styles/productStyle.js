import { Box, Button, styled } from '@mui/material';

export const ProductWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
}));

export const ProductContainer = styled(Box)(() => ({
  width: '100%',
  //   display: "flex",
}));

export const ProductActionWrapper = styled(Box)(() => ({
  // display: "flex",
  // justifyContent: "center",
  position: 'relative',
  padding: '1rem 0',
}));

export const AddProductCntntWrapper = styled(Box)(() => ({
  border: ' solid green 2px',
}));

export const OpenCloseBtnWrapper = styled(Box)(() => ({
  position: 'relative',
  padding: '2rem',
}));

export const OpenAddProductButton = styled(Button)(() => ({
  position: 'absolute',
  borderRadius: '0.5rem',
  backgroundColor: 'green',
  border: 'solid yello-green 2px',
  color: '#fff',
  bottom: '1rem',
  boxShadow: '0 2px 6px 0 rgba(198, 250, 177)',
  '&:hover': {
    backgroundColor: '#fff',
    color: 'green',
  },
}));

export const CloseAddProductButton = styled(Button)(() => ({
  position: 'absolute',
  boxShadow: '0 2px 6px 0 #DC4444',
  borderRadius: '0.5rem',
  backgroundColor: '#DC4444',
  color: '#fff',
  bottom: '1rem',
  border: 'solid yellow-red 2px',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#DC4444',
  },
}));

export const RightSideButtonsWrapper = styled(Button)(() => ({
  borderRadius: '3px',
  backgroundColor: 'blue',
  border: 'solid yello-green 2px',
  color: '#fff',
  boxShadow: '0 2px 6px 0 rgba(198, 250, 177)',
  '&:hover': {
    backgroundColor: '#fff',
    color: 'blue',
    border: 'solid green 2px',
    borderRadius: '0.5rem',
  },
}));

export const DisplaySearchWrapper = styled(Box)(() => ({
  padding: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  background: 'darkgray',
}));

export const DisplayProductsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const SearchBarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const TableWrapper = styled(Box)(() => ({
  //   ds
}));
