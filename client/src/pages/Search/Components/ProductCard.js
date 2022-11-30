import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import {
  CardWrapper,
  CardContainer,
  ImageWrapper,
  ContentWrapper,
  ProductTitleWrapper,
  ProductPriceWrapper,
  ProductDiscountWrapper,
  ProductPreviousPriceWrapper,
  ProductDiscountPercenteWrapper,
  ProductRatingWrapper,
  ProductRatingStarWrapper,
  ProductUserRaterWrapper,
} from "../Styles/productCardStyle";

import { Star, StarHalf } from "@mui/icons-material";

export default function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    model,
    brand,
    description,
    price,
    quantity,
    rating,
    images,
  } = product;
  return (
    <CardWrapper>
      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardContainer>
          <ImageWrapper>
            <img
              src={
                images[0].imageurl
                  ? `${process.env.REACT_APP_BACKEND_ENDPOINT}${images[0].imageurl}`
                  : null
              }
              alt={images[0].alttext}
              width={"100%"}
              height={"100%"}
            />
          </ImageWrapper>
          <ContentWrapper>
            <ProductTitleWrapper>
              <Typography>
                {name || brand + " - " + model + " - " + category}
              </Typography>
            </ProductTitleWrapper>
            <ProductPriceWrapper>
              <Typography>{"Rs.: " + price}</Typography>
            </ProductPriceWrapper>
            <ProductDiscountWrapper>
              <ProductPreviousPriceWrapper>
                <Typography>{"Rs. 9999"}</Typography>
              </ProductPreviousPriceWrapper>
              <ProductDiscountPercenteWrapper>
                <Typography>{"(60%)"}</Typography>
              </ProductDiscountPercenteWrapper>
            </ProductDiscountWrapper>
            <ProductRatingWrapper>
              <ProductRatingStarWrapper>
                <Star />
                <Star />
                <Star />
                <Star />
                <StarHalf />
              </ProductRatingStarWrapper>
              <ProductUserRaterWrapper>
                <Typography>{"(999)"}</Typography>
              </ProductUserRaterWrapper>
            </ProductRatingWrapper>
          </ContentWrapper>
        </CardContainer>
      </Link>
    </CardWrapper>
  );
}
