import {
  SET_CART,
  ADD_TO_CART,
  CART_PRODUCT_DETAILS,
  //   REMOVE_SELECTED_PRODUCT,
} from "../constants/cartConstants";

import { axios_instance } from "../../api/config/config";
import { cart } from "../../api/config/api-endpoints";

export const fetch_user_Cart =
  ({ userId }) =>
  async (dispatch) => {
    try {
      const response = await axios_instance({
        endpoints: cart.getCart,
        query: { id: userId },
      });

      dispatch({
        type: SET_CART,
        payload: response.data,
      });
    } catch (err) {
      // will dispatch passing err
    }
  };

export const add_to_cart =
  ({ userId, productId, quantity }) =>
  async (dispatch) => {
    const payload = { productId, quantity };
    const response = await axios_instance({
      endpoints: cart.addTo,
      query: { id: userId },
      data: payload,
    });
    if (response.status === 200) {
      const res = await axios_instance({
        endpoints: cart.getCart,
        query: { id: userId },
      });
      if (res.status === 200) {
        dispatch({
          type: SET_CART,
          payload: {
            ...res.data,
            message: {
              type: "success",
              msg: "Product has been added to cart sucessfully",
            },
          },
        });
      } else {
        dispatch({
          type: SET_CART,
          payload: {
            ...res.data,
            message: {
              type: "failure",
              msg: "Error occurs while adding product to cart",
            },
          },
        });
      }
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
