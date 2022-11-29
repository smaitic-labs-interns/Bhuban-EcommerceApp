import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from "../constants/userConstants";
import { axios_instance } from "../../api/config/config";
import { user } from "../../api/config/api-endpoints";

export const user_register =
  ({ data, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: USER_REGISTER_REQUEST });
      }
      dispatch({ type: USER_REGISTER_REQUEST });
      const payload = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        password: data.password,
      };
      const response = await axios_instance({
        endpoints: user.register,
        data: payload,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAILED,
        payload: err.response,
      });
    }
  };

export const user_login =
  ({ value, action }) =>
  async (dispatch) => {
    try {
      if (action === "clean") {
        return dispatch({ type: USER_LOGIN_REQUEST });
      }
      const payload = {
        email: value.email,
        password: value.password,
      };
      dispatch({ type: USER_LOGIN_REQUEST });
      const response = await axios_instance({
        endpoints: user.login,
        data: payload,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { ...response.data, password: "" },
      });
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err.response,
      });
    }
  };

export const user_logout = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
