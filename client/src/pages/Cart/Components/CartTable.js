import React, { useState } from "react";
import {
  Link,
  Typography,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Table,
} from "@mui/material";
import { DataCell } from "Pages/Cart/styles/cartTableStyle";
import { fetch_product } from "Actions/productActions";
import EditCartModal from "Pages/Cart/Components/EditCartModal";

export default function CartTable({ cart }) {
  const { message, noOfProducts, products, totalBill } = cart;
  const [productDetails, setProductDetails] = useState([]);

  // useEffect(() => {
  //   for (var product of products) {
  //     var product = setProductDetails(productDetails.push[product]);
  //   }
  // }, [products]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow allign="right">
            <TableCell sx={{ border: "none" }}>Recent Orders</TableCell>
          </TableRow>
          <TableRow sx={{ background: "#fafafa" }}>
            <TableCell sx={{ borderColor: "#eff0f5" }}>Product #</TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              <Typography fontWeight={600}>Quantity</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              <Typography fontWeight={600}>Price</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              <Typography fontWeight={600}>Total</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              <Typography fontWeight={600}>Action</Typography>
            </TableCell>
            <TableCell
              sx={{ borderColor: "#eff0f5" }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products ? (
            products.map((product) => (
              <TableRow key={product.productId}>
                <DataCell component="th" scope="row">
                  {product.productId}
                </DataCell>
                <DataCell align="right">{product.quantity}</DataCell>
                <DataCell align="right">{"100"}</DataCell>
                <DataCell align="right">{"1000"}</DataCell>
                <DataCell align="right">
                  <Link underline="none" sx={{ cursor: "pointer" }}>
                    <Typography
                      sx={{
                        color: "#1a9cb7",
                        fontSize: "14px",
                        lineHeight: 1.28571,
                      }}
                    >
                      <EditCartModal
                        data={{
                          id: product.productId,
                          quantity: product.quantity,
                        }}
                      />
                    </Typography>
                  </Link>
                </DataCell>
              </TableRow>
            ))
          ) : (
            <Box>
              <Typography>No Products on the cart</Typography>
            </Box>
          )}
          <TableRow>
            <DataCell align="right" colSpan={4}>
              <Typography fontWeight={600}>Sub Total</Typography>
            </DataCell>
            <DataCell>Rs. {totalBill / 100}</DataCell>
          </TableRow>
          <TableRow>
            <DataCell align="right" colSpan={4}>
              <Typography fontWeight={600}>Tax (13%)</Typography>
            </DataCell>
            <DataCell>Rs. {(totalBill * 0.13) / 100}</DataCell>
          </TableRow>
          <TableRow>
            <DataCell align="right" colSpan={4}>
              <Typography fontWeight={600}>Total</Typography>
            </DataCell>
            <DataCell>
              <Typography fontWeight={600}>
                Rs. {Math.round((totalBill + totalBill * 0.13) / 100)}
              </Typography>
            </DataCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
