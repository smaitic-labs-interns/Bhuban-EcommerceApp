import React from 'react';
import {
  Typography,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Table,
  Button,
} from '@mui/material';
import { DataCell } from 'Pages/Cart/styles/cartTableStyle';
import EditCartModal from 'Pages/Cart/Components/EditCartModal';
import { Delete } from '@mui/icons-material';
import ViewCartProduct from './ViewCartProduct';

export default function CartTable({ cart }) {
  const { products, totalBill } = cart;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow allign='right'>
            <TableCell sx={{ border: 'none' }}>Recent Orders</TableCell>
          </TableRow>
          <TableRow sx={{ background: '#fafafa' }}>
            <TableCell sx={{ borderColor: '#eff0f5' }}>S.N.</TableCell>
            <TableCell sx={{ borderColor: '#eff0f5' }}>Product #</TableCell>
            <TableCell sx={{ borderColor: '#eff0f5' }} align='right'>
              <Typography fontWeight={600}>Quantity</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: '#eff0f5' }} align='right'>
              <Typography fontWeight={600}>Price</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: '#eff0f5' }} align='right'>
              <Typography fontWeight={600}>Total</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: '#eff0f5' }} align='center' colSpan={3}>
              <Typography fontWeight={600}>Action</Typography>
            </TableCell>
            <TableCell sx={{ borderColor: '#eff0f5' }} align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products ? (
            products.map((product, index) => (
              <TableRow key={product.productId}>
                <DataCell component='th'>{index + 1}</DataCell>
                <DataCell component='th' scope='row'>
                  {product.productId}
                </DataCell>
                <DataCell align='right'>{product?.quantity}</DataCell>
                <DataCell align='right'>{product?.pDetails?.price}</DataCell>
                <DataCell align='right'>{product?.pDetails?.price * product?.quantity}</DataCell>
                <DataCell>
                  <EditCartModal
                    data={{
                      id: product.productId,
                      quantity: product.quantity,
                    }}
                  />
                </DataCell>
                <DataCell>
                  <Button variant='outlined' color='error'>
                    <Delete />
                  </Button>
                </DataCell>
                <DataCell>
                  <ViewCartProduct product={product.pDetails} />
                </DataCell>
              </TableRow>
            ))
          ) : (
            <Box>
              <Typography>No Products on the cart</Typography>
            </Box>
          )}
          <TableRow>
            <DataCell align='right' colSpan={3}>
              <Typography fontWeight={600}>Sub Total</Typography>
            </DataCell>
            <DataCell></DataCell>
            <DataCell>Rs. {totalBill}</DataCell>
            <DataCell></DataCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
