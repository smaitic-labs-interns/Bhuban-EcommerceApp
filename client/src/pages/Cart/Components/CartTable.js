import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, Typography } from "@mui/material";
import { DataCell } from "../styles/cartTableStyle";
import { Box } from "@mui/material";

export default function CartTable({ data }) {
  const { message, noOfProducts, products, totalBill } = data;
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
              Quantity
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              Price
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              Total
            </TableCell>
            <TableCell sx={{ borderColor: "#eff0f5" }} align="right">
              Action
            </TableCell>
            <TableCell
              sx={{ borderColor: "#eff0f5" }}
              align="right"></TableCell>
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
                      }}>
                      Edit
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
            <DataCell align="right" colSpan={2}>
              Sub Total
            </DataCell>
            <DataCell colSpan={3}>Rs. 140000</DataCell>
          </TableRow>
          <TableRow>
            <DataCell align="right" colSpan={2}>
              Tax
            </DataCell>
            <DataCell colSpan={2}>13 %</DataCell>
            <DataCell colSpan={2}>Rs. 140</DataCell>
          </TableRow>
          <TableRow>
            <DataCell align="right" colSpan={2}>
              Total
            </DataCell>
            <DataCell colSpan={3}>Rs. 140000</DataCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
