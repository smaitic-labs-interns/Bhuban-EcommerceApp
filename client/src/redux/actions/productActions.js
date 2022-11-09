import {
  FETCH_PRODUCTS,
  SET_PRODUCTS,
  SELECTED_PRODCT,
  REMOVE_SELECTED_PRODUCT,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
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

export const fetchProduct = (id) => async (dispatch) => {
  const response = await axios_instance({
    endpoints: product.one,
    path: { productId: id },
  });
  dispatch({
    type: SELECTED_PRODCT,
    payload: response.data,
  });
};
export const removeSelectedProduct = () => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};

export const add_product = (value) => async (dispatch) => {
  try {
    // const payload = {
    //   category: value.category,
    //   model: value.model,
    //   brand: value.brand,
    //   description: value.description,
    //   price: value.price,
    //   quantity: value.quantity,
    //   images: value.images,
    // };
    const payload = value;
    console.log(payload);
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const response = await axios_instance({
      endpoints: product.add,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
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
