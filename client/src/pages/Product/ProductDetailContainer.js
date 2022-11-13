import ProductDetail from "./Components/ProductDetail";
import loading from "../../public/images/loading.gif";
import noProduct from "../../public/images/no-product.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchProduct,
  removeSelectedProduct,
} from "../../redux/actions/productActions";
import { Box } from "@mui/material";

export default function ProductDetailContainer() {
  const [noProductImg, setNoProductImg] = useState(loading);
  const product = useSelector((state) => state.product);
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("PRODUCT ID: ", productId);
    if (productId && productId !== "") dispatch(fetchProduct(productId));

    // return () => {
    //   dispatch(removeSelectedProduct());
    // };
  }, [productId]);

  useEffect(() => {}, [product]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoProductImg(noProduct);
    }, 2000);
    return () => {
      // dispatch(removeSelectedProduct());
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {Object.keys(product).length === 0 ? (
        <Box>
          <img src={noProductImg} alt="LoadingProduct" />
        </Box>
      ) : (
        <ProductDetail product={product}></ProductDetail>
      )}
    </>
  );
}
