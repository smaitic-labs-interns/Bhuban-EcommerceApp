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
import { Typography } from '@mui/material';
import RatingForm from './Components/RatingForm';

export default function ReviewAndRating() {
  const singleOrder = useSelector((state) => state.oneOrder);
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();

  const { orderId } = useParams();

  useEffect(() => {
    if (orderId && orderId !== '') dispatch(fetch_one_order({ orderId: orderId, action: 'fetch' }));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (singleOrder.status === 'success') {
      setOrder(singleOrder.data);
    }
  }, [singleOrder]);

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
              />
            ))}
        </RatingFormsWrapper>
      </ReviewContainer>
    </ReviewWrapper>
  );
}
