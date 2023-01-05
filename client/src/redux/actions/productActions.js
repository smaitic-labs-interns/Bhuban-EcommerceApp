import {
  SET_PRODUCTS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  FETCH_LIMITED_PRODUCT_REQUEST,
  FETCH_LIMITED_PRODUCT_SUCCESS,
  FETCH_LIMITED_PRODUCT_FAILED,
} from '../constants/productConstants';

import axiosInstance from 'modules/api';
import { product } from 'api/endpoint';

/**
 * *fetch all products
 * @returns all productss
 */

export const fetchProducts = () => async (dispatch) => {
  const response = await axiosInstance({
    endpoints: product.all,
  });
  dispatch({
    type: SET_PRODUCTS,
    payload: response.data,
  });
};

/**
 * *fetch one product
 * @param {id}
 * @returns product
 */

export const fetch_product = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST,
    });

    let e = { ...product.one };
    let response = await axiosInstance({
      endpoints: e,
      path: { productId: id },
    });
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PRODUCT_FAILED,
      payload: err.response,
    });
  }
};

/**
 * *add product
 * @param {product-details, clean?}
 * @returns success message
 */

export const add_product =
  ({ value, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: ADD_PRODUCT_REQUEST });
      }
      const payload = value; //since whole formData is received as argument so passing directly
      dispatch({ type: ADD_PRODUCT_REQUEST });
      const response = await axiosInstance({
        endpoints: product.add,
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };

/**
 * *delete product
 * @param {productId, clean?}
 * @returns success/failure message
 */

export const delete_product =
  ({ productId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: DELETE_PRODUCT_REQUEST });
      }
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const payload = { id: productId };

      const response = await axiosInstance({
        endpoints: product.remove,
        query: payload,
      });

      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: DELETE_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };

/**
 * *update product
 * @param {productId, userId, productDetails, clean?}
 * @returns success/failure message
 */

export const update_product =
  ({ productId, userId, data, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: UPDATE_PRODUCT_REQUEST });
      }
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const payload = {
        category: data.category,
        model: data.model,
        brand: data.brand,
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        updatedBy: userId,
      };

      const response = await axiosInstance({
        endpoints: product.update,
        query: { id: productId },
        data: payload,
      });

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };

/**
 * *search product
 * @param {keyword, clean?}
 * @returns product/error msg
 */

export const search_product =
  ({ keyword, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') return dispatch({ type: SEARCH_PRODUCT_REQUEST });
      dispatch({ type: SEARCH_PRODUCT_REQUEST });
      const ep = { ...product.search };

      const response = await axiosInstance({
        endpoints: ep,
        path: { keyword: keyword },
      });
      console.log(response);
      dispatch({
        type: SEARCH_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };

/**
 * *fetch limited products
 * @param {page:Number, limit:Number, clean?}
 * @returns products/ error message
 */

export const fetch_limited_product =
  ({ page, limit, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') return dispatch({ type: FETCH_LIMITED_PRODUCT_REQUEST });
      dispatch({ type: FETCH_LIMITED_PRODUCT_REQUEST });
      const response = await axiosInstance({
        endpoints: product.limited,
        query: { page, limit },
      });
      dispatch({
        type: FETCH_LIMITED_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_LIMITED_PRODUCT_FAILED,
        payload: err.response,
      });
    }
  };
