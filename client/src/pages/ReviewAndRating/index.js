import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReviewWrapper,
  ReviewContainer,
  ReviewTitleWrapper,
  RatingFormsWrapper,
} from './styles/reviewAndRatingStyle';
import { fetch_one_order } from 'redux/actions/orderActions';
import { get_reviews_by_orderId } from 'redux/actions/review.action';
import { Typography } from '@mui/material';
import RatingForm from './Components/RatingForm';

export default function ReviewAndRating() {
  const singleOrder = useSelector((state) => state.oneOrder);
  const allReviewByOrderId = useSelector((state) => state.allReviewByOrderId);
  const [order, setOrder] = useState([]);
  const [orderReviews, setOrderReviews] = useState([]);
  const dispatch = useDispatch();

  const { orderId } = useParams();

  useEffect(() => {
    if (orderId && orderId !== '') {
      dispatch(fetch_one_order({ orderId: orderId, action: 'fetch' }));
      dispatch(get_reviews_by_orderId({ orderId: orderId, action: 'fetch' }));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    if (singleOrder.status === 'success') {
      setOrder(singleOrder.data);
    }
  }, [singleOrder]);

  useEffect(() => {
    if (allReviewByOrderId.status === 'success') {
      setOrderReviews(allReviewByOrderId.all);
    }
  }, [allReviewByOrderId]);

  const validateReadOnly = (productId) => {
    for (const review of orderReviews) {
      if (review.productid === productId) {
        return {
          isAlreadyReviewed: true,
          review: review.review,
          rating: review.rating,
        };
      }
    }
    return {
      isAlreadyReviewed: false,
      review: '',
      rating: '',
    };
  };

  return (
    <ReviewWrapper>
      <ReviewContainer>
        <ReviewTitleWrapper>
          <Typography>Please Provide your reviews and rating below</Typography>
        </ReviewTitleWrapper>
        <RatingFormsWrapper>
          {order?.products &&
            order?.products?.map((product) => (
              <RatingForm
                key={product.productId}
                orderId={order.id}
                userId={order.userId}
                productId={product.productId}
                productName={product.pDetails.name}
                oldReview={validateReadOnly(product.productId)}
              />
            ))}
        </RatingFormsWrapper>
      </ReviewContainer>
    </ReviewWrapper>
  );
}
