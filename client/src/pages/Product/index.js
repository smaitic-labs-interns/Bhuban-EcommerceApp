import ProductDetail from './Components/ProductDetail';
import loading from 'public/images/loading.gif';
import noProduct from 'public/images/no-product.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetch_product } from 'redux/actions/productActions';
import { Box } from '@mui/material';

export default function ProductDetailContainer() {
  const [noProductImg, setNoProductImg] = useState(loading);
  const product = useSelector((state) => state.product);
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && productId !== '') dispatch(fetch_product(productId));
  }, [productId, dispatch]);

  useEffect(() => {}, [product]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoProductImg(noProduct);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {Object.keys(product).length === 0 ? (
        <Box>
          <img src={noProductImg} alt='LoadingProduct' />
        </Box>
      ) : (
        <ProductDetail product={product} />
      )}
    </>
  );
}
