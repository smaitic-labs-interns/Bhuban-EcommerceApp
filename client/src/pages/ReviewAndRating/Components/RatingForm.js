import React, { useEffect, useState } from 'react';
import { Button, FormHelperText, Rating, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { reviewRules } from 'validation';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import {
  RatingFormWrapper,
  RatingBox,
  RatingTitle,
  RatingContent,
  RatingFormContainer,
  RatingLabelWrapper,
} from '../styles/ratingFormStyle';
import { add_review, read_reviews_by_order_product_id } from 'redux/actions/review.action';

export default function RatingForm({ orderId, productId, userId, productName }) {
  const addReview = useSelector((state) => state.addReview);
  const orderProducReviewtId = useSelector((state) => state.orderProducReviewtId);
  const [oldReview, setOldReview] = useState([]);

  const dispatch = useDispatch();
  const getLabelText = (value) => {
    const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };
    return labels[value];
  };

  const initialValues = {
    review: '',
    rating: '',
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: reviewRules,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        add_review({
          orderId: orderId,
          productId: productId,
          review: values.review,
          rating: values.rating,
          createdBy: userId,
          action: 'add',
        }),
      );
    },
  });

  useEffect(() => {
    if (addReview.status === 'success') {
      Swal.fire({
        title: 'Success!',
        text: `${addReview.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } else if (addReview.status === 'failed') {
      Swal.fire({
        title: 'Failed!',
        text: `${addReview.message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    if (addReview.status !== null) {
      dispatch(
        add_review({
          orderId: '',
          productId: '',
          review: '',
          rating: '',
          createdBy: '',
          action: 'clean',
        }),
      );
    }
  }, [addReview]);

  useEffect(() => {
    dispatch(
      read_reviews_by_order_product_id({
        orderId: orderId,
        productId: productId,
        action: 'fetch',
      }),
    );
  }, []);

  useEffect(() => {
    if (addReview.status === 'success') {
      setOldReview(addReview.all);
    }

    if (addReview.status !== null) {
      dispatch(
        read_reviews_by_order_product_id({
          orderId: '',
          productId: '',
          action: 'clean',
        }),
      );
    }
  }, [orderProducReviewtId]);

  return (
    <RatingFormWrapper>
      <RatingBox sx={{ width: '50%' }}>
        <RatingTitle>ProductName</RatingTitle>
        <RatingContent>{productName}</RatingContent>
      </RatingBox>
      <RatingFormContainer component={'form'} noValidate onSubmit={handleSubmit}>
        <RatingBox>
          <RatingTitle>Review</RatingTitle>
          <RatingContent>
            <TextField
              autoComplete='review'
              name='review'
              fullWidth
              id='review'
              label='Product Review'
              multiline
              minRows={4}
              value={values.review}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.review && Boolean(errors.review)}
              helperText={touched.review && errors.review}
            />
          </RatingContent>
        </RatingBox>
        <RatingBox>
          <RatingTitle>Rating</RatingTitle>
          <RatingContent>
            <Rating
              id='rating'
              name='rating'
              value={Number(values.rating)}
              onChange={handleChange}
              onBlur={handleBlur}
              precision={0.5}
            />
          </RatingContent>
          <RatingLabelWrapper>
            <Typography>{getLabelText(values.rating)}</Typography>
          </RatingLabelWrapper>
          {errors.rating && (
            <FormHelperText sx={{ color: '#d32f2f' }}> {errors.rating}</FormHelperText>
          )}
        </RatingBox>
        <RatingBox>
          <Button variant='outlined' color='success' type='submit'>
            Submit
          </Button>
        </RatingBox>
      </RatingFormContainer>
    </RatingFormWrapper>
  );
}
