import {
  FETCH_PRODUCTS,
  SET_PRODUCTS,
  SELECTED_PRODCT,
  REMOVE_SELECTED_PRODUCT,
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
      endpoints: product.one,path:{'productId':id}
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
  
