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

const placeOrderInitialState = {
  userId: "",
  country: "",
  province: "",
  city: "",
  ward: "",
  tole: "",
  houseNo: "",
  shipmentType: "",
  paymentType: "",
  status: null,
  message: "",
};

export const place_order_reducer = (
  state = placeOrderInitialState,
  { type, payload }
) => {
  switch (type) {
    case PLACE_ORDER_REQUEST:
      return { ...state, status: null };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case PLACE_ORDER_FAILED:
      return {
        ...state,
        message: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

const orderInitialState = {
  data: {},
  status: null,
};
export const track_order_reducer = (
  state = orderInitialState,
  { type, payload }
) => {
  switch (type) {
    case TRACK_ORDER_REQUEST:
      return { ...state, status: null };

    case TRACK_ORDER_SUCCESS:
      return {
        ...state,
        data: payload,
        status: "success",
      };
    case TRACK_ORDER_FAILED:
      return {
        ...state,
        data: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const all_order_reducer = (
  state = orderInitialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_ALL_ORDER_REQUEST:
      return { ...state, status: null };

    case FETCH_ALL_ORDER_SUCCESS:
      return {
        ...state,
        data: payload,
        status: "success",
      };
    case FETCH_ALL_ORDER_FAILED:
      return {
        ...state,
        data: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const user_orders_reducer = (
  state = orderInitialState,
  { type, payload }
) => {
  switch (type) {
    case USER_ORDERS_REQUEST:
      return { ...state, status: null };

    case USER_ORDERS_SUCCESS:
      return {
        ...state,
        data: payload,
        status: "success",
      };
    case USER_ORDERS_FAILED:
      return {
        ...state,
        data: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const one_order_reducer = (
  state = orderInitialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_ONE_ORDER_REQUEST:
      return { ...state, status: null };

    case FETCH_ONE_ORDER_SUCCESS:
      return {
        ...state,
        data: payload,
        status: "success",
      };
    case FETCH_ONE_ORDER_FAILED:
      return {
        ...state,
        data: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

const updateOrderInitialState = {
  status: null,
  message: "",
};

export const update_order_quantity_reducer = (
  state = updateOrderInitialState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_ORDER_QUANTITY_REQUEST:
      return { ...state, status: null };

    case UPDATE_ORDER_QUANTITY_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case UPDATE_ORDER_QUANTITY_FAILED:
      return {
        ...state,
        message: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const update_order_address_reducer = (
  state = updateOrderInitialState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_ORDER_ADDRESS_REQUEST:
      return { ...state, status: null };

    case UPDATE_ORDER_ADDRESS_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case UPDATE_ORDER_ADDRESS_FAILED:
      return {
        ...state,
        message: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const update_order_payment_reducer = (
  state = updateOrderInitialState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_ORDER_PAYMENT_REQUEST:
      return { ...state, status: null };

    case UPDATE_ORDER_PAYMENT_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case UPDATE_ORDER_PAYMENT_FAILED:
      return {
        ...state,
        message: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const cancel_order_reducer = (
  state = updateOrderInitialState,
  { type, payload }
) => {
  switch (type) {
    case CANCEL_ORDER_REQUEST:
      return { ...state, status: null };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case CANCEL_ORDER_FAILED:
      return {
        ...state,
        message: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};

export const return_replace_ord_reducer = (
  state = updateOrderInitialState,
  { type, payload }
) => {
  switch (type) {
    case RETURN_REPLACE_ORDER_REQUEST:
      return { ...state, status: null };

    case RETURN_REPLACE_ORDER_SUCCESS:
      return {
        ...state,
        message: payload,
        status: "success",
      };
    case RETURN_REPLACE_ORDER_FAILED:
      return {
        ...state,
        message: payload.data,
        status: "failed",
      };
    default:
      return state;
  }
};
