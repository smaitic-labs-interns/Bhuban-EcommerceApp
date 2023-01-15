import React, { useState, useEffect } from 'react';
import {
  OrderStatusWrapper,
  LeftWrapper,
  LeftTitleWrapper,
  MiddleWrapper,
  RightWrapper,
} from './styles/editOrderStatusStyle';
import { update_order_status, fetch_limited_order } from 'redux/actions/orderActions';
import { Select, MenuItem, FormControlLabel, Switch, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Save } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { sendOrderUpdatesEmail } from 'mail/emailService';
import { user } from 'api/endpoint';
import axiosInstance from 'modules/api';

export default function EditOrderStatus({ order }) {
  const updateOrderStatus = useSelector((state) => state.updateOrderStatus);
  const [ordStatus, setOrdStatus] = useState(null);
  const [sendMail, setsendMail] = useState(true);
  const dispatch = useDispatch();

  const ORDER_STATUS = [
    'pending',
    'accepted',
    'in-progress',
    'shipped',
    'delivered',
    'completed',
    'cancelled',
    'failed',
  ];

  const handleUpdateStatus = () => {
    if (ordStatus && ordStatus !== '') {
      dispatch(
        update_order_status({
          orderId: order.id,
          status: ordStatus,
          action: 'update',
        }),
      );
    }
  };

  useEffect(() => {
    if (updateOrderStatus.status === 'success') {
      if (sendMail) {
        axiosInstance({ endpoints: user.one, query: { id: order.userId } }).then((data) => {
          if (data.status === 200) {
            const { firstname, middlename, lastname, email } = data?.data;
            let fullName = `${firstname ? firstname : ''} ${middlename ? middlename : ''} ${
              lastname ? lastname : ''
            }`;

            sendOrderUpdatesEmail(email, fullName, ordStatus).then((res) => {
              console.log(res?.data);
              setsendMail(false);
            });
          }
        });
      }
      Swal.fire({
        title: 'Success!',
        text: `${updateOrderStatus.message}`,
        icon: 'success',
      });
      dispatch(fetch_limited_order({ page: 1, limit: 5, action: 'fetch' }));
    } else if (updateOrderStatus.status === 'failed') {
      Swal.fire({
        title: 'Failed!',
        text: `${updateOrderStatus.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    if (updateOrderStatus.status !== null) {
      dispatch(
        update_order_status({
          orderId: '',
          status: '',
          action: 'clean',
        }),
      );
    }
  }, [updateOrderStatus]);
  return (
    <OrderStatusWrapper>
      <LeftWrapper>
        <LeftTitleWrapper>
          Order Status: <br />({order.orderStatus})
        </LeftTitleWrapper>
      </LeftWrapper>

      <MiddleWrapper>
        <Select
          fullWidth
          id='ordStatus'
          name='ordStatus'
          label='Update Order Status'
          onChange={(e) => {
            setOrdStatus(e.target.value);
          }}
        >
          {ORDER_STATUS.length !== 0 ? (
            ORDER_STATUS.map((status) => {
              return (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={'Not Available'}>{'Not Available'}</MenuItem>
          )}
        </Select>
        <FormControlLabel
          onChange={() => setsendMail(!sendMail)}
          control={<Switch defaultChecked />}
          label='Send updates to User'
        />
      </MiddleWrapper>
      <RightWrapper>
        <Button
          variant={'outlined'}
          color={'success'}
          onClick={() => {
            handleUpdateStatus();
          }}
          disabled={
            order.orderStatus === 'delivered' || order.orderStatus === 'cancelled' ? true : false
          }
          size={'small'}
        >
          <Save /> {' Update'}
        </Button>
      </RightWrapper>
    </OrderStatusWrapper>
  );
}
