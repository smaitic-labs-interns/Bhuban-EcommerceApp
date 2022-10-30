import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CartTable from "./Components/CartTable";
import {
  CartWrapper,
  CartLeftWrapper,
  CartLeftCardWrapper,
  CartRightWrapper,
  CartRightCardWrapper,
} from "./styles/indexStyle";
import { useDispatch, useSelector } from "react-redux";
import { fetch_user_Cart } from "../../redux/actions/cartActions";

export default function index() {
  const cart = useSelector((state) => state.userCart);
  const login = useSelector((state) => state.login);
  const { userId } = login;
  const [cartDetails, setCartDetails] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_user_Cart(userId));
  }, []);

  useEffect(() => {
    setCartDetails(cart);
  }, [cart]);

  return (
    <>
      <CartWrapper>
        <CartLeftWrapper>
          <CartLeftCardWrapper>
            <CartTable data={cartDetails} />
          </CartLeftCardWrapper>
        </CartLeftWrapper>
        <CartRightWrapper>
          <CartRightCardWrapper>
            This is for Shipping Address
          </CartRightCardWrapper>
        </CartRightWrapper>
      </CartWrapper>
    </>
  );
}
