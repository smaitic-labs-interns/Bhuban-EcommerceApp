import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  INVALID_LOGIN,
} from "../constants/userConstants";
import { axios_instance } from "../../api/config/config";
import { user } from "../../api/config/api-endpoints";

export const user_register = (data) => async (dispatch) => {
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
    type: USER_REGISTER,
    payload: response.data,
  });
};

export const user_login = (value) => async (dispatch) => {
  const payload = {
    email: value.email,
    password: value.password,
  };
  const response = await axios_instance({
    endpoints: user.login,
    data: payload,
  });
  if (response.status === 200) {
    console.log("Succesfull")
    dispatch({
      type: USER_LOGIN,
      payload: {...response.data},
    });
  } else {
    dispatch({
      type: INVALID_LOGIN,
      payload: response.data,
    });
  }
};
