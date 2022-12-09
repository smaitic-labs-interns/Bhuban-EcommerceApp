import React, { useEffect, useState } from "react";
import CartTable from "Pages/Cart/Components/CartTable";
import {
  CartWrapper,
  CartLeftWrapper,
  CartLeftCardWrapper,
  CartRightWrapper,
  CartRightCardWrapper,
} from "Pages/Cart/styles/cartStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_user_Cart,
  fetch_cart_products_details,
} from "Actions/cartActions";
import Checkout from "Pages/Cart/Components/Checkout";

export default function Cart() {
  const userCart = useSelector((state) => state.userCart);
  const cartProducts = useSelector((state) => state.cartProductsDetails);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const userId = login.isLogined ? login.userId : null;

  const [cartDetails, setCartDetails] = useState({});
  const [cart, setCart] = useState({});

  useEffect(() => {
    if (userId && userId !== "") {
      dispatch(fetch_user_Cart({ userId: userId, action: "fetch" }));
    }
  }, [userId]);

  useEffect(() => {
    if (userCart.status === "success") {
      setCart(userCart);
      const pId = [];
      for (let product of userCart.products) {
        pId.push(product.productId);
      }

      if (pId.length !== 0)
        dispatch(
          fetch_cart_products_details({ productId: pId, action: "fetch" })
        );
    }
  }, [userCart]);

  useEffect(() => {
    // if (cartProducts.status === "success") {
    //   const details = cartProducts.details;
    //   const prdcts = [];
    //   for (let index in cart.products) {
    //     // delete details[index].id;
    //     console.log(details[index]);
    //     prdcts.push({
    //       ...cart.products[index],
    //       ...details[index],
    //     });
    //   }
    //   console.log(prdcts);
    // }
  }, [cartProducts]);

  return (
    <>
      <CartWrapper>
        <CartLeftWrapper>
          <CartLeftCardWrapper>
            <CartTable cart={cart} />
          </CartLeftCardWrapper>
        </CartLeftWrapper>
        <CartRightWrapper>
          <CartRightCardWrapper>
            <Checkout cart={cart} />
          </CartRightCardWrapper>
        </CartRightWrapper>
      </CartWrapper>
    </>
  );
}
