import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import watchImage from "../../../public/images/watch.png";
import cart from "../../../public/images/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetch_user_Cart,
  add_to_cart,
} from "../../../redux/actions/cartActions";

export default function ProductDetail({ product }) {
  // const cart = useSelector((state) => state.addToCart);
  const login = useSelector((state) => state.login);
  const userCart = useSelector((state) => state.userCart);
  const dispatch = useDispatch();
  const { id, category, model, brand, description, price, quantity, rating } =
    product;

  const [quty, setQuty] = useState(1);
  const [submitMsg, setSubmitMsg] = useState({});
  const [submitMsgStyle, setSubmitMsgStyle] = useState({ display: "none" });

  const { productId } = useParams();
  const handleIncrease = () => {
    setQuty(quty + 1);
  };

  const handleDecrease = () => {
    quty !== 1 ? setQuty(quty - 1) : alert("Quantity cannot be less than 1");
  };

  const userId = login.isLogined ? login.userId : null;
  console.log(userId);

  const handleAddToCart = () => {
    if (quty <= 0) {
      alert("Quantity cannot be less than 1");
    } else {
      dispatch(
        add_to_cart({ userId: userId, productId: productId, quantity: quty })
      );
    }
    if (userCart.message && userCart.message.type.length !== 0) {
      setSubmitMsg(userCart.message);
      if (submitMsg.type === "success") {
        setSubmitMsgStyle({
          border: "solid green 1px",
          background: "#a5cca5",
          color: "white",
          padding: "20px 30px",
          borderRadius: "10px",
          position: "absolute",
        });
      } else {
        setSubmitMsgStyle({
          border: "solid red 1px",
          background: "#f1b4b3",
          color: "white",
          padding: "20px 30px",
          borderRadius: "10px",
          position: "absolute",
        });
      }
      const timer = setTimeout(() => {
        setSubmitMsgStyle({ display: "none" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handleBuyNow = () => {
    if (quty === 0) {
      alert("Quantity cannot be negative");
    } else {
    }
  };

  useEffect(() => {
    if (userId && userId !== " ") dispatch(fetch_user_Cart({ userId }));
  }, [userId]);

  return (
    <Box>
      <Box
        sx={{
          top: "0",
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}>
        <Box sx={submitMsgStyle}>
          <Typography>{submitMsg.msg}</Typography>
        </Box>
      </Box>
      <Box>
        <Link to={"/cart"} style={{ textDecoration: "none" }}>
          <Box
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              boxShadow: "0px 1px 16px 2px #1976d2",
            }}>
            <Box
              sx={{
                background: "red",
                padding: "4px 8px",
                borderRadius: "50%",
                color: "white",
                position: "absolute",
                top: 0,
                right: "5px",
              }}>
              {userCart.noOfProducts}
            </Box>
            <Box
              sx={{
                color: "white",
                marginTop: "3px",
                boxShadow: "",
              }}>
              <img src={cart} alt={"cart"} width={"60px"} height={"60px"}></img>
            </Box>
          </Box>
        </Link>
      </Box>
      <Grid container key={id}>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box sx={{ padding: "10px" }}>
            <img src={watchImage} alt="Product" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px 0",
              }}>
              <Button variant="contained"> {`<<`} </Button>
              <Box>
                <Typography>1 of 10</Typography>
              </Box>
              <Button variant="contained"> {`>> `}</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box>
                <Typography>PRODUCT DETAILS</Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography>Category: {category} </Typography>
                <Typography>Model : {model}</Typography>
                <Typography>Brand: {brand}</Typography>
                <Typography>Price: Rs. {price}</Typography>
                <Typography>Rating: {rating}</Typography>
                <Typography>Available Quantity: {quantity}</Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="p">{description}</Typography>
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box>
                <Box
                  sx={{
                    border: "solid blue 2px",
                    margin: "10px 0 20px 0",
                    boxShadow: "5px 10px #888888",
                  }}>
                  <Box sx={{ margin: "5px 0" }}>
                    <Typography variant="h4">
                      Select required number of quantities
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ textAlign: "center" }}>
                      <TextField
                        id="quantity"
                        label="My Quantity"
                        // defaultValue={quty}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={quty}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "10px 0",
                      }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDecrease}>
                        Decrease
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={handleIncrease}>
                        Increase
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}>
                    ADD to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box>
            <Typography>Extra details</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
