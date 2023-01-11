import React, { useState, useEffect, useMemo } from 'react';
import { Select, Box, Button, Typography, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { OrderWrapper, OrderContainer, DisplayOrderWrapper } from 'Pages/Admin/styles/orderStyle';
import { fetch_limited_order } from 'Actions/orderActions';
import OrderTable from 'Pages/Admin/Components/OrderTable';
import { isEmpty } from 'Utils';

export default function Order() {
  const limitedOrder = useSelector((state) => state.limitedOrder);
  const dispatch = useDispatch();

  const [noOfOrder, setNoOforder] = useState(5);
  const [order, setOrder] = useState({
    all: [],
    next: {},
    previous: {},
  });

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

  useEffect(() => {
    dispatch(fetch_limited_order({ page: 1, limit: noOfOrder, action: 'fetch' }));
  }, [dispatch, noOfOrder]);

  const handlePage = ({ page, limit }) => {
    if (page && page !== '' && limit && limit !== '') {
      order.all = [];
      dispatch(fetch_limited_order({ page: page, limit: noOfOrder, action: 'fetch' }));
    }
  };

  useMemo(() => {
    dispatch(
      fetch_limited_order({
        page: currentPage(),
        limit: noOfOrder,
        action: 'fetch',
      }),
    );
  }, [noOfOrder, dispatch]);

  useEffect(() => {
    setOrder((order) => ({
      ...order,
      all: limitedOrder.all,
      next: limitedOrder.next,
      previous: limitedOrder.previous,
    }));
  }, [limitedOrder]);

  return (
    <OrderWrapper>
      <OrderContainer>
        <DisplayOrderWrapper>
          Display
          <Select
            sx={{ height: '1.5rem', margin: '0.5rem' }}
            id='noOfOrder'
            name='noOfOrder'
            value={noOfOrder}
            onChange={(e) => {
              setNoOforder(e.target.value);
            }}
          >
            <MenuItem value={5}>{5}</MenuItem>
            <MenuItem value={10}>{10}</MenuItem>
            <MenuItem value={20}>{20}</MenuItem>
            <MenuItem value={50}>{50}</MenuItem>
            <MenuItem value={100}>{100}</MenuItem>
          </Select>
          Orders per page
        </DisplayOrderWrapper>
        {order.all.length !== 0 ? (
          <>
            <OrderTable orders={order.all} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: 'solid green 2px',
                margin: '2rem',
                justifyContent: 'space-between',
                padding: '1rem',
              }}
            >
              <Button
                variant='outlined'
                color='primary'
                disabled={isEmpty(order.previous)}
                onClick={() => {
                  handlePage(order.previous);
                }}
              >
                Previous
              </Button>
              <Box>
                <Typography>{`Page: ${currentPage(order.previous, order.next)}`}</Typography>
              </Box>
              <Button
                variant='outlined'
                color='success'
                disabled={isEmpty(order.next)}
                onClick={() => {
                  handlePage(order.next);
                }}
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <Box>
            <Typography>{'No order Found'}</Typography>
          </Box>
        )}
      </OrderContainer>
    </OrderWrapper>
  );
}
