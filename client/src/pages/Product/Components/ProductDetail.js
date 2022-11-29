import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import cart from "../../../public/images/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetch_user_Cart,
  add_to_cart,
} from "../../../redux/actions/cartActions";

import Swal from "sweetalert2";

import {
  ProductDetailWrapper,
  ProductDetailContainer,
  ImageWrapper,
  ImageContainer,
  ImageControlsWrapper,
  ImageControlsLeftArrowWrapper,
  ImageControlsImageWrapper,
  ImageControlsRightArrowWrapper,
  ContentWrapper,
  ContentTitleWrapper,
  ContentRatingWrapper,
  ContentRatingStarWrapper,
  ContentRatingDescWrapper,
  ContentBrandWrapper,
  ContentPriceWrapper,
  ContentCurrentPriceWrapper,
  ContentPreviousPriceWrapper,
  ContentDiscountPercentWrapper,
  ContentPromotionWrapper,
  ContentQuantityWrapper,
  ContentQuantityActionWrapper,
  ContentAvailableQuantityWrapper,
  ContentActionBtnWrapper,
  ProductSpecificationWrapper,
  ProductSpecificationContainer,
} from "../styles/productDetailStyle";
import {
  Star,
  StarHalf,
  Add,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ProductDetail({ product }) {
  const addToCart = useSelector((state) => state.addToCart);
  const login = useSelector((state) => state.login);
  const userCart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    category,
    model,
    brand,
    description,
    price,
    quantity,
    rating,
    images,
  } = product;

  const [quty, setQuty] = useState(1);

  const { productId } = useParams();
  const handleIncrease = () => {
    setQuty(quty + 1);
  };

  const handleDecrease = () => {
    quty !== 1
      ? setQuty(quty - 1)
      : Swal.fire({
          title: "Error!",
          text: `Quantity cannot be less than 1`,
          icon: "error",
          confirmButtonText: "Ok",
        });
  };

  const userId = login.isLogined ? login.userId : null;

  const handleAddToCart = () => {
    if (quty <= 0) {
      Swal.fire({
        title: "Error!",
        text: `Quantity cannot be less than 1`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (login.isLogined) {
      dispatch(
        add_to_cart({
          userId: userId,
          productId: productId,
          quantity: quty,
          action: "add",
        })
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: `Try Login Firsts`,
        icon: "error",
        confirmButtonText: "cancel",
        footer: "<a href = '/login' > LOGIN </a>",
      });
    }
  };

  const handleBuyNow = () => {
    if (quty === 0) {
      Swal.fire({
        title: "Error!",
        text: `Quantity cannot be negative`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (login.isLogined) {
      dispatch(
        add_to_cart({
          userId: userId,
          productId: productId,
          quantity: quty,
          action: "add",
        })
      );
      navigate("/cart");
    } else {
      Swal.fire({
        title: "Error!",
        text: `Try Login Firsts`,
        icon: "error",
        confirmButtonText: "cancel",
        footer: "<a href = '/login' > LOGIN </a>",
      });
    }
  };

  useEffect(() => {
    if (userId && userId !== " ")
      dispatch(fetch_user_Cart({ userId: userId, action: "fetch" }));
  }, [userId]);

  useEffect(() => {
    if (addToCart.status === "success") {
      dispatch(fetch_user_Cart({ userId: userId, action: "fetch" }));
      Swal.fire({
        title: "Success!",
        text: `${addToCart.message}`,
        icon: "success",
      });
    } else if (addToCart.status === "failed") {
      Swal.fire({
        title: "Failed!",
        text: `${addToCart.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (addToCart.status !== null) {
      dispatch(
        add_to_cart({
          userId: "",
          productId: "",
          quantity: "",
          action: "clean",
        })
      );
    }
  }, [addToCart]);

  // for displaying Images
  const [target, setTarget] = useState(1);
  let index = 0;
  const handleNext = () => {
    if (target < index) {
      setTarget(target + 1);
    }
  };

  const handlePrevious = () => {
    if (target > 1) {
      setTarget(target - 1);
    }
  };

  const imageStyle = {
    display: "flex",
    justifyContent: "center",
    "& > img": {
      width: "100%",
      height: "100%",
      ObjectFit: "contain",
    },
  };

  return (
    <ProductDetailWrapper>
      <ProductDetailContainer>
        <ImageWrapper>
          <ImageContainer>
            {images
              ? images.map((item) => {
                  index++;
                  return (
                    <Box
                      key={item.id}
                      sx={target === index ? imageStyle : { display: "none" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${item.imageurl}`}
                        alt={item.alttext}
                      />
                    </Box>
                  );
                })
              : ""}
          </ImageContainer>
          <ImageControlsWrapper>
            <ImageControlsLeftArrowWrapper>
              <Button variant="contained" onClick={handlePrevious}>
                {" << "}
              </Button>
            </ImageControlsLeftArrowWrapper>
            <ImageControlsImageWrapper>
              <Typography>{`${target} of ${index}`}</Typography>
            </ImageControlsImageWrapper>
            <ImageControlsRightArrowWrapper>
              <Button variant="contained" onClick={handleNext}>
                {" >> "}
              </Button>
            </ImageControlsRightArrowWrapper>
          </ImageControlsWrapper>
        </ImageWrapper>
        <ContentWrapper>
          <ContentTitleWrapper>
            <Typography variant="h3">{model + "-" + category}</Typography>
          </ContentTitleWrapper>
          <ContentRatingWrapper>
            <ContentRatingStarWrapper>
              <Star />
              <Star />
              <Star />
              <Star />
              <StarHalf />
              <ContentRatingDescWrapper>
                <Typography>{"10 Ratings | "}</Typography>
                <Typography>{"25 answered questions"}</Typography>
              </ContentRatingDescWrapper>
            </ContentRatingStarWrapper>
          </ContentRatingWrapper>
          <ContentBrandWrapper>
            <Typography>{"Brand: "}</Typography>
            <Typography>{brand}</Typography>
            <Typography>{"| More From This Brand"}</Typography>
          </ContentBrandWrapper>
          <ContentPriceWrapper>
            <ContentCurrentPriceWrapper>
              <Typography variant="h5">{`Rs. ${price}`}</Typography>
            </ContentCurrentPriceWrapper>
            <ContentPreviousPriceWrapper>
              <Typography>{"Rs. 99999"}</Typography>
              <ContentDiscountPercentWrapper>
                <Typography>{"(40%)"}</Typography>
              </ContentDiscountPercentWrapper>
            </ContentPreviousPriceWrapper>
          </ContentPriceWrapper>
          <ContentPromotionWrapper>
            <Typography>{"For Promotion"}</Typography>
          </ContentPromotionWrapper>
          <ContentQuantityWrapper>
            <ContentQuantityActionWrapper>
              <Button variant="outlined" color="error" onClick={handleDecrease}>
                <RemoveOutlined />
              </Button>
              <TextField id="quantity" label="My Quantity" value={quty} />
              <Button
                variant="outlined"
                color="success"
                onClick={handleIncrease}
              >
                <Add />
              </Button>
            </ContentQuantityActionWrapper>
            <ContentAvailableQuantityWrapper>
              {`${quantity} items are available on the stock`}
            </ContentAvailableQuantityWrapper>
            <ContentActionBtnWrapper>
              <Button
                variant="contained"
                color="success"
                onClick={handleBuyNow}
              >
                <ShoppingCartCheckout />
                {" Buy Now"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              >
                <ShoppingCart />
                {" ADD to Cart"}
              </Button>
            </ContentActionBtnWrapper>
          </ContentQuantityWrapper>
        </ContentWrapper>
        <Box>
          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                position: "absolute",
                right: "10px",
                top: "10px",
                boxShadow: "0px 1px 16px 2px #1976d2",
              }}
            >
              <Box
                sx={{
                  background: "red",
                  padding: "4px 8px",
                  borderRadius: "50%",
                  color: "white",
                  position: "absolute",
                  top: 0,
                  right: "5px",
                }}
              >
                {userCart.noOfProducts}
              </Box>
              <Box
                sx={{
                  color: "white",
                  marginTop: "3px",
                  boxShadow: "",
                }}
              >
                <img
                  src={cart}
                  alt={"cart"}
                  width={"60px"}
                  height={"60px"}
                ></img>
              </Box>
            </Box>
          </Link>
        </Box>
        <ProductSpecificationWrapper>
          <ProductSpecificationContainer>
            <Typography>Category: {category} </Typography>
            <Typography>Model : {model}</Typography>
            <Typography>Brand: {brand}</Typography>
            <Typography>Price: Rs. {price / 100}</Typography>
            <Typography>Rating: {rating}</Typography>
            <Typography>Available Quantity: {quantity}</Typography>
          </ProductSpecificationContainer>
        </ProductSpecificationWrapper>
      </ProductDetailContainer>
    </ProductDetailWrapper>
  );
}
