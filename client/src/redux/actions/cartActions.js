import {
  SET_CART,
  ADD_TO_CART,
  CART_PRODUCT_DETAILS,
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
  USER_CART_FAILED,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  //   REMOVE_SELECTED_PRODUCT,
} from "../constants/cartConstants";

import { axios_instance } from "../../api/config/config";
import { cart } from "../../api/config/api-endpoints";

export const fetch_user_Cart =
  ({ userId }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_CART_REQUEST });
      console.log(userId);
      const response = await axios_instance({
        endpoints: cart.getCart,
        query: { id: userId },
      });

      dispatch({
        type: USER_CART_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
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
      if (action === "clean") {
        return dispatch({ type: ADD_TO_CART_REQUEST });
      }
      dispatch({ type: ADD_TO_CART_REQUEST });
      const payload = { productId, quantity };
      const response = await axios_instance({
        endpoints: cart.addTo,
        query: { id: userId },
        data: payload,
      });

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: response.data,
      });

      // if (response.status === 200) {
      //   const res = await axios_instance({
      //     endpoints: cart.getCart,
      //     query: { id: userId },
      //   });
      //   if (res.status === 200) {
      //     dispatch({
      //       type: SET_CART,
      //       payload: {
      //         ...res.data,
      //         message: {
      //           type: "success",
      //           msg: "Product has been added to cart successfully",
      //         },
      //       },
      //     });
      //   } else {
      //     dispatch({
      //       type: SET_CART,
      //       payload: {
      //         ...res.data,
      //         message: {
      //           type: "failure",
      //           msg: "Error occurs while adding product to cart",
      //         },
      //       },
      //     });
      //   }
      // }
    } catch (err) {
      dispatch({
        type: ADD_TO_CART_FAILED,
        payload: err.response,
      });
    }
  };

export const fetchCartProductsDetail = (id) => async (dispatch) => {
  const response = await axios_instance({
    // endpoints: product.one,
    path: { productId: id },
  });
  dispatch({
    type: CART_PRODUCT_DETAILS,
    payload: response.data,
  });
};
// export const removeSelectedProduct = () => {
//   return {
//     type: REMOVE_SELECTED_PRODUCT,
//   };
// };

// try {
//   const payload = {
//     email: value.email,
//     password: value.password,
//   };
//   dispatch({type: USER_LOGIN_REQUEST})
//   const response = await axios_instance({
//     endpoints: user.login,
//     data: payload,
//   });
//   dispatch({
//     type: USER_LOGIN_SUCCESS,
//     payload: { ...response.data, password: "" },
//   });
// } catch (err) {
//   dispatch({
//     type: USER_LOGIN_FAIL,
//     payload: err.response,
//   });
// }
