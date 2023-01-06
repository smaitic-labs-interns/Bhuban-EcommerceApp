import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ProductCard } from 'components';
import {
  ProductCardsWrapper,
  ProductsCardContainer,
  HomeBannerWrapper,
} from 'pages/Search/Styles/productListStyle';

export default function SearchList({ products }) {
  return (
    <ProductCardsWrapper>
      <HomeBannerWrapper></HomeBannerWrapper>
      <ProductsCardContainer>
        {products.length === 0 ? (
          <Typography>No Product Found !</Typography>
        ) : (
          products.map((product) => {
            return <ProductCard product={product} key={product.id}></ProductCard>;
          })
        )}
      </ProductsCardContainer>
    </ProductCardsWrapper>
  );
}

SearchList.propTypes = {
  products: PropTypes.array.isRequired,
};
