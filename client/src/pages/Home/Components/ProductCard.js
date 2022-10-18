import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import watchImage from "../../../public/images/watch.png";
import { Box } from "@mui/system";

export default function ProductCard({ product }) {
  console.log(product);
  const { id, category, model, brand, description, price, quantity, rating } =
    product;
  return (
    <Card sx={{ width: 345, margin: "5px" }} key={id}>
      <Link to={`/product/${id}`}>
        <Box sx={{padding:"20px 0", objectFit:"contain"}}>
          <CardMedia
            component="img"
            height="140"
            image={watchImage}
            alt="Product Image"
            sx={{objectFit: "contain"}}
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
              }}
            >
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
          }}
        >
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
