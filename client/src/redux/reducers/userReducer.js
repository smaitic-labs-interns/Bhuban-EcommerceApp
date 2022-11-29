import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
} from "../constants/userConstants";

const initialStateRegister = {
  status: null,
  message: "",
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
  role: null,
  imageUrl: "",
  imageAltText: "",
};

export const register_reducer = (
  state = initialStateRegister,
  { type, payload }
) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return initialStateRegister;

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        status: "success",
        message: payload,
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        status: "failed",
        message: payload,
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
        imageUrl: action.payload.imageurl,
        imageAltText: action.payload.imagealttext,
        message: "login success",
        role: action.payload.role,
      };
    case USER_LOGOUT:
      return initialStateLogin;
    default:
      return state;
  }
};

export const logout_reducer = (
  state = initialStateLogin,
  { type, payload }
) => {
  switch (type) {
    case USER_LOGOUT:
      return state;

    default:
      return state;
  }
};
