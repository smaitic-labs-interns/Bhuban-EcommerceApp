import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
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
