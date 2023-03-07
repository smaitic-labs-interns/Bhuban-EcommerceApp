import { Box, styled } from '@mui/material';

export const ProfilLeftWrapper = styled(Box)(() => ({
  width: '158px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}));

export const ProfilUserWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '1rem',
  gap: '1rem',
}));

export const ProfilTypeWrapper = styled(Box)(() => ({
  background: 'green',
  color: 'white',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3px 8px',
}));

export const ManageAccountWrapper = styled(Box)(() => ({
  color: '#519CB7',
  '& > p': {
    fontWeight: 600,
  },
}));

export const ManageAccountContentWrapper = styled(Box)(() => ({
  paddingLeft: '16px',
  '& >a > p': {
    color: '#757775',
    fontSize: '14px',
    lineHeight: '22px',
  },
}));

export const OrderWrapper = styled(Box)(() => ({
  display: 'flex',
  width: 'inherit',
  justifyContent: 'flex-start',
  '& > p': {
    fontWeight: 600,
  },
}));

export const OrderContentWrapper = styled(Box)(() => ({
  paddingLeft: '16px',
  '& >a > p': {
    color: '#757775',
    fontSize: '14px',
    lineHeight: '22px',
  },
}));

export const ReviewWrapper = styled(Box)(() => ({
  padding: '10px 0',
  '& > p': {
    fontWeight: 600,
  },
}));

export const WishlistWrapper = styled(Box)(() => ({
  padding: '10px 0',
  '& > p': {
    fontWeight: 600,
  },
}));

export const SellOnDarazWrapper = styled(Box)(() => ({
  padding: '10px 0',
  '& > p': {
    fontWeight: 600,
  },
}));
