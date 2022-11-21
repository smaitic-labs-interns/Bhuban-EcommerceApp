import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../../redux/actions/productActions";
import truck from "../../../public/images/loading-truck.gif";
import loading from "../../../public/images/loading.gif";

import {
  ProductCardsWrapper,
  ProductsCardContainer,
  HomeBannerWrapper,
} from "../Styles/productListStyle";
import { Typography } from "@mui/material";

export default function SearchList({ products }) {
  return (
    <ProductCardsWrapper>
      <HomeBannerWrapper></HomeBannerWrapper>
      <ProductsCardContainer>
        {products.length === 0 ? (
          <Typography>No Product Found !</Typography>
        ) : (
          products.map((product) => {
            return (
              <ProductCard product={product} key={product.id}></ProductCard>
            );
          })
        )}
      </ProductsCardContainer>
    </ProductCardsWrapper>
  );
}
