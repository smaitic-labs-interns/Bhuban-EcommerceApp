import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetch_user_Cart } from "../redux/actions/cartActions";
import CartPage from "../pages/CartPage";


export default function CartContainer() {
    const [userId, setUserId] = useState("358807ca-3d51-4b6a-8dbd-7fab6f42945d");
    // const login = useSelector((state) => state.login);
    const cart = useSelector((state) => state.userCart);
  //   const { productId } = useParams();
    const dispatch = useDispatch();
  //   useEffect(() => {
  //     if (productId && productId !== "") dispatch(fetchProduct(productId));
  //     return () => {
  //       dispatch(removeSelectedProduct());
  //     };
  //   }, [productId]);

  const productDetails = []

  useEffect(() => {
    if (userId && userId !== "") dispatch(fetch_user_Cart({userId}));
    if(cart){
      // cart.products.map((product)=>{
      //   // productDetails.push(find_products());
      // })
    }
  }, [userId]);


  return (
    <>
      <CartPage></CartPage>
    </>
  );
}
