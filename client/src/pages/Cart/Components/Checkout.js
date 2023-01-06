import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  CheckoutButtonWrapper,
  CheckoutTitleWrapper,
  CheckoutWrapper,
} from 'Pages/Cart/styles/checkoutStyle';

export default function Checkout({ cart }) {
  console.log(cart);
  return (
    <CheckoutWrapper>
      <CheckoutTitleWrapper>
        <Typography>{'Order Summary'}</Typography>
      </CheckoutTitleWrapper>
      <Link
        to={Object.keys(cart).length === 0 ? '#' : '/placeOrder'}
        style={{ textDecoration: 'none' }}
      >
        <CheckoutButtonWrapper>
          <Button
            disabled={cart?.noOfProducts || Object.keys(cart).length === 0}
            variant='outlined'
            color='success'
          >
            <Typography>Proceed To Checkout</Typography>
          </Button>
        </CheckoutButtonWrapper>
      </Link>
    </CheckoutWrapper>
  );
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
};
