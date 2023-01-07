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
  REFUND_UPDATES_REQUEST,
  REFUND_UPDATES_SUCCESS,
  REFUND_UPDATES_FAILED,
  SHIPMENT_UPDATES_REQUEST,
  SHIPMENT_UPDATES_SUCCESS,
  SHIPMENT_UPDATES_FAILED,
  RETURN_UPDATES_REQUEST,
  RETURN_UPDATES_SUCCESS,
  RETURN_UPDATES_FAILED,
  PAYMENT_UPDATES_REQUEST,
  PAYMENT_UPDATES_SUCCESS,
  PAYMENT_UPDATES_FAILED,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILED,
  PLACED_ORDER_DETAILS_REQUEST,
  PLACED_ORDER_DETAILS_SUCCESS,
  PLACED_ORDER_DETAILS_FAILED,
  FETCH_LIMITED_ORDER_REQUEST,
  FETCH_LIMITED_ORDER_SUCCESS,
  FETCH_LIMITED_ORDER_FAILED,
  FETCH_LIMITED_USER_ORDER_REQUEST,
  FETCH_LIMITED_USER_ORDER_SUCCESS,
  FETCH_LIMITED_USER_ORDER_FAILED,
} from '../constants/orderConstants';

const placeOrderInitialState = {
  country: '',
  province: '',
  city: '',
  ward: '',
  tole: '',
  houseNo: '',
  shipmentType: '',
  paymentType: '',
  status: null,
  message: '',
};

export const place_order_reducer = (state = placeOrderInitialState, { type, payload }) => {
  switch (type) {
    case PLACE_ORDER_REQUEST:
      return { ...state, status: null };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case PLACE_ORDER_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

const orderInitialState = {
  data: [],
  status: null,
};
export const track_order_reducer = (state = orderInitialState, { type, payload }) => {
  switch (type) {
    case TRACK_ORDER_REQUEST:
      return { ...state, status: null };

    case TRACK_ORDER_SUCCESS:
      return {
        ...state,
        data: payload,
        status: 'success',
      };
    case TRACK_ORDER_FAILED:
      return {
        ...state,
        data: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const all_order_reducer = (state = orderInitialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_ORDER_REQUEST:
      return orderInitialState;

    case FETCH_ALL_ORDER_SUCCESS:
      return {
        ...state,
        data: payload,
        status: 'success',
      };
    case FETCH_ALL_ORDER_FAILED:
      return {
        ...state,
        data: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const user_orders_reducer = (state = orderInitialState, { type, payload }) => {
  switch (type) {
    case USER_ORDERS_REQUEST:
      return orderInitialState;

    case USER_ORDERS_SUCCESS:
      return {
        ...state,
        data: payload,
        status: 'success',
      };
    case USER_ORDERS_FAILED:
      return {
        ...state,
        data: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const one_order_reducer = (state = orderInitialState, { type, payload }) => {
  switch (type) {
    case FETCH_ONE_ORDER_REQUEST:
      return { ...state, status: null };

    case FETCH_ONE_ORDER_SUCCESS:
      return {
        ...state,
        data: payload,
        status: 'success',
      };
    case FETCH_ONE_ORDER_FAILED:
      return {
        ...state,
        data: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

const updateOrderInitialState = {
  status: null,
  message: '',
};

export const update_order_quantity_reducer = (
  state = updateOrderInitialState,
  { type, payload },
) => {
  switch (type) {
    case UPDATE_ORDER_QUANTITY_REQUEST:
      return updateOrderInitialState;

    case UPDATE_ORDER_QUANTITY_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case UPDATE_ORDER_QUANTITY_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const update_order_address_reducer = (
  state = updateOrderInitialState,
  { type, payload },
) => {
  switch (type) {
    case UPDATE_ORDER_ADDRESS_REQUEST:
      return { ...state, status: null };

    case UPDATE_ORDER_ADDRESS_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case UPDATE_ORDER_ADDRESS_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const update_order_payment_reducer = (
  state = updateOrderInitialState,
  { type, payload },
) => {
  switch (type) {
    case UPDATE_ORDER_PAYMENT_REQUEST:
      return { ...state, status: null };

    case UPDATE_ORDER_PAYMENT_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case UPDATE_ORDER_PAYMENT_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const cancel_order_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case CANCEL_ORDER_REQUEST:
      return { ...state, status: null };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case CANCEL_ORDER_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const return_replace_ord_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case RETURN_REPLACE_ORDER_REQUEST:
      return { ...state, status: null };

    case RETURN_REPLACE_ORDER_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case RETURN_REPLACE_ORDER_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const refund_updates_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case REFUND_UPDATES_REQUEST:
      return { ...state, status: null };

    case REFUND_UPDATES_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case REFUND_UPDATES_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const shipment_updates_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case SHIPMENT_UPDATES_REQUEST:
      return { ...state, status: null };

    case SHIPMENT_UPDATES_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case SHIPMENT_UPDATES_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const return_updates_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case RETURN_UPDATES_REQUEST:
      return { ...state, status: null };

    case RETURN_UPDATES_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case RETURN_UPDATES_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const payment_updates_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case PAYMENT_UPDATES_REQUEST:
      return { ...state, status: null };

    case PAYMENT_UPDATES_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case PAYMENT_UPDATES_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

export const update_order_status_reducer = (state = updateOrderInitialState, { type, payload }) => {
  switch (type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, status: null };

    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        message: payload,
        status: 'success',
      };
    case UPDATE_ORDER_STATUS_FAILED:
      return {
        ...state,
        message: payload.data,
        status: 'failed',
      };
    default:
      return state;
  }
};

const placedOrdDetInitState = {
  cart: {},
  shippingAddress: {},
  payment: {},
  shipment: {},
  status: null,
  message: '',
};

export const placed_order_details_reducer = (state = placeOrderInitialState, { type, payload }) => {
  switch (type) {
    case PLACED_ORDER_DETAILS_REQUEST:
      return placedOrdDetInitState;

    case PLACED_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        status: 'success',
        cart: payload.cart,
        shippingAddress: payload.address,
        payment: payload.payment,
        shipment: payload.shipment,
        message: payload.message,
        date: new Date().toISOString(),
      };
    case { PLACED_ORDER_DETAILS_FAILED }:
      return {
        ...state,
        message: payload.message,
        status: 'failed',
      };
    default:
      return state;
  }
};

const limitedOrderinitialState = {
  status: null,
  message: '',
  all: [],
  next: {},
  previous: {},
};

export const fetch_limited_order_reducer = (
  state = limitedOrderinitialState,
  { type, payload },
) => {
  switch (type) {
    case FETCH_LIMITED_ORDER_REQUEST:
      return limitedOrderinitialState;

    case FETCH_LIMITED_ORDER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'orders fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case FETCH_LIMITED_ORDER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload,
      };
    default:
      return state;
  }
};

export const fetch_limited_user_order_reducer = (
  state = limitedOrderinitialState,
  { type, payload },
) => {
  switch (type) {
    case FETCH_LIMITED_USER_ORDER_REQUEST:
      return limitedOrderinitialState;

    case FETCH_LIMITED_USER_ORDER_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: 'orders fetched successfully',
        all: payload.data,
        next: payload.next || {},
        previous: payload.previous || {},
      };
    case FETCH_LIMITED_USER_ORDER_FAILED:
      return {
        ...state,
        status: 'failed',
        message: payload,
      };
    default:
      return state;
  }
};
