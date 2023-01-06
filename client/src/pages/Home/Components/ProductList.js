import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from 'components';
import { fetchProducts } from 'Actions/productActions';
import truck from 'public/images/loading-truck.gif';
import loading from 'public/images/loading.gif';
import { ProductCardsWrapper, ProductsCardContainer } from 'pages/Home/styles/productListStyle';

export default function ProductList() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ProductCardsWrapper>
      <ProductsCardContainer>
        {products.length === 0 ? (
          <img src={truck || loading} alt='Loading Truck' />
        ) : (
          products.map((product) => {
            return <ProductCard product={product} key={product.id}></ProductCard>;
          })
        )}
      </ProductsCardContainer>
    </ProductCardsWrapper>
  );
}
