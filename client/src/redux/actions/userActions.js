import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  FETCH_LIMITED_USER_REQUEST,
  FETCH_LIMITED_USER_SUCCESS,
  FETCH_LIMITED_USER_FAILED,
  FETCH_ONE_USER_REQUEST,
  FETCH_ONE_USER_SUCCESS,
  FETCH_ONE_USER_FAILED,
  REMOVE_USER_REQUEST,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILED,
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
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAILED,
        payload: err.response,
      });
    }
  };

export const fetch_limited_user =
  ({ page, limit, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: FETCH_LIMITED_USER_REQUEST });
      }
      dispatch({ type: FETCH_LIMITED_USER_REQUEST });

      const response = await axiosInstance({
        endpoints: user.limited,
        query: { page, limit },
      });
      dispatch({
        type: FETCH_LIMITED_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: FETCH_LIMITED_USER_FAILED,
        payload: err.response,
      });
    }
  };

export const fetch_one_user =
  ({ userId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: FETCH_ONE_USER_REQUEST });
      }
      dispatch({ type: FETCH_ONE_USER_REQUEST });

      const response = await axiosInstance({
        endpoints: user.one,
        query: { id: userId },
      });
      dispatch({
        type: FETCH_ONE_USER_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: FETCH_ONE_USER_FAILED,
        payload: err.response,
      });
    }
  };

export const remove_user =
  ({ userId, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: REMOVE_USER_REQUEST });
      }
      dispatch({ type: REMOVE_USER_REQUEST });

      const response = await axiosInstance({
        endpoints: user.remove,
        query: { id: userId },
      });
      dispatch({
        type: REMOVE_USER_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: REMOVE_USER_FAILED,
        payload: err.response,
      });
    }
  };

export const update_user =
  ({ userId, data, updatedBy, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: UPDATE_USER_REQUEST });
      }
      dispatch({ type: UPDATE_USER_REQUEST });
      const payload = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        address: data.address,
      };
      const response = await axiosInstance({
        endpoints: user.update,
        query: { userId: userId, updatedBy: updatedBy },
        data: payload,
      });
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_FAILED,
        payload: err.response,
      });
    }
  };

export const update_user_role =
  ({ userId, role, updatedBy, action }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: UPDATE_USER_ROLE_REQUEST });
      }
      dispatch({ type: UPDATE_USER_ROLE_REQUEST });

      const response = await axiosInstance({
        endpoints: user.updateRole,
        query: { id: userId, role, updatedBy },
      });
      dispatch({
        type: UPDATE_USER_ROLE_SUCCESS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_ROLE_FAILED,
        payload: err.response,
      });
    }
  };

export const user_login =
  ({ value, action, isLogined = false }) =>
  async (dispatch) => {
    try {
      if (action === 'clean') {
        return dispatch({ type: USER_LOGIN_REQUEST });
      }

      dispatch({ type: USER_LOGIN_REQUEST });

      let response = {};

      if (isLogined && value?.userId?.length > 0) {
        response = await axiosInstance({
          endpoints: user.one,
          query: { id: value.userId },
        });
      } else {
        const payload = {
          email: value.email,
          password: value.password,
        };
        response = await axiosInstance({
          endpoints: user.login,
          data: payload,
        });
      }

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
