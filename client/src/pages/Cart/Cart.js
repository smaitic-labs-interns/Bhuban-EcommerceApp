import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CartTable from "./Components/CartTable";
import {
  CartWrapper,
  CartLeftWrapper,
  CartLeftCardWrapper,
  CartRightWrapper,
  CartRightCardWrapper,
} from "./styles/cartStyle";
import { useDispatch, useSelector } from "react-redux";
import { fetch_user_Cart } from "../../redux/actions/cartActions";
import Checkout from "./Components/Checkout";

export default function Cart() {
  const userCart = useSelector((state) => state.userCart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const userId = login.isLogined ? login.userId : null;

  const [cartDetails, setCartDetails] = useState({});

  useEffect(() => {
    if (userId && userId !== "") {
      dispatch(fetch_user_Cart({ userId: userId }));
    }
  }, [userId]);

  useEffect(() => {
    setCartDetails(userCart);
  }, [userCart]);

  return (
    <>
      <CartWrapper>
        <CartLeftWrapper>
          <CartLeftCardWrapper>
            <CartTable cart={cartDetails} />
          </CartLeftCardWrapper>
        </CartLeftWrapper>
        <CartRightWrapper>
          <CartRightCardWrapper>
            <Checkout />
          </CartRightCardWrapper>
        </CartRightWrapper>
      </CartWrapper>
    </>
  );
}
