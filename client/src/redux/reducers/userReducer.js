import {
  USER_REGISTER,
  USER_LOGIN,
  INVALID_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

const initialStateRegister = {
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  email: "",
  password: "",
  isRegistered: false,
};

const initialStateLogin = {
  userId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  email: "",
  isLogined: false,
  message: "",
  loading: true,
};

export const registerReducer = (state = initialStateRegister, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        firstName: action.payload.firstName,
        middleName: action.payload.middleName,
        lastName: action.payload.lastName,
        address: action.payload.address,
        email: action.payload.email,
        password: action.payload.password,
        isRegistered: true,
      };

    default:
      return state;
  }
};

export const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isLogined: false,
        message: action.payload.data,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLogined: true,
        userId: action.payload.id,
        firstName: action.payload.firstname,
        middleName: action.payload.middlename,
        lastName: action.payload.lastname,
        address: action.payload.address,
        email: action.payload.email,
        message: "login success",
      };
    default:
      return state;
  }
};
