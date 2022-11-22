import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAILED,
  FETCH_ALL_ORDER_REQUEST,
  FETCH_ALL_ORDER_SUCCESS,
  FETCH_ALL_ORDER_FAILED,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAILED,
  FETCH_ONE_ORDER_REQUEST,
  FETCH_ONE_ORDER_SUCCESS,
  FETCH_ONE_ORDER_FAILED,
  UPDATE_ORDER_QUANTITY_REQUEST,
  UPDATE_ORDER_QUANTITY_SUCCESS,
  UPDATE_ORDER_QUANTITY_FAILED,
  UPDATE_ORDER_PAYMENT_REQUEST,
  UPDATE_ORDER_PAYMENT_SUCCESS,
  UPDATE_ORDER_PAYMENT_FAILED,
  UPDATE_ORDER_ADDRESS_REQUEST,
  UPDATE_ORDER_ADDRESS_SUCCESS,
  UPDATE_ORDER_ADDRESS_FAILED,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILED,
  RETURN_REPLACE_ORDER_REQUEST,
  RETURN_REPLACE_ORDER_SUCCESS,
  RETURN_REPLACE_ORDER_FAILED,
} from "../constants/orderConstants";
import { order } from "../../api/config/api-endpoints";
import { axios_instance } from "../../api/config/config";

export const place_order =
  ({
    userId,
    country,
    province,
    city,
    ward,
    tole,
    houseNo,
    shipmentType,
    paymentType,
    action,
  }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: PLACE_ORDER_REQUEST });
      }
      dispatch({ type: PLACE_ORDER_REQUEST });
      const payload = {
        shippingAddress: {
          country,
          province,
          city,
          ward,
          tole,
          houseNo,
        },
        paymentType,
        shipmentType,
      };
      const response = await axios_instance({
        endpoints: order.place,
        query: { id: userId },
        data: payload,
      });

      console.log(response);

      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: PLACE_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const track_order =
  ({ orderId, track, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: TRACK_ORDER_REQUEST });
      }
      dispatch({ type: TRACK_ORDER_REQUEST });
      switch (track.toLowerCase()) {
        case "order":
          var response = await axios_instance({
            endpoints: order.track,
            query: { id: orderId },
          });
          break;

        case "refund":
          var response = await axios_instance({
            endpoints: order.refund,
            query: { id: orderId },
          });
          break;

        default:
          var response = await axios_instance({
            endpoints: order.track,
            query: { id: orderId },
          });
          break;
      }
      dispatch({
        type: TRACK_ORDER_SUCCESS,
        payload: { ...response.data, track: track },
      });
    } catch (err) {
      dispatch({
        type: TRACK_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const fetch_all_order = () => async (dispatch) => {
  try {
    // if (action === "clean") {
    //   return dispatch({ type: FETCH_ALL_ORDER_REQUEST });
    // }

    dispatch({ type: FETCH_ALL_ORDER_REQUEST });
    const response = await axios_instance({
      endpoints: order.all,
    });

    dispatch({
      type: FETCH_ALL_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_ORDER_FAILED,
      payload: err.response,
    });
  }
};

export const fetch_user_orders =
  ({ userId, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: USER_ORDERS_REQUEST });
      }

      dispatch({ type: USER_ORDERS_REQUEST });
      const response = await axios_instance({
        endpoints: order.user,
        query: { id: userId },
      });

      dispatch({
        type: USER_ORDERS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ORDERS_FAILED,
        payload: err.response,
      });
    }
  };

export const fetch_one_order =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: FETCH_ONE_ORDER_REQUEST });
      }

      dispatch({ type: FETCH_ONE_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.one,
        query: { id: orderId },
      });

      dispatch({
        type: FETCH_ONE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_ONE_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const update_order_quantity =
  ({ orderId, id, quantity, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_QUANTITY_REQUEST });
      }

      const payload = {
        productId: id,
        quantity: quantity,
        action: action,
      };

      dispatch({ type: UPDATE_ORDER_QUANTITY_REQUEST });
      const response = await axios_instance({
        endpoints: order.updateQuantity,
        query: { id: orderId },
        data: payload,
      });

      dispatch({
        type: UPDATE_ORDER_QUANTITY_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_QUANTITY_FAILED,
        payload: err.response,
      });
    }
  };

export const update_order_address =
  ({ orderId, newAddress, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_ADDRESS_REQUEST });
      }

      dispatch({ type: UPDATE_ORDER_ADDRESS_REQUEST });
      const response = await axios_instance({
        endpoints: order.updateAddress,
        query: { id: orderId },
        data: newAddress,
      });

      dispatch({
        type: UPDATE_ORDER_ADDRESS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_ADDRESS_FAILED,
        payload: err.response,
      });
    }
  };

export const updatet_order_payment =
  ({ orderId, payment, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: UPDATE_ORDER_PAYMENT_REQUEST });
      }

      dispatch({ type: UPDATE_ORDER_PAYMENT_REQUEST });
      const response = await axios_instance({
        endpoints: order.updatePayment,
        query: { id: orderId },
        data: { payment: payment },
      });

      dispatch({
        type: UPDATE_ORDER_PAYMENT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_PAYMENT_FAILED,
        payload: err.response,
      });
    }
  };

export const cancel_order =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: CANCEL_ORDER_REQUEST });
      }

      dispatch({ type: CANCEL_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.cancel,
        query: { id: orderId },
      });

      dispatch({
        type: CANCEL_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: CANCEL_ORDER_FAILED,
        payload: err.response,
      });
    }
  };

export const return_replace_order =
  ({ orderId, action }) =>
  async (dispatch) => {
    try {
      console.log(orderId, action);
      if (action === "clean") {
        return dispatch({ type: RETURN_REPLACE_ORDER_REQUEST });
      }

      dispatch({ type: RETURN_REPLACE_ORDER_REQUEST });
      const response = await axios_instance({
        endpoints: order.returnReplace,
        query: { id: orderId },
        data: { action: action },
      });

      dispatch({
        type: RETURN_REPLACE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: RETURN_REPLACE_ORDER_FAILED,
        payload: err.response,
      });
    }
  };
