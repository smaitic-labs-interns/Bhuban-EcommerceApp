import React, { useEffect, useMemo, useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetch_limited_user_order,
  cancel_order,
  return_replace_order,
} from 'redux/actions/orderActions';
import ViewOrder from 'components/Modals/ViewOrder';
import { AssignmentReturn, Cancel, FindReplace, SkipPrevious, SkipNext } from '@mui/icons-material';
import Swal from 'sweetalert2';
import {
  CustomTableCell,
  PagerWrapper,
  PagerContainer,
  PreviousBtnWrapper,
  DescriptionWrapper,
  NextBtnWrapper,
} from '../styles/RightTableStyle';

export default function RightTable() {
  const login = useSelector((state) => state.login);
  const cancelOrder = useSelector((state) => state.cancelOrder);
  const limitedUserOrder = useSelector((state) => state.limitedUserOrder);
  const returnReplace = useSelector((state) => state.returnReplace);
  const userId = login.isLogined ? login.userId : null;

  const dispatch = useDispatch();
  const [orders, setOrders] = useState({ all: [], next: {}, previous: {} });

  const handleCancelOrder = (id) => {
    if (id && id !== ' ') {
      Swal.fire({
        title: 'Do you want to cancel this order?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cancel_order({ orderId: id, action: 'cancel' }));
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
  };

  const handleReturnReplace = (id, action) => {
    if (id && id !== ' ' && action && action !== '') {
      Swal.fire({
        title: `Do you want to ${action} this order?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(return_replace_order({ orderId: id, action: action }));
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
  };

  useEffect(() => {
    if (userId && userId !== ' ') {
      dispatch(fetch_limited_user_order({ userId: userId, page: 1, limit: 10, action: 'fetch' }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (limitedUserOrder.status === 'success') {
      setOrders((orders) => ({
        ...orders,
        all: limitedUserOrder.all,
        next: limitedUserOrder.next,
        previous: limitedUserOrder.previous,
      }));
    }
  }, [limitedUserOrder]);

  useMemo(() => {
    if (cancelOrder.status === 'success') {
      Swal.fire({
        title: 'Order Cancelled Sucessfully',
        text: `${cancelOrder.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      dispatch(
        fetch_limited_user_order({
          userId: userId,
          page: currentPage(),
          limit: 10,
          action: 'fetch',
        }),
      );
    } else if (cancelOrder.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${cancelOrder.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    if (cancelOrder.status !== null) {
      dispatch(
        cancel_order({
          orderId: '',
          action: 'clean',
        }),
      );
    }
  }, [cancelOrder, dispatch, userId]);

  useEffect(() => {
    if (returnReplace.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${returnReplace.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      dispatch(
        fetch_limited_user_order({
          userId: userId,
          page: currentPage(),
          limit: 10,
          action: 'fetch',
        }),
      );
    } else if (returnReplace.status === 'failed') {
      Swal.fire({
        title: 'Error!',
        text: `${returnReplace.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    if (returnReplace.status !== null) {
      dispatch(
        return_replace_order({
          orderId: '',
          action: 'clean',
        }),
      );
    }
  }, [returnReplace, dispatch, userId]);

  const currentPage = (previous = {}, next = {}) => {
    const prevlength = Object.keys(previous).length;
    const nextlength = Object.keys(next).length;
    if (nextlength !== 0) {
      return next.page - 1;
    } else if (prevlength !== 0) {
      return previous.page + 1;
    } else {
      return 1;
    }
  };

  const handleFetchOrder = ({ page, limit }) => {
    if (page && page !== '' && limit && limit !== '') {
      orders.all = [];
      dispatch(
        fetch_limited_user_order({ userId: userId, page: page, limit: limit, action: 'fetch' }),
      );
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow allign='right'>
            <TableCell sx={{ border: 'none' }}>Recent Orders</TableCell>
          </TableRow>
          <TableRow sx={{ background: '#fafafa' }}>
            <CustomTableCell>Order #</CustomTableCell>
            <CustomTableCell>Placed On</CustomTableCell>
            <CustomTableCell colSpan={4}>Actions</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.all.length !== 0 ? (
            orders.all.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.placedOn}</TableCell>
                  <TableCell>
                    <ViewOrder order={order} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <Cancel sx={{ paddingRight: '0.5rem' }} />
                      Cancel
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => handleReturnReplace(order.id, 'return')}
                    >
                      <AssignmentReturn sx={{ paddingRight: '0.5rem' }} />
                      Retrn
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      color='primary'
                      onClick={() => handleReturnReplace(order.id, 'replace')}
                    >
                      <FindReplace sx={{ paddingRight: '0.5rem' }} />
                      Replace
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>Not Any Orders Available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {(orders.next || orders.previous) && (
        <PagerWrapper>
          <PagerContainer>
            <PreviousBtnWrapper
              disabled={Object.keys(orders.previous).length === 0}
              onClick={() => {
                handleFetchOrder(orders.previous);
              }}
            >
              <SkipPrevious />
              <Typography>{'Previous'}</Typography>
            </PreviousBtnWrapper>
            <DescriptionWrapper>
              <Typography>{`Current Page: ${currentPage(
                orders.previous,
                orders.next,
              )}`}</Typography>
            </DescriptionWrapper>
            <NextBtnWrapper
              disabled={Object.keys(orders.next).length === 0}
              onClick={() => {
                handleFetchOrder(orders.next);
              }}
              variant='outlined'
              color='primary'
            >
              <Typography>{'Next'}</Typography>
              <SkipNext />
            </NextBtnWrapper>
          </PagerContainer>
        </PagerWrapper>
      )}
    </TableContainer>
  );
}
