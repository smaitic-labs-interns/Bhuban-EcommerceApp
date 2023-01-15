import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILED,
  GET_ALL_REVIEW_REQUEST,
  GET_ALL_REVIEW_SUCCESS,
  GET_ALL_REVIEW_FAILED,
  GET_LIMITED_REVIEW_REQUEST,
  GET_LIMITED_REVIEW_SUCCESS,
  GET_LIMITED_REVIEW_FAILED,
  GET_ONE_REVIEW_REQUEST,
  GET_ONE_REVIEW_SUCCESS,
  GET_ONE_REVIEW_FAILED,
  GET_ALL_REVIEW_BY_ORDER_REQUEST,
  GET_ALL_REVIEW_BY_ORDER_SUCCESS,
  GET_ALL_REVIEW_BY_ORDER_FAILED,
  GET_LIMITED_REVIEW_BY_ORDER_REQUEST,
  GET_LIMITED_REVIEW_BY_ORDER_SUCCESS,
  GET_LIMITED_REVIEW_BY_ORDER_FAILED,
  GET_ALL_REVIEW_BY_PRODUCT_REQUEST,
  GET_ALL_REVIEW_BY_PRODUCT_SUCCESS,
  GET_ALL_REVIEW_BY_PRODUCT_FAILED,
  GET_LIMITED_REVIEW_BY_PRODUCT_REQUEST,
  GET_LIMITED_REVIEW_BY_PRODUCT_SUCCESS,
  GET_LIMITED_REVIEW_BY_PRODUCT_FAILED,
  GET_AVG_RATING_REQUEST,
  GET_AVG_RATING_SUCCESS,
  GET_AVG_RATING_FAILED,
  REMOVE_REVIEW_REQUEST,
  REMOVE_REVIEW_SUCCESS,
  REMOVE_REVIEW_FAILED,
} from 'redux/constants/reviewConstants';
import axiosInstance from 'modules/api';
import { review as reviewEp } from 'api/endpoint';

export const add_review =
  ({ orderId, productId, createdBy, review, rating, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: ADD_REVIEW_REQUEST });
      }
      dispatch({ type: ADD_REVIEW_REQUEST });
      const payload = {
        orderId,
        productId,
        createdBy,
        review,
        rating,
      };
      const response = await axiosInstance({
        endpoints: reviewEp.add,
        data: payload,
      });
      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: ADD_REVIEW_FAILED,
        payload: err.response,
      });
    }
  };

export const get_all_reviews =
  ({ action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_ALL_REVIEW_REQUEST });
      }
      dispatch({ type: GET_ALL_REVIEW_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.all,
      });
      dispatch({
        type: GET_ALL_REVIEW_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_REVIEW_FAILED,
        payload: err.response,
      });
    }
  };

export const get_limited_reviews =
  ({ page, limit, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_LIMITED_REVIEW_REQUEST });
      }
      dispatch({ type: GET_LIMITED_REVIEW_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.limited,
        query: { page, limit },
      });
      dispatch({
        type: GET_LIMITED_REVIEW_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_LIMITED_REVIEW_FAILED,
        payload: err.response,
      });
    }
  };

export const get_reviews_by_id =
  ({ reviewId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_ONE_REVIEW_REQUEST });
      }
      dispatch({ type: GET_ONE_REVIEW_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.one,
        query: { reviewId },
      });
      dispatch({
        type: GET_ONE_REVIEW_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_ONE_REVIEW_FAILED,
        payload: err.response,
      });
    }
  };

export const get_reviews_by_orderId =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_ALL_REVIEW_BY_ORDER_REQUEST });
      }
      dispatch({ type: GET_ALL_REVIEW_BY_ORDER_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.allByOrderId,
        query: { orderId },
      });
      dispatch({
        type: GET_ALL_REVIEW_BY_ORDER_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_REVIEW_BY_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const get_limited_reviews_by_orderId =
  ({ page, limit, orderId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_LIMITED_REVIEW_BY_ORDER_REQUEST });
      }
      dispatch({ type: GET_LIMITED_REVIEW_BY_ORDER_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.limitedByOrderId,
        query: { page, limit, orderId },
      });
      dispatch({
        type: GET_LIMITED_REVIEW_BY_ORDER_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_LIMITED_REVIEW_BY_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const get_reviews_by_productId =
  ({ productId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_ALL_REVIEW_BY_PRODUCT_REQUEST });
      }
      dispatch({ type: GET_ALL_REVIEW_BY_PRODUCT_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.allByProductId,
        query: { productId },
      });
      dispatch({
        type: GET_ALL_REVIEW_BY_PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_REVIEW_BY_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };

export const get_limited_reviews_by_productId =
  ({ page, limit, productId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_LIMITED_REVIEW_BY_PRODUCT_REQUEST });
      }
      dispatch({ type: GET_LIMITED_REVIEW_BY_PRODUCT_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.limitedByProductId,
        query: { page, limit, productId },
      });
      dispatch({
        type: GET_LIMITED_REVIEW_BY_PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_LIMITED_REVIEW_BY_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };

export const get_average_product_rating =
  ({ productId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: GET_AVG_RATING_REQUEST });
      }
      dispatch({ type: GET_AVG_RATING_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.rating,
        query: { productId },
      });
      dispatch({
        type: GET_AVG_RATING_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: GET_AVG_RATING_FAILED,
        payload: err.response,
      });
    }
  };

export const remove_reviews_by_id =
  ({ reviewId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: REMOVE_REVIEW_REQUEST });
      }
      dispatch({ type: REMOVE_REVIEW_REQUEST });

      const response = await axiosInstance({
        endpoints: reviewEp.remove,
        query: { reviewId },
      });
      dispatch({
        type: REMOVE_REVIEW_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: REMOVE_REVIEW_FAILED,
        payload: err.response,
      });
    }
  };
