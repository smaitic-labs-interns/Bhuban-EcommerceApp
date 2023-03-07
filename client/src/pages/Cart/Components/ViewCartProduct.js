import { Box, Button, Typography, Modal } from '@mui/material';
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  ProductDetailWrapper,
  ProductDetailContainer,
  ProductDetails,
  CloseBtnWrapper,
  ImageWrapper,
  ImageContainer,
  ImageControlsWrapper,
  ImageControlsLeftArrowWrapper,
  ImageControlsImageWrapper,
  ImageControlsRightArrowWrapper,
  ContentWrapper,
  ContentTitleWrapper,
  ContentRatingWrapper,
  ContentRatingStarWrapper,
  ContentRatingDescWrapper,
  ContentBrandWrapper,
  ContentPriceWrapper,
  ContentCurrentPriceWrapper,
  ContentPreviousPriceWrapper,
  ContentDiscountPercentWrapper,
  ContentPromotionWrapper,
  ContentAvailableQuantityWrapper,
  ProductSpecificationWrapper,
  ProductSpecificationContainer,
  ProductDescriptionWrapper,
} from '../styles/viewCartProductStyle';
import { Close, RemoveRedEye, Star, StarHalf } from '@mui/icons-material';

export default function ViewCartProduct({ product }) {
  const { category, model, brand, description, price, quantity, rating, images } = product;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // for displaying Images
  const [target, setTarget] = useState(1);
  let index = 0;
  const handleNext = () => {
    if (target < index) {
      setTarget(target + 1);
    }
  };

  const handlePrevious = () => {
    if (target > 1) {
      setTarget(target - 1);
    }
  };

  const imageStyle = {
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      width: '100%',
      height: '100%',
      ObjectFit: 'contain',
    },
  };

  return (
    <div>
      <Button variant='outlined' color='success' onClick={handleOpen}>
        <RemoveRedEye />
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ProductDetailWrapper>
          <ProductDetailContainer>
            <CloseBtnWrapper>
              <Button variant='outlined' color='error' onClick={() => setOpen(false)}>
                <Close />
              </Button>
            </CloseBtnWrapper>
            <ProductDetails>
              <ImageWrapper>
                <ImageContainer>
                  {images
                    ? images.map((item) => {
                        index++;
                        return (
                          <Box
                            key={item.id}
                            sx={target === index ? imageStyle : { display: 'none' }}
                          >
                            <img
                              src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${item.imageurl}`}
                              alt={item.alttext}
                            />
                          </Box>
                        );
                      })
                    : ''}
                </ImageContainer>
                <ImageControlsWrapper>
                  <ImageControlsLeftArrowWrapper>
                    <Button variant='contained' onClick={handlePrevious}>
                      {' << '}
                    </Button>
                  </ImageControlsLeftArrowWrapper>
                  <ImageControlsImageWrapper>
                    <Typography>{`${target} of ${index}`}</Typography>
                  </ImageControlsImageWrapper>
                  <ImageControlsRightArrowWrapper>
                    <Button variant='contained' onClick={handleNext}>
                      {' >> '}
                    </Button>
                  </ImageControlsRightArrowWrapper>
                </ImageControlsWrapper>
              </ImageWrapper>
              <ContentWrapper>
                <ContentTitleWrapper>
                  <Typography variant='h3'>{model + '-' + category}</Typography>
                </ContentTitleWrapper>
                <ContentRatingWrapper>
                  <ContentRatingStarWrapper>
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <StarHalf />
                    <ContentRatingDescWrapper>
                      <Typography>{'10 Ratings | '}</Typography>
                      <Typography>{'25 answered questions'}</Typography>
                    </ContentRatingDescWrapper>
                  </ContentRatingStarWrapper>
                </ContentRatingWrapper>
                <ContentBrandWrapper>
                  <Typography>{'Brand: '}</Typography>
                  <Typography>{brand}</Typography>
                  <Typography>{'| More From This Brand'}</Typography>
                </ContentBrandWrapper>
                <ContentPriceWrapper>
                  <ContentCurrentPriceWrapper>
                    <Typography variant='h5'>{`Rs. ${price}`}</Typography>
                  </ContentCurrentPriceWrapper>
                  <ContentPreviousPriceWrapper>
                    <Typography>{'Rs. 99999'}</Typography>
                    <ContentDiscountPercentWrapper>
                      <Typography>{'(40%)'}</Typography>
                    </ContentDiscountPercentWrapper>
                  </ContentPreviousPriceWrapper>
                </ContentPriceWrapper>
                <ContentPromotionWrapper>
                  <Typography>{'For Promotion'}</Typography>
                </ContentPromotionWrapper>

                <ContentAvailableQuantityWrapper>
                  {`${quantity} items are available on the stock`}
                </ContentAvailableQuantityWrapper>
              </ContentWrapper>

              <ProductSpecificationWrapper>
                <ProductSpecificationContainer>
                  <Typography>Category: {category} </Typography>
                  <Typography>Model : {model}</Typography>
                  <Typography>Brand: {brand}</Typography>
                  <Typography>Price: Rs. {price}</Typography>
                  <Typography>Rating: {rating}</Typography>
                  <Typography>Available Quantity: {quantity}</Typography>
                </ProductSpecificationContainer>
              </ProductSpecificationWrapper>
            </ProductDetails>
            <ProductDescriptionWrapper>
              <Typography fontWeight={600} fontSize={'20px'}>
                {'Description'}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </ProductDescriptionWrapper>
          </ProductDetailContainer>
        </ProductDetailWrapper>
      </Modal>
    </div>
  );
}

ViewCartProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
