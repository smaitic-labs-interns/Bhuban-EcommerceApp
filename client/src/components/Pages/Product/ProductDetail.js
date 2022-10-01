import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import emptyImage from "../../../public/images/img.png";

export default function ProductDetail({ product }) {
  const { id, category, model, brand, description, price, quantity, rating } =
    product;

    const [quty, setQuty] = useState(0);

const handleIncrease = () =>{
    setQuty(quty+1);
}

const handleDecrease = () => {
    quty !== 0 ?setQuty(quty-1):alert("Quantity cannot be negative")
}


const handleAddToCart = () => {
    if(quty === 0){
        alert("Quantity cannot be negative")
    }else{

    }
}

const handleBuyNow = () => {
    if(quty === 0){
        alert("Quantity cannot be negative")
    }else{
        
    }
}


  return (
    <Box>
      <Grid container key={id}>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box  sx={{}}>
            <img src={emptyImage} alt="Product Image" />
            <Box sx={{display:"flex", justifyContent:"space-around", margin:"20px 0"}}>
                <Button variant="contained" > {`<<`} </Button>
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
                <Box sx={{border:"solid blue 2px", margin:"10px 0 20px 0", boxShadow: "5px 10px #888888"}}>
                    <Box sx={{margin:"5px 0"}}>
                  <Typography variant="h4">
                    Select required number of quantities
                  </Typography>
                  </Box>
                  <Box>
                    <Box sx={{textAlign:"center"}}>
                      <TextField
                        id="quantity"
                        label="My Quantity"
                        defaultValue={quty}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={quty}
                      />
                    </Box>
                    <Box sx={{display:"flex", justifyContent: "space-around", margin:"10px 0"}}>
                        <Button variant="outlined" color="error" onClick={handleDecrease}>Decrease</Button>
                        <Button variant="outlined" color="success" onClick={handleIncrease}>Increase</Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="contained" color="success" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleAddToCart}>
                    ADD to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box item>
            <Typography>Extra details</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
