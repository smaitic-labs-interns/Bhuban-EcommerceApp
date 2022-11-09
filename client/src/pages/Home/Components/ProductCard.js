import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function ProductCard({ product }) {
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
  return (
    <Card sx={{ width: 345, margin: "5px" }} key={id}>
      <Link to={`/product/${id}`}>
        <Box sx={{ padding: "20px 0", objectFit: "contain" }}>
          <CardMedia
            component="img"
            height="140"
            image={
              images[0].imageurl
                ? `${process.env.REACT_APP_BACKEND_ENDPOINT}${images[0].imageurl}`
                : null
            }
            alt="Product Image"
            sx={{ objectFit: "contain" }}
          />
        </Box>
        <CardContent>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{
                fontSize: "36px",
                lineHeight: "40px",
                fontWeight: 600,
                color: "black",
              }}>
              {category}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left", marginTop: "10px" }}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 20px",
            textDecoration: "none !important",
          }}>
          <Box>
            <Typography>RS. {price}</Typography>
          </Box>
          <Box>
            <Typography>Rating: {rating}</Typography>
          </Box>
        </CardActions>
      </Link>
    </Card>
  );
}
