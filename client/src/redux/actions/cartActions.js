import {
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
  USER_CART_FAILED,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILED,
  CART_PRODUCTS_DETAILS_REQUEST,
  CART_PRODUCTS_DETAILS_SUCCESS,
  CART_PRODUCTS_DETAILS_FAILED,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILED,
} from '../constants/cartConstants';

import axiosInstance from 'Modules/api';
import { cart, product } from 'api/endpoint';
export const fetch_user_Cart =
  ({ userId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'claen') {
        return dispatch({ type: USER_CART_REQUEST });
      }
      dispatch({ type: USER_CART_REQUEST });
      const response = await axiosInstance({
        endpoints: cart.one,
        query: { id: userId },
      });
      let prdcts = response.data;
      if (response.status === 200) {
        for (let pr of prdcts.products) {
          //TODO: FIX(): Value of endpoint is not changing according to loop;

          let e = { ...product.one };
          let productRes = await axiosInstance({
            endpoints: e,
            path: { productId: pr.productId },
          });
          e.url = e.url.slice(0, e.url.lastIndexOf('/'));
          console.log(product.one);
          console.log(productRes.data);
          if (productRes.status === 200) {
            pr.pDetails = productRes.data;
          }
        }
      }
      dispatch({
        type: USER_CART_SUCCESS,
        payload: prdcts,
      });
    } catch (err) {
      dispatch({
        type: USER_CART_FAILED,
        payload: err.response,
      });
    }
  };

export const add_to_cart =
  ({ userId, productId, quantity, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: ADD_TO_CART_REQUEST });
      }
      dispatch({ type: ADD_TO_CART_REQUEST });
      const payload = { productId, quantity };
      const response = await axiosInstance({
        endpoints: cart.addProduct,
        query: { id: userId },
        data: payload,
      });

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: ADD_TO_CART_FAILED,
        payload: err.response,
      });
    }
  };

export const remove_from_cart =
  ({ userId, productId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: REMOVE_FROM_CART_REQUEST });
      }
      dispatch({ type: REMOVE_FROM_CART_REQUEST });
      const response = await axiosInstance({
        endpoints: cart.removeProduct,
        query: { id: userId, pid: productId },
      });

      dispatch({
        type: REMOVE_FROM_CART_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: REMOVE_FROM_CART_FAILED,
        payload: err.response.data,
      });
    }
  };

export const fetch_cart_products_details =
  ({ productId = [], action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: CART_PRODUCTS_DETAILS_REQUEST });
      }

      const details = [];

      dispatch({ type: CART_PRODUCTS_DETAILS_REQUEST });

      productId.map(async (id) => {
        var response = await axiosInstance({
          endpoints: product.one,
          path: { productId: id },
        });

        if (response.status === 200) {
          details.push(response.data);
        }
      });
      dispatch({
        type: CART_PRODUCTS_DETAILS_SUCCESS,
        payload: details,
      });
    } catch (err) {
      dispatch({
        type: CART_PRODUCTS_DETAILS_FAILED,
        payload: err.response,
      });
    }
  };

export const update_user_cart =
  ({ userId, id, quantity, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: UPDATE_CART_REQUEST });
      }

      const payload = {
        productId: id,
        quantity: quantity,
        action: action,
      };

      dispatch({ type: UPDATE_CART_REQUEST });
      const response = await axiosInstance({
        endpoints: cart.updateQuantity,
        query: { id: userId },
        data: payload,
      });

      dispatch({
        type: UPDATE_CART_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_CART_FAILED,
        payload: err.response,
      });
    }
  };
