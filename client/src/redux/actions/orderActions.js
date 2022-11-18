import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
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
