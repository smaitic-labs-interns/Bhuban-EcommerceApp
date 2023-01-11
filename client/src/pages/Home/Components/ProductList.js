import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from 'components';
import { fetch_limited_product } from 'redux/actions/productActions';
import truck from 'public/images/loading-truck.gif';
import loading from 'public/images/loading.gif';
import {
  ProductCardsWrapper,
  ProductsCardContainer,
  PagerWrapper,
  PagerContainer,
  PreviousBtnWrapper,
  DescriptionWrapper,
  NextBtnWrapper,
} from 'pages/Home/styles/productListStyle';
import { Typography } from '@mui/material';
import { SkipNext, SkipPrevious } from '@mui/icons-material';
// import { isEmpty } from 'Utils';

export default function ProductList() {
  const products = useSelector((state) => state.limitedProduct);
  const dispatch = useDispatch();

  const handleFetchProduct = ({ page, limit }) => {
    if (page && page !== '' && limit && limit !== '') {
      products.all = [];
      dispatch(fetch_limited_product({ page: page, limit: limit, action: 'fetch' }));
    }
  };
  const currentPage = (previous = {}, next = {}) => {
    const prevlength = Object.keys(previous).length;
    const nextlength = Object.keys(next).length;
    if (nextlength !== 0) {
      return next.page - 1;
    } else if (prevlength !== 0) {
      return previous.page + 1;
    } else {
      return 1;
    }
  };

  useMemo(() => {
    dispatch(fetch_limited_product({ page: 1, limit: 10, action: 'fetch' }));
  }, [dispatch]);

  return (
    <ProductCardsWrapper>
      <ProductsCardContainer>
        {products.all.length === 0 ? (
          <img src={truck || loading} alt='Loading Truck' />
        ) : (
          products.all.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        )}
      </ProductsCardContainer>
      {(products.next || products.previous) && (
        <PagerWrapper>
          <PagerContainer>
            <PreviousBtnWrapper
              disabled={Object.keys(products.previous).length === 0}
              onClick={() => {
                handleFetchProduct(products.previous);
              }}
            >
              <SkipPrevious />
              <Typography>{'Previous'}</Typography>
            </PreviousBtnWrapper>
            <DescriptionWrapper>
              <Typography>{`Current Page: ${currentPage(
                products.previous,
                products.next,
              )}`}</Typography>
            </DescriptionWrapper>
            <NextBtnWrapper
              disabled={Object.keys(products.next).length === 0}
              onClick={() => {
                handleFetchProduct(products.next);
              }}
              variant='outlined'
              color='primary'
            >
              <Typography>{'Next'}</Typography>
              <SkipNext />
            </NextBtnWrapper>
          </PagerContainer>
        </PagerWrapper>
      )}
    </ProductCardsWrapper>
  );
}
