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
import ShippingForm from "./Components/ShippingForm";

export default function Cart() {
  const userCart = useSelector((state) => state.userCart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const userId = login.isLogined ? login.userId : null;

  const [cartDetails, setCartDetails] = useState({});

  console.log(userId);
  useEffect(() => {
    if (userId && userId !== " ") dispatch(fetch_user_Cart(userId));
  }, [userId]);

  useEffect(() => {
    setCartDetails(userCart);
    console.log(userCart);
  }, [userCart]);

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
            <ShippingForm />
          </CartRightCardWrapper>
        </CartRightWrapper>
      </CartWrapper>
    </>
  );
}
