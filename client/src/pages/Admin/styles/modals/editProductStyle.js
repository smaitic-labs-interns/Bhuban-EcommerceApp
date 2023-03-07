// import theme from "../../../../utils/theme";
import { Box, Card, styled } from '@mui/material';

export const EditProductWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 850,
  overflowY: 'scroll',
  background: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}));

export const CloseButtonWrapper = styled(Box)(() => ({
  position: 'sticky',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '1rem',
  background: '#CEE2FE',
}));

export const AddProductWrapper = styled(Box)(() => ({
  display: 'flex',
  position: ' relative',
  justifyContent: 'center',
  width: '100%',
}));

export const AddProductContainer = styled(Card)(() => ({
  display: 'flex',
  width: '100%',
  padding: '1rem 0',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#CEE2FE',
  boxShadow: '0 2px 6px 0 #313A46',
}));

export const AddProductImageWrapper = styled(Box)(() => ({
  position: 'absolute',
  margin: '1rem',
  border: 'solid #5978A6 2px',
  borderRadius: '40%',
  overflow: 'hidden',
  '&> img': {
    padding: '0.5rem',
    width: '150px',
    height: '150px',
  },
}));

export const AddProductFormWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingTop: '200px',
}));

export const AddProductFormContainer = styled(Box)(() => ({
  padding: '1rem 4rem',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '0.5rem',
}));

export const PreviewImageWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
  justifyContent: 'center',
  gap: '0.5rem',
  '& > img': {
    width: '100px',
    height: 'auto',
  },
}));

export const AddProductFormInputWrapper = styled(Box)(() => ({
  //   padding: "1rem 4rem",
  //   textAlign: "center",
  margin: '0.5rem 0',
  width: '45%',
}));

export const EditProductButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  '&>button': {
    boxShadow: '0 2px 6px 0 rgb(10,207,151)',
  },
}));
