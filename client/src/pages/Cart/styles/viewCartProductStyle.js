import { Box, styled } from '@mui/material';

export const ProductDetailWrapper = styled(Box)(() => ({}));

export const ProductDetailContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '1188px',
  background: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '1rem',
}));

export const ProductDetails = styled(Box)(() => ({
  display: 'flex',
  gap: '1.5rem',
}));

export const CloseBtnWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const ImageWrapper = styled(Box)(() => ({}));

export const ImageContainer = styled(Box)(() => ({
  width: '330px',
  height: '330px',
  '& >img': {
    objectFit: 'contain',
  },
}));

export const ImageControlsWrapper = styled(Box)(() => ({
  width: '338px',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const ImageControlsLeftArrowWrapper = styled(Box)(() => ({}));

export const ImageControlsImageWrapper = styled(Box)(() => ({}));

export const ImageControlsRightArrowWrapper = styled(Box)(() => ({}));

export const ContentWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const ContentTitleWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
}));

export const ContentRatingWrapper = styled(Box)(() => ({}));

export const ContentRatingStarWrapper = styled(Box)(() => ({
  display: 'flex',
  gap: '0,25rem',
  color: 'orangered',
}));

export const ContentRatingDescWrapper = styled(Box)(() => ({
  display: 'flex',
  gap: '0,25rem',
  color: 'blue',
}));

export const ContentBrandWrapper = styled(Box)(() => ({
  display: 'flex',
  gap: '0.5rem',
}));

export const ContentPriceWrapper = styled(Box)(() => ({}));

export const ContentCurrentPriceWrapper = styled(Box)(() => ({
  color: 'orangered',
}));

export const ContentPreviousPriceWrapper = styled(Box)(() => ({
  '&: nth-of-type(1)': {
    textDecoration: 'through-line',
  },
}));

export const ContentDiscountPercentWrapper = styled(Box)(() => ({}));

export const ContentPromotionWrapper = styled(Box)(() => ({
  color: 'orangered',
}));

export const ContentAvailableQuantityWrapper = styled(Box)(() => ({}));

export const RightContentWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentTitleWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentAddressWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentAddress = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentChangeAddress = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentSubTitleWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentSubTitle = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentSubTitleInfo = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentReturnInfoWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentReturnInfo = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentReturnSubInfo = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentWarrantyWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentWarrantyTitle = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentSellerWrapper = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentSellerTitle = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentChatWithSeller = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentProductResponse = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentProductResponseNum = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const RightContentSellerStore = styled(Box)(() => ({
  maxWidth: '1188px',
  border: 'solid red 1px',
}));

export const ProductSpecificationWrapper = styled(Box)(() => ({
  padding: '3rem 1rem 0 0',
}));

export const ProductSpecificationContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'flex-start',
}));

export const ProductDescriptionWrapper = styled(Box)(() => ({
  padding: '1rem 3rem',
  '&> div': {
    textAlign: 'center',
    padding: '1rem',
  },
}));
