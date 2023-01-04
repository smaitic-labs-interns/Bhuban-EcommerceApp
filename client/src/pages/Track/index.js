import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { fetch_one_order } from '../../redux/actions/orderActions';
import ViewOrder from '../../components/Modals/ViewOrder';
import {
  TrackWrapper,
  TrackContainer,
  TrackFormContainer,
  TrackFormInputWrapper,
  TrackFormSubmitBtnWrapper,
  TrackResultWrapper,
  ResultTitle,
} from './styles/trackStyle';

export default function Track() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.oneOrder);

  const initialValues = {
    orderId: '',
    trackType: '',
  };

  const { values, errors, setFieldValue, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      // validationSchema: loginSchema, // for data validation
      onSubmit: (values) => {
        dispatch(
          fetch_one_order({
            orderId: values.orderId,
            action: 'fetch',
          }),
        );
      },
    });

  useEffect(() => {
    console.log(order);
    if (order.status === 'failed') {
      Swal.fire({
        title: 'Failed!',
        text: `${order.data}`,
        icon: 'error',
        confirmButtonText: 'ok',
      });
      dispatch(
        fetch_one_order({
          orderId: '',
          action: 'clean',
        }),
      );
    }
  }, [order]);

  return (
    <TrackWrapper>
      <TrackContainer>
        <TrackFormContainer component={'form'} onSubmit={handleSubmit}>
          <TrackFormInputWrapper>
            <TextField
              margin='normal'
              required
              fullWidth
              id='orderId'
              label='Order Id'
              name='orderId'
              autoComplete='orderId'
              value={values.orderId}
              onChange={handleChange}
              onBlur={handleBlur}
              //   error={errors.email && Boolean(errors.email)}
            />
          </TrackFormInputWrapper>

          <TrackFormSubmitBtnWrapper>
            <Button type='submit' variant='contained' fullWidth color='success'>
              <Search />
              Track
            </Button>
          </TrackFormSubmitBtnWrapper>
        </TrackFormContainer>

        <TrackResultWrapper>
          {order.status === 'success' && (
            <>
              <ResultTitle>{'Recent :  '}</ResultTitle>
              <ViewOrder order={order.data} initially={true} />
            </>
          )}
        </TrackResultWrapper>
      </TrackContainer>
    </TrackWrapper>
  );
}
