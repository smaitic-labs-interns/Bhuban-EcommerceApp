import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../../redux/actions/productActions";
import truck from "../../../public/images/loading-truck.gif";
import loading from "../../../public/images/loading.gif";

export default function ProductList() {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products);
  }, []);

  return (
    <Box sx={{ margin: "30px 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}>
        {products.length === 0 ? (
          <Box sx={{}}>
            <img src={truck || loading} alt="Loading Truck" />
          </Box>
        ) : (
          products.map((product) => {
            return (
              <ProductCard product={product} key={product.id}></ProductCard>
            );
          })
        )}
      </Box>
    </Box>
  );
}
