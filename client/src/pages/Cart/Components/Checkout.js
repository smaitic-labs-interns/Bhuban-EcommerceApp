import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import {
  CheckoutButtonWrapper,
  CheckoutTitleWrapper,
  CheckoutWrapper,
} from "../styles/checkoutStyle";

export default function Checkout() {
  return (
    <CheckoutWrapper>
      <CheckoutTitleWrapper>
        <Typography>{"Order Summary"}</Typography>
      </CheckoutTitleWrapper>
      <Link to={"/placeOrder"} style={{ textDecoration: "none" }}>
        <CheckoutButtonWrapper>
          <Button variant="success">
            <Typography>Proceed To Checkout</Typography>
          </Button>
        </CheckoutButtonWrapper>
      </Link>
    </CheckoutWrapper>
  );
}
