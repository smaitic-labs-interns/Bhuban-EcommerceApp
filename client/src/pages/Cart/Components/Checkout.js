import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  CheckoutButtonWrapper,
  CheckoutTitleWrapper,
  CheckoutWrapper,
} from 'Pages/Cart/styles/checkoutStyle';
import { LocalShipping } from '@mui/icons-material';

export default function Checkout({ cart }) {
  return (
    <CheckoutWrapper>
      <CheckoutTitleWrapper>
        <Typography>{'Order Summary'}</Typography>
      </CheckoutTitleWrapper>
      <Link
        to={Object.keys(cart).length === 0 ? '#' : '/placeOrder'}
        style={{ textDecoration: 'none' }}
      >
        <CheckoutButtonWrapper disabled={Object.keys(cart).length === 0}>
          <LocalShipping />
          <Typography>{' Proceed To Checkout '}</Typography>
        </CheckoutButtonWrapper>
      </Link>
    </CheckoutWrapper>
  );
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
};
