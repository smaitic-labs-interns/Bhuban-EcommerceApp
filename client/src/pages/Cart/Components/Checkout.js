import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import {
  CheckoutButtonWrapper,
  CheckoutTitleWrapper,
  CheckoutWrapper,
} from "Pages/Cart/styles/checkoutStyle";

export default function Checkout({ cart }) {
  return (
    <CheckoutWrapper>
      <CheckoutTitleWrapper>
        <Typography>{"Order Summary"}</Typography>
      </CheckoutTitleWrapper>
      <Link
        to={cart.noOfProducts === 0 ? "#" : "/placeOrder"}
        style={{ textDecoration: "none" }}
      >
        <CheckoutButtonWrapper>
          <Button
            disabled={cart.noOfProducts == 0 ? true : false}
            variant="success"
          >
            <Typography>Proceed To Checkout</Typography>
          </Button>
        </CheckoutButtonWrapper>
      </Link>
    </CheckoutWrapper>
  );
}
