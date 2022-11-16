import {
  SET_PRODUCTS,
  REMOVE_SELECTED_PRODUCT,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} from "../constants/productConstants";

import { axios_instance } from "../../api/config/config";
import { product } from "../../api/config/api-endpoints";

export const fetchProducts = () => async (dispatch) => {
  const response = await axios_instance({
    endpoints: product.all,
  });
  dispatch({
    type: SET_PRODUCTS,
    payload: response.data,
  });
};

// for single product
export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_REQUEST,
    });
    // console.log(id);
    console.log("ENDPOINTS: ", product.one);
    let e = { ...product.one };
    let response = await axios_instance({
      endpoints: e,
      path: { productId: id },
    });
    // console.log(response);
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_PRODUCT_FAILED,
      payload: err.response,
    });
  }
};

export const removeSelectedProduct = () => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};

export const add_product = (value) => async (dispatch) => {
  try {
    const payload = value; //since whole formData is received as argument so passing directly
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const response = await axios_instance({
      endpoints: product.add,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: { ...response.data },
    });
  } catch (err) {
    dispatch({
      type: ADD_PRODUCT_FAILED,
      payload: err.response,
    });
  }
};

export const delete_product = (id) => async (dispatch) => {
  try {
    console.log(id);
    const payload = { id: id }; //since formData is received as argument so passing directly
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const response = await axios_instance({
      endpoints: product.remove,
      query: payload,
    });
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: { ...response.data },
    });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAILED,
      payload: err.response,
    });
  }
};
