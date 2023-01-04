import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from 'redux/constants/userConstants';
import axiosInstance from 'modules/api';
import { user } from 'api/endpoint';

export const user_register =
  ({ data, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
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
      const response = await axiosInstance({
        endpoints: user.register,
        data: payload,
      });
      console.log(response);
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
      if (action === 'clean') {
        return dispatch({ type: USER_LOGIN_REQUEST });
      }
      const payload = {
        email: value.email,
        password: value.password,
      };
      dispatch({ type: USER_LOGIN_REQUEST });
      const response = await axiosInstance({
        endpoints: user.login,
        data: payload,
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { ...response.data, password: '' },
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
